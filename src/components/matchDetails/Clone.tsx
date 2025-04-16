import { Box, Typography } from "@mui/material";
import { memo } from "react";

interface CloneProps {
  invert: boolean;
  onClick: (val: any) => void;
}

const Clone = ({ invert, onClick }: CloneProps) => {
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
          background: invert ? "#46e080" : "#46e080",
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
          Clone
        </Typography>
      </Box>
    </Box>
  );
};

export default memo(Clone);
