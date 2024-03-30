import styled from "styled-components";

export const StatisticsContainer = styled.div`
  flex: 0.7;

  @media screen and (max-width: 1100px) {
    flex: 0.5;
  }
`;

export const NumericalStatistics = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 10px;
  margin-bottom: 10px;
`;
