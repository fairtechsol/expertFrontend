import { Box, Button, Input, Typography } from "@mui/material";
import StyledImage from "../Common/StyledImages";
import { DatePicker } from "rsuite";

const containerStyles: any = {
  width: "100%",
  marginTop: "10px",
};
const titleStyles = {
  width: "100%",
  color: "#202020",
  fontSize: { xs: "12px", lg: "12px" },
  fontWeight: "600",
  marginLeft: "0px",
};
const inputStyle = {
  width: "100%",
  fontSize: { xs: "14px", lg: "14px", fontWeight: "600" },
  textTransform: "capitalize",
};
const inputContainerStyle = {
  width: "100%",
  borderRadius: "5px",
  border: "1px solid #DEDEDE",
};

const ShowComponent = ({
  InputValType,
  value,
  valueContainerStyle,
  valueStyle,
  icon,
  required,
  title,
  type,
  disable,
}: any) => {
  const date = new Date();
  switch (InputValType) {
    case "InputVal":
      return (
        <Box
          sx={[
            {
              width: "100%",
              height: "40px",
              borderRadius: "5px",
              px: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "white",
            },
            valueContainerStyle,
          ]}
        >
          <Input
            fullWidth
            inputProps={{ min: 0 }}
            disabled={disable}
            placeholder={`${value}`}
            // value={DetailError.Detail[place]?.val}
            containerStyle={containerStyles}
            titleStyle={titleStyles}
            inputStyle={inputStyle}
            inputContainerStyle={inputContainerStyle}
            title={title}
            required={required}
            type={type}
            onKeyDown={(e) => {
              // Check string not start with symbols
              if (/^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(e.key)) {
                e.preventDefault();
              }
            }}
          />
        </Box>
      );
    case "FileSelectVal":
      return (
        <Button
          variant="contained"
          component="label"
          sx={[
            {
              height: "35px",
              borderRadius: "5px",
              px: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#0B4F26",
            },
            valueContainerStyle,
          ]}
        >
          Upload
          <input
            hidden
            accept="image/*"
            multiple
            type="file"
            onChange={() => {
              //   fileUpload(e, place, DetailError);
            }}
          />
          {icon && (
            <StyledImage src={icon} sx={{ height: "12px", width: "12px" }} />
          )}
        </Button>
      );
    case "DatePickerVal":
      return (
        <DatePicker
          disabled={disable}
          style={{ width: "100%" }}
          format="yyyy-MM-dd HH:mm"
          value={date}
        />
      );
    default:
      return (
        <Box
          sx={[
            {
              height: "35px",
              borderRadius: "5px",
              px: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "white",
            },
            valueContainerStyle,
          ]}
        >
          <Typography sx={[valueStyle, inputStyle]}>{value}</Typography>
          {icon && (
            <StyledImage src={icon} sx={{ height: "12px", width: "12px" }} />
          )}
        </Box>
      );
  }
};

export default ShowComponent;
