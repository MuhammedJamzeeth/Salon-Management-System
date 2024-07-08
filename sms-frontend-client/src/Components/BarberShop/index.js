import StarIcon from "@mui/icons-material/Star";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetBarberShop } from "../../hooks/BarberShop";
import { colors } from "../../styles/colors";
import Card from "./BarbershopCard";
import { BarberShopContiner, SeeMoreShops } from "./barber.shop.styles";
import {
    BarberShopAddress,
    BarberShopName,
    CardFlex,
    Ratings,
    Tag,
    Tags,
} from "./barbershop.card.styles";
const BarberShops = () => {
    const { getShops, shops, loading } = useGetBarberShop();
    useEffect(() => {
        getShops();
    }, []);
    return (
        <BarberShopContiner>
      <span
          style={{ fontSize: "14px", fontWeight: "700", textAlign: "center" }}
      >
        Suggestions for you
      </span>
            {loading ? (
                <Card loading={loading} />
            ) : (
                <>
                    {shops.map(({ title, avatar, _id }) => (
                        <Card key={_id} img={avatar} _id={_id}>
                            <Link to={`/barbershop?v=${_id}`}>
                                <BarberShopName>{title}</BarberShopName>
                            </Link>

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
                        </Card>
                    ))}
                    {shops.length > 3 && (
                        <SeeMoreShops style={{ display: "block" }}>
                            Explore More
                        </SeeMoreShops>
                    )}
                </>
            )}
        </BarberShopContiner>
    );
};

export default BarberShops;
