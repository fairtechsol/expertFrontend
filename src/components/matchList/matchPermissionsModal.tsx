import { Box, useMediaQuery } from "@mui/material";
import { memo, useMemo } from "react";
import { shallowEqual, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../store/store";
import theme from "../../theme";
import BoxButtonWithBettings from "../Common/BoxButtonWithBettings";
import BoxButtonWithSwitch from "../Common/BoxButtonWithSwitch";
import CustomButton from "../Common/CustomButton";
import { handleSorting } from "../helper";
import MatchListProfitLoss from "./profitLoss";

const containerStyles = {
  width: "100%",
  display: "flex",
  background: (data: any, upcoming: boolean) =>
    data?.stopAt ? "#f78f65" : !upcoming ? "#FFE094" : "#a6d482",
  justifyContent: { xs: "end" },
  minHeight: { xs: "auto", md: "auto", lg: "7rem" },
};

const buttonContainerStyles = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
};

const MatchPermissionsModal = ({
  showUserModal,
  handleMatchProfitLossClick,
  data,
  updateBettings,
  setUpdateBettings,
  updateMatchStatus,
  setUpdateMatchStatus,
  upcoming,
}: any) => {
  const navigate = useNavigate();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

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

  const canEdit = allPrivilege || addMatchPrivilege;
  const canViewSession = allPrivilege || sessionMatchPrivilege;
  const canViewBetFair = allPrivilege || betFairMatchPrivilege;

  const sortedBettings = useMemo(() => {
    if (!data?.matchBettings) return [];
    return data.matchBettings
      .slice()
      .sort(handleSorting)
      .filter((betting: any) => !betting?.marketId?.includes("manual"));
  }, [data?.matchBettings]);

  const isCricketOrPolitics = ["cricket", "politics"].includes(data?.matchType);
  const isCricket = data?.matchType === "cricket";

  const plData = useMemo(() => data?.pl?.[0], [data?.pl]);

  const actionButtons = useMemo(() => {
    if (!showUserModal || matchesMobile) return null;

    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "end",
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
            <>
              <MatchListProfitLoss
                updateMatchStatusLabel="Total Profit/Loss"
                updateMatchStatus={plData?.totalProfitLoss}
                place="1"
                cursor="default"
              />
              <MatchListProfitLoss
                updateMatchStatusLabel="Commission"
                updateMatchStatus={plData?.commission}
                place="1"
                cursor="default"
              />
              {isCricketOrPolitics && (
                <MatchListProfitLoss
                  containerStyle={{
                    minWidth: { xs: "4%", sm: "12px" },
                    width: { xs: "9%", sm: "100px" },
                    marginBottom: { xs: "1rem", sm: "1rem", md: 0 },
                  }}
                  onClick={() => handleMatchProfitLossClick(data?.id)}
                  updateMatchStatusLabel="Session Profit/Loss"
                  updateMatchStatus={plData?.sessionTotalProfitLoss}
                  place="1"
                  cursor="pointer"
                />
              )}
            </>
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
          {canViewSession && (
            <>
              <CustomButton
                containerStyle={{ margin: "5px" }}
                onClick={() => navigate(`/expert/betDetail/${data?.id}`)}
                title="View Bet"
              />
              {isCricketOrPolitics && (
                <>
                  <CustomButton
                    containerStyle={{ margin: "5px" }}
                    onClick={() =>
                      navigate(
                        `/expert/sessionBetList/${data?.id}/${data?.marketId}`
                      )
                    }
                    title="View Session"
                  />
                  <CustomButton
                    containerStyle={{ margin: "5px" }}
                    onClick={() =>
                      navigate(`/expert/session/${data?.id}/${data?.marketId}`)
                    }
                    title="Expert Session"
                  />
                </>
              )}
            </>
          )}
          {canViewBetFair && (
            <CustomButton
              containerStyle={{ margin: "5px" }}
              title="View Match"
              onClick={() => {
                isCricketOrPolitics
                  ? navigate(`/expert/market/${data?.id}/${data?.marketId}`)
                  : navigate(
                      `/expert/betOdds/otherGames/${data?.id}/${data?.marketId}`
                    );
              }}
            />
          )}
          {canEdit && (
            <CustomButton
              containerStyle={{ margin: "5px" }}
              onClick={() => navigate(`/expert/edit_match/${data?.id}`)}
              title="Edit"
            />
          )}
        </Box>
      </Box>
    );
  }, [
    showUserModal,
    matchesMobile,
    data,
    plData,
    isCricketOrPolitics,
    canViewSession,
    canViewBetFair,
    canEdit,
  ]);

  return (
    <Box
      sx={{
        ...containerStyles,
        background: containerStyles.background(data, upcoming),
      }}
    >
      <Box sx={buttonContainerStyles}>
        {data?.eventId?.includes("manual") &&
          sortedBettings?.map((betting: any) => (
            <BoxButtonWithBettings
              key={betting.id}
              title={betting.name}
              matchId={data.id}
              matchBettingType="match"
              disable={!canEdit}
              updateBettings={updateBettings}
              setUpdateBettings={setUpdateBettings}
              bettingId={betting.id}
            />
          ))}
        {!data?.eventId?.includes("manual") && isCricketOrPolitics && (
          <BoxButtonWithSwitch
            title="Session"
            matchId={data.id}
            matchBettingType="session"
            isManualBet={false}
            disable={!canEdit}
            updateMatchStatus={updateMatchStatus}
            setUpdateMatchStatus={setUpdateMatchStatus}
            place={1}
          />
        )}
        {isCricket && (
          <BoxButtonWithSwitch
            title="Manual Session"
            matchId={data.id}
            matchBettingType="session"
            isManualBet={true}
            disable={!canEdit}
            updateMatchStatus={updateMatchStatus}
            setUpdateMatchStatus={setUpdateMatchStatus}
            place={2}
          />
        )}
      </Box>
      {actionButtons}
    </Box>
  );
};

export default memo(MatchPermissionsModal);
