import { Box, Typography } from "@mui/material";

const LabelValueComponent = ({
  title,
  titleSize,
  headColor,
}: any) => {
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

export default LabelValueComponent;
