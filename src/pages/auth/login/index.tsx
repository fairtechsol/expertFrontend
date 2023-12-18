import { Box, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { eye, eyeLock, mail } from "../../../assets";
import Input from "../../../components/login/Input";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { authReset, login } from "../../../store/actions/auth/authAction";
import { useFormik } from "formik";
import { loginValidationSchema } from "../../../utils/Validations/login";

const initialValues: any = {
  userName: "",
  password: "",
  // loginType: "expert",
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
  );
};

export default Login;
