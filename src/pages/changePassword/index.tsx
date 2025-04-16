import { Box } from "@mui/material";
import ChangePasswordComponent from "../../components/changePassword/ChangePasswordComponent";
import { memo } from "react";

const ChangePassword = () => {
  return (
    <Box flex={1} sx={[{ flex: 1, display: "flex" }]}>
      <ChangePasswordComponent />
    </Box>
  );
};

export default memo(ChangePassword);
