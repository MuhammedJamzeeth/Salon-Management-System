import StarIcon from "@mui/icons-material/Star";

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
    BarberShopAddress,
    BarberShopName,
    CardFlex,
    Ratings,
    Tag,
    Tags,
} from "../../components/BarberShop/barbershop.card.styles";

import { colors } from "../../styles/colors";

import Skeleton from "react-loading-skeleton";
import styled from "styled-components";

import CheckIcon from "@mui/icons-material/Check";

import axios from "axios";
import NotFound from "../../components/NotFound/NotFound";
import { useServiceStylist } from "../../hooks/BarberShop/getStylist";
import {
    About,
    AboutHeading,
    AboutWrapper,
    AlterNativeImage,
    AlterNativeImages,
    BarberContainer,
    BarberContainerLeftWrapper,
    BarberContainerRightWrapper,
    BarberWrapper,
    Boarder,
    ServicesContainer,
    ShowCaseImage,
} from "../BarberShop/barber.styles";
export const BarberShopServiceDetails = ({ isOpen, toggleSideBar }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const itemId = searchParams.get("v");

    const {
        serviceById,
        error,
        loading,
        service,
        currentActiveImage,
        setCurrentActiveImage,
    } = useServiceStylist();
    useEffect(() => {
        serviceById(itemId);
    }, []);

    return (
        <>
            {error?.message ? (
                <NotFound />
            ) : (
                <BarberWrapper>
                    <BarberContainer>
                        <BarberContainerLeftWrapper>
                            {service?.serviceImages?.length > 0 && (
                                <AlterNativeImages>
                                    {service?.serviceImages?.map((img, id) => (
                                        <AlterNativeImage key={id}>
                                            <img
                                                src={img?.src}
                                                style={{ opacity: currentActiveImage !== id ? 0.6 : 1 }}
                                                alt={service?.serviceTitle}
                                                onClick={() => setCurrentActiveImage(id)}
                                            />
                                        </AlterNativeImage>
                                    ))}
                                </AlterNativeImages>
                            )}
                            {service?.serviceImages?.length > 0 && (
                                <ShowCaseImage>
                                    <img
                                        src={service?.serviceImages[currentActiveImage]?.src}
                                        alt=""
                                    />
                                </ShowCaseImage>
                            )}
                        </BarberContainerLeftWrapper>
                        <BarberContainerRightWrapper>
                            <BarberShopName style={{ fontSize: "16px", display: "block" }}>
                                {loading ? (
                                    <Skeleton width={210} height={118} />
                                ) : (
                                    service?.serviceTitle
                                )}
                            </BarberShopName>
                            <BarberShopAddress style={{ margin: "2px 0px" }}>
                                360 stillwater Rd,Palm City
                            </BarberShopAddress>
                            <CardFlex style={{ margin: "2px 0px" }}>
                                <Tags>
                                    <Tag>{service.serviceType}</Tag>
                                </Tags>

                                <Ratings>
                                    <StarIcon
                                        fontSize="14px"
                                        sx={{ color: colors.colorOrange }}
                                    />
                                    <span>4.7(2.7k)</span>
                                </Ratings>
                            </CardFlex>
                            <Tags>
                                <Tag
                                    style={{
                                        background: colors.colorOrange,
                                        color: colors.colorWhite,
                                        padding: "5px 10px",
                                        borderRadius: "20px",
                                    }}
                                >
                                    ${service?.price}
                                </Tag>
                                <Tag
                                    style={{
                                        background: colors.colorOrange,
                                        color: colors.colorWhite,
                                        padding: "5px 10px",
                                        borderRadius: "20px",
                                        margin: "0px 5px",
                                    }}
                                >
                                    {service?.gender?.toUpperCase()}
                                </Tag>
                            </Tags>

                            <Boarder />
                            <AboutWrapper>
                                <AboutHeading>About</AboutHeading>
                                <About>{service?.description}</About>
                            </AboutWrapper>
                        </BarberContainerRightWrapper>
                    </BarberContainer>
                </BarberWrapper>
            )}
        </>
    );
};

export const Stylist = ({ stylist = [] }) => {
    const [selectedStylist, setSelectedStylist] = useState([]);
    const [loading, setLoading] = useState(false);
    const usertoken = JSON.parse(localStorage.getItem("user"));
    const handleAddRemoveStylist = (id) => {
        if (selectedStylist?.includes(id)) {
            setSelectedStylist(selectedStylist?.filter((item) => item !== id));
        } else {
            setSelectedStylist([...selectedStylist, id]);
        }
    };

    const getStylist = async () => {
        const flatArray = stylist.flat();

        const uniqueNonEmptyElements = [
            ...new Set(flatArray.filter((item) => item !== "")),
        ];

        try {
            const arrayOfIds = uniqueNonEmptyElements;
            console.log(arrayOfIds);

            const idsArray = ["64e730c70f301d5c2c6e861a", "64e730c70f301d5c2c6e861b"];
            const idsQueryParam = idsArray.map((id) => `ids[]=${id}`).join("&");
            console.log(idsQueryParam);
            const url = `http://localhost:8080/api/v1/user/stylists?${idsQueryParam}`;

            console.log(arrayOfIds);
            const stylists = await axios.get(url, {
                params: {
                    ids: arrayOfIds.join(","),
                },
                headers: {
                    Authorization: `Bearer ${usertoken?.token}`,
                },
            });

            setSelectedStylist(stylists?.data);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getStylist();
        console.log(selectedStylist);
    }, []);

    return (
        <StylistWrapper>
            <AboutHeading>Select Specialist</AboutHeading>

            {/* <StylistContainer>
        {stylist.map((stylist) => (
          <SelectStylist
            onClick={() => handleAddRemoveStylist(stylist?._id)}
            key={stylist._id}
          >
            <Image>
              <img
                style={{
                  border: selectedStylist?.includes(stylist?._id)
                    ? `4px solid ${colors.colorOrange}`
                    : null,
                  opacity: !selectedStylist.includes(stylist?._id) ? 1 : 0.5,
                }}
                src={stylist?.feature_images[0]?.src}
                alt=""
              />
              {selectedStylist.includes(stylist?._id) && (
                <CheckIcon
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    color: colors.colorOrange,
                    transform: `translate(-50%,-50%)`,
                  }}
                />
              )}
            </Image>

            <AboutHeading>{stylist.name}</AboutHeading>
          </SelectStylist>
        ))} */}
            {/* </StylistContainer> */}
        </StylistWrapper>
    );
};

export const StylistWrapper = styled(AboutWrapper)``;
export const StylistContainer = styled(ServicesContainer)`
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));

  align-items: center;
  justify-content: center;
  margin: 10px 0;

  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  }
`;
export const Image = styled.div`
  width: 70px;
  height: 70px;
  max-width: 70px;
  margin: auto;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }

  @media screen and (max-width: 500px) {
    width: 60px;
    height: 60px;
  }
`;

export const SelectStylist = styled.div`
  text-align: center;
`;

export const DateTimeWrapper = styled.div`
  margin: 20px;
`;
