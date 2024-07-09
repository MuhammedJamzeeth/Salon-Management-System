import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const useAuthHandler = (formInput, selectedStylist, paymentMethod, serviceList, totalAmount) => {
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [listOfService, setListOfService] = useState([]);
    const navigate = useNavigate();

    const { name, email, phone, date } = formInput;

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const booking = async (event) => {
        event.preventDefault();

        let emptyFields = [];
        let emptyList = [];

        if (!name) {
            emptyFields.push("Name");
        } else if (name.length < 5) {
            emptyFields.push("Name should be at least 5 letters");
        }

        if (!email) {
            emptyFields.push("Email");
        } else if (!validateEmail(email)) {
            emptyFields.push("Invalid email format");
        }

        if (!phone) {
            emptyFields.push("Phone");
        } else if (phone.length !== 10) {
            emptyFields.push("Phone number should be 10 digits");
        }

        if (!paymentMethod) emptyFields.push("Payment Method");
        if (!selectedStylist) emptyFields.push("Stylist");
        if (!date) emptyFields.push("Date");
        if (serviceList.length === 0) emptyFields.push("Please select a service");
        if (!totalAmount) emptyFields.push("Total Amount");

        if (serviceList.length > 0) {
            serviceList.forEach((service) => {
                emptyList.push(service.serviceName);
            });
        }

        if (emptyList.length > 0) {
            setListOfService([...emptyList]);
        }

        if (emptyFields.length > 0) {
            setError(`${emptyFields.join(", ")} can't be empty`);
            return;
        } else {
            setError("");
        }

        const dateTime = new Date(date);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const formattedDate = dateTime.toLocaleDateString('en-US', options);

        const formattedTime = dateTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // "2:47 PM"

        const bookingDetails = {
            customerEmail: email,
            customerName: name,
            employee: selectedStylist,
            pno: phone,
            date: formattedDate,
            time: formattedTime,
            paymentMethod: paymentMethod,
            services: emptyList.join(", "),
            amount: totalAmount
        };

        try {
            setLoading(true);
            const response = await axios.post(
                "http://localhost:8080/bookings",
                bookingDetails,
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );

            if (response.status === 201 || response.status === 200) {
                setError("");
                console.log("Booking successful");
                setSuccess("Booked successfully");
                navigate("/success");
            } else {
                setError("Failed to book appointment");
            }

            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error?.response?.data || "Failed to book appointment");
        }
    };

    return {
        booking,
        loading,
        error,
        setError,
        setSuccess,
        success
    };
};

export default useAuthHandler;
