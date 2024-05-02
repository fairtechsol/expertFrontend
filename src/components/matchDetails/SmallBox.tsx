import { Box, CircularProgress, Typography } from "@mui/material";
import { BroadCast } from "../../assets";

const SmallBox = ({
  color,
  title,
  width,
  textSize,
  onClick,
  hide,
  customStyle,
  loading,
}: any) => {
  return (
    <>
      <Box
        onClick={onClick}
        sx={[
          {
            width: { lg: width ? width : "60px", xs: width ? width : "25%" },
            display: "flex",
            marginRight: "10px",
            justifyContent: "space-between",
            paddingX: 1,
            alignItems: "center",
            height: "32px",
            background: color ? color : "#46e080",
            borderRadius: "3px",
            cursor: "pointer",
          },
          customStyle,
        ]}
      >
        <Typography
          sx={{
            fontSize: {
              lg: textSize ? textSize : "11px",
              xs: textSize ? textSize : "10px",
            },
            fontWeight: "600",
            color: color !== "#FFF" ? "white" : "",
            lineHeight: 1,
          }}
        >
          {loading ? (
            <CircularProgress
              sx={{
                color: "#FFF",
              }}
              size={14}
              thickness={2}
              value={60}
            />
          ) : (
            title
          )}
        </Typography>
        {hide && !loading && (
          <img src={BroadCast} style={{ height: "15px", width: "15px" }} />
        )}
      </Box>
    </>
  );
};

export default SmallBox;
