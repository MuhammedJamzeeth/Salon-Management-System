import axios from "axios";
import { useState } from "react";

export const useServiceStylist = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({});
    const [service, setService] = useState({});
    const [stylist, setStylist] = useState([]);
    const [currentActiveImage, setCurrentActiveImage] = useState(0);
    const usertoken = JSON.parse(localStorage.getItem("user"));
    const [selectedStylist, setSelectedStylist] = useState([]);

    const serviceById = async (_id) => {
        if (!_id) {
            setError({ message: "content not availble" });
            return;
        }
        try {
            const service = await axios.get(
                `http://localhost:8080/api/v1/user/service/${_id}`,
                {
                    headers: {
                        Authorization: `Bearer ${usertoken?.token}`,
                    },
                }
            );

            if (service.statusText !== "OK") {
                throw new Error("some thing went wrong...");
            }

            setService(service?.data);

            const arrayOfIds = service?.data.specialists;

            const stylists = await axios.get(
                "http://localhost:8080/api/v1/user/stylists",
                {
                    params: {
                        ids: arrayOfIds.join(","),
                    },
                    headers: {
                        Authorization: `Bearer ${usertoken?.token}`,
                    },
                }
            );
            setStylist(stylists?.data);
            setLoading(false);
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError(error.response.data);
            } else {
                setError(error.message);
            }
        }
    };

    return {
        serviceById,
        loading,
        currentActiveImage,
        error,
        service,
        stylist,
        setCurrentActiveImage,
        selectedStylist,
        setSelectedStylist,
    };
};
