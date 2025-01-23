import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword";
import { z } from "zod";
import { emailSchema } from "../../../../lib/zod-schema/common";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Backdrop, CircularProgress } from "@mui/material";
import { ERROR_STATUS } from "../../../../constants/errors";
import { IApiError } from "../../../../types/errors";
import CSnackbar from "../../../../components/CSnackbar";
import { loginApi } from "../../../../api/auth/user-account";
import useToast from "../../../../hooks/useToast";
import { useBoundStore } from "../../../../store/store";
import { useNavigate } from "react-router-dom";
import { ROLE } from "../../../../constants/common";
import PathConstants from "../../../../routes/pathConstants";
import { getMutationErrorMsg } from "../../../../utils/error";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  gap: theme.spacing(2),

  [theme.breakpoints.up("sm")]: {
    width: "450px",
    boxShadow:
      "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
    padding: theme.spacing(4),
  },
  [theme.breakpoints.down("sm")]: {
    boxShadow: "none",
    border: "none",
    padding: 0,
    backgroundColor: "transparent",
  },
  ...theme.applyStyles("dark", {}),
}));

const loginSchema = z.object({
  email: emailSchema,
  password: z.string(),
});

type IFormFields = z.infer<typeof loginSchema>;

export default function SignInCard() {
  const [open, setOpen] = React.useState(false);
  const [screenLoader, setScreenLoader] = React.useState(false);
  const { toast, setToast, closeToast, toastISE } = useToast();
  const setAuth = useBoundStore((state) => state.setAuth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormFields>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<IFormFields> = async (data) => {
    try {
      setScreenLoader(true);
      const loginPayload = {
        userId: data.email,
        password: data.password,
      };
      const res = await loginApi(loginPayload);
      setAuth(res.data.accessToken, res.data.role[0]);
      navigate(PathConstants.HOME);
    } catch (error) {
      const { msg, status } = getMutationErrorMsg(error);
      if (status === ERROR_STATUS.UNHANDLED) {
        setToast("error", msg);
      } else {
        setToast("error", "Invalid Credentails");
      }
    } finally {
      setScreenLoader(false);
    }
  };

  const handleForgetPasswordClickOpen = () => {
    setOpen(true);
  };

  const handleForgetPasswordCloase = () => {
    setOpen(false);
  };

  const emailError = errors.email;
  const passwordError = errors.password;

  console.log(errors);

  return (
    <>
      <Card variant="outlined">
        <Box sx={{ display: { xs: "flex", md: "none" } }}></Box>
        <Typography
          component="h1"
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign in
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 2,
          }}
        >
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              error={!!emailError}
              helperText={emailError?.message}
              type="email"
              placeholder="your@email.com"
              {...register("email")}
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Link
                component="button"
                type="button"
                onClick={handleForgetPasswordClickOpen}
                variant="body2"
                sx={{ alignSelf: "baseline" }}
              >
                Forgot your password?
              </Link>
            </Box>
            <TextField
              error={!!passwordError}
              helperText={passwordError?.message}
              placeholder="••••••"
              type="password"
              {...register("password")}
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>
          <ForgotPassword
            open={open}
            handleClose={handleForgetPasswordCloase}
          />
          <Button type="submit" fullWidth variant="contained">
            Sign in
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Don&apos;t have an account?{" "}
            <span>
              <Link
                href="/material-ui/getting-started/templates/sign-in/"
                variant="body2"
                sx={{ alignSelf: "center" }}
              >
                Sign up
              </Link>
            </span>
          </Typography>
        </Box>
      </Card>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={screenLoader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <CSnackbar
        handleClose={closeToast}
        message={toast.message}
        severity={toast.severity}
        open={toast.show}
      />
    </>
  );
}
