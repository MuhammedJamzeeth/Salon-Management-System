import styled from "styled-components";
import { colors } from "../../styles/colors";


export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  background: #101727;
  height: 100vh;
  color: ${colors.colorWhite};
  width: 300px;
  /* overflow-y: scroll; */
  transition: all 150ms ease-in;
  padding: 0 5px 0 10px;
  /* z-index: 1; */

  @media screen and (max-width: 1000px) {
    width: 80px;
  }

  @media screen and (max-width: 600px) {
    width: 300px;
    z-index: 100;
    transform: translateX(${({ isOpen }) => (!isOpen ? "-100%" : "0%")});
  }
  
`;

export const SideBarItemWrapper = styled.div`
  overflow-y: scroll;
  margin-top: 60px;
  height: calc(100% - 125px);
  margin-bottom: 60px;

  &::-webkit-scrollbar {
    width: 10px; /* Width of the scrollbar */
  }
  
  /* Track */
  &::-webkit-scrollbar-track {
    background: #f1f1f1; /* Color of the track */
    border-radius: 10px;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: #888; /* Color of the scrollbar handle */
    border-radius: 10px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #6810c0; /* Color of the scrollbar handle on hover */
  }
  
`;
export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  background: #101727;
  height: 60px;
  transition: all 150ms ease-in;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  width: 100%;
  padding: 0 15px;
  /* box-shadow: -1px -2px 10px rgb(0, 0, 0); */
  h3 {
    margin: 10px;
    font-size: 16px;
    /* flex: 1; */
    text-transform: uppercase;
    letter-spacing: 4px;
    /* font-family: "Sigmar", sans-serif; */
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
export const SidebarBottomWrapper = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  border-top: 1px solid #fff;
  bottom: 0;
  background: #101727;
  align-items: center;
  left: 0;
  right: 0;
  /* box-shadow: -1px -2px 10px rgb(0, 0, 0); */
  justify-content: space-between;
  padding: 0 15px;
  height: 60px;

  @media screen and (max-width: 600px) {
    display: flex;
  }
`;
export const ProfileWrapper = styled.div`
  @media screen and (max-width: 1000px) {
    display: none;
  }

  @media screen and (max-width: 600px) {
    display: flex;
  }
`;

export const LogOutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1000px) {
    width: 100%;
  }
  /* justify-content: center; */
  /* width: 100%; */
  /* @media screen and (max-width: 600px) {
    width: 100%;
  } */
`;
