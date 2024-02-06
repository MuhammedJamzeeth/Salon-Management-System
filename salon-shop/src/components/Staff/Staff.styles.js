import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../styles/colors";

export const StylistsContainer = styled.div`
  flex: 0.5;
  background: ${colors.colorWhite};
  padding: 10px;
  border-radius: 10px;
  width: 100%;
  margin: 10px 0;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  h3 {
    font-weight: 500;
    font-size: 15px;
    margin: 10px;
  }

  @media screen and (max-width: 1100px) {
    flex: 1;
  }
`;

export const StylistsCards = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
`;

export const ViewAll = styled(Link)`
  color: ${colors.colorBlack};
  padding: 10px;
  text-align: center;
  display: block;
  background: ${colors.colorGray};
  border-radius: 10px;
  margin: 10px 0;
  font-size: 15px;
  font-weight: 600;
`;
