import { Button, CircularProgress, Typography } from "@mui/material";

const SessionResultCustomButton = (props: any) => {
  const { id, title, color, loading, onClick, session } = props;
  return (
    <Button
      type="submit"
      onClick={onClick}
      sx={{
        width: session ? "40%" : "100%",
        cursor: "pointer",
        height: session ? "28px" : "30px",
        marginTop: session ? 0 : "-14px",
        borderRadius: "5px",
        background: color,
        "&:hover": { backgroundColor: color },
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        textTransform: "none",
             }}
    >
      <Typography sx={{ fontSize: "12px", fontWeight: "500", color: "white", lineHeight: "0.7" }}>
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

export default SessionResultCustomButton;
