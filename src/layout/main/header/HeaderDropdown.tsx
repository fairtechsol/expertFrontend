import { useState } from "react";
import {
  Box,
  CircularProgress,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { logout } from "../../../store/actions/auth/authAction";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";

const menutItems = [
  // { title: "Bet Odds", navigateTo: "betodds" },
  // { title: "Market", navigateTo: "add_book_maker" },
  // { title: "Add Book Maker", navigateTo: "add_book_maker" },
  { title: "Add Match", navigateTo: "add_match", privilege: "bookmakerMatchPrivilege" },
  { title: "Change Password", navigateTo: "change-password" },
];
const HeaderDropdown = (props: any) => {
  const { anchorEl, open, handleClose } = props;
  const { getProfile } = useSelector((state: RootState) => state.user.profile);
  const [loading] = useState(false);
  const dispatch: AppDispatch = useDispatch();

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
        x.privilege === "Add Match" && (getProfile?.bookmakerMatchPrivilege || getProfile?.sessionMatchPrivilege) ? null : (
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
        )
      ))}
      <Box
        onClick={() => {
          dispatch(logout());
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
          <Typography>Logout</Typography>
        )}
      </Box>
    </Menu>
  );
};

export default HeaderDropdown;
