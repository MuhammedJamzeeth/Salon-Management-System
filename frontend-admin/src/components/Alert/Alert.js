import { confirmAlert } from "react-confirm-alert"; // Import react-confirm-alert module
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const ConfirmationAlert = ({ title, message, onConfirm }) => {
  const showConfirmationAlert = () => {
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

  return showConfirmationAlert;
};

export default ConfirmationAlert;
