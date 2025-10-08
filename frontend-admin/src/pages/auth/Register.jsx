import { Alert, Button, TextField } from "@mui/material";
import React, { useState } from "react";

import SaloonLogo from "../../assets/logo.webp";
import Banners from "../../components/Banner/Banners";
import useInputHandler from "../../hooks/InputHandler";
import useAuthHandler from "../../hooks/user.auth";
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

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

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

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
            type={showPassword ? "text" : "password"}
            label="Password"
            name="password"
            onChange={handleInput}
            value={formInput.password}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            type={showConfirmPassword ? "text" : "password"}
            size="small"
            label="Confirm Password"
            name="confirmPassword"
            onChange={handleInput}
            value={formInput.confirmPassword}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
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
            name="address"
            onChange={handleInput}
            value={formInput.address}
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
          {/* <input type="file" onChange={handleFileChange} /> */}

          <Button
            sx={{ background: `${colors.colorBlack}` }}
            variant="contained"
            type="submit"
          >
            {loading ? "Loading..." : "SIGN UP"}
          </Button>
        </Form>
        <BarberShopAddress style={{ margin: "10px" }}>
          Already a user?{" "}
          <Link style={{ color: colors.colorBlack }} to={"/login"}>
            LOG IN
          </Link>
        </BarberShopAddress>
      </FormContainer>
    </Container>
  );
};

export default Register;
