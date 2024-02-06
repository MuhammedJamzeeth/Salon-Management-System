import React, { useEffect } from "react";

import styled from "styled-components";

import { Box, Skeleton } from "@mui/material";

import { useSelector } from "react-redux";
import EmptyCartAnimation from "../../assets/empty.json";
import { useStaff } from "../../hooks/Staff/staff";
import Empty from "../NotFound/Empty";
import { LinkToHome } from "../NotFound/emptycart.styles";
import StaffCard from "./StaffCard";

const StaffItems = () => {
  const staff = useSelector((state) => state?.staff?.current_staff);
  const { loading, error, getAllStaff } = useStaff();

  useEffect(() => {
    getAllStaff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      {loading ? (
        <StaffCardContainer>
          {Array.from(new Array(6)).map((_, index) => (
            <Box key={index} sx={{ width: "100%" }}>
              <Skeleton variant="rectangular" width={"100%"} height={150} />
              <Skeleton height={40} />
              <Skeleton height={40} />
            </Box>
          ))}
        </StaffCardContainer>
      ) : (
        <React.Fragment>
          {staff?.length > 0 ? (
            <StaffCardContainer>
              {staff?.map((item) => (
                <StaffCard {...item} key={item._id} />
              ))}
            </StaffCardContainer>
          ) : (
            <Empty
              message={`${error ? error : "No Staffs Found"}`}
              animationData={EmptyCartAnimation}
            >
              <LinkToHome to="/">Back To Home</LinkToHome>
            </Empty>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default StaffItems;

export const StaffCardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  margin: 40px 10px;
  gap: 10px;

  @media screen and (max-width: 600px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
`;
