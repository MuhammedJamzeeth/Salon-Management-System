import styled from "styled-components";
import { colors } from "../../styles/colors";

export const AppoinmentsWrapper = styled.div`
  flex: 0.3;

  height: 100%;
  @media screen and (max-width: 1100px) {
    flex: 0.5;
  }
`;

export const AppoinmentsContainer = styled.div`
  background: ${colors.colorWhite};
  border-radius: 10px;
  padding: 0 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;

  h3 {
    font-weight: 500;
    font-size: 16px;
    /* margin-bottom: 10px; */
    padding: 10px 0;
  }
`;

export const AppoinmentsCards = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: calc(100vh - 200px);
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ArrowDownWrapper = styled.div`
  text-align: center;
  /* height: 30px; */
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5px 0;
`;

export const FinancialAppoinmentWrapper = styled.div`
  /* display: none;

  @media screen and (max-width: 1100px) {
    display: block;
  } */
`;
