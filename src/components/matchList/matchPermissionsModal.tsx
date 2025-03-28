import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import theme from "../../theme";
import BoxButtonWithBettings from "../Common/BoxButtonWithBettings";
import BoxButtonWithSwitch from "../Common/BoxButtonWithSwitch";
import CustomButton from "../Common/CustomButton";
import { handleSorting } from "../helper";
import MatchListProfitLoss from "./profitLoss";

const MatchPermissionsModal = (props: any) => {
  const {
    showUserModal,
    handleMatchProfitLossClick,
    data,
    updateBettings,
    setUpdateBettings,
    updateMatchStatus,
    setUpdateMatchStatus,
    upcoming,
  } = props;

  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );
  const navigate = useNavigate();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        background: data?.stopAt
          ? "#f78f65"
          : !upcoming
          ? "#FFE094"
          : "#a6d482",
        justifyContent: { xs: "end" },
        minHeight: { xs: "auto", md: "auto", lg: "7rem" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {data?.eventId.includes("manual") &&
          data?.matchBettings
            .slice()
            .sort(handleSorting)
            ?.map((betting: any) => {
              if (betting?.marketId && betting?.marketId.includes("manual")) {
                return null;
              } else {
                return (
                  <BoxButtonWithBettings
                    key={betting?.id}
                    title={betting?.name}
                    matchId={data?.id}
                    matchBettingType={"match"}
                    disable={
                      profileDetail?.allPrivilege ||
                      profileDetail?.addMatchPrivilege
                        ? false
                        : true
                    }
                    updateBettings={updateBettings}
                    setUpdateBettings={setUpdateBettings}
                    bettingId={betting.id}
                  />
                );
              }
            })}
        {(data?.matchType === "cricket" || data?.matchType === "politics") &&
          !data?.eventId.includes("manual") && (
            <BoxButtonWithSwitch
              title="Session"
              matchId={data?.id}
              matchBettingType={"session"}
              isManualBet={false}
              disable={
                profileDetail?.allPrivilege || profileDetail?.addMatchPrivilege
                  ? false
                  : true
              }
              updateMatchStatus={updateMatchStatus}
              setUpdateMatchStatus={setUpdateMatchStatus}
              place={1}
            />
          )}

        {data?.matchType === "cricket" && (
          <BoxButtonWithSwitch
            title="Manual Session"
            matchId={data?.id}
            matchBettingType={"session"}
            isManualBet={true}
            disable={
              profileDetail?.allPrivilege || profileDetail?.addMatchPrivilege
                ? false
                : true
            }
            updateMatchStatus={updateMatchStatus}
            setUpdateMatchStatus={setUpdateMatchStatus}
            place={2}
          />
        )}
      </Box>
      {showUserModal && !matchesMobile && (
        <Box
          sx={{
            // width: "20%",
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            // marginRight: "10px",
            alignItems: "end",
            // marginBottom: "10px",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: "6px",
              flexWrap: "wrap",
              flexDirection: "column",
            }}
          >
            {data?.stopAt && (
              <MatchListProfitLoss
                updateMatchStatusLabel="Total Profit/Loss"
                updateMatchStatus={
                  data?.pl &&
                  data?.pl?.length > 0 &&
                  data?.pl[0]?.totalProfitLoss
                }
                place="1"
                cursor="default"
              />
            )}
            {data?.stopAt && (
              <MatchListProfitLoss
                updateMatchStatusLabel="Commission"
                updateMatchStatus={
                  data?.pl && data?.pl?.length > 0 && data?.pl[0]?.commission
                }
                place="1"
                cursor="default"
              />
            )}
            {["cricket", "politics"].includes(data?.matchType) &&
              data?.stopAt && (
                <MatchListProfitLoss
                  containerStyle={{
                    minWidth: { xs: "4%", sm: "12px" },
                    width: { xs: "9%", sm: "100px" },
                    marginBottom: { xs: "1rem", sm: "1rem", md: 0 },
                  }}
                  onClick={() => handleMatchProfitLossClick(data?.id)}
                  updateMatchStatusLabel="Session Profit/Loss"
                  updateMatchStatus={
                    data?.pl &&
                    data?.pl?.length > 0 &&
                    data?.pl[0]?.sessionTotalProfitLoss
                  }
                  place="1"
                  cursor="pointer"
                />
              )}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              marginLeft: "10px",
            }}
          >
            {["cricket", "politics"].includes(data?.matchType) &&
              (profileDetail?.allPrivilege ||
                profileDetail?.sessionMatchPrivilege) && (
                <CustomButton
                  containerStyle={{
                    margin: "5px",
                  }}
                  onClick={() => {
                    navigate(`/expert/sessionBetList`, {
                      state: { id: data?.id, marketId: data?.marketId },
                    });
                  }}
                  title={"View Session"}
                />
              )}
            {["cricket", "politics"].includes(data?.matchType) &&
              (profileDetail?.allPrivilege ||
                profileDetail?.sessionMatchPrivilege) && (
                <CustomButton
                  containerStyle={{
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
            {(profileDetail?.allPrivilege ||
              profileDetail?.betFairMatchPrivilege) && (
              <CustomButton
                containerStyle={{
                  margin: "5px",
                }}
                title={"View Match"}
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
              />
            )}
            {(profileDetail?.allPrivilege ||
              profileDetail?.addMatchPrivilege) && (
              <CustomButton
                containerStyle={{
                  margin: "5px",
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
      )}
    </Box>
  );
};

export default MatchPermissionsModal;
