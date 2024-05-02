import { Button, CircularProgress, Typography } from "@mui/material";
import { memo } from "react";

const MarketCustomButton = ({
  title,
  color,
  id,
  loading,
  onClick,
  customStyle,
}: any) => {
  return (
    <Button
      autoFocus={true}
      type="submit"
      onClick={onClick}
      sx={[
        {
          width: "45%",
          height: "30px",
          borderRadius: "5px",
          background: color,
          cursor: "pointer",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          textTransform: "none",
          "&:hover": { backgroundColor: color },
        },
        customStyle,
      ]}
    >
      <Typography sx={{ fontSize: "12px", fontWeight: "500", color: "white" }}>
        {loading?.id === id ? (
          <CircularProgress
            sx={{
              color: "#FFF",
            }}
            size={20}
            thickness={4}
            value={60}
          />
        ) : (
          title
        )}
      </Typography>
    </Button>
  );
};

export default memo(MarketCustomButton);
