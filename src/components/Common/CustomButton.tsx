import { Button, CircularProgress, Typography } from "@mui/material";

const CustomButton = (props: any) => {
  const {
    title,
    containerStyle,
    icon,
    onClick,
    isSelected,
    deleteBtn,
    titleStyle,
    loading,
    type,
    color,
  } = props;
  const classes = {
    mainBox: [
      {
        background: isSelected ? color : color,
        "&:hover": {
          background: isSelected ? color : color,
        },
        border:
          isSelected || deleteBtn ? `2px solid ${color}` : `2px solid ${color}`,
        display: "flex",
        justifyContent: "center",
        height: "45px",
        cursor: "pointer",
        alignItems: "center",
        borderRadius: "5px",
        padding: "5px",
        flex: { xs: " 0 0 43% ", lg: "1 " },
        maxWidth: "46% !important",
        textTransform: "capitalize",
      },
      containerStyle,
    ],
    mainBoxTypography: [
      {
        fontSize: {
          xs: "3.5vw",
          lg: "11px",
          md: "0.9vw",
          desktop2XL: "12px",
        },
        fontWeight: "600",
        color: isSelected || deleteBtn ? "white" : "white",
        textAlign: "center",
      },
      titleStyle,
    ],
  };
  return (
    <Button type={type} onClick={onClick} sx={classes.mainBox}>
      <Typography sx={classes.mainBoxTypography}>
        {loading ? (
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
        {icon}
      </Typography>
    </Button>
  );
};

export default CustomButton;
