import { Box, Input, Typography } from "@mui/material";
import { numberInputOnWheelPreventChange } from "../../helpers";

const MatchListInput = (props: any) => {
  const {
    value,
    required,
    label,
    labelStyle,
    type,
    disable,
    placeholder,
    ...prop
  } = props;

  const containerStyles: any = {
    width: "100%",
    flex: 1,
  };

  const titleStyles = {
    width: "100%",
    color: "#202020",
    fontSize: { xs: "12px", lg: "12px" },
    // fontWeight: "600",
    marginLeft: "0px",
  };

  const inputStyle = {
    width: "100%",
    fontSize: { xs: "14px", lg: "14px" },
    textTransform: "capitalize",
  };
  // const inputContainerStyle = {
  //   width: "100%",
  //   borderRadius: "5px",
  //   border: "1px solid #DEDEDE",
  // };

  return (
    <>
      <Typography
        style={{
          color: "#575757",
          fontSize: "12px",
          fontWeight: "600",
          ...labelStyle,
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          width: "100%",
          height: "40px",
          borderRadius: "5px",
          px: "10px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "white",
          backgroundColor: disable ? "#DCDCDC" : "",
        }}
      >
        <Input
          fullWidth
          inputProps={{ min: 0 }}
          disabled={disable}
          placeholder={`${placeholder}`}
          {...prop}
          required={required}
          onWheel={numberInputOnWheelPreventChange}
          type={type}
          value={value}
          onKeyDown={(e) => {
            // Check string not start with symbols
            if (/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(e.key)) {
              e.preventDefault();
            }
          }}
          sx={{
            borderRadius: "4px",
            backgroundColor: disable ? "#DCDCDC" : "",
            cursor: disable ? "not-allowed" : "text",
            zIndex: disable && 999,
            ...containerStyles,
            ...titleStyles,
            ...inputStyle,
          }}
        />
      </Box>
    </>
  );
};

export default MatchListInput;
