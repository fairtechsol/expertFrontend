import { AppBar, Box, useMediaQuery, useTheme } from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { Draw, FgLogo, NotiBadge, Users } from "../../../assets";
import StyledImage from "../../../components/Common/StyledImages";
import Loader from "../../../components/Loader";
import ButtonHead from "../../../components/header/ButtonHead";
import NotificationModal from "../../../components/header/NotificationModal";
import { AppDispatch, RootState } from "../../../store/store";
import ActiveUsers from "./ActiveUsers";
import BoxProfile from "./BoxProfile";
import DropDownMenu from "./DropDownMenu";
import { getMatchListDropdown } from "../../../store/actions/match/matchAction";
import { socketService } from "../../../socketManager";
import { getLoggedUserCount } from "../../../store/actions/user/userAction";

const Header1 = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { getProfile, loggedUserCount } = useSelector(
    (state: RootState) => state.user.profile
  );
  const [visible, setVisible] = useState(false);
  const [userCount, setUserCount] = useState<number>(0);
  const [currentSelected, setSelected] = useState<any>(4);
  const [anchor, setAnchor] = useState(null);

  const { matchListDropdown, dropDownLoading } = useSelector(
    (state: RootState) => state.matchList
  );

  const handleUserCount = (event: any) => {
    setUserCount(event);
  };

  useEffect(() => {
    try {
      if (loggedUserCount) {
        setUserCount(loggedUserCount);
      }
    } catch (e) {
      console.log(e);
    }
  }, [loggedUserCount]);

  useEffect(() => {
    try {
      dispatch(getLoggedUserCount());
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      socketService.user.userCount(handleUserCount);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <>
      <ModalMUI
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          backgroundColor: "white",
          "& > .MuiBackdrop-root": {
            backdropFilter: "blur(2px)",
            backgroundColor: "white",
          },
        }}
        open={false}
        // onClose={setSelected}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Loader />
      </ModalMUI>
      {/* <SessionTimeOut /> */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        {/* <IdleTimer role="" /> */}
        <NotificationModal setVisible={setVisible} visible={visible} />
        <Box
          sx={[
            {
              width: "100%",
              minHeight: { lg: 66, md: 80, xs: 60 },
              display: "flex",
              flexDirection: matchesMobile ? "column" : "row",
              alignItems: !matchesMobile ? "center" : "flex-start",
              justifyContent: "space-between",
              paddingX: { lg: "0.5%", xs: "1%" },
              paddingY: matchesMobile ? "15px" : "0px",
              paddingBottom: matchesMobile ? "10px" : "0px",
            },
            (theme: any) => ({
              backgroundImage: `${theme.palette.primary.headerGradient}`,
            }),
          ]}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              flex: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginRight: "12px",
              }}
            >
              <StyledImage
                onClick={() => {
                  //   setMobileOpen(!mobileOpen);
                }}
                src={Draw}
                sx={{
                  height: { lg: "24px", xs: "20px" },
                  width: "auto",
                }}
              />
              <StyledImage
                src={FgLogo}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/expert/match`);
                }}
                sx={{
                  cursor: "pointer",
                  height: { lg: "45px", xs: "40px" },
                  width: "auto",
                  marginLeft: { lg: "20px", xs: "10px" },
                }}
              />
            </Box>
            <>
              {(getProfile?.bookmakerMatchPrivilege ||
                getProfile?.sessionMatchPrivilege ||
                getProfile?.allPrivilege) && (
                <ButtonHead
                  onClick={(e: any) => {
                    setSelected(1);
                    dispatch(getMatchListDropdown());
                    setAnchor(e?.currentTarget);
                  }}
                  title={!dropDownLoading ? "ALL MATCH" : "Loading..."}
                  boxStyle={{
                    backgroundColor:
                      currentSelected == 1 ? "white" : "transparent",
                    py: "5px",
                    borderRadius: "5px",
                    marginLeft: "15px",
                    cursor: "pointer",
                  }}
                  titleStyle={{
                    color: currentSelected == 1 ? "green" : "white",
                  }}
                />
              )}

              <NavLink to={"/expert/match"} style={{ textDecoration: "none" }}>
                <ButtonHead
                  onClick={() => {
                    setSelected(4);
                  }}
                  title={"MATCH LIST"}
                  boxStyle={{
                    backgroundColor:
                      window.location.pathname.split("/")[2] == "match"
                        ? "white"
                        : "transparent",
                    py: "5px",
                    borderRadius: "5px",
                    marginLeft: "15px",
                    cursor: "pointer",
                  }}
                  titleStyle={{
                    color:
                      window.location.pathname.split("/")[2] == "match"
                        ? "green"
                        : "white",
                  }}
                />
              </NavLink>
            </>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              minWidth: matchesMobile ? "100%" : "0px",
              alignItems: "center",
              marginTop: matchesMobile ? "15px" : "0px",
            }}
          >
            <Box
              onClick={() => {
                setVisible(true);
              }}
              sx={{
                height: "45px",
                width: "45px",
                borderRadius: "35px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "white",
              }}
            >
              <StyledImage
                src={NotiBadge}
                sx={{ height: "25px", width: "25px" }}
              />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ActiveUsers
                containerStyle={{}}
                image={Users}
                value={userCount}
              />
              <BoxProfile
                containerStyle={{ marginTop: "0" }}
                image={"https://picsum.photos/200/300"}
                value1={getProfile?.userName}
              />
            </Box>
          </Box>
        </Box>
      </AppBar>
      <Box sx={{ minHeight: { lg: 66, xs: 60 + 32 + 42 } }} />
      {matchListDropdown?.length > 0 && (
        <DropDownMenu
          anchorEl={anchor}
          open={Boolean(anchor)}
          allMatch={matchListDropdown}
          handleClose={() => {
            setAnchor(null);
          }}
        />
      )}
    </>
  );
};

export default Header1;
