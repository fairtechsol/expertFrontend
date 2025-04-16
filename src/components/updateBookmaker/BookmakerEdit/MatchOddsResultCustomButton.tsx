import { Button, CircularProgress, Typography } from "@mui/material";
import { memo } from "react";

interface Loading {
  id: string;
  value: boolean;
}

interface MatchOddsResultCustomButtonProps {
  title: string;
  color: string;
  id: string;
  loading: Loading;
  onClick: () => void;
}

const MatchOddsResultCustomButton = ({
  title,
  color,
  id,
  loading,
  onClick,
}: MatchOddsResultCustomButtonProps) => {
  return (
    <Button
      autoFocus={true}
      type="submit"
      onClick={onClick}
      sx={{
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
      }}
    >
      <Typography
        sx={{
          fontSize: "12px",
          fontWeight: "500",
          color: "white",
          lineHeight: 1,
        }}
      >
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

export default memo(MatchOddsResultCustomButton);
