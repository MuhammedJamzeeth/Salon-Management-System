import styled from "styled-components";
import { colors } from "../../styles/colors";
export const Container = styled.div`
  display: flex;
  position: relative;
  height: 100vh;
  background: ${colors.colorGray};
`;

export const Body = styled.div`
  position: fixed;
  width: calc(100% - 300px);
  left: 300px;
  top: 0;
  overflow-y: scroll;
  height: 100vh;
  transition: all 150ms ease-in;

  @media screen and (max-width: 1000px) {
    left: 80px;
    width: calc(100% - 80px);
  }

  @media screen and (max-width: 600px) {
    width: 100%;
    left: 0;
  }
`;
