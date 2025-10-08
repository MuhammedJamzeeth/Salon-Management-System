import Lottie from "lottie-react";
import React from "react";

import {
    AnimatedIcon,
    Container,
    EmptyAnimationContainer,
} from "./emptycart.styles";
const Empty = ({ message, animationData,children }) => {
    return (
        <Container>
            <EmptyAnimationContainer>
                <AnimatedIcon>
                    <Lottie className="lottie" animationData={animationData} />
                    <span>{message}</span>
                    {children}
                </AnimatedIcon>
            </EmptyAnimationContainer>
        </Container>
    );
};

export default Empty;
