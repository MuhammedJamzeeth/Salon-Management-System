import React from "react";
import PageNotFound from "../../assets/notfound.json";
import Empty from "./Empty";
import { LinkToHome } from "./emptycart.styles";

const NotFound = () => {
    return <Empty animationData={PageNotFound} >
        <LinkToHome to="/">Back To Home</LinkToHome>
    </Empty>;
};

export default NotFound;
