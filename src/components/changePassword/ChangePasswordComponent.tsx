import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useFormik } from "formik";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eye, eyeLock } from "../../assets";
import { ChangePasswordInterface } from "../../interface/authInterface";
import { checkOldPass } from "../../store/actions/auth/authAction";
import { changePassword } from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import { changePasswordValidation } from "../../utils/Validations/login";
import CustomErrorMessage from "../Common/CustomErrorMessage";
import CustomModal from "../Common/CustomModal";
import Input from "../login/Input";

const initialValues: ChangePasswordInterface = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

export const ChangePasswordComponent = () => {
  const dispatch: AppDispatch = useDispatch();
  const [showModal, setShowModal] = useState<boolean>(false);

  const { success, transactionPassword, loading } = useSelector(
    (state: RootState) => state.user.profile
  );
  const { oldPasswordMatched } = useSelector((state: RootState) => state.auth);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: changePasswordValidation(oldPasswordMatched),
    onSubmit: (values: any) => {
      if (loading) {
        return;
      }
      dispatch(changePassword(values));
    },
  });

  const { handleSubmit, touched, errors } = formik;

  const debouncedInputValue = useMemo(() => {
    const debouncedFn = debounce((value) => {
      dispatch(checkOldPass({ oldPassword: value }));
    }, 500);
    return debouncedFn;
  }, []);

  const handleOldPass = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    formik.handleChange(e);
    debouncedInputValue(query);
  };

  useEffect(() => {
    if (success) {
      setShowModal(true);
    }
  }, [success]);

  useEffect(() => {
    return () => {
      debouncedInputValue.cancel();
    };
  }, []);

  useEffect(() => {
    if (formik.values.oldPassword) {
      formik.validateForm();
    }
  }, [oldPasswordMatched]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            width: { xs: "96vw", lg: "19vw", md: "19vw" },
            minWidth: {
              lg: "350px",
              md: "350px",
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
              placeholder="Enter Old Password"
              title="Old Password"
              id="oldPassword"
              name="oldPassword"
              type="password"
              value={formik.values.oldPassword}
              onChange={handleOldPass}
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
              onBlur={formik.handleBlur}
            />
            <CustomErrorMessage
              touched={touched.oldPassword}
              errors={errors.oldPassword}
            />
            <Input
              required={true}
              placeholder="Enter New Password"
              title="New Password"
              name="newPassword"
              id="newPassword"
              type="password"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              titleStyle={{
                color: "#222222",
                marginLeft: "0px",
                fontWeight: "600",
              }}
              onBlur={formik.handleBlur}
              inputContainerStyle={{ borderRadius: "5px" }}
              containerStyle={{ marginTop: "30px" }}
              img={eye}
              img1={eyeLock}
              place={3}
              toFoucs={true}
            />
            <CustomErrorMessage
              touched={touched.newPassword}
              errors={errors.newPassword}
            />
            <Input
              required={true}
              placeholder="Enter Confirm Password"
              title="Confirm New Password"
              name="confirmPassword"
              id="confirmPassword"
              type="password"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              titleStyle={{
                color: "#222222",
                marginLeft: "0px",
                fontWeight: "600",
              }}
              onBlur={formik.handleBlur}
              inputContainerStyle={{ borderRadius: "5px" }}
              containerStyle={{ marginTop: "30px" }}
              img={eye}
              img1={eyeLock}
              place={4}
              toFoucs={true}
              okButtonRef={"okButtonRef"}
            />
            <CustomErrorMessage
              touched={touched.confirmPassword}
              errors={errors.confirmPassword}
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
                {loading ? (
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
      {showModal && (
        <CustomModal
          message={transactionPassword}
          setShowModal={setShowModal}
          buttonMessage="Navigate To Login"
        />
      )}
    </>
  );
};

export default ChangePasswordComponent;
