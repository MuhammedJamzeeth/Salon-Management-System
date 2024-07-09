import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Avatar, Box, IconButton, Skeleton, Typography } from "@mui/material";
import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import react-confirm-alert module
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { APPOINTMENT_ACTION_TYPES } from "../../constants/appointment.type";
import { toast } from "react-toastify";

import {
  CardContainerWrapper,
  CardContainer,
  CardDetails,
  CardDetailsExpand,
  ButtonContainer,
  Button,
} from "./card.styles";

const Card = ({
  id,
  img,
  children,
  backGround,
  loading,
  employee,
  setApprove,
  // removeAppointment,
  // errorDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const user = localStorage.getItem("user");
  const { access_token } = JSON.parse(user);
  const dispatch = useDispatch();

  const checkStatus = (date, time, isApproved) => {
    const dateAndTime = `${date} ${time}`;
    const dateTimeObj = new Date(dateAndTime);

    const currentDate = new Date();

    if (
      currentDate.getFullYear() === dateTimeObj.getFullYear() &&
      currentDate.getMonth() === dateTimeObj.getMonth() &&
      currentDate.getDate() === dateTimeObj.getDate() &&
      currentDate.getHours() === dateTimeObj.getHours() &&
      currentDate.getMinutes() >= dateTimeObj.getMinutes() + 30 &&
      isApproved
    ) {
      return "On Going";
    } else if (currentDate < dateTimeObj && isApproved) {
      return "Pending";
    } else if (currentDate > dateTimeObj && isApproved) {
      return "Completed";
    } else if (currentDate < dateTimeObj && !isApproved) {
      return "Need to approved";
    } else {
      return "Expired";
    }
  };

  const removeAppointment = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:8080/appointment/delete/${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data);
      if (response?.statusText === "OK") {
        throw new Error("Something went wrong");
      } else {
        dispatch({
          type: APPOINTMENT_ACTION_TYPES.DELETE_APPOINTMENT,
          payload: response.data,
        });
        toast.error("Successfully deleted", {
          position: "top-right",
        });
      }
    } catch (error) {}
  };
  const showConfirmationAlert = (title, message, onConfirm) => {
    confirmAlert({
      title: title || "Confirmation",
      message: message || "Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: onConfirm,
        },
        {
          label: "No",
          onClick: () => {}, // Do nothing if No is clicked
        },
      ],
    });
  };

  const appointmentDetails = () => {
    setIsOpen(!isOpen);
  };

  // console.log(employee.approved);
  return (
    <CardContainerWrapper backGround={backGround}>
      <CardContainer>
        <Box>
          {loading ? (
            <Skeleton
              animation="wave"
              variant="circular"
              width={40}
              height={40}
              style={{ marginRight: 5 }}
            />
          ) : (
            <Avatar src={img} />
          )}
        </Box>
        {loading ? (
          <Box sx={{ width: "100%" }}>
            <Skeleton width="100%">
              <Typography fontSize={12}>.</Typography>
            </Skeleton>
            <Box display="flex" alignItems="center">
              {[...Array(3)].map(() => (
                <Skeleton
                  style={{ marginRight: 5, borderRadius: 15 }}
                  variant="rounded"
                  width={70}
                />
              ))}
            </Box>

            <Skeleton width="100%">
              <Typography fontSize={12}>.</Typography>
            </Skeleton>
          </Box>
        ) : (
          <CardDetails>{children}</CardDetails>
        )}
        {!loading && (
          <IconButton sx={{ marginLeft: "auto" }} onClick={appointmentDetails}>
            <MoreVertIcon />
          </IconButton>
        )}
      </CardContainer>
      {isOpen && (
        <CardDetailsExpand opacity={isOpen}>
          <CardContainer>
            <Box>
              {loading ? (
                <Skeleton
                  animation="wave"
                  variant="circular"
                  width={40}
                  height={40}
                  style={{ marginRight: 5 }}
                />
              ) : (
                <Avatar />
              )}
            </Box>
            {loading ? (
              <Box sx={{ width: "100%" }}>
                <Skeleton width="100%">
                  <Typography fontSize={12}>.</Typography>
                </Skeleton>
                <Box display="flex" alignItems="center">
                  {[...Array(3)].map(() => (
                    <Skeleton
                      style={{ marginRight: 5, borderRadius: 15 }}
                      variant="rounded"
                      width={70}
                    />
                  ))}
                </Box>

                <Skeleton width="100%">
                  <Typography fontSize={12}>.</Typography>
                </Skeleton>
              </Box>
            ) : (
              <CardDetails>
                <p style={{ fontSize: "12px", fontWeight: "600" }}>
                  {employee.employee.empFirstName}{" "}
                  {employee.employee.empLastName}
                </p>
                {!employee.approved ? (
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "500",
                      color: "green",
                    }}
                  >
                    Available
                  </span>
                ) : (
                  <span style={{ fontSize: "11px", fontWeight: "500" }}>
                    Not Available
                    <span
                      style={{
                        color: "red",
                      }}
                    >
                      *
                    </span>
                  </span>
                )}
                <span style={{ fontSize: "11px", fontWeight: "500" }}>
                  Status:{" "}
                  {checkStatus(employee.date, employee.time, employee.approved)}
                </span>
              </CardDetails>
            )}
          </CardContainer>
          <ButtonContainer>
            {!employee.approved ? (
              <Button
                style={{
                  cursor:
                    checkStatus(
                      employee.date,
                      employee.time,
                      employee.approved
                    ) === "Expired"
                      ? "not-allowed"
                      : "pointer",
                  opacity:
                    checkStatus(
                      employee.date,
                      employee.time,
                      employee.approved
                    ) === "Expired"
                      ? 0.5
                      : 1,
                }}
                onClick={() => {
                  if (
                    checkStatus(
                      employee.date,
                      employee.time,
                      employee.approved
                    ) === "Expired"
                  ) {
                    // Handle the case when status is expired
                    return; // Do nothing or show a message
                  }
                  setApprove(true, employee.id);
                }}
              >
                Approve
              </Button>
            ) : (
              <Button
                onClick={() => setApprove(false, employee.id)}
                style={{
                  background: "orange",
                }}
              >
                Decline
              </Button>
            )}
            <Button
              // disabled={!employee.approved}
              onClick={() =>
                !employee.approved
                  ? showConfirmationAlert(
                      "Delete Appointment",
                      "Are you sure you want to delete this appointment?",
                      () => removeAppointment(employee.id)
                    )
                  : null
              }
              style={{
                cursor: employee.approved ? "not-allowed" : "pointer",
                opacity: employee.approved ? 0.5 : 1,
                background: "red",
              }}
            >
              Remove
            </Button>
          </ButtonContainer>
        </CardDetailsExpand>
      )}
      {/* <ToastContainer /> */}
    </CardContainerWrapper>
  );
};

export default Card;
