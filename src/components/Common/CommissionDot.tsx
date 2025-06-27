import { Box } from "@mui/material";
import { memo } from "react";

const CommissionDot = () => {
  return (
    <Box
      sx={{
        width: { xs: 8, sm: 10 },
        height: { xs: 8, sm: 10 },
        borderRadius: "50%",
        backgroundColor: "#74ee15",
        marginRight: { xs: "2px", sm: "5px" },
      }}
    />
  );
};

export default memo(CommissionDot);
