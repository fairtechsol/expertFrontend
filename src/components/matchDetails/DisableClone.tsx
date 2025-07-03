import { Box, Typography } from "@mui/material";
import { memo } from "react";

interface DisableCloneProps {
  invert: boolean;
  onClick: (val: any) => void;
}

const DisableClone = ({ invert, onClick }: DisableCloneProps) => {
  return (
    <Box onClick={onClick} sx={{ zIndex: 2 }}>
      <Box
        sx={{
          display: "flex",
          marginRight: "2px",
          marginLeft: "2px",
          justifyContent: "center",
          alignItems: "center",
          height: "18px",
          background: invert ? "#e04646" : "#e04646",
          borderRadius: "2px",
          cursor: "pointer",
        }}
      >
        <Typography
          sx={{
            fontSize: { lg: "8px", xs: "6px" },
            fontWeight: "600",
            color: invert ? "#ffffff" : "#ffffff",
          }}
        >
          Disable
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(DisableClone);
