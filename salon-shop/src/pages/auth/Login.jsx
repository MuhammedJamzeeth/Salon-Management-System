import { Alert, Button, TextField } from "@mui/material";

import Banners from "../../components/Banner/Banners";
import useInputHandler from "../../hooks/InputHandler";
import useAuthHandler from "../../hooks/user.auth";
import { colors } from "../../styles/colors";
import SaloonLogo from "../../assets/logo.webp";
import { Link } from "react-router-dom";
import { commonNames } from "../../common/common.names";
import { bannerdata } from "./Banner";
import {
  BannerContainer,
  BarberShopAddress,
  Container,
  Form,
  FormContainer,
  Logo,
} from "./auth.styles";
import AuthVerify from "../../common/AuthVerify";
import useSession from "../../common/useSession";

const InitialState = {
  email: "",
  password: "",
};

const Login = () => {
  const { handleInput, formInput } = useInputHandler(InitialState);
  const { login, loading, error, setError } = useAuthHandler(formInput);
  const { sessionExpired, setSessionExpired } = useSession();
  console.log(sessionExpired);
  return (
    <Container>
      <BannerContainer>
        <Banners banners={bannerdata} />
      </BannerContainer>
      <FormContainer>
        <Logo style={{ margin: 10 }} height={150} width={150}>
          <img src={SaloonLogo} alt="logo" />
        </Logo>
        <h3>Welcome to {commonNames.SALOON_NAME}</h3>
        {sessionExpired && (
          <Alert severity="warning" onClose={() => setSessionExpired(false)}>
            Your session has expired. Please log in again.
          </Alert>
        )}

        {error && (
          <Alert
            sx={{ margin: "10px", width: "100%" }}
            onClose={() => setError("")}
            severity="error"
          >
            {error}
          </Alert>
        )}
        <Form onSubmit={login}>
          <TextField
            fullWidth
            type="email"
            margin="dense"
            size="small"
            label="Email"
            name="email"
            onChange={handleInput}
            value={formInput.email}
          />
          <TextField
            fullWidth
            type="password"
            margin="dense"
            size="small"
            label="Password"
            name="password"
            onChange={handleInput}
            value={formInput.password}
          />
          <Button
            sx={{ background: `${colors.colorBlack}` }}
            variant="contained"
            type="submit"
            fullWidth
          >
            {loading ? "Loading..." : "LOG IN"}
          </Button>
        </Form>
        <BarberShopAddress style={{ margin: "10px" }}>
          Don’t have an account?{" "}
          <Link style={{ color: colors.colorBlack }} to={"/register"}>
            SIGN UP
          </Link>
        </BarberShopAddress>
      </FormContainer>
    </Container>
  );
};

export default Login;
