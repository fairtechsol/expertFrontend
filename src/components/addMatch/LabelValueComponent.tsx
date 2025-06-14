import { Box, Typography } from "@mui/material";
import ShowComponent from "./ShowComponent";

const LabelValueComponent = (props: any) => {
  const {
    title,
    value,
    icon,
    containerStyle,
    valueStyle,
    valueContainerStyle,
    InputValType,
    place,
    DetailError,
    type,
    required,
    notShowSub,
    titleSize,
    headColor,
    disable,
  } = props;
  return (
    <Box className="beFairMatch" sx={[containerStyle]}>
      <Typography
        sx={{
          fontSize: titleSize ? titleSize : "12px",
          fontWeight: "600",
          color: headColor ? headColor : "#575757",
        }}
      >
        {title}
      </Typography>
      {!notShowSub && (
        <ShowComponent
          disable={disable}
          title={title}
          required={required}
          InputValType={InputValType}
          value={value}
          valueContainerStyle={valueContainerStyle}
          valueStyle={valueStyle}
          icon={icon}
          place={place}
          DetailError={DetailError}
          type={type}
        />
      )}
    </Box>
  );
};

export default LabelValueComponent;
