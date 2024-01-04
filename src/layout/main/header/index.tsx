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

const Header1 = () => {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const [activeUser] = useState<any>("2");
  const [userCount, setUserCount] = useState<number>(0);
  const [currentSelected, setSelected] = useState<any>(4);
  const [anchor, setAnchor] = useState(null);

  const { getProfile } = useSelector((state: RootState) => state.user.profile);
  const { matchListDropdown } = useSelector(
    (state: RootState) => state.matchList
  );

  useEffect(() => {
    socketService.user.userCount(setUserCount);
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
            {activeUser != 1 && activeUser != "2" && (
              <ButtonHead
                onClick={() => {
                  setSelected(0);
                  navigate("/expert/home");
                }}
                title={"ADD MATCH"}
                boxStyle={{
                  backgroundColor:
                    currentSelected == 0 ? "white" : "transparent",
                  py: "5px",
                  borderRadius: "5px",
                  marginLeft: "15px",
                }}
                titleStyle={{ color: currentSelected == 0 ? "green" : "white" }}
              />
            )}
            {(activeUser == 1 || activeUser == "2" || activeUser == "3") && (
              <>
                <ButtonHead
                  onClick={(e: any) => {
                    setSelected(1);
                    if (activeUser == "3") {
                      return;
                    }
                    dispatch(getMatchListDropdown());
                    setAnchor(e.currentTarget);
                  }}
                  title={"ALL MATCH"}
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
                {activeUser != "3" && (
                  <NavLink
                    to={"/expert/live"}
                    style={{ textDecoration: "none" }}
                  >
                    <ButtonHead
                      onClick={() => {
                        setSelected(5);
                      }}
                      title={"ALL BET"}
                      boxStyle={{
                        backgroundColor:
                          currentSelected == 5 ? "white" : "transparent",
                        py: "5px",
                        borderRadius: "5px",
                        marginLeft: "15px",
                        cursor: "pointer",
                      }}
                      titleStyle={{
                        color: currentSelected == 5 ? "green" : "white",
                      }}
                    />
                  </NavLink>
                )}
                {
                  <NavLink
                    to={"expert/match"}
                    style={{ textDecoration: "none" }}
                  >
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
                }
              </>
            )}
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
                value={
                  activeUser == 1
                    ? "Session"
                    : activeUser == 2
                    ? "Bookmaker"
                    : "Betfair"
                }
                value1={getProfile?.userName}
                // value1={"User"}
              />
            </Box>
          </Box>
        </Box>
      </AppBar>
      {/* {false && !/createTransPassword/.test(window.location.pathname) && (
        // <ThisUseModal
        //   message="You don't have transaction password"
        //   buttonMessage="Create Transaction Password"
        //   navigateTo="createTransPassword"
        // />
      )} */}
      <Box sx={{ minHeight: { lg: 66, xs: 60 + 32 + 42 } }} />
      <DropDownMenu
        anchorEl={anchor}
        open={Boolean(anchor)}
        allMatch={matchListDropdown}
        handleClose={() => {
          setAnchor(null);
        }}
      />
    </>
  );
};

export default Header1;
