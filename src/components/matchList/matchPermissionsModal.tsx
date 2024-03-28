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
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        background: "#ffe094",
        minHeight: { xs: "auto", md: "auto", lg: "7rem" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "80%",
          flexWrap: "wrap",
          flex: 3,
          alignItems: "center",
          p: 2,
        }}
      >
        {!data?.eventId.includes("manual") &&
          data?.matchBettings
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
        {!data?.eventId.includes("manual") && (
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
      </Box>
      {showUserModal && !matchesMobile && (
        <Box
          sx={{
            width: { xs: "auto", sm: "auto", md: "20%" },
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              // marginTop: "4rem",
              flexDirection: { xs: "column", md: "row", lg: "column" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                marginRight: "1px",
              }}
            >
              {data?.stopAt && (
                <MatchListProfitLoss
                  onClick={() => handleMatchProfitLossClick(data?.id)}
                  updateMatchStatusLabel="Total Profit/Loss"
                  updateMatchStatus={
                    data?.pl &&
                    data?.pl?.length > 0 &&
                    data?.pl[0]?.totalProfitLoss
                  }
                  place="1"
                />
              )}
              {data?.stopAt && (
                <MatchListProfitLoss
                  // onClick={() => handleMatchProfitLossClick(data?.id)}
                  updateMatchStatusLabel="Commission"
                  updateMatchStatus={
                    data?.pl && data?.pl?.length > 0 && data?.pl[0]?.commission
                  }
                  place="1"
                />
              )}
              {data?.stopAt && (
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
                />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginLeft: "160px",
                marginBottom: "10px",
              }}
            >
              {(getProfile?.allPrivilege ||
                getProfile?.betFairMatchPrivilege) && (
                <CustomButton
                  containerStyle={{
                    minWidth: { xs: "95%", sm: "100px", lg: "100px" },
                    width: { xs: "49%", sm: "100px", lg: "100px" },
                    marginTop: { xs: "1rem", sm: "1rem", md: 1 },
                    // justifyContent: "flex-end",
                    // marginRight: "1px",
                  }}
                  title={"Submit"}
                  onClick={() => {
                    navigate(`/expert/betOdds`, {
                      state: { id: data?.id, marketId: data?.marketId },
                    });
                  }}
                />
              )}
              {(getProfile?.allPrivilege || getProfile?.addMatchPrivilege) && (
                <CustomButton
                  containerStyle={{
                    minWidth: { xs: "95%", sm: "100px", lg: "100px" },
                    width: { xs: "49%", sm: "100px", lg: "100px" },
                    marginTop: { xs: "1rem", sm: "1rem", md: 1 },
                    marginRight: "10px",
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
      )}
    </Box>
  );
};

export default MatchPermissionsModal;
