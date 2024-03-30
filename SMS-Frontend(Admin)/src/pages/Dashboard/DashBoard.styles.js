import styled from "styled-components";

export const DashBoardContainer = styled.div`
  display: flex;
  padding: 10px;
  gap: 10px;

  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;
