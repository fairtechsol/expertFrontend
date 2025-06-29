import { Box, Typography } from "@mui/material";
import { ARROWDROPDOWN } from "../../assets";

const ButtonHead = ({
  title,
  boxStyle,
  titleStyle,
  onClick,
  report,
  selected,
}: any) => {
  return (
    <Box
      onClick={(e) => onClick(e)}
      sx={[
        {
          paddingX: "7px",
          justifyContent: "space-between",
          alignItems: "center",
          display: "flex",
          flexDirection: "row",
        },
        boxStyle,
      ]}
    >
      <Typography
        sx={[
          {
            fontSize: { lg: "11px", xs: "8px" },
            fontWeight: "bold",
            fontFamily: "Poppins,sans-serif",
            lineHeight: 1,
          },
          titleStyle,
        ]}
      >
        {title}
      </Typography>

      {selected && report && (
        <img
          src={ARROWDROPDOWN}
          style={{ width: "10px", height: "6px", marginLeft: "4px" }}
        />
      )}
    </Box>
  );
};

export default ButtonHead;
