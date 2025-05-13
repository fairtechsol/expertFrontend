import { Box } from "@mui/material";
import { memo } from "react";
import "./styles.css";

interface LoaderProps {
  height?: string;
}

const Loader = ({ height }: LoaderProps) => {
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        flex: 1,
        height: height ? height : "74%",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div className="loading-wrap">
        <div className="loading">
          <div />
          <div />
        </div>
      </div>
      {/* <Typography sx={{ marginTop: "-40px" }}>{text}</Typography> */}
    </Box>
  );
};

export default memo(Loader);
