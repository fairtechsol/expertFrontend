import { Box } from "@mui/material";
import { useRef } from "react";
import { LoginBg } from "../../assets";

const AuthBackground = () => {
  const containerRef = useRef(null);

  return (
    <Box
      ref={containerRef}
      style={{
        height: "100vh",
        width: "100vw",
        position: "absolute",
        zIndex: 0,
        top: 0,
        left: 0,
        backgroundImage: `url(${LoginBg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100vw 100vh",
      }}
    />
  );
};

export default AuthBackground;
