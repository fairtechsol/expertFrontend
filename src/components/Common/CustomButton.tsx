import { Box, CircularProgress, Typography } from "@mui/material";

interface Props {
  title: string;
  onClick: (value: any) => void;
  loading?: boolean;
}
const CustomButton = ({ title, onClick, loading }: Props) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: "pointer",
        height: "35px",
        minWidth: "100px",
        marginLeft: "10px",
        borderRadius: "5px",
        background: "#0B4F26",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography sx={{ color: "white", fontSize: "13px" }}>
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
