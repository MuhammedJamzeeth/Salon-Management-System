import styled from "styled-components";

export const ModelWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #344154;
  z-index: 99;
  opacity: 0.7;
  transition: transform 250ms ease-in-out;
  transform: translate(${({ isOpen }) => (!isOpen ? "-100%" : "0%")});
`;
