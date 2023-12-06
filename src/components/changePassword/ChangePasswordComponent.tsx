import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { useState } from "react";
import Input from "../login/Input";
import { eye, eyeLock } from "../../assets";

export const ChangePasswordComponent = ({ passLoader, width }: any) => {
  const [passwordDetail, setPasswordDetail] = useState({
    2: { field: "oldPassword", val: "" },
    3: { field: "newPassword", val: "" },
    4: { field: "confirmPassword", val: "" },
  });
  const [error, setError] = useState({
    2: { field: "oldPassword", val: false },
    3: { field: "newPassword", val: false },
    4: { field: "confirmPassword", val: false },
  });

  const handleChange = (e: any) => {
    e.preventDefault();
  };
  const handleEnterKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleChange(e);
    }
  };
  return (
    <form onSubmit={handleChange}>
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
            titleStyle={{
              color: "#222222",
              marginLeft: "0px",
              fontWeight: "600",
            }}
            inputContainerStyle={{ borderRadius: "5px" }}
            containerStyle={{}}
            img={eye}
            img1={eyeLock}
            setDetail={setPasswordDetail}
            Detail={passwordDetail}
            setError={setError}
            error={error}
            place={2}
            // onFocusOut={doSendErrorForPassword}
            toFoucs={true}
          />
          <Input
            required={true}
            placeholder={"Enter New Password"}
            inputProps={{ type: "password" }}
            title={"New Password"}
            titleStyle={{
              color: "#222222",
              marginLeft: "0px",
              fontWeight: "600",
            }}
            inputContainerStyle={{ borderRadius: "5px" }}
            containerStyle={{ marginTop: "30px" }}
            img={eye}
            img1={eyeLock}
            setDetail={setPasswordDetail}
            Detail={passwordDetail}
            setError={setError}
            error={error}
            place={3}
            // onFocusOut={doSendErrorForPassword}
            toFoucs={true}
          />
          {error[3].val && <p style={{ color: "#fa1e1e" }}>{error[3].val}</p>}
          <Input
            required={true}
            placeholder={"Enter Confirm Password"}
            inputProps={{ type: "password" }}
            title={"Confirm New Password"}
            titleStyle={{
              color: "#222222",
              marginLeft: "0px",
              fontWeight: "600",
            }}
            inputContainerStyle={{ borderRadius: "5px" }}
            containerStyle={{ marginTop: "30px" }}
            img={eye}
            img1={eyeLock}
            setDetail={setPasswordDetail}
            Detail={passwordDetail}
            setError={setError}
            error={error}
            place={4}
            // onFocusOut={doSendErrorForPassword}
            toFoucs={true}
            okButtonRef={"okButtonRef"}
            onKeyDown={handleEnterKeyPress}
          />
          {passwordDetail[3].val !== passwordDetail[4].val && (
            <p style={{ color: "#fa1e1e" }}>Password Doesn't match</p>
          )}
          <Button
            // onClick={handleChange}
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
