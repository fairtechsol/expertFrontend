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
    data,
    showUserModal,
    updateBettings,
    setUpdateBettings,
    updateMatchStatus,
    setUpdateMatchStatus,
    handleMatchProfitLossClick,
  } = props;

  const { getProfile } = useSelector((state: RootState) => state.user.profile);
  const navigate = useNavigate();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const uniqueNames: any = [];
  let overUnderIncluded = false;

  const filteredData = data?.matchBettings.filter((item: any) => {
    if (item.name.includes("over_under")) {
      if (!overUnderIncluded) {
        overUnderIncluded = true;
        uniqueNames.push(item.name);
        return true;
      }
      return false;
    }
    return true;
  });
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        background: "#ffe094",
        justifyContent: { xs: "end" },
        minHeight: { xs: "auto", md: "auto", lg: "7rem" },
        // paddingRight:{xs:"5%"}
      }}
    >
      <Box
        sx={{
          display: "flex",
          // width: "85%",
          flexWrap: "wrap",
          // flex: 3,
          alignItems: "center",
          p: 3,
          // borderLeft:{xs:"2px solid #fff"}
        }}
      >
        {!data?.eventId.includes("manual") &&
          filteredData
            .slice()
            .sort(handleSorting)
            ?.map((betting: any) => {
              return (
                <BoxButtonWithBettings
                  key={betting?.id}
                  title={betting?.name}
                  matchId={data?.id}
                  matchBettingType={"match"}
                  disable={
                    getProfile?.allPrivilege || getProfile?.addMatchPrivilege
                      ? false
                      : true
                  }
                  updateBettings={updateBettings}
                  setUpdateBettings={setUpdateBettings}
                  bettingId={betting.id}
                />
              );
            })}
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
                      getProfile?.allPrivilege || getProfile?.addMatchPrivilege
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
        {data?.matchType === "cricket" && !data?.eventId.includes("manual") && (
          <BoxButtonWithSwitch
            title="Session"
            matchId={data?.id}
            matchBettingType={"session"}
            isManualBet={false}
            disable={
              getProfile?.allPrivilege || getProfile?.addMatchPrivilege
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
              getProfile?.allPrivilege || getProfile?.addMatchPrivilege
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
            width: "20%",
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
            {data?.matchType === "cricket" && data?.stopAt && (
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
            {data?.matchType === "cricket" &&
              (getProfile?.allPrivilege ||
                getProfile?.sessionMatchPrivilege) && (
                <CustomButton
                  containerStyle={{
                    margin: "5px",
                  }}
                  onClick={() => {
                    navigate(`/expert/sessionBetList`, {
                      state: { id: data?.id, marketId: data?.marketId },
                    });
                  }}
                  title={"Market"}
                />
              )}
            {data?.matchType === "cricket" &&
              (getProfile?.allPrivilege ||
                getProfile?.sessionMatchPrivilege) && (
                <CustomButton
                  containerStyle={{
                    margin: "5px",
                  }}
                  onClick={() => {
                    navigate(`/expert/session`, {
                      state: { id: data?.id, marketId: data?.marketId },
                    });
                  }}
                  title={"Session"}
                />
              )}
            {(getProfile?.allPrivilege ||
              getProfile?.betFairMatchPrivilege) && (
              <CustomButton
                containerStyle={{
                  margin: "5px",
                }}
                title={"Match"}
                onClick={() => {
                  if (data?.matchType === "cricket") {
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
            {(getProfile?.allPrivilege || getProfile?.addMatchPrivilege) && (
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
