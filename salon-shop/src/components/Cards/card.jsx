import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, Box, IconButton, Skeleton, Typography } from "@mui/material";

import React, { useEffect, useState } from "react";
import {
  CardContainerWrapper,
  CardContainer,
  CardDetails,
  CardDetailsExpand,
  ButtonContainer,
  Button,
} from "./card.styles";
import { set } from "date-fns";

const Card = ({ id, img, children, backGround, loading, employee }) => {
  const [isOpen, setIsOpen] = useState(false);

  const appointmentDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CardContainerWrapper backGround={backGround}>
      <CardContainer>
        <Box>
          {loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
              style={{ marginRight: 5 }}
            />
          ) : (
            <Avatar src={img} />
          )}
        </Box>
        {loading ? (
          <Box sx={{ width: "100%" }}>
            <Skeleton width="100%">
              <Typography fontSize={12}>.</Typography>
            </Skeleton>
            <Box display="flex" alignItems="center">
              {[...Array(3)].map(() => (
                <Skeleton
                  style={{ marginRight: 5, borderRadius: 15 }}
                  variant="rounded"
                  width={70}
                />
              ))}
            </Box>

            <Skeleton width="100%">
              <Typography fontSize={12}>.</Typography>
            </Skeleton>
          </Box>
        ) : (
          <CardDetails>{children}</CardDetails>
        )}
        {!loading && (
          <IconButton sx={{ marginLeft: "auto" }} onClick={appointmentDetails}>
            <MoreVertIcon />
          </IconButton>
        )}
      </CardContainer>
      {isOpen && (
        <CardDetailsExpand opacity={isOpen}>
          <CardContainer>
            <Box>
              {loading ? (
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={40}
                  height={40}
                  style={{ marginRight: 5 }}
                />
              ) : (
                <Avatar />
              )}
            </Box>
            {loading ? (
              <Box sx={{ width: "100%" }}>
                <Skeleton width="100%">
                  <Typography fontSize={12}>.</Typography>
                </Skeleton>
                <Box display="flex" alignItems="center">
                  {[...Array(3)].map(() => (
                    <Skeleton
                      style={{ marginRight: 5, borderRadius: 15 }}
                      variant="rounded"
                      width={70}
                    />
                  ))}
                </Box>

                <Skeleton width="100%">
                  <Typography fontSize={12}>.</Typography>
                </Skeleton>
              </Box>
            ) : (
              <CardDetails>{employee}</CardDetails>
            )}
          </CardContainer>
          <ButtonContainer>
            <Button>Approve</Button>
            <Button
              style={{
                background: "red",
              }}
            >
              Decline
            </Button>
          </ButtonContainer>
        </CardDetailsExpand>
      )}
    </CardContainerWrapper>
  );
};

export default Card;
