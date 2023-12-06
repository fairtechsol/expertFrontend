import { useState } from "react";
// import { GlobalStore } from "../../context/globalStore";
// import { SocketContext } from "../../context/socketContext";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

import {
  Box,
  CircularProgress,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";

const menutItems = [
  { title: "Bet Odds", navigateTo: "betodds" },
  { title: "Market", navigateTo: "market" },
  { title: "Add Book Maker", navigateTo: "add_book_maker" },
  { title: "Add Match", navigateTo: "add_match" },
  { title: "Change Password", navigateTo: "change_password" },
];
const HeaderDropdown = (props: any) => {
  const { anchorEl, open, handleClose } = props;

  const [loading] = useState(false);

  //   const { globalStore, setGlobalStore } = useContext(GlobalStore);
  //   const { socket, socketMicro } = useContext(SocketContext);
  const navigate = useNavigate();
  //   const dispatch = useDispatch();

  return (
    <Menu
      id="account-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: "visible",
          filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
          mt: 1.5,
          "& .MuiAvatar-root": {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {menutItems.map((x, i) => (
        <MenuItem
          key={i}
          dense={true}
          sx={{
            fontSize: { lg: "12px", xs: "10px" },
            fontWeight: "500",
            marginX: "5px",
            width: { lg: "200px", xs: "200px" },
            borderBottomWidth: 1,
            borderColor: "#EAEFEC",
            paddingY: "2px",
            borderStyle: "solid",
            "&:hover": {
              backgroundColor: "primary.main",
              color: "white",
              borderColor: "white",
              borderRadius: "5px",
              transform: "scale(1.02)",
            },
          }}
          onClick={() => handleClose(x.navigateTo)}
        >
          {x.title}
        </MenuItem>
      ))}
      <Box
        onClick={() => {
          if (!loading) {
            navigate("/");
          } else {
            return false;
          }
        }}
        sx={{
          borderRadius: "5px",
          height: { lg: "38px", xs: "34px" },
          width: "200px",
          marginLeft: "5px",
          marginTop: "10px",
          backgroundColor: "#F1C550",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
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
          //   <StyledImage src={Logout} sx={{ width: "35%", height: "auto" }} />
          <Typography>Logout</Typography>
        )}
      </Box>
    </Menu>
  );
};

export default HeaderDropdown;
