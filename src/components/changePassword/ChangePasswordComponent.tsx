import { Box, Button, CircularProgress, Typography } from "@mui/material";
import Input from "../login/Input";
import { eye, eyeLock } from "../../assets";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { changePasswordSchema } from "../../utils/Validations/login";
import { ApiConstants } from "../../utils/Constants";
import service from "../../service";
import { toast } from "react-toastify";

const initialValues: any = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const toastOptions = {
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

export const ChangePasswordComponent = ({ passLoader, width }: any) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: changePasswordSchema,
    onSubmit: async (values: any) => {
      try {
        const resp = await service.post(ApiConstants.CHANGEPASSWORD, values);
        if (resp) {
          navigate("/login");
          localStorage.clear();
        }
      } catch (e: any) {
        toast.error(e?.response?.data?.message);
      }
    },
  });

  const { handleSubmit, touched, errors } = formik;
  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          width: { xs: "96vw", lg: "19vw", md: "19vw" },
          minWidth: {
            lg: width ? width : "350px",
            md: width ? width : "350px",
            xs: "0px",
          },
          marginTop: "10px",
          marginX: { xs: "2vw", lg: "1vw" },
        }}
      >
        <Typography
          sx={{
            color: "white",
            fontSize: { lg: "18px", xs: "20px" },
            fontWeight: "700",
          }}
        >
          Change Password
        </Typography>
        <Box
          sx={{
            width: "100%",
            minHeight: "200px",
            background: "#F8C851",
            borderRadius: "5px",
            padding: "20px",
            marginTop: "10px",
          }}
        >
          <Input
            required={true}
            placeholder={"Enter Old Password"}
            title={"Old Password"}
            id="oldPassword"
            name={"oldPassword"}
            type="password"
            value={formik.values.oldPassword}
            onChange={formik.handleChange}
            titleStyle={{
              color: "#222222",
              marginLeft: "0px",
              fontWeight: "600",
            }}
            inputContainerStyle={{ borderRadius: "5px" }}
            containerStyle={{}}
            img={eye}
            img1={eyeLock}
            place={2}
            toFoucs={true}
            touched={touched.oldPassword}
            error={errors.oldPassword}
          />
          <Input
            required={true}
            placeholder={"Enter New Password"}
            title={"New Password"}
            name={"newPassword"}
            id="newPassword"
            type="password"
            value={formik.values.newPassword}
            onChange={formik.handleChange}
            titleStyle={{
              color: "#222222",
              marginLeft: "0px",
              fontWeight: "600",
            }}
            inputContainerStyle={{ borderRadius: "5px" }}
            containerStyle={{ marginTop: "30px" }}
            img={eye}
            img1={eyeLock}
            place={3}
            toFoucs={true}
            touched={touched.newPassword}
            error={errors.newPassword}
          />
          <Input
            required={true}
            placeholder={"Enter Confirm Password"}
            title={"Confirm New Password"}
            name={"confirmPassword"}
            id="confirmPassword"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            titleStyle={{
              color: "#222222",
              marginLeft: "0px",
              fontWeight: "600",
            }}
            inputContainerStyle={{ borderRadius: "5px" }}
            containerStyle={{ marginTop: "30px" }}
            img={eye}
            img1={eyeLock}
            place={4}
            toFoucs={true}
            okButtonRef={"okButtonRef"}
            touched={touched.confirmPassword}
            error={errors.confirmPassword}
          />
          <Button
            type="submit"
            sx={{
              height: "50px",
              display: "flex",
              justify: "center",
              alignItems: "center",
              mx: "auto",
              marginTop: "60px",
              marginBottom: "40px",
              width: "80%",
              background: "#0B4F26",
              borderRadius: "5px",
              cursor: "pointer",
              "&:hover": {
                background: "#0B4F26",
              },
            }}
          >
            <Typography
              sx={{ fontSize: { lg: "18px", xs: "20px" } }}
              color={"white"}
            >
              {passLoader ? (
                <CircularProgress
                  sx={{
                    color: "#FFF",
                  }}
                  size={20}
                  thickness={4}
                  value={60}
                />
              ) : (
                "Update"
              )}
            </Typography>
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default ChangePasswordComponent;
