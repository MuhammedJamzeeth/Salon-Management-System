import React, { useState, forwardRef, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, setHours, setMinutes } from "date-fns"; // Import setHours and setMinutes from date-fns
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange, DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import Card from "../../components/Cards/card";
import { colors } from "../../styles/colors";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import useAppointments from "../../hooks/appointment/useAppointments";

import {
  AppointmentContainer,
  AppointmentsListContainer,
  CreateAppointment,
  ListOfData,
} from "./Appointments.styles";
import { List } from "@mui/icons-material";

const Appointments = () => {
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const appointments = useSelector(
    (state) => state.appointments.current_appointment
  );

  const { getAllServices } = useAppointments();

  const excludeSundays = (date) => {
    // Return false if the date is Sunday
    return date.getDay() !== 0;
  };
  // Array to store excluded times
  const excludedTimes = [];

  const [openDate, setOpenDate] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const getEmployee = async () => {
    try {
      const response = await axios.get("http://localhost:8080/employee");

      console.log(response.data);

      // if (response?.statusText === "OK") {
      //   throw new Error("Something went wrong");
      // } else {
      //   // setLoading(false);
      //   dispatch({
      //     type: APPOINTMENT_ACTION_TYPES.SET_APPOINTMENT,
      //     payload: response.data,
      //   });
      // }
    } catch (error) {
      // setLoading(false);
      setError(
        error.code !== "ERR_NETWORK"
          ? error.response?.statusText
          : error.message
      );
    }
  };

  const dateRangeRef = useRef();
  useEffect(() => {
    getAllServices();

    const handleOutsideClick = (event) => {
      if (
        dateRangeRef.current &&
        !dateRangeRef.current.contains(event.target)
      ) {
        setOpenDate(false);
      }
    };

    // console.log(appointments);
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [dateRangeRef, setOpenDate, getAllServices]);

  const handleClick = () => {
    setOpenDate((prev) => !prev);
  };

  const handleClose = () => {
    setOpenDate((prev) => !prev);
  };

  // Loop to generate excluded times
  for (let i = 0; i < 9; i++) {
    excludedTimes.push(setHours(setMinutes(new Date(), 0), i));
    excludedTimes.push(setHours(setMinutes(new Date(), 30), i));
  }

  const InitiateState = {
    uname: "",
    email: "",
    eName: "",
    category: "",
    date: "",
  };
  const ErrorInitiateState = {
    uname: "",
    email: "",
    eName: "",
    category: "",
    date: "",
  };
  const [formInput, setFormInput] = useState(InitiateState);

  const handleInputChange = (event) => {
    setFormInput((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };
  const newErrorState = { ...ErrorInitiateState };
  const [error, setError] = useState(ErrorInitiateState);
  const formSubmit = async (event) => {
    event.preventDefault();
    setError(ErrorInitiateState);
    // Check if any field is empty
    let hasError = false;

    if (!formInput.uname.trim()) {
      newErrorState.uname = "Username can not be empty";
      hasError = true;
    }
    if (!formInput.eName.trim()) {
      newErrorState.eName = "Employee can not be empty";
      hasError = true;
    }
    if (!formInput.category.trim()) {
      newErrorState.category = "Category can not be empty";
      hasError = true;
    }

    // console.log(newErrorState);
    // If any field is empty, set the error state and exit the function
    if (hasError) {
      setError(newErrorState);
      return;
    }
    const user = localStorage.getItem("user");
    // console.log(user);
    const { access_token } = JSON.parse(user);
    console.log(access_token);
    const formattedDate = format(startDate, "MMMM d, yyyy");
    const formattedTime = format(startDate, "h:mm aa");
    try {
      const formData = new FormData();

      formData.append("customerName", formInput.uname);
      formData.append("empName", formInput.eName);
      formData.append("category", formInput.category);
      formData.append("dateAndTime", formInput.date);
      formData.append("customerEmail", formInput.email);
      formData.append("date", formattedDate);
      formData.append("time", formattedTime);

      setLoading(true);
      console.log(formInput);
      const response = await axios.post(
        "http://localhost:8080/appointment/save",
        formData,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.status === 200 || response.statusText === "OK") {
      }
      setLoading(false);
      setFormInput(InitiateState);
    } catch (error) {
      setError(error.response.data);
      setLoading(false);
    }
  };

  return (
    <AppointmentContainer>
      <AppointmentsListContainer>
        <div className="dateContainer">
          {!openDate ? (
            <span className="date" onClick={handleClick}>
              <span>{`${format(state[0].startDate, "MMM dd,yyyy")}`}</span>
            </span>
          ) : (
            <span className="close-button" onClick={handleClose}>
              <span className="text">Search</span>
              <span className="close-icon">
                <SearchIcon />
              </span>
            </span>
          )}

          {!openDate ? (
            <span className="date" onClick={handleClick}>
              <span>{`${format(state[0].endDate, "MMM dd,yyyy")}`}</span>
            </span>
          ) : (
            <span className="close-button" onClick={handleClose}>
              <span className="text">Close</span>
              <span className="close-icon">
                <CloseIcon />
              </span>
            </span>
          )}
        </div>
        <hr></hr>
        {openDate ? (
          <DateRangePicker
            editableDateInputs={true}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
        ) : (
          <ListOfData>
            {appointments.map((appointment) => (
              <Card
                backGround={colors.colorGray}
                img={
                  "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1153&q=80"
                }
                employee={appointment.empName}
              >
                <p style={{ fontSize: "12px", fontWeight: "600" }}>
                  {appointment.customerName}
                </p>
                <span style={{ fontSize: "11px", fontWeight: "500" }}>
                  {appointment.category}
                </span>
                <span style={{ fontSize: "11px", fontWeight: "500" }}>
                  {appointment.date}
                </span>
                <span style={{ fontSize: "11px", fontWeight: "500" }}>
                  {appointment.time}
                </span>
              </Card>
            ))}
            {/* <Card
              backGround={colors.colorGray}
              img={
                "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1153&q=80"
              }
            >
              <p style={{ fontSize: "12px", fontWeight: "600" }}>Ea Tipene</p>
              <span style={{ fontSize: "11px", fontWeight: "500" }}>
                Haircut and Spa
              </span>
              <span style={{ fontSize: "11px", fontWeight: "500" }}>
                10.30 - 11.00{" "}
                <span
                  style={{
                    color: "orange",
                  }}
                >
                  &#9733;
                </span>
              </span>
            </Card> */}
          </ListOfData>
        )}
      </AppointmentsListContainer>
      <CreateAppointment>
        <h2>Create Appointment</h2>
        <Form onSubmit={formSubmit}>
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Label>Customer name</Form.Label>
            <Form.Control
              className="custom-input"
              type="text"
              name="uname"
              placeholder="Enter name"
              value={formInput.uname}
              onChange={handleInputChange}
            />
            {error.uname && (
              <Form.Text
                style={{
                  color: "red",
                }}
              >
                {error.uname}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Label>Customer email (Optional)</Form.Label>
            <Form.Control
              className="custom-input"
              type="email"
              placeholder="Enter email"
              name="email"
              value={formInput.email}
              onChange={handleInputChange}
            />
          </Form.Group>

          <Form.Group className="mb-1" controlId="formBasicPassword">
            <Form.Label>Select employee</Form.Label>
            <Form.Select
              className="custom-select"
              aria-label="Default select example"
              name="eName"
              value={formInput.eName}
              onChange={handleInputChange}
            >
              <option value=""></option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            {error.eName && (
              <Form.Text
                style={{
                  color: "red",
                }}
              >
                {error.eName}
              </Form.Text>
            )}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Category</Form.Label>
            <Form.Select
              className="custom-select"
              aria-label="Default select example"
              name="category"
              value={formInput.category}
              onChange={handleInputChange}
            >
              <option></option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            {error.category && (
              <Form.Text
                style={{
                  color: "red",
                }}
              >
                {error.category}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date and Time </Form.Label>
            <div>
              <DatePicker
                className="custom-datePicker"
                showIcon
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                showTimeSelect
                filterDate={excludeSundays} // Apply the filter function
                placeholderText="We are closed on Sunday"
                calendarClassName="custom-calender"
                dateFormat="MMMM d, yyyy h:mm aa"
                excludeTimes={excludedTimes}
              />
            </div>
          </Form.Group>

          <Button className="custom-button" variant="primary" type="submit">
            Create
          </Button>
        </Form>
      </CreateAppointment>
    </AppointmentContainer>
  );
};

export default Appointments;
