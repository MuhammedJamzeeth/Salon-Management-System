import styled from "styled-components";
import { colors } from "../../styles/colors";
export const CardContainer = styled.div`
  display: flex;
  align-items: center;
  background: ${({ backGround }) => backGround};
  padding: 10px;
  border-radius: 10px;
  min-width: 200px;
  /* min-height: 50px; */
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  margin: 10px 0;
  cursor: pointer;
`;

export const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`;

export const Tags = styled.div`
  display: flex;
  align-items: center;
  margin: 2px 0;
`;

export const Tag = styled.span`
  color: ${colors.colorOrange};
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 1px;
`;

export const BarberShopName = styled.span`
  font-size: 15px;
  font-weight: 700;
  margin: 2px 0;
  color: ${colors.colorBlack};
`;

export const BarberShopAddress = styled.span`
  font-size: 12px;
  color: ${colors.colorGrayDark};
  font-weight: 500;
  margin: 2px 0;
`;

export const Ratings = styled.div`
  display: flex;
  align-items: center;
  margin: 2px 0;
  span {
    font-size: 12px;
    color: ${colors.colorBlack};
    font-weight: 500;
  }
`;

export const CardFlex = styled.div`
  display: flex;
  align-items: center;
`;
