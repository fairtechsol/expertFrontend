import {
  Box,
  CircularProgress,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../store/actions/auth/authAction";
import { AppDispatch, RootState } from "../../../store/store";

const menutItems = [
  {
    id: 1,
    title: "Add Match",
    navigateTo: "add_match",
  },
  { id: 2, title: "Add Race", navigateTo: "add_race" },
  { id: 3, title: "Change Password", navigateTo: "change-password" },
];
const HeaderDropdown = ({ anchorEl, open, handleClose }: any) => {
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

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
      {menutItems.map((x: any) => {
        if (x?.title === "Add Match") {
          return (
            <div key={x?.id}>
              {(profileDetail?.allPrivilege ||
                profileDetail?.addMatchPrivilege) && (
                <MenuItem
                  key={x?.id}
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
              )}
            </div>
          );
        } else {
          return (
            <MenuItem
              key={x?.id}
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
          );
        }
      })}
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

export default memo(HeaderDropdown);
