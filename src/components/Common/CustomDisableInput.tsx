import { TextField, styled } from "@mui/material";

const CustomDisableInput = styled(TextField)(() => ({
  ".MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#000 !important",
    color: "#000",
  },
}));

export default CustomDisableInput;
