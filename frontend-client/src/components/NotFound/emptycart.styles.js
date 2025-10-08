import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../styles/colors";
export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    max-width: 1000px;
    margin: auto;
    height: calc(100vh - 260px);
    flex-direction: column;
`;

export const AnimatedIcon = styled.div`
  width: 300px;
  /* height: 300px; */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  .lottie {
    width: 100%;
    height: 100%;
  }
  span {
    width: 100%;
    margin: 10px;
    font-size: 15px;
    font-weight: 500;
  }
  @media screen and (max-width: 500px) {
    width: 250px;
    span {
      font-size: 13px;
    }
  }
`;
export const EmptyAnimationContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-top: 2px solid ${colors.colorGray};

  padding: 20px;
`;

export const LinkToHome = styled(Link)`
  &:hover {
    text-decoration: underline;
  }
  margin: 10px;
  color: ${colors.colorPrimary};
`;

export const TrustSignalsGroup = styled.div`
  border-bottom: 2px solid ${colors.colorGray};
  border-top: 2px solid ${colors.colorGray};
  display: grid;
  gap: 10px;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  .TrustSignalsGroupItems img {
    width: 80px;
    height: 80px;
    margin-right: 20px;
  }

  .TrustSignalsGroupItems .details-wrapper .title {
    font-size: 18px;
    font-weight: 600;
  }

  .TrustSignalsGroupItems .details-wrapper .description {
    font-size: 16px;
  }
  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;

    .TrustSignalsGroupItems img {
      width: 60px;
      height: 60px;
    }

    .TrustSignalsGroupItems .details-wrapper .title {
      font-size: 12px;
    }

    .TrustSignalsGroupItems .details-wrapper .description {
      font-size: 10px;
    }
  }
`;
