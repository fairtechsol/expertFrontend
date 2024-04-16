import { Box, CircularProgress, Typography } from "@mui/material";

interface Props {
  type?: string;
  title?: string;
  onClick?: (value: any) => void;
  loading?: boolean;
  bgColor?: string;
  style?: React.CSSProperties;
  buttonStyle?: any;
  containerStyle?: any;
}
const CustomButton = ({
  title,
  onClick,
  loading,
  bgColor,
  style,
  containerStyle,
}: Props) => {
  const inlineStyle: React.CSSProperties = {
    ...style,
  };
  return (
    <Box
      onClick={onClick}
      sx={[
        containerStyle,
        {
          cursor: "pointer",
          height: "35px",
          minWidth: "100px",
          marginLeft: "10px",
          borderRadius: "5px",
          background: bgColor ? bgColor : "#0B4F26",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <Typography sx={{ color: "white", fontSize: {lg:"13px", xs: "10px", md: "10px"}, ...inlineStyle }}>
        {" "}
        {loading ? (
          <CircularProgress
            sx={{
              color: "#FFF",
            }}
            size={20}
            thickness={4}
            value={60}
          />
        ) : (
          title
        )}
      </Typography>
    </Box>
  );
};

export default CustomButton;
