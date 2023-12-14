import { Box } from "@mui/material";
import ChangePasswordComponent from "../../components/changePassword/ChangePasswordComponent";

const ChangePassword = () => {
  return (
    <Box flex={1} sx={[{ flex: 1, display: "flex" }]}>
      <ChangePasswordComponent />
    </Box>
  );
};

export default ChangePassword;
