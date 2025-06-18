import { Box, Typography } from "@mui/material";
import { memo } from "react";

interface ButtonHeadProps {
  title: string;
  boxStyle: object;
  titleStyle: object;
  onClick: (val: any) => void;
}

const ButtonHead = ({
  title,
  boxStyle,
  titleStyle,
  onClick,
}: ButtonHeadProps) => {
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
    </Box>
  );
};

export default memo(ButtonHead);
