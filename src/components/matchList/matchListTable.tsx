import { Box, Typography, useMediaQuery } from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DownGIcon } from "../../assets";
import { getMatchListSessionProfitLoss } from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import theme from "../../theme";
import CustomButton from "../Common/CustomButton";
import StyledImage from "../Common/StyledImages";
import MatchPermissionsModal from "./matchPermissionsModal";
import MatchListProfitLoss from "./profitLoss";
import SessionResultComponent from "./sessionResultComponent";
import { IconConstants } from "../helper/gameConstants";
import { Constants } from "../../utils/Constants";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds?: string;
}

const MatchListTable = (props: any) => {
  const { data, index, currentPage } = props;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const { sessionProLoss } = useSelector((state: RootState) => state.matchList);
  const [showPopup, setShowPopup] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const [updateBettings, setUpdateBettings] = useState<any>([]);

  const [updateMatchStatus, setUpdateMatchStatus] = useState({
    1: {
      field: "apiSessionActive",
      val: data?.apiSessionActive,
    },
    2: {
      field: "manualSessionActive",
      val: data?.manualSessionActive,
    },
  });

  const handleMatchProfitLossClick = (id: any) => {
    try {
      setShowPopup(true);
      dispatch(getMatchListSessionProfitLoss(id));
    } catch (e) {
      console.log(e);
    }
  };

  function calculateTimeLeft(): TimeLeft {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const targetDate = moment(data?.startAt).tz(timezone);
    const difference = targetDate.diff(moment().tz(timezone), "milliseconds");
    let timeLeft: TimeLeft = {
      days: "",
      hours: "",
      minutes: "",
    }; // Initialize with the defined type

    if (difference > 0) {
      timeLeft = {
        days:
          ("0" + Math.floor(difference / (1000 * 60 * 60 * 24))).slice(-2) ||
          "00",
        hours:
          ("0" + Math.floor((difference / (1000 * 60 * 60)) % 24)).slice(-2) ||
          "00",
        minutes:
          ("0" + Math.floor((difference / 1000 / 60) % 60)).slice(-2) || "00",
        seconds: ("0" + Math.floor((difference / 1000) % 60)).slice(-2) || "00",
      };
    } else {
      timeLeft = {
        days: "00",
        hours: "00",
        minutes: "00",
      };
    }

    return timeLeft;
  }

  const timeLeft = calculateTimeLeft();

  const upcoming =
    Number(timeLeft.days) === 0 &&
    Number(timeLeft.hours) === 0 &&
    Number(timeLeft.minutes) <= 60;

  useEffect(() => {
    if (data) {
      const newBody = data?.matchBettings?.map((betting: any) => ({
        id: betting?.id,
        name: betting?.name,
        isActive: betting?.isActive,
      }));
      setUpdateBettings(newBody);
      setUpdateMatchStatus((prevStatus) => ({
        ...prevStatus,
        1: { ...prevStatus[1], val: data?.apiSessionActive },
        2: { ...prevStatus[2], val: data?.manualSessionActive },
      }));
    }
  }, [data]);

  return (
    <>
      <Box
        sx={[
          {
            display: "flex",
            // height: { xs: "auto", md: "45px" },
            background: data?.stopAt
              ? "#f78f65"
              : !upcoming
              ? "#FFE094"
              : "#a6d482",
            alignItems: { xs: "stretch", md: "center" },
            borderTop: "2px solid white",
          },
        ]}
      >
        <Box
          sx={{
            display: "flex",
            width: { xs: "60px", sm: "100px", md: "100px", lg: "100px" },
            // paddingLeft: "10px",
            alignItems: "center",
            // height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px" }}>
            ({index + 1 + Constants.pageLimit * (currentPage - 1)})
          </Typography>
          <Typography
            sx={{
              fontSize: "9px",
              padding: "4px",
              fontWeight: "700",
              marginLeft: "2px",
            }}
          >
            {moment(data?.startAt).format("DD-MM-YYYY")} <br />
            {moment(data?.startAt).format("LT")}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            // paddingX: "10px",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "column", lg: "row", md: "row" },
            // height: "45px",
          }}
        >
          {/* Switch button row =====*/}
          <Box
            display="flex"
            alignItems="center"
            sx={{
              order: { xs: "2", sm: "2" },
              // marginY: { sm: 1 },
            }}
          >
            <StyledImage
              src={IconConstants[data?.matchType]}
              sx={{ height: "20px", width: "20px", margin: "1rem" }}
            />
            <Typography
              variant="h5"
              // color="primary.main"
              sx={[
                {
                  color: "000",
                  alignItems: "center",
                  marginRight: { lg: "10px", xs: "6px" },
                  justifyContent: "space-between",
                  width: "200px",
                },
              ]}
            >
              {data?.title}
            </Typography>
            <StyledImage
              onClick={() => {
                setShowUserModal((prev) => !prev);
              }}
              src={showUserModal ? DownGIcon : DownGIcon}
              style={{
                transform: showUserModal ? "rotate(180deg)" : "rotate(0deg)",
                transition: "0.5s",
                cursor: "pointer",
                width: "16px",
                height: "12px",
                color: "#004A25",
              }}
            />
          </Box>

          <Box
            display={"flex"}
            sx={{
              flexDirection: {
                xs: "column",
                sm: "column",
                md: "column",
                lg: "row",
              },
              order: { xs: "1", sm: "2", md: "3" },
              // width: { lg: "66%", xs: "100%", sm: "auto" },
              py: { xs: 1, sm: 0 },
              // px: "10px",
              // overflow: "hidden",
              display: showUserModal && !matchesMobile ? "none" : "flex",
              alignItems: "center",

              // marginBottom: showUserModal ? { xs: "0%", sm: "-1%", lg: "-20%" } : "0%",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                  sm: "row",
                  lg: "row",
                },
                justifyContent: "center",

                alignItems: "center",
                marginTop: { sm: "5px", lg: "2.5px", md: 0 },
                paddingRight: "5px",
              }}
            >
              {data?.stopAt && (
                <MatchListProfitLoss
                  // onClick={() => handleMatchProfitLossClick(data?.id)}
                  updateMatchStatusLabel="Total P/L"
                  updateMatchStatus={
                    data?.pl &&
                    data?.pl?.length > 0 &&
                    data?.pl[0]?.totalProfitLoss
                  }
                />
              )}
              {data?.stopAt && (
                <MatchListProfitLoss
                  // onClick={() => handleMatchProfitLossClick(data?.id)}
                  updateMatchStatusLabel={"Comm."}
                  updateMatchStatus={
                    data?.pl && data?.pl?.length > 0 && data?.pl[0]?.commission
                  }
                />
              )}
              {data?.matchType === "cricket" && data?.stopAt && (
                <MatchListProfitLoss
                  onClick={() => handleMatchProfitLossClick(data?.id)}
                  updateMatchStatusLabel="Session P/L"
                  updateMatchStatus={
                    data?.pl &&
                    data?.pl?.length > 0 &&
                    data?.pl[0]?.sessionTotalProfitLoss
                  }
                  cursor="pointer"
                />
              )}
              {/* {!isSmallOrMediumScreen && data?.matchType != "cricket" && (
                <DummyMatchListProfitLoss updateMatchStatusLabel="" />
              )} */}
            </Box>
            <Box
              display={"flex"}
              sx={{
                width: "100%",
                // marginY: { xs: 1, sm: 0, lg: 0 },
                // marginX: { xs: 1, sm: 1, lg: 1 },
                display: "flex",
                alignItems: "center",
                // flexDirection: { md: "row", sm: "row", lg: "row" },
                justifyContent: {
                  lg: "flex-end",
                  md: "flex-end",
                  sm: "flex-end",
                  xs: "center",
                },
                flexWrap: "wrap",
              }}
            >
              {["cricket", "politics"].includes(data?.matchType) &&
                (profileDetail?.allPrivilege ||
                  profileDetail?.sessionMatchPrivilege) && (
                  <CustomButton
                    containerStyle={{
                      // minWidth: { xs: "40%", sm: "100px" },
                      // width: { xs: "40%", sm: "100px" },
                      // marginLeft: { xs: "1%", sm: "10px" },
                      // marginBottom: { xs: "1%", sm: "10px" },
                      // gap: 0.5,
                      margin: "5px",
                    }}
                    onClick={() => {
                      navigate(`/expert/sessionBetList`, {
                        state: { id: data?.id, marketId: data?.marketId },
                      });
                    }}
                    title="View Session"
                  />
                )}
              {["cricket", "politics"].includes(data?.matchType) &&
                (profileDetail?.allPrivilege ||
                  profileDetail?.sessionMatchPrivilege) && (
                  <CustomButton
                    containerStyle={{
                      // minWidth: { xs: "40%", sm: "100px" },
                      // width: { xs: "40%", sm: "100px" },
                      // marginLeft: { xs: "1%", sm: "10px" },
                      // marginBottom: { xs: "1%", sm: "10px" },
                      // gap: 0.5,
                      margin: "5px",
                    }}
                    onClick={() => {
                      navigate(`/expert/session`, {
                        state: { id: data?.id, marketId: data?.marketId },
                      });
                    }}
                    title={"Expert Session"}
                  />
                )}
              {/* {!isSmallOrMediumScreen &&
                !["cricket", "politics"].includes(data?.matchType) && (
                  <CustomButton
                    containerStyle={{
                      // margin: "5px",
                      cursor: "default",
                      background: "#FFE094",
                      margin: "5px",
                      // marginRight: {
                      //   xs: "20px",
                      //   md: "29px",
                      //   sm: "10px",
                      //   lg: "10px",
                      // },
                    }}
                    bgColor={buttonBgColor}
                  />
                )}
              {!isSmallOrMediumScreen &&
                !["cricket", "politics"].includes(data?.matchType) && (
                  <CustomButton
                    containerStyle={{
                      // margin: "5px",
                      cursor: "default",
                      background: "#FFE094",
                      margin: "5px",
                      // marginRight: {
                      //   xs: "20px",
                      //   md: "29px",
                      //   sm: "10px",
                      //   lg: "10px",
                      // },
                    }}
                    bgColor={buttonBgColor}
                  />
                )} */}
              {(profileDetail?.allPrivilege ||
                profileDetail?.betFairMatchPrivilege) && (
                <CustomButton
                  containerStyle={{
                    // minWidth: { xs: "40%", sm: "100px" },
                    // width: { xs: "40%", sm: "100px" },
                    // marginLeft: { xs: "1%", sm: "10px" },
                    // marginBottom: { xs: "1%", sm: "10px" },
                    // gap: 0.5,
                    margin: "5px",
                  }}
                  onClick={() => {
                    if (["cricket", "politics"].includes(data?.matchType)) {
                      navigate(`/expert/market`, {
                        state: { id: data?.id, marketId: data?.marketId },
                      });
                    } else {
                      navigate(`/expert/betOdds/otherGames`, {
                        state: { id: data?.id, marketId: data?.marketId },
                      });
                    }
                  }}
                  title={"View Match"}
                />
              )}
              {(profileDetail?.allPrivilege ||
                profileDetail?.addMatchPrivilege) && (
                <CustomButton
                  containerStyle={{
                    // minWidth: { xs: "40%", sm: "100px" },
                    // width: { xs: "40%", sm: "100px" },
                    // gap: 0.5,
                    margin: "5px",
                    // marginLeft: { xs: "1%", sm: "10px" },
                    // marginBottom: { xs: "1%", sm: "10px" },
                  }}
                  onClick={() => {
                    navigate(`/expert/edit_match`, {
                      state: { id: data?.id },
                    });
                  }}
                  title={"Edit"}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      {showUserModal && (
        <MatchPermissionsModal
          showUserModal={showUserModal}
          handleMatchProfitLossClick={handleMatchProfitLossClick}
          data={data}
          updateBettings={updateBettings}
          setUpdateBettings={setUpdateBettings}
          updateMatchStatus={updateMatchStatus}
          setUpdateMatchStatus={setUpdateMatchStatus}
          upcoming={upcoming}
        />
      )}
      <ModalMUI
        open={showPopup}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>
          <SessionResultComponent
            setShowPopup={setShowPopup}
            sessionResults={sessionProLoss}
          />
        </>
      </ModalMUI>
    </>
  );
};

export default MatchListTable;
