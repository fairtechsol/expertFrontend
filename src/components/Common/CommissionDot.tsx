import { Box } from "@mui/material";
import { memo } from "react";

const CommissionDot = () => {
  return (
    <Box
      sx={{
        width: 10,
        height: 10,
        borderRadius: "50%",
        backgroundColor: "#74ee15",
        marginRight: "5px",
      }}
    />
  );
};

export default memo(CommissionDot);
