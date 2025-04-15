import { Box, Typography } from "@mui/material";

interface ResultProps {
  invert?: boolean;
  onClick: () => void;
  height?: string;
}

const Result = ({ invert, onClick, height }: ResultProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        marginRight: "2px",
        marginLeft: "2px",
        justifyContent: "center",
        alignItems: "center",
        height: height ? height : "18px",
        background: invert ? "white" : "#0B4F26",
        borderRadius: "2px",
        cursor: "pointer",
        zIndex: 2,
      }}
      onClick={onClick}
    >
      <Typography
        sx={{
          fontSize: { lg: "8px", xs: "6px" },
          fontWeight: "600",
          color: invert ? "0B4F26" : "white",
        }}
      >
        Result
      </Typography>
    </Box>
  );
};

export default Result;
