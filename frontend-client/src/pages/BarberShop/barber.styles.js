import styled from "styled-components";
import { BarberShopName } from "../../components/BarberShop/barbershop.card.styles";
import { colors } from "../../styles/colors";

export const BarberWrapper = styled.div``;
export const BarberContainer = styled.div`
  margin: 20px;
  display: grid;
  grid-template-columns: 4fr 6fr;
  gap: 10px;
  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr !important;
  }
`;

export const BarberContainerLeftWrapper = styled.div`
  width: 100% !important;
  display: flex;
  gap: 10px;
`;

export const ShowCaseImage = styled.div`
  width: 70%;
  /* flex: 0.6; */
  height: 220px;
  margin-right: 10px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 800px) {
    width: 60% !important;
  }
`;

export const AlterNativeImage = styled.div`
  height: 70px;

  /* width: 70px !important; */
  margin-bottom: 5px;
  width: 100%;
  /* margin: 10px; */

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const AlterNativeImages = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  overflow-y: scroll;
  height: 220px;
  width: 30% !important;
  /* flex: 0.4; */

  @media screen and (max-width: 800px) {
    width: 40% !important;
  }
`;

export const BarberContainerRightWrapper = styled.div`
  /* width: 100% !important; */
`;

export const AboutWrapper = styled.div``;

export const Boarder = styled.div`
  border: 0.5px solid ${colors.boarderColor};
  margin: 10px 0;
`;
export const AboutHeading = styled(BarberShopName)`
  font-size: 12px;
`;

export const About = styled.p`
  font-size: 12px;
  color: ${colors.colorBlack};
  margin: 10px 0;
`;

export const OpeningHours = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: space-between; */

  @media screen and (max-width: 800px) {
    justify-content: space-between;
  }
`;

export const OpeningHour = styled.div`
  padding: 10px;
  border: 2px solid ${colors.colorOrange};
  margin: 10px;
  border-radius: 5px;
`;

export const Day = styled.span`
  display: block;
  color: ${colors.colorGrayDark};
  font-size: 12px;
  letter-spacing: 1px;
`;
export const Time = styled(Day)`
  color: ${colors.colorBlack} !important;
`;

export const ServiceWrapper = styled.div`
  margin: 20px;
`;

export const OurServicesWrapper = styled.div`
  width: 100%;
`;

export const ServicesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 10px;
`;

export const ServiceCategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: scroll;
  margin: 10px 0;
  display: flex;
  align-items: center;

  /* ::-webkit-scrollbar {
    display: none;
  } */
  /* 
  @media screen and (max-width: 800px) {
    width: 100% !important;
  } */

  /* @media screen and (max-width: 500px) {
    max-width: 350px;
  } */
`;

export const ServiceCategory = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

export const FloatingButton = styled.div`
  background: ${colors.colorOrange};
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-left: 10px;
`;

export const FloatingButtonAdd = styled.div`
  background: ${colors.colorBlueGreen};
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  margin-left: 10px;
`;
