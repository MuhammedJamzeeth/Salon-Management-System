import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import StarIcon from "@mui/icons-material/Star";
import React, { Children, useEffect, useState } from "react";

import Card from "../../components/BarberShop/BarbershopCard";
import {
    CardFlex,
    Ratings,
    BarberShopAddress as ServiceDescription,
    BarberShopName as ServiceName,
    Tag,
    Tags,
} from "../../components/BarberShop/barbershop.card.styles";
import { CustomChip } from "../../components/SalonPopular/Popular";

import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import { addToCart } from "../../actions/cart.action";
import { currentCart } from "../../selector/cart.selector";
import { colors } from "../../styles/colors";
import {
    FloatingButton,
    ServiceCategory,
    ServiceCategoryWrapper,
} from "../BarberShop/barber.styles";

export const BarberShopService = ({
                                      loading,

                                      description,
                                      serviceTitle,
                                      serviceType,
                                      _id,
                                      serviceImages,
                                      specialists,
                                  }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(currentCart);

    const isItemInCart = cartItems?.some((item) => item.id === _id);
    const handleAddToCart = () => {
        const product = {
            id: _id,
            description,
            serviceTitle,
            serviceType,
            serviceImages,
            specialists,
        };
        dispatch(addToCart(product));
    };
    return (
        <Card
            img={serviceImages.length > 0 && serviceImages[0].src}
            loading={loading}
        >
            <Link to={`/service?v=${_id}`}>
                <ServiceName>{serviceTitle?.toUpperCase().trim()}</ServiceName>
            </Link>

            <ServiceDescription>
                {description?.length > 50
                    ? `${description.slice(0, 50)}...`
                    : description}
            </ServiceDescription>
            <CardFlex>
                <Tags>
                    <Tag>{serviceType}</Tag>
                </Tags>
                <Ratings>
                    <StarIcon fontSize="14px" sx={{ color: colors.colorOrange }} />
                    <span>4.7(2.7k)</span>
                </Ratings>
                <FloatingButton onClick={handleAddToCart}>
                    {isItemInCart ? (
                        <RemoveIcon fontSize="16px" sx={{ color: colors.colorWhite }} />
                    ) : (
                        <AddIcon fontSize="16px" sx={{ color: colors.colorWhite }} />
                    )}
                </FloatingButton>
            </CardFlex>
        </Card>
    );
};

export const ServiceCategoryComponent = () => {
    const usertoken = JSON.parse(localStorage.getItem("user"));
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const itemId = searchParams.get("v");
    const [tags, setTags] = useState([]);
    const [error, setError] = useState({});
    const [loading, setLoading] = useState(false);

    const uniqueTags = async (_id) => {
        if (!_id) {
            setError({ message: "content not availble" });
            return;
        }
        try {
            const response = await axios.get(
                `http://localhost:8080/api/v1/user/services/${_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${usertoken?.token}`,
                    },
                }
            );

            if (response.statusText !== "OK") {
                throw new Error("some thing went wrong...");
            }
            setLoading(false);
            const services = response?.data;
            const uniqueServiceTypes = new Set();
            services?.forEach((service) => {
                uniqueServiceTypes?.add(service?.serviceType);
            });
            const uniqueServiceTypesArray = Array.from(uniqueServiceTypes);

            setTags(uniqueServiceTypesArray);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data);
            } else {
                setError(error.message);
            }
        }
    };

    useEffect(() => {
        uniqueTags(itemId);
    }, []);

    return (
        <ServiceCategoryWrapper style={{ width: "100%" }}>
            <ServiceCategory>
                {tags?.map((tag, id) => (
                    <CustomChip key={id} label={tag} style={{ marginRight: "5px" }} />
                ))}
            </ServiceCategory>
        </ServiceCategoryWrapper>
    );
};
