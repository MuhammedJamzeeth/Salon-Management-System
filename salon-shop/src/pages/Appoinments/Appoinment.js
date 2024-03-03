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

import {
  AppointmentContainer,
  AppointmentsListContainer,
  CreateAppointment,
} from "./Appointments.styles";

const Appointments = () => {
  const [startDate, setStartDate] = useState(new Date());
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

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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
              <span className="text">{`${format(
                state[0].startDate,
                "MMM dd,yyyy"
              )}`}</span>
              <span className="close-icon">
                <CloseIcon />
              </span>
            </span>
          )}

          <span className="date">jjjjjjjjjj</span>
        </div>
        <hr></hr>
        {openDate && (
          <DateRangePicker
            editableDateInputs={true}
            onChange={(item) => setState([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={state}
          />
        )}
      </AppointmentsListContainer>
      <CreateAppointment>
        <h2>Create Appointment</h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Customer email</Form.Label>
            <Form.Control
              className="custom-input"
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Select employee</Form.Label>
            <Form.Select
              className="custom-select"
              aria-label="Default select example"
            >
              <option></option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Category</Form.Label>
            <Form.Select
              className="custom-select"
              aria-label="Default select example"
            >
              <option></option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
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
