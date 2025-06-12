import { Box, Typography, useMediaQuery } from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import moment from "moment";
import { memo, useEffect, useMemo, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DownGIcon } from "../../assets";
import { getMatchListSessionProfitLoss } from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import theme from "../../theme";
import { Constants } from "../../utils/Constants";
import CustomButton from "../Common/CustomButton";
import StyledImage from "../Common/StyledImages";
import { IconConstants } from "../helper/gameConstants";
import MatchPermissionsModal from "./matchPermissionsModal";
import MatchListProfitLoss from "./profitLoss";
import SessionProLoss from "./sessionPLAndBets";
import SessionResultComponent from "./sessionResultComponent";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds?: string;
}

interface MatchListTableProps {
  data: any;
  index: number;
  currentPage: number;
}

const MatchListTable = ({ data, index, currentPage }: MatchListTableProps) => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const {
    allPrivilege,
    addMatchPrivilege,
    sessionMatchPrivilege,
    betFairMatchPrivilege,
  } = useSelector(
    (state: RootState) => ({
      allPrivilege: state.user.profile.profileDetail?.allPrivilege,
      addMatchPrivilege: state.user.profile.profileDetail?.addMatchPrivilege,
      sessionMatchPrivilege:
        state.user.profile.profileDetail?.sessionMatchPrivilege,
      betFairMatchPrivilege:
        state.user.profile.profileDetail?.betFairMatchPrivilege,
    }),
    shallowEqual
  );
  const { sessionProLoss } = useSelector((state: RootState) => state.matchList);
  const [showPopup, setShowPopup] = useState(false);
  const [showSessionPopup, setShowSessionPopup] = useState(false);
  const [betId, setBetId] = useState(null);
  const [matchId, setMatchId] = useState(null);
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

  const canEdit = allPrivilege || addMatchPrivilege;
  const canViewSession = allPrivilege || sessionMatchPrivilege;
  const canViewBetFair = allPrivilege || betFairMatchPrivilege;

  const isCricketOrPolitics = ["cricket", "politics"].includes(data?.matchType);
  const isCricket = data?.matchType === "cricket";

  const plData = useMemo(() => data?.pl?.[0], [data?.pl]);

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
        sx={{
          display: "flex",
          background: data?.stopAt
            ? "#f78f65"
            : !upcoming
            ? "#FFE094"
            : "#a6d482",
          alignItems: { xs: "stretch", md: "center" },
          borderTop: "1px solid white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: { xs: "60px", sm: "100px", md: "100px", lg: "100px" },
            alignItems: "center",
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
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "column", lg: "row", md: "row" },
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            sx={{
              order: { xs: "2", sm: "2" },
            }}
          >
            <StyledImage
              src={IconConstants[data?.matchType]}
              alt={data?.matchType}
              sx={{ height: "20px", width: "20px", margin: "1rem" }}
            />
            <Typography
              variant="h5"
              sx={{
                color: "000",
                alignItems: "center",
                marginRight: { lg: "10px", xs: "6px" },
                justifyContent: "space-between",
                width: "200px",
              }}
            >
              {data?.title}
            </Typography>
            <StyledImage
              onClick={() => {
                setShowUserModal((prev) => !prev);
              }}
              src={showUserModal ? DownGIcon : DownGIcon}
              alt="updown icon"
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
              display: showUserModal && !matchesMobile ? "none" : "flex",
              alignItems: "center",
            }}
          >
            {data?.stopAt && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: { sm: "5px", lg: "2.5px", md: 0 },
                  paddingRight: "5px",
                  flexWrap: { xs: "wrap", sm: "nowrap" },
                }}
              >
                <MatchListProfitLoss
                  updateMatchStatusLabel="Total P/L"
                  updateMatchStatus={plData?.totalProfitLoss}
                />
                <MatchListProfitLoss
                  updateMatchStatusLabel={"Comm."}
                  updateMatchStatus={plData?.commission}
                />
                {isCricket && (
                  <MatchListProfitLoss
                    onClick={() => {
                      setMatchId(data?.id);
                      handleMatchProfitLossClick(data?.id);
                    }}
                    updateMatchStatusLabel="Session P/L"
                    updateMatchStatus={plData?.sessionTotalProfitLoss}
                    cursor="pointer"
                  />
                )}
              </Box>
            )}
            <Box
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: {
                  lg: "flex-end",
                  md: "flex-end",
                  sm: "flex-end",
                  xs: "center",
                },
                flexWrap: "wrap",
              }}
            >
              {canViewSession && (
                <>
                  <CustomButton
                    containerStyle={{
                      margin: { xs: "2px", sm: "2px", md: "5px", lg: "5px" },
                    }}
                    onClick={() => navigate(`/expert/betDetail/${data?.id}`)}
                    title="View Bet"
                  />
                  {isCricketOrPolitics && (
                    <>
                      <CustomButton
                        containerStyle={{
                          margin: {
                            xs: "2px",
                            sm: "2px",
                            md: "5px",
                            lg: "5px",
                          },
                        }}
                        onClick={() =>
                          navigate(
                            `/expert/sessionBetList/${data?.id}/${data?.marketId}`
                          )
                        }
                        title="View Session"
                      />
                      <CustomButton
                        containerStyle={{
                          margin: {
                            xs: "2px",
                            sm: "2px",
                            md: "5px",
                            lg: "5px",
                          },
                        }}
                        onClick={() =>
                          navigate(
                            `/expert/session/${data?.id}/${data?.marketId}`
                          )
                        }
                        title="Expert Session"
                      />
                    </>
                  )}
                </>
              )}
              {canViewBetFair && (
                <CustomButton
                  containerStyle={{
                    margin: { xs: "2px", sm: "2px", md: "5px", lg: "5px" },
                  }}
                  onClick={() =>
                    isCricketOrPolitics
                      ? navigate(`/expert/market/${data?.id}/${data?.marketId}`)
                      : navigate(
                          `/expert/betOdds/otherGames/${data?.id}/${data?.marketId}`
                        )
                  }
                  title="View Match"
                />
              )}
              {canEdit && (
                <CustomButton
                  containerStyle={{
                    margin: { xs: "2px", sm: "2px", md: "5px", lg: "5px" },
                  }}
                  onClick={() => navigate(`/expert/edit_match/${data?.id}`)}
                  title="Edit"
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
        <SessionResultComponent
          setShowPopup={setShowPopup}
          sessionResults={sessionProLoss}
          setShowSessionPopup={setShowSessionPopup}
          setBetId={setBetId}
        />
      </ModalMUI>
      <ModalMUI
        open={showSessionPopup}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <SessionProLoss
          setShowSessionPopup={setShowSessionPopup}
          betId={betId}
          matchId={matchId}
        />
      </ModalMUI>
    </>
  );
};

export default memo(MatchListTable);
