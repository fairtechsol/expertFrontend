import { Switch, Theme, styled } from "@mui/material";

export const MaterialUISwitch = styled(Switch)(({}: { theme: Theme }) => ({
  width: 50,
  height: 35,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    marginTop: "8px",
    marginRight: "1px",
    padding: 0,
    paddingLeft: "3px",
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#10DC61",
      transform: "translateX(20px)",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "white",
      },
      "& .MuiSwitch-thumb": {
        backgroundColor: "#10DC61",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#FF4D4D",
    width: 18,
    height: 18,
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
    },
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "white",
    borderRadius: 20,
  },
}));
