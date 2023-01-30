import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Divider,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useGoogleLogin } from "@react-oauth/google";
import { login } from "actions/auth";
import { LOGIN_SUCCESS } from "actions/types";
import Flex from "components/Flex";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { CgLock, CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import tokenService from "services/token.service";
import * as Yup from "yup";

const loginFormSchema = Yup.object({
  username: Yup.string().required().min(3),
  password: Yup.string().required().min(6),
});

const Login = () => {
  const {
    control,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginFormSchema),
    reValidateMode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const onGoogleLogin = useGoogleLogin({
    onSuccess: (response) => {
      const user = { token: response?.access_token };
      tokenService.setUser(user);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user },
      });
    },
  });

  const onLogin = async () => {
    await trigger();

    if (Object.keys(errors).length === 0) {
      const values = getValues();
      dispatch(login(values));
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/manage");
    }
  }, [navigate, isLoggedIn]);

  return (
    <Flex sx={{ boxShadow: 1 }} minHeight="580px">
      <Box
        component="img"
        src="images/login-bg.png"
        width="55%"
        sx={{ objectFit: "cover" }}
      />
      <Box p={10} width="45%">
        <Typography variant="h1" textAlign="center">
          Log in to My Portal
        </Typography>

        {Object.keys(errors)?.length > 0 && (
          <Box bgcolor="#ffe6e7" p={1} borderRadius={1}>
            <Typography color="#a94442">
              {errors?.[Object.keys(errors)[0]]?.message}
            </Typography>
          </Box>
        )}

        <Flex gap={3} mt={3} flexDirection="column" component="form">
          <Controller
            name="username"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  label="Username"
                  error={errors?.username?.message}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CgProfile />
                      </InputAdornment>
                    ),
                  }}
                />
              );
            }}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  type="password"
                  label="Password"
                  error={errors?.password?.message}
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CgLock />
                      </InputAdornment>
                    ),
                  }}
                />
              );
            }}
          />

          <Button variant="contained" onClick={onLogin} fullWidth>
            Log in
          </Button>

          <Divider />

          <Button
            variant="outlined"
            startIcon={<Box component="img" src="images/google.svg" />}
            fullWidth
            onClick={onGoogleLogin}
          >
            Log in with Google
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Login;
