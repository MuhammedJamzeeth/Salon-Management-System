import { Alert, Button, TextField } from "@mui/material";
import React from "react";

import SaloonLogo from "../../assets/logo.webp";
import Banners from "../../components/Banner/Banners";
import useInputHandler from "../../hooks/InputHandler";
import useAuthHandler from "../../hooks/user.auth";

import { Link } from "react-router-dom";
import { colors } from "../../styles/colors";
import { bannerdata } from "./Banner";
import {
  BannerContainer,
  BarberShopAddress,
  Container,
  Form,
  FormContainer,
  Logo,
} from "./auth.styles";

export const InitialState = {
  title: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
  address: "",
  zip: "",
};

const Register = () => {
  const { handleInput, formInput } = useInputHandler(InitialState);
  const { register, error, loading, setError, handleFileChange } =
    useAuthHandler(formInput);

  return (
    <Container>
      <BannerContainer>
        <Banners banners={bannerdata} />
      </BannerContainer>
      <FormContainer>
        <h3>Get Started Now</h3>
        <Logo style={{ margin: 10 }} height={150} width={150}>
          <img src={SaloonLogo} alt="logo" />
        </Logo>
        {error && (
          <Alert
            onClose={() => setError("")}
            sx={{ margin: "10px", width: "100%" }}
            severity="error"
          >
            {error}
          </Alert>
        )}
        <Form onSubmit={register}>
          <TextField
            fullWidth
            type="text"
            size="small"
            label="Saloon Name"
            name="title"
            onChange={handleInput}
            value={formInput.title}
          />
          <TextField
            fullWidth
            type="email"
            size="small"
            label="Email"
            name="email"
            onChange={handleInput}
            value={formInput.email}
          />
          <TextField
            fullWidth
            size="small"
            type="password"
            label="Password"
            name="password"
            onChange={handleInput}
            value={formInput.password}
          />
          <TextField
            fullWidth
            type="password"
            size="small"
            label="Confirm Password"
            name="confirmPassword"
            onChange={handleInput}
            value={formInput.confirmPassword}
          />
          <TextField
            fullWidth
            size="small"
            label="phone"
            type="text"
            name="phone"
            onChange={handleInput}
            value={formInput.phone}
          />
          <TextField
            fullWidth
            size="small"
            label="Address"
            type="text"
            name="shopNo"
            onChange={handleInput}
            value={formInput.shopNo}
          />

          <TextField
            fullWidth
            size="small"
            label="Zip/Postal Code"
            type="text"
            name="zip"
            onChange={handleInput}
            value={formInput.zip}
          />
          <input type="file" onChange={handleFileChange} />

          <Button
            sx={{ background: `${colors.colorBlack}` }}
            variant="contained"
            type="submit"
          >
            {loading ? "Loading..." : "SIGNUP"}
          </Button>
        </Form>
        <BarberShopAddress style={{ margin: "10px" }}>
          Already a user?{" "}
          <Link style={{ color: colors.colorBlack }} to={"/login"}>
            LOGIN
          </Link>
        </BarberShopAddress>
      </FormContainer>
    </Container>
  );
};

export default Register;
