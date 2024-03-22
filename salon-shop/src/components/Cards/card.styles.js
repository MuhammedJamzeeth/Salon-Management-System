import styled from "styled-components";

export const CardContainerWrapper = styled.div`
  display: flex;
  width: 98%;
  flex-direction: column;
  margin-bottom: 6px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 0px 01px;
  background: ${({ backGround }) => backGround};
  transition: 1s ease;

  border-radius: 10px;
`;

export const CardContainer = styled.div`
  display: flex;
  align-items: flex-start;
  align-items: center;
  height: 100px;
  padding: 10px;
  // border-radius: 10px;

  /* min-height: 50px; */
  // box-shadow: rgba(0, 0, 0, 0.5) 0px 0px 0px 1px;
`;

export const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 10px;
`;

export const CardDetailsExpand = styled.div`
  display: flex;
  height: 100px;
  transition: 0.5s;
  justify-content: space-between;
  margin-right: 4px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
  align-items: flex-end; /* Align items to the bottom of the container */
  padding: 0 15px;
  padding-bottom: 22px;
`;

export const Button = styled.div`
  background: #212529e6;
  border-radius: 0.25rem;
  padding: 4px 7px;
  color: white;
  cursor: pointer;
  font-size: 14px;
`;
