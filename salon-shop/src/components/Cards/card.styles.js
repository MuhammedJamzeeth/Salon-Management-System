import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  align-items:center;
  background: ${({ backGround }) => backGround};
  padding: 10px;
  border-radius: 10px;
  min-width: 200px;
  /* min-height: 50px; */
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
`;

export const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`;
