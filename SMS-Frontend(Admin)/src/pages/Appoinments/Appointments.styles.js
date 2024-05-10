import styled from "styled-components";
import { colors } from "../../styles/colors";

export const AppointmentContainer = styled.div`
  margin: 0;
  display: flex;
  padding: 10px;
  gap: 10px;
  width: 100%;
  height: 100%;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
`;
export const AppointmentsListContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: ${colors.colorWhite};
  border-radius: 10px;
  width: 100%;
  padding: 5px 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;

  .dateContainer {
    display: flex;
    justify-content: flex-end;
  }

  .date {
    border-radius: 0.25rem;
    padding-top: 2px;
    height: 30px;
    width: 200px;
    background-color: #212529e6; /* Your custom background color */
    border-color: #212529e6;
    margin-left: 10px;
    color: #ffffff;
    text-align: center;
    cursor: pointer;
  }
  .date:hover {
    background-color: #212529; /* Your custom background color on hover */
    border-color: #212529;
  }
  .close-button {
    position: relative;
    display: inline-block;
    border-radius: 0.25rem;
    margin-left: 10px;
    padding-top: 2px;
    height: 30px;
    width: 200px;
    background-color: #212529e6; /* Your custom background color */
    border-color: #212529e6;
    color: white;
    border: none;
    cursor: pointer;
  }
  .close-button .text {
    display: inline-block;
    margin-left: 28%; /* Adjust as needed */
  }
  .close-button:hover {
    background-color: #212529; /* Your custom background color on hover */
    border-color: #212529;
  }
  .close-button .close-icon {
    position: absolute;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
  }
`;
export const CreateAppointment = styled.div`
  margin: 0;
  background: ${colors.colorWhite};
  border-radius: 10px;
  width: 60%;
  // height: 100%;
  // margin-bottom: 12px;
  padding: 0 10px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;
  font-size: 14px;
  h2 {
    font-size: 18px;
    font-weight: 500;
  }
  .custom-input {
    height: 35px; /* Adjust the height as needed */
  }
  .custom-datePicker {
    height: 35px;
  }
  .custom-datePicker:focus {
    border-color: red;
    border: none;
  }
  .custom-calender {
  }
  .custom-select {
    font-size: 14px; /* Adjust the font size as needed */
  }
  .custom-button {
    background-color: #212529e6; /* Your custom background color */
    border-color: #212529e6; /* Your custom border color */
    color: #ffffff; /* Your custom text color */
  }

  .custom-button:hover {
    background-color: #212529; /* Your custom background color on hover */
    border-color: #212529; /* Your custom border color on hover */
    color: #ffffff; /* Your custom text color on hover */
  }
`;
export const AppointmentsCards = styled.div`
  gap: 10px;
  display: flex;
  flex-direction: column;
  overflow: scroll;
  height: calc(100vh - 200px);
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ArrowDownWrapper = styled.div`
  text-align: center;
  /* height: 30px; */
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 5px 0;
`;

export const FinancialAppointmentWrapper = styled.div`
  /* display: none;

  @media screen and (max-width: 1100px) {
    display: block;
  } */
`;
export const ListOfData = styled.div`
  overflow-y: scroll;
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
