import React, { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, set, setHours, setMinutes } from "date-fns"; // Import setHours and setMinutes from date-fns
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import Card from "../../components/Cards/card";
import { colors } from "../../styles/colors";
import axios from "axios";
import { useSelector } from "react-redux";
import useAppointments from "../../hooks/appointment/useAppointments";
import { toast } from "react-toastify";

import {
  AppointmentContainer,
  AppointmentsListContainer,
  CreateAppointment,
  ListOfData,
} from "./Appointments.styles";
import { tr } from "date-fns/locale";

const Appointments = () => {
  // const [loading, setLoading] = useState(false);
  // const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [startDate, setStartDate] = useState("");
  const [minTime, setMinTime] = useState(new Date());
  const appointments = useSelector(
    (state) => state.appointments.current_appointment
  );

  const {
    getAllAppointments,
    getEmployee,
    getAllServices,
    emp,
    services,
    setApprove,
  } = useAppointments();

  const excludeSundays = (date) => {
    // Return false if the date is Sunday
    return date.getDay() !== 0;
  };
  // Array to store excluded times
  const excludedTimes = [];

  const [openDate, setOpenDate] = useState(false);
  // const [isClose, setIsClose] = useState(false);

  const currentDate = new Date();

  const [state, setState] = useState([
    {
      startDate: new Date(
        currentDate.getFullYear() - 1,
        currentDate.getMonth(),
        currentDate.getDate()
      ),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  useEffect(() => {
    getAllAppointments();
    getEmployee();
    getAllServices();
    // setAppointmentDate(new Date(), -120);
  }, []);

  const dateRangeRef = useRef();
  useEffect(() => {
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
  }, [dateRangeRef, setOpenDate]);

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

  appointments.forEach((appointment) => {
    // Split the time string into hours, minutes, and period (AM/PM)
    const [time, period] = appointment.time.split(" ");
    const [hours, minutes] = time.split(":").map(Number);

    excludedTimes.push(setHours(setMinutes(new Date(), minutes), hours));
  });

  // console.log(excludedTimes);

  const InitiateState = {
    uname: "",
    email: "",
    pno: "",
    eName: "",
    category: "",
    date: "",
  };
  const ErrorInitiateState = {
    uname: "",
    email: "",
    pno: "",
    eName: "",
    category: "",
    date: "",
    startDate: "",
    isBooked: false,
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
  const [resError, setResError] = useState();
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
      newErrorState.category = "Service can not be empty";
      hasError = true;
    }
    if (!formInput.email.trim()) {
      newErrorState.email = "Email can not be empty";
      hasError = true;
    }
    if (!formInput.pno.trim()) {
      newErrorState.pno = "Phone no can not be empty";
      hasError = true;
    } else if (!(formInput.pno.length === 10)) {
      newErrorState.pno = "Phone number should contain 10 digits";
      hasError = true;
    } else if (!/^\d+$/.test(formInput.pno)) {
      newErrorState.pno = "Phone number should contain digits only";
      hasError = true;
    }
    if (!startDate) {
      newErrorState.startDate = "Date can not be empty";
      hasError = true;
    }
    if (resError) {
      newErrorState.isBooked =
        "Already booked! please choose Different date and time OR employee";
      setResError(null);
      hasError = true;
    }

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
      formData.append("employee", formInput.eName);
      formData.append("category", formInput.category);
      formData.append("dateAndTime", formInput.date);
      formData.append("customerEmail", formInput.email);
      formData.append("date", formattedDate);
      formData.append("time", formattedTime);
      formData.append("pno", formInput.pno);

      // setLoading(true);
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

      setResError(response);
      toast.success("Successfully saved", {
        position: "top-right",
      });
      if (response.status === 200 || response.statusText === "OK") {
      }
      // setLoading(false);
      setFormInput(InitiateState);
      getAllAppointments();
    } catch (error) {
      setResError(error.response.data);
      // setLoading(false);
    }

    console.log(resError);
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
            {appointments.length > 0 ? (
              appointments.map((appointment, index) =>
                // setAppointmentDate(new Date(appointment.date));
                state[0].startDate <= new Date(appointment.date) &&
                state[0].endDate >= new Date(appointment.date) ? (
                  <Card
                    key={index}
                    backGround={colors.colorGray}
                    setApprove={setApprove}
                    img={
                    ""
                    }
                    employee={appointment}
                  >
                    <p style={{ fontSize: "12px", fontWeight: "600" }}>
                      {appointment.customerName}
                    </p>
                    <span
                      style={{ fontSize: "11px", fontWeight: "500" }}
                    >{`Order ID: ${appointment.id}`}</span>
                    <span style={{ fontSize: "11px", fontWeight: "500" }}>
                      {appointment.category}
                    </span>
                    <span style={{ fontSize: "11px", fontWeight: "500" }}>
                      {appointment.pno}
                    </span>
                    <span style={{ fontSize: "11px", fontWeight: "500" }}>
                      {appointment.date}
                      {", "}
                      {appointment.time}
                    </span>
                  </Card>
                ) : (
                  <></>
                )
              )
            ) : (
              <div> no data found </div>
            )}
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
            <Form.Label>Customer email</Form.Label>
            <Form.Control
              className="custom-input"
              type="email"
              placeholder="Enter email"
              name="email"
              value={formInput.email}
              onChange={handleInputChange}
            />
            {error.email && (
              <Form.Text
                style={{
                  color: "red",
                }}
              >
                {error.email}
              </Form.Text>
            )}
          </Form.Group>
          <Form.Group className="mb-1" controlId="formBasicEmail">
            <Form.Label>Customer Phone No</Form.Label>
            <Form.Control
              className="custom-input"
              type="text"
              placeholder="Enter phone no"
              name="pno"
              value={formInput.pno}
              onChange={handleInputChange}
            />
            {error.pno ? (
              <Form.Text
                style={{
                  color: "red",
                }}
              >
                {error.pno}
              </Form.Text>
            ) : (
              <Form.Text>Ex: 07XXXXXXXX</Form.Text>
            )}
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
              {emp.length > 0 &&
                emp.map((emp, index) => (
                  <option key={index} value={emp.empId}>
                    {emp.empFirstName} {emp.empLastName}
                  </option>
                ))}
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
            <Form.Label>Services</Form.Label>
            <Form.Select
              className="custom-select"
              aria-label="Default select example"
              name="category"
              value={formInput.category}
              onChange={handleInputChange}
            >
              <option></option>
              {emp.length > 0 &&
                services.map((service, index) => (
                  <option key={index} value={service.serviceName}>
                    {service.serviceName}
                  </option>
                ))}
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
                onChange={(date) => {
                  // When the date changes, update the minTime
                  const selectedDate = date || new Date(); // If date is null, default to current date
                  const currentDate = new Date();
                  const isSameDay =
                    selectedDate.getDate() === currentDate.getDate();

                  // Set minTime based on whether the selected date is the current date or not
                  const minTime = isSameDay
                    ? new Date()
                    : setHours(setMinutes(new Date(), 0), 9);

                  // Update the state with the new selected date and minTime
                  setStartDate(selectedDate);
                  setMinTime(minTime);
                }}
                showTimeSelect
                filterDate={excludeSundays} // Apply the filter function
                placeholderText="We are closed on Sunday"
                calendarClassName="custom-calender"
                dateFormat="MMMM d, yyyy h:mm aa"
                // excludeDates={excludedTimes}
                minDate={new Date()}
                minTime={minTime}
                maxTime={new Date().setHours(23, 0, 0, 0)}
              />
            </div>
            {error.startDate && (
              <Form.Text
                style={{
                  color: "red",
                }}
              >
                {error.startDate}
              </Form.Text>
            )}
            {error.isBooked && (
              <Form.Text
                style={{
                  color: "red",
                }}
              >
                {error.isBooked}
              </Form.Text>
            )}
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
