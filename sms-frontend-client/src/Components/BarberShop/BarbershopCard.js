import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, Box, IconButton, Skeleton, Typography } from "@mui/material";
import React from "react";

import { CardContainer, CardDetails } from "./barbershop.card.styles";

const Card = ({ img, children, backGround, loading, _id, to }) => {
    return (
        <CardContainer backGround={backGround}>
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
                <IconButton sx={{ marginLeft: "auto" }}>
                    <MoreVertIcon />
                </IconButton>
            )}
        </CardContainer>
    );
};

export default Card;
