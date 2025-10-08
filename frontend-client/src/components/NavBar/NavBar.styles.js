import styled from "styled-components";

export const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #fff;
  padding: 0px;
  position: sticky;
  top: 0px;
  z-index: 1000;
  /* border-radius: 15px; */
  height: 55px;

  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
`;

export const NavRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  background-color: #222322;
  color: #fff;
  height: ${({ type }) => (type === "profile" ? "50px" : "55px")};
  width: ${({ type }) => (type === "profile" ? "100px" : "150px")};

  h1 {
    font-size: 20px;
    font-weight: 500;
  }
`;

export const NavLeft = styled.div`
  display: flex;
  background-color: #222322;
  justify-content: flex-start;
  width: 100%;
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
`;

export const Image = styled.div`
  height: ${({ type }) => (type === "profile" ? "50px" : "55px")};
  width: ${({ type }) => (type === "profile" ? "100px" : "150px")};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${({ type }) => (type === "profile" ? "50%" : "0px")};
  }
`;

export const ProfileWrapper = styled.div`
  margin: 0 10px;

  // display: none;

  @media screen and (max-width: 1000px) {
    display: block;
  }
  @media screen and (max-width: 600px) {
    display: none;
  }
`;
export const MenuWrapper = styled.div`
  display: none;

  @media screen and (max-width: 600px) {
    display: block;
  }
`;