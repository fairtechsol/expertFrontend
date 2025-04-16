import { Typography } from "@mui/material";
import { memo } from "react";
interface props {
  touched?: any;
  errors: any;
  style?: React.CSSProperties;
}

const CustomErrorMessage = ({ touched, errors, style }: props) => {
  const inlineStyle: React.CSSProperties = {
    ...style,
  };
  return (
    <>
      {touched && errors && (
        <Typography
          sx={{
            color: "#fa1e1e",
            position: "absolute",
            fontSize: "12px",
            wordBreak: "break-all",
            marginBottom: "10px",
          }}
          style={{ ...inlineStyle }}
        >
          {errors}
        </Typography>
      )}
    </>
  );
};

export default memo(CustomErrorMessage);
