import { Box, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { FgLogo, eye, eyeLock, mail } from "../../../assets";
// import StyledImage from "../../../components/Common/StyledImages";
import StyledImage from "../../../components/Common/StyledImages";
import Input from "../../../components/login/Input";
import AuthBackground from "../AuthBackground";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { authReset, login } from "../../../store/actions/auth/authAction";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../../utils/Validations/login";

const initialValues: any = {
  userName: "",
  password: "",
  loginType: "wallet",
};

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: loginValidationSchema,
    onSubmit: (values: any) => {
      dispatch(login(values));
    },
  });

  const { handleSubmit, touched, errors } = formik;

  const { success, forceChangePassword, userRole } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    if (success) {
      localStorage.setItem("userRole", userRole);
      if (forceChangePassword) {
        localStorage.setItem(
          "forceChangePassword",
          JSON.stringify(forceChangePassword)
        );
        navigate("/change_password");
      } else {
        navigate("/expert/match");
      }
      dispatch(authReset());
    }
  }, [success]);

  return (
    <Box style={{ position: "relative" }}>
      <AuthBackground />
      <Box
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          alignItems: "flex-start",
          position: "relative",
          justifyContent: "center",
        }}
      >
        <Box
          sx={[
            {
              display: "flex",
              flexDirection: "column",
              py: "20px",
              width: "18%",
              minWidth: "250px",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <StyledImage
            src={FgLogo}
            alt="Fairgame"
            sx={{ height: "8%", width: "300px", mt: 2 }}
          />
          <form
            onSubmit={handleSubmit}
            style={{
              width: "90%",
              justifyContent: "center",
            }}
          >
            <Box sx={{ width: "100%", opacity: 1 }}>
              <Input
                placeholder={"Enter Username"}
                title={"Username"}
                name="userName"
                id="userName"
                img={mail}
                img1={mail}
                value={formik.values.userName}
                onChange={formik.handleChange}
                touched={touched.userName}
                error={errors.userName}
              />
              <Input
                title={"Password"}
                placeholder={"Enter Password"}
                containerStyle={{ marginTop: "10px" }}
                img={eye}
                img1={eyeLock}
                type="password"
                name="password"
                id="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                touched={touched.password}
                error={errors.password}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginY: "1vh",
                marginTop: "4vh",
              }}
            >
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                sx={{
                  width: "62%",
                  cursor: "pointer",
                  height: { xs: "50px", lg: "43px" },
                  borderRadius: "10px",
                  fontWeight: "500",
                  textTransform: "none",
                  fontSize: { lg: "14px", xs: "14px" },
                  background: `${theme.palette.secondary}`,
                }}
              >
                Login
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
