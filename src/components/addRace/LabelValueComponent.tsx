import { Box, Typography } from "@mui/material";
import { memo } from "react";

interface LabelValueComponentProps {
  title: string;
  titleSize: string;
  headColor: string;
}

const LabelValueComponent = ({
  title,
  titleSize,
  headColor,
}: LabelValueComponentProps) => {
  return (
    <Box className="beFairMatch">
      <Typography
        sx={{
          fontSize: titleSize ? titleSize : "12px",
          fontWeight: "600",
          color: headColor ? headColor : "#575757",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default memo(LabelValueComponent);
