import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";

import {Alert, Button, FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import StarIcon from "@mui/icons-material/Star";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import Card from "../../components/BarberShop/BarbershopCard";
import {
    BarberShopAddress as ServiceDescription,
    BarberShopName as ServiceName,
    CardFlex,
    Ratings,
    Tag,
    Tags,
} from "../../components/BarberShop/barbershop.card.styles";
import NavigationBar from "../../components/NavBar/NavigationBar";
import {currentCart} from "../../selector/cart.selector";
import {colors} from "../../styles/colors";
import {AboutHeading, BarberContainer, FloatingButton, FloatingButtonAdd,} from "../BarberShop/barber.styles";
import axios from "axios";

import useAuthHandler from "../../hooks/use.auth";
import useInputHandler from "../../hooks/InputHandler";
import {Form, FormContainer,} from "../auth.styles";
import AddIcon from "@mui/icons-material/Add";
import {renderTimeViewClock} from "@mui/x-date-pickers/timeViewRenderers";
import dayjs from "dayjs";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";

export const InitialState = {
    name: "",
    email: "",
    phone: "",
    stylist: "",
    date: ""
};

const BookService = () => {
    const [value, setValue] = React.useState(dayjs(new Date()));
    const dispatch = useDispatch();
    const [stylists, setStylists] = useState([]);
    const cartItems = useSelector(currentCart);
    const navigate = useNavigate();
    const [selectedStylist, setSelectedStylist] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("");
    const [serviceList, setServiceList] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const { handleInput, formInput, setFormInput } = useInputHandler(InitialState);

    const { success, setSuccess, booking, error, setError } = useAuthHandler(formInput, selectedStylist, paymentMethod, serviceList, totalAmount);

    // Define dummy cart items
    const [CartItems, setCartItems] = useState([]);

    useEffect(() => {

        formInput.date = value.format("MMMM D, YYYY h:mm A");
        // Use dummy data for testing
        const fetchStylist = async () => {
            try {
                const response = await axios.get("http://localhost:8080/employees");
                console.log(response);
                setStylists(response.data);
            } catch (e) {
                console.log(e);
            }
        };
        fetchStylist().then(r => console.log("fetched stylist"));

        const fetchService = async ()=> {
            try {
                const response = await axios.get("http://localhost:8080/getallservices");
                console.log(response);
                setCartItems(response.data);
            } catch (e) {
                console.log(e);
            }
        }

        fetchService().then(r => console.log("fetched service"));
    }, []);

    const handleDateChange = (date) => {
        formInput.date = date.format("MMMM D, YYYY h:mm A");
        console.log(formInput.date)
    };

    const addService = (cartItem) => {
        // Check if the service is already added
        if (!serviceList.some(item => item.serviceId === cartItem.serviceId)) {
            setServiceList((prevServiceList) => [...prevServiceList, cartItem]);
            setTotalAmount((prevTotal) => prevTotal + cartItem.servicePrice);
        }
    }

    const rmService = (cartItem) => {
        // Check if the service exists in the list before removing
        if (serviceList.some(item => item.serviceId === cartItem.serviceId)) {
            setServiceList((prevServiceList) => prevServiceList.filter(item => item.serviceId !== cartItem.serviceId));
            setTotalAmount((prevTotal) => prevTotal - cartItem.servicePrice);
        }
    }

    return (
        <>
            <NavigationBar />
            <BookServiceWrapper>
                <AboutHeading>Your Service Order</AboutHeading>
                <BookServiceContainer>
                    {CartItems?.map(
                        (cartItem) => (
                            <Card key={cartItem.serviceId} >
                                <ServiceName>{cartItem.serviceName?.toUpperCase().trim()}</ServiceName>
                                <ServiceDescription>
                                    {cartItem.description?.length > 50
                                        ? `${cartItem.description.slice(0, 50)}...`
                                        : cartItem.description}
                                </ServiceDescription>
                                <CardFlex>
                                    <Tags>
                                        <Tag>{cartItem.serviceName}</Tag>
                                    </Tags>
                                    <Ratings>
                                        <StarIcon
                                            fontSize="14px"
                                            sx={{color: colors.colorOrange}}
                                        />
                                        <span>4.7(2.7k)</span>
                                    </Ratings>
                                    <FloatingButton onClick={() => rmService(cartItem)} disabled={!serviceList.some(item => item.serviceId === cartItem.serviceId)}>
                                        <RemoveIcon
                                            fontSize="16px"
                                            sx={{color: colors.colorWhite}}
                                        />
                                    </FloatingButton>
                                    <FloatingButtonAdd onClick={() => addService(cartItem)} disabled={serviceList.some(item => item.serviceId === cartItem.serviceId)}>
                                        <AddIcon
                                            fontSize="16px"
                                            sx={{color: colors.colorWhite}}
                                        />
                                    </FloatingButtonAdd>
                                </CardFlex>
                                <CardFlex>Price: Rs.{cartItem.servicePrice}</CardFlex>
                            </Card>
                        )
                    )}
                </BookServiceContainer>
                <FormContainer>
                    {error && (
                        <Alert
                            onClose={() => setError("")}
                            sx={{ margin: "10px", width: "100%" }}
                            severity="error"
                        >
                            {error}
                        </Alert>
                    )}
                    {success && (
                        <Alert
                            onClose={() => setSuccess("")}
                            sx={{ margin: "10px", width: "100%" }}
                            severity="success"
                        >
                            {success}
                        </Alert>
                    )}
                    <Form onSubmit={booking}>
                        <TextField
                            fullWidth
                            type="text"
                            size="small"
                            label="Name"
                            name="name"
                            onChange={handleInput}
                            value={formInput.name}
                            className="form-element"
                        />
                        <TextField
                            fullWidth
                            type="text"
                            size="small"
                            label="Email"
                            name="email"
                            onChange={handleInput}
                            value={formInput.email}
                            className="form-element"
                        />
                        <TextField
                            fullWidth
                            size="small"
                            label="Phone"
                            type="text"
                            name="phone"
                            onChange={handleInput}
                            value={formInput.phone}
                            className="form-element"
                        />
                        <FormControl fullWidth style={{ margin: '5px 0' }} className="form-element">
                            <InputLabel>Select Specialist</InputLabel>
                            <Select
                                value={selectedStylist}
                                onChange={(e) => setSelectedStylist(e.target.value)}
                            >
                                {stylists.map((stylist) => (
                                    <MenuItem key={stylist.empId} value={stylist.empId}>
                                        {`${stylist.empFirstName} ${stylist.empLastName}`}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth style={{ margin: '0px 0' }} className="form-element">
                            <InputLabel>Select Payment Method</InputLabel>
                            <Select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                            >
                                <MenuItem value="Online Transfer">Online Transfer</MenuItem>
                                <MenuItem value="Cash">Cash</MenuItem>
                            </Select>
                        </FormControl>
                        <div className="datepicker-container">

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                label={"Pick Date and Time"}
                                value={value}
                                onChange={(newValue) => {
                                    console.log(newValue);
                                    setValue(newValue);
                                    handleDateChange(newValue);
                                }}
                                viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                }}
                            />
                            </LocalizationProvider>
                        </div>
                        <div style={{
                            textAlign: "right"
                        }}>
                            {serviceList.map((item) => (
                                <div key={item.serviceId}>
                                    {item.serviceName} - Rs.{item.servicePrice}
                                </div>
                            ))}
                        </div>
                        <TotalAmountDiv>Total Amount: Rs.{totalAmount}</TotalAmountDiv>
                        <Button
                            type="submit"
                            style={{
                                display: "block",
                                margin: "0 20px",
                                border: `2px solid ${colors.colorOrange}`,
                                color: colors.colorOrange,
                            }}
                            variant="outlined"
                        >
                            Book an Appointment
                        </Button>
                    </Form>
                </FormContainer>
            </BookServiceWrapper>
        </>
    );
};

export default BookService;

export const BookServiceWrapper = styled.div`
    max-width: 800px;
    margin: 10px auto;
    border: 2px solid ${colors.colorOrange};
    padding: 10px;
`;

export const BookServiceContainer = styled(BarberContainer)`
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    margin: 0;
`;

export const BookServiceHeading = styled(AboutHeading)``;

export const TotalAmountDiv = styled.div`
    margin: 10px 0;
    font-size: 1.5em;
    font-weight: bold;
    text-align: right;
`;
