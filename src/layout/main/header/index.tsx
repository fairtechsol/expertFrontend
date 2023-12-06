import { AppBar, Box, useMediaQuery, useTheme } from "@mui/material";
import { memo, useState } from "react";
import { NavLink } from "react-router-dom";
import { Draw, FgLogo, LockClosed } from "../../../assets/index";
import StyledImage from "../../../components/Common/StyledImages";
import ActiveUsers from "./ActiveUsers";
import AllMatch from "./AllMatch";
import ProfileDropdown from "./ProfileDropdown";
import "./index.css";

const Header = ({}) => {
  const theme = useTheme();
  const [selected, setSelected] = useState("Client list");
  const [anchor, setAnchor] = useState(null);
  const [anchor1, setAnchor1] = useState(null);
  const [xsOpen, setxsOpen] = useState(false);
  const matchesxs = useMediaQuery(theme.breakpoints.down("lg"));
  const currentSelected = 1;
  console.log(anchor, anchor1);

  const classes = {
    AppBarVal: { zIndex: (theme: any) => theme.zIndex.drawer + 1 },
    BoxCont1: [
      {
        width: "100%",
        minHeight: { lg: 60, md: 60, xs: 60 },
        display: "flex",
        flexDirection: matchesxs ? "column" : "row",
        alignItems: !matchesxs ? "center" : "flex-start",
        justifyContent: "space-between",
        paddingX: { lg: "2%", xs: "2%" },
        paddingY: matchesxs ? "9px" : "0px",
        paddingBottom: matchesxs ? "5px" : "0px",
      },
      (theme: any) => ({
        backgroundImage: `${theme.palette.primary.headerGradient}`,
      }),
    ],
    BoxCont1sub1: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      flex: 1,
    },
    BoxCont1sub1sub1: {
      display: "flex",
      alignItems: "center",
      marginRight: "12px",
    },
    BoxCont1sub1sub1StyleImg: {
      height: { lg: "24px", xs: "20px" },
      width: "auto",
      cursor: "pointer",
    },
    RenderLogoCompStyleImg: {
      height: { lg: "45px", xs: "30px" },
      width: "auto",
      marginTop: "12px",
      marginLeft: { lg: "20px", xs: "10px" },
    },
    BoxCont1sub1ButtonHead1boxStyle: {
      backgroundColor: "transparent",
      justifyContent: "center",
      borderRadius: "3px",
      marginLeft: "2%",
    },
    BoxCont1sub1LiveMarketboxStyle: {
      backgroundColor: currentSelected == 1 ? "white" : "transparent",
      borderRadius: "3px",
      justifyContent: "center",
      cursor: "pointer",
      alignItems: "center",
      marginLeft: "2%",
    },
    BoxCont1sub1ButtonHead2boxStyle: {
      backgroundColor: "transparent",
      borderRadius: "3px",
      marginLeft: "2%",
      justifyContent: "center",
    },
    BoxCont1sub1ButtonHeadtitleStylefn: (currentSelected: any, num: any) => {
      return { color: currentSelected == num ? "green" : "white" };
    },
    BoxCont1sub1ButtonHead3boxStyle: {
      backgroundColor: "transparent",
      borderRadius: "3px",
      marginLeft: "1.5%",
      justifyContent: "center",
    },
    BoxCont1sub1ButtonHead4boxStyle: {
      backgroundColor: "transparent",
      width: "90px",
      borderRadius: "3px",
      marginLeft: "1.5%",
      justifyContent: "space-around",
    },
    BoxCont1sub2: {
      width: "100%",
      display: "flex",
      marginLeft: { xs: 0, lg: 0, md: 0 },
      justifyContent: "flex-end",
      // minWidth: matchesxs ? "100%" : "0px",
      alignItems: "center",
      marginTop: matchesxs ? "0" : "0px",
    },
    BoxCont1sub2SearchInputContStyle: {
      height: "30px",
      minWidth: { lg: "100px", xs: "1.5vw" },
      width: "140px",
    },
    BoxCont1sub2BoxProfileContStyle: matchesxs ? { width: "52%" } : {},
    BoxEnd: {
      minHeight: {
        lg: 60,
        xs: "60px",
        md: "60px",
      },
    },
  };
  return (
    <>
      <AppBar position="fixed" sx={classes.AppBarVal} className="mainMenu">
        <Box sx={classes.BoxCont1}>
          <Box sx={[classes.BoxCont1sub1, { width: "90%" }]}>
            <Box sx={classes.BoxCont1sub1sub1}>
              <StyledImage
                src={Draw}
                onClick={() => setxsOpen((prev) => !prev)}
                sx={classes.BoxCont1sub1sub1StyleImg}
              />
              <StyledImage src={FgLogo} sx={classes.RenderLogoCompStyleImg} />
            </Box>
            <Box display="flex" alignItems="center" className="mainMenu-list">
              <AllMatch />
              <NavLink to="/">All Bets</NavLink>
              <NavLink className="matchList" to="/">
                Match List
              </NavLink>
            </Box>
            <Box sx={classes.BoxCont1sub2}>
              <ActiveUsers containerStyle={{}} image={LockClosed} value="6" />
              <ProfileDropdown
                containerStyle={{ marginTop: "0" }}
                image={"https://picsum.photos/200/300"}
                value="Bookmaker"
                // value={
                //   activeUser == 1
                //     ? "Session"
                //     : activeUser == 2
                //     ? "Bookmaker"
                //     : "Betfair"
                // }
                // value1={localCurrentUser?.userName || ""}
              />
              {/* <ProfileDropdown
                containerStyle={classes.BoxCont1sub2BoxProfileContStyle}
                image={"https://picsum.photos/200/300"}
                value={"User"}
                balance={"90000"}
              /> */}
            </Box>
          </Box>
        </Box>
        {/* <xsSideBar xsOpen={xsOpen} setxsOpen={setxsOpen} /> */}
      </AppBar>
      <Box sx={classes.BoxEnd} />
    </>
  );
};

export default memo(Header);
