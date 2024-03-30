import Lottie from "lottie-react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import animationData from "../../assets/empty.json";
import { useStaff } from "../../hooks/Staff/staff";
import { colors } from "../../styles/colors";
import Card from "../Cards/card";
import { StylistsCards, StylistsContainer, ViewAll } from "./Staff.styles";
const Stylists = () => {
  const staff = useSelector((state) => state?.staff?.current_staff);
  const { getAllStaff, error, loading } = useStaff();

  useEffect(() => {
    getAllStaff();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
      <StylistsContainer>
        {error && <h1>{error.message}</h1>}
        <h3>Stylists</h3>

        <StylistsCards>
          {loading ? (
            [...Array(3)].map((_, id) => <Card loading={loading} key={id} />)
          ) : (
            <>
              {staff.length > 0 ? (
                staff
                  .slice(0, 3)
                  ?.map(
                    ({
                      name,
                      working_time,
                      _id,
                      feature_images,
                      service_special,
                    }) => (
                      <Card
                        key={_id}
                        backGround={colors.colorGray}
                        img={feature_images[0]?.src}
                      >
                        <p style={{ fontSize: "12px", fontWeight: "700" }}>
                          {name}
                        </p>

                        {service_special.length > 0 && (
                          <div
                            style={{
                              margin: "4px 0",
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            {service_special?.map((item) => (
                              <span
                                style={{
                                  fontSize: "11px",
                                  fontWeight: "500",
                                  background: colors.colorBlack,
                                  width: "fit-content",
                                  padding: "4px 8px",
                                  borderRadius: 15,
                                  marginRight: 5,
                                  height: "100%",
                                  color: colors.colorWhite,
                                }}
                              >
                                {item}
                              </span>
                            ))}
                          </div>
                        )}

                        {working_time && (
                          <span style={{ fontSize: "11px", fontWeight: "500" }}>
                            {working_time}
                          </span>
                        )}
                      </Card>
                    )
                  )
              ) : (
                <NotFound>
                  <Lottie
                    style={{ width: "100%", height: "100%" }}
                    className="lottie"
                    animationData={animationData}
                  />
                </NotFound>
              )}
            </>
          )}
        </StylistsCards>
        {staff.length > 0 && !loading && (
          <ViewAll to="/staffs">View All</ViewAll>
        )}
      </StylistsContainer>
    </React.Fragment>
  );
};

export default Stylists;

export const NotFound = styled.div`
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
