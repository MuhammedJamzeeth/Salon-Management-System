import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../styles/colors";

export const SideBarItem = styled(Link)`
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  margin: 5px 0;
  transition: all 150ms ease-in-out;
  color: ${colors.colorWhite};
  ${({ active }) => active && "background:#344154"};
  h3 {
    font-size: 16px;
    font-weight: 400;
    /* margin-left: 10px; */
    font-size: 15px;
    letter-spacing: 1px;
  }
  &:hover {
    background: #344154;
  }
  @media screen and (max-width: 1000px) {
    justify-content: center;
    h3 {
      display: none;
    }
  }

  @media screen and (max-width: 600px) {
    justify-content: flex-start;
    h3 {
      display: block;
    }
  }
`;
