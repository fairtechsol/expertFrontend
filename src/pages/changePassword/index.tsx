import { Box } from "@mui/material";
import ChangePasswordComponent from "../../components/changePassword/ChangePasswordComponent";

const ChangePassword = () => {
  const changePassword = () => {};
  return (
    <Box flex={1} sx={[{ flex: 1, display: "flex" }]}>
      <ChangePasswordComponent changePassword={changePassword} />
    </Box>
  );
};

export default ChangePassword;
