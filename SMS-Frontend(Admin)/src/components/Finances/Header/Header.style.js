import styled from "styled-components";
import { colors } from "../../../styles/colors";

export const Container = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 10px 10px 10px 10px;

  div {
    padding: 0.3125rem 0.56rem;
    width: 200px;
    height: 100px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
    border-radius: 10px;
    background: ${colors.colorWhite};
  }
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;
