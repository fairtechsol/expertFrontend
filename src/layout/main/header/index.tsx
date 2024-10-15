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
// import DropDownMenu from "./DropDownMenu";
// import { getMatchListDropdown } from "../../../store/actions/match/matchAction";
import { socket, socketService } from "../../../socketManager";
import { getLoggedUserCount } from "../../../store/actions/user/userAction";
import GameTypeDropdown from "./GameTypeDropdown";
import { setSelectedTabForMatchList } from "../../../store/actions/match/matchAction";

const Header1 = () => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { profileDetail, loggedUserCount } = useSelector(
    (state: RootState) => state.user.profile
  );
  const [visible, setVisible] = useState(false);
  const [userCount, setUserCount] = useState<number>(0);
  const [currentSelected, setSelected] = useState<any>(4);
  const [anchor, setAnchor] = useState(null);
  const [anchor1, setAnchor1] = useState(null);
  const [gameType, setGameType] = useState(false);

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
      if (socket) {
        socketService.user.userCount(handleUserCount);
      }
    } catch (e) {
      console.log(e);
    }
  }, [socket]);

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
        <>
          <Loader />
        </>
      </ModalMUI>
      {/* <SessionTimeOut /> */}
      {!matchesMobile && (
        <>
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
                  display: "flex",
                  flexDirection: "row",
                  alignItems: !matchesMobile ? "center" : "flex-start",
                  justifyContent: "space-between",
                  paddingX: { lg: "0.5%", xs: "1%" },
                  // paddingY: matchesMobile ? "15px" : "0px",
                  height: "45px",
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
                      height: { lg: "16px", xs: "20px", md: "16px" },
                      width: "auto",
                    }}
                  />
                  <StyledImage
                    src={FgLogo}
                    onClick={(e: any) => {
                      e.stopPropagation();
                      navigate(`/expert/match`);
                    }}
                    sx={{
                      cursor: "pointer",
                      height: { lg: "40px", xs: "45px", md: "40px" },
                      width: "auto",
                      marginLeft: { lg: "20px", xs: "10px" },
                    }}
                  />
                </Box>
                <>
                  {(profileDetail?.bookmakerMatchPrivilege ||
                    profileDetail?.sessionMatchPrivilege ||
                    profileDetail?.allPrivilege) && (
                    <ButtonHead
                      onClick={(e: any) => {
                        setGameType(true);
                        setSelected(1);
                        setAnchor1(e?.currentTarget);
                      }}
                      title={!dropDownLoading ? "ALL MATCH" : "Loading..."}
                      boxStyle={{
                        backgroundColor:
                          currentSelected == 1 && (gameType || anchor)
                            ? "white"
                            : "transparent",
                        py: "5px",
                        borderRadius: "5px",
                        marginLeft: { lg: "15px", xs: "1px" },
                        cursor: "pointer",
                      }}
                      titleStyle={{
                        color:
                          currentSelected == 1 && (gameType || anchor)
                            ? "green"
                            : "white",
                      }}
                    />
                  )}
                  <NavLink
                    to={"/expert/match"}
                    style={{ textDecoration: "none" }}
                  >
                    <ButtonHead
                      onClick={() => {
                        setSelected(4);
                        dispatch(setSelectedTabForMatchList(0));
                      }}
                      title={"MATCH LIST"}
                      boxStyle={{
                        backgroundColor:
                          window.location.pathname.split("/")[2] == "match"
                            ? "white"
                            : "transparent",
                        py: "5px",
                        borderRadius: "5px",
                        marginLeft: { lg: "15px", xs: "1px" },
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
                  <NavLink
                    to={"/expert/race/horseRacing"}
                    style={{ textDecoration: "none" }}
                  >
                    <ButtonHead
                      onClick={() => {
                        // setSelected(4);
                      }}
                      title={"RACE LIST"}
                      boxStyle={{
                        backgroundColor:
                          window.location.pathname.split("/")[2] == "race"
                            ? "white"
                            : "transparent",
                        py: "5px",
                        borderRadius: "5px",
                        marginLeft: { lg: "15px", xs: "1px" },
                        cursor: "pointer",
                      }}
                      titleStyle={{
                        color:
                          window.location.pathname.split("/")[2] == "race"
                            ? "green"
                            : "white",
                      }}
                    />
                  </NavLink>
                  <NavLink
                    to={"/expert/tab"}
                    style={{ textDecoration: "none" }}
                  >
                    <ButtonHead
                      onClick={() => {
                        // setSelected(4);
                      }}
                      title={"TAB LIST"}
                      boxStyle={{
                        backgroundColor:
                          window.location.pathname.split("/")[2] == "tab"
                            ? "white"
                            : "transparent",
                        py: "5px",
                        borderRadius: "5px",
                        marginLeft: { lg: "15px", xs: "1px" },
                        cursor: "pointer",
                      }}
                      titleStyle={{
                        color:
                          window.location.pathname.split("/")[2] == "tab"
                            ? "green"
                            : "white",
                      }}
                    />
                  </NavLink>
                </>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    flex: 1,
                    minWidth: matchesMobile ? "0%" : "0px",
                    alignItems: "center",
                    marginTop: "0px",
                    flexDirection: "row",
                  }}
                >
                  <Box
                    onClick={() => {
                      setVisible(true);
                    }}
                    sx={{
                      height: "30px",
                      width: "30px",
                      borderRadius: "35px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "white",
                      // marginTop: { xs: "10px" },
                      marginLeft: "10px",
                    }}
                  >
                    <StyledImage
                      src={NotiBadge}
                      sx={{ height: "15px", width: "15px" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      // marginTop: { xs: "10px" },
                    }}
                  >
                    <ActiveUsers
                      containerStyle={{}}
                      image={Users}
                      value={userCount}
                    />
                    <BoxProfile
                      containerStyle={{
                        marginTop: { xs: "0px" },
                        alignItems: "center",
                      }}
                      image={"https://picsum.photos/200/300"}
                      value1={profileDetail?.userName}
                    />
                  </Box>
                </Box>
              </Box>
              {/* {matchListDropdown?.length > 0 && (
                <DropDownMenu
                  sx={{ alignItems: "center" }}
                  anchorEl={anchor}
                  open={Boolean(anchor)}
                  allMatch={matchListDropdown}
                  handleClose={() => {
                    setAnchor(null);
                  }}
                />
              )} */}
            </Box>
          </AppBar>
          <Box sx={{ minHeight: { lg: 44, md: 35, xs: 80 } }} />
        </>
      )}
      {matchesMobile && (
        <>
          <AppBar
            position="fixed"
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          >
            <NotificationModal setVisible={setVisible} visible={visible} />
            <Box
              sx={[
                {
                  width: "100%",
                  minHeight: { lg: 66, md: 80, xs: 60 },
                  display: "flex",
                  flexDirection: {
                    lg: "row",
                    xs: "column",
                    sm: "column",
                    md: "",
                  },
                  alignItems: !matchesMobile ? "center" : "flex-start",
                  justifyContent: "space-between",
                  paddingX: { lg: "0.5%", xs: "2%" },
                  paddingY: "6px",
                  paddingBottom: "4px",
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
                  justifyContent: "space-between",
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
                      height: { lg: "24px", xs: "10px" },
                      width: "auto",
                    }}
                  />
                  <StyledImage
                    src={FgLogo}
                    onClick={(e: any) => {
                      e.stopPropagation();
                      navigate(`/expert/match`);
                    }}
                    sx={{
                      cursor: "pointer",
                      height: { lg: "55px", xs: "30px" },
                      width: "auto",
                      marginLeft: { lg: "20px", xs: "10px" },
                    }}
                  />
                </Box>
                <>
                  <Box
                    sx={{
                      display: "flex",
                    }}
                  >
                    <BoxProfile
                      containerStyle={{ marginTop: "0" }}
                      image={"https://picsum.photos/200/300"}
                      value1={profileDetail?.userName}
                    />
                  </Box>
                </>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flex: 1,
                  alignItems: "center",
                  flexDirection: "row",
                  width: "100%",
                }}
              >
                <Box sx={{ display: "flex" }}>
                  <Box
                    onClick={() => {
                      setVisible(true);
                    }}
                    sx={{
                      height: { lg: "45px", xs: "25px" },
                      width: "25px",
                      borderRadius: "25px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "white",
                      // marginLeft: "4vh"
                    }}
                  >
                    <StyledImage
                      src={NotiBadge}
                      sx={{ height: "15px", width: "15px" }}
                    />
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <ActiveUsers
                      containerStyle={{}}
                      image={Users}
                      value={userCount}
                    />
                  </Box>
                </Box>

                <Box>
                  <Box sx={{ display: "flex" }}>
                    {(profileDetail?.bookmakerMatchPrivilege ||
                      profileDetail?.sessionMatchPrivilege ||
                      profileDetail?.allPrivilege) && (
                      <ButtonHead
                        onClick={(e: any) => {
                          setGameType(true);
                          setSelected(1);
                          setAnchor1(e?.currentTarget);
                        }}
                        title={!dropDownLoading ? "ALL MATCH" : "Loading..."}
                        boxStyle={{
                          backgroundColor:
                            currentSelected == 1 && (gameType || anchor)
                              ? "white"
                              : "transparent",
                          // py: "5px",
                          borderRadius: "5px",
                          marginLeft: { lg: "15px", xs: "15px" },
                          cursor: "pointer",
                        }}
                        titleStyle={{
                          color:
                            currentSelected == 1 && (gameType || anchor)
                              ? "green"
                              : "white",
                        }}
                      />
                    )}

                    <NavLink
                      to={"/expert/match"}
                      style={{ textDecoration: "none" }}
                    >
                      <ButtonHead
                        onClick={() => {
                          setSelected(4);
                          dispatch(setSelectedTabForMatchList(0));
                        }}
                        title={"MATCH LIST"}
                        boxStyle={{
                          backgroundColor:
                            window.location.pathname.split("/")[2] == "match"
                              ? "white"
                              : "transparent",
                          py: "5px",
                          borderRadius: "5px",
                          marginLeft: { lg: "15px", xs: "1px" },
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

                    <NavLink
                      to={"/expert/race/horseRacing"}
                      style={{ textDecoration: "none" }}
                    >
                      <ButtonHead
                        onClick={() => {
                          // setSelected(4);
                        }}
                        title={"RACE LIST"}
                        boxStyle={{
                          backgroundColor:
                            window.location.pathname.split("/")[2] == "race"
                              ? "white"
                              : "transparent",
                          py: "5px",
                          borderRadius: "5px",
                          marginLeft: { lg: "15px", xs: "1px" },
                          cursor: "pointer",
                        }}
                        titleStyle={{
                          color:
                            window.location.pathname.split("/")[2] == "race"
                              ? "green"
                              : "white",
                        }}
                      />
                    </NavLink>

                    <NavLink
                      to={"/expert/tab"}
                      style={{ textDecoration: "none" }}
                    >
                      <ButtonHead
                        onClick={() => {
                          // setSelected(4);
                        }}
                        title={"TAB LIST"}
                        boxStyle={{
                          backgroundColor:
                            window.location.pathname.split("/")[2] == "tab"
                              ? "white"
                              : "transparent",
                          py: "5px",
                          borderRadius: "5px",
                          marginLeft: { lg: "15px", xs: "1px" },
                          cursor: "pointer",
                        }}
                        titleStyle={{
                          color:
                            window.location.pathname.split("/")[2] == "tab"
                              ? "green"
                              : "white",
                        }}
                      />
                    </NavLink>
                  </Box>
                </Box>
              </Box>
            </Box>
          </AppBar>

          <Box sx={{ minHeight: { lg: 66, sm: 60, md: 80, xs: 60 } }} />
        </>
      )}
      {/* {matchListDropdown?.length > 0 && (
        <DropDownMenu
          anchorEl={anchor}
          open={Boolean(anchor)}
          allMatch={matchListDropdown}
          handleClose={() => {
            setAnchor(null);
          }}
        />
      )} */}
      {gameType && (
        <GameTypeDropdown
          anchorEl={anchor1}
          open={Boolean(anchor1)}
          allMatch={matchListDropdown}
          anchorrr={setAnchor}
          handleClose={() => {
            setAnchor1(null);
            setGameType(false);
          }}
        />
      )}
    </>
  );
};

export default Header1;
