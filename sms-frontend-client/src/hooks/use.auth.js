import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

const useAuthHandler = (formInput, selectedStylist, paymentMethod) => {
    const dispatch = useDispatch();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const { name, email, phone, date } =
        formInput;

    const booking = async (event) => {
        event.preventDefault();

        console.log(formInput);

        let emptyFileds = [];

        if (!name) emptyFileds.push("Name");
        if (!email) emptyFileds.push("Email");
        if (!phone) emptyFileds.push("Phone");
        if (!paymentMethod) emptyFileds.push("Payment Method");
        if (!selectedStylist) emptyFileds.push("Stylist")
        if (!date) emptyFileds.push("Date");


        if (emptyFileds.length > 0) {
            setError(`${[...emptyFileds]} can't be empty`);
            return;
        } else {
            setError("");
        }


        const formDataAppointment = new FormData();
        formDataAppointment.append("customerEmail", email);
        formDataAppointment.append("customerName", name);
        formDataAppointment.append("employee", selectedStylist);
        formDataAppointment.append("pno", phone);


        try {
            setLoading(true);
            const response = await axios.post(
                "http://localhost:8080/api/v1/auth/register_shop",
                formDataAppointment
            );

            if (
                response.status === 201 ||
                response.status === 200 ||
                response.statusText === "OK"
            ) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            const user = localStorage.getItem("user");
            console.log(user);
            console.log("user registered");
            setLoading(false);
        } catch (error) {
            setLoading(false);
            // console.log(error);
            setError(error.response.data);
        }
    };



    return {
        booking,
        loading,
        error,
        setError,
    };
};

export default useAuthHandler;
