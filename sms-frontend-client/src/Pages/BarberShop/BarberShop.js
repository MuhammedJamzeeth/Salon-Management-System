import StarIcon from "@mui/icons-material/Star";

import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import {
    BarberShopAddress,
    BarberShopName,
    CardFlex,
    Ratings,
    Tag,
    Tags,
} from "../../components/BarberShop/barbershop.card.styles";
import NavBar from "../../components/NavBar/NavigationBar";

import { useGetBarberShop } from "../../hooks/BarberShop";
import { colors } from "../../styles/colors";

import Skeleton from "react-loading-skeleton";
import NotFound from "../../components/NotFound/NotFound";
import {
    BarberShopService,
    ServiceCategoryComponent,
} from "../../pages/services/index";
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
    Day,
    OpeningHour,
    OpeningHours,
    OurServicesWrapper,
    ServiceWrapper,
    ServicesContainer,
    ShowCaseImage,
    Time,
} from "./barber.styles";
const BarberShop = ({ isOpen, toggleSideBar }) => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const itemId = searchParams.get("v");

    const {
        getShopById,
        loading,
        shop,
        getService,
        services,

        error,
    } = useGetBarberShop();

    useEffect(() => {
        getShopById(itemId);

        getService(itemId);
    }, []);

    return (
        <>
            {error?.message ? (
                <NotFound />
            ) : (
                <BarberWrapper>
                    <NavBar isOpen={isOpen} toggleSideBar={toggleSideBar} />
                    <BarberContainer>
                        <BarberContainerLeftWrapper>
                            <AlterNativeImages>
                                <AlterNativeImage>
                                    <img
                                        src="https://images.unsplash.com/photo-1682687982204-f1a77dcc3067?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                                        alt=""
                                    />
                                </AlterNativeImage>
                                <AlterNativeImage>
                                    <img
                                        src="https://images.unsplash.com/photo-1682687982204-f1a77dcc3067?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                                        alt=""
                                    />
                                </AlterNativeImage>
                                <AlterNativeImage>
                                    <img
                                        src="https://images.unsplash.com/photo-1682687982204-f1a77dcc3067?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                                        alt=""
                                    />
                                </AlterNativeImage>
                                <AlterNativeImage>
                                    <img
                                        src="https://images.unsplash.com/photo-1682687982204-f1a77dcc3067?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                                        alt=""
                                    />
                                </AlterNativeImage>
                            </AlterNativeImages>
                            <ShowCaseImage>
                                <img
                                    src="https://images.unsplash.com/photo-1682687982204-f1a77dcc3067?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80"
                                    alt=""
                                />
                            </ShowCaseImage>
                        </BarberContainerLeftWrapper>
                        <BarberContainerRightWrapper>
                            <BarberShopName style={{ fontSize: "16px", display: "block" }}>
                                {loading ? <Skeleton width={210} height={118} /> : shop?.title}
                            </BarberShopName>
                            <BarberShopAddress>360 stillwater Rd,Palm City</BarberShopAddress>
                            <CardFlex>
                                <Tags>
                                    <Tag>Hair{"·"}</Tag>
                                    <Tag>Facial{"·"}</Tag>
                                </Tags>
                                <Ratings>
                                    <StarIcon
                                        fontSize="14px"
                                        sx={{ color: colors.colorOrange }}
                                    />
                                    <span>4.7(2.7k)</span>
                                </Ratings>
                            </CardFlex>
                            <Boarder />
                            <AboutWrapper>
                                <AboutHeading>About</AboutHeading>
                                <About>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                                    quam laborum, saepe architecto reiciendis ullam sunt mollitia
                                    ducimus quos? Laudantium tenetur iure et. Impedit laudantium
                                    perferendis qui eveniet, reprehenderit itaque?
                                </About>
                            </AboutWrapper>
                            <OpeningHours>
                                <OpeningHour>
                                    <Day>Monday - Friday</Day>
                                    <Time>08.00am - 03.00pm</Time>
                                </OpeningHour>
                                <OpeningHour>
                                    <Day>Monday - Friday</Day>
                                    <Time>08.00am - 03.00pm</Time>
                                </OpeningHour>
                            </OpeningHours>
                        </BarberContainerRightWrapper>
                    </BarberContainer>
                    <ServiceWrapper>
                        <OurServicesWrapper>
                            <AboutHeading style={{ margin: "10px 0" }}>
                                Our Service
                            </AboutHeading>
                            <ServiceCategoryComponent />

                            <ServicesContainer>
                                {services?.map((service) => (
                                    <BarberShopService
                                        key={service._id}
                                        loading={loading}
                                        {...service}
                                    />
                                ))}
                            </ServicesContainer>
                        </OurServicesWrapper>
                    </ServiceWrapper>
                </BarberWrapper>
            )}{" "}
        </>
    );
};

export default BarberShop;
