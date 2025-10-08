import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../styles/colors";
export const BarberShopContiner = styled.div`
  flex: 0.6;
  /* text-align: center; */
`;

export const SeeMoreShops = styled(Link)`
  font-size: 14px;
  letter-spacing: 1.5px;
  color: ${colors.colorShadeBlue};
  font-weight: 500;
`;
