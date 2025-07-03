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

interface MatchPermissionsModalProps {
  showUserModal: boolean;
  handleMatchProfitLossClick: (val: any) => void;
  data: any;
  updateBettings: any;
  setUpdateBettings: (val: any) => void;
  updateMatchStatus: any;
  setUpdateMatchStatus: (val: any) => void;
  upcoming: boolean;
}

const MatchPermissionsModal = ({
  showUserModal,
  handleMatchProfitLossClick,
  data,
  updateBettings,
  setUpdateBettings,
  updateMatchStatus,
  setUpdateMatchStatus,
  upcoming,
}: MatchPermissionsModalProps) => {
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
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "end",
          flexDirection: "column",
        }}
      >
        {data?.stopAt && (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              marginRight: "6px",
              flexWrap: "wrap",
              flexDirection: "column",
            }}
          >
            <MatchListProfitLoss
              updateMatchStatusLabel="Total Profit/Loss"
              updateMatchStatus={plData?.totalProfitLoss}
              cursor="default"
            />
            <MatchListProfitLoss
              updateMatchStatusLabel="Commission"
              updateMatchStatus={plData?.commission}
              cursor="default"
            />
            {isCricket && (
              <MatchListProfitLoss
                onClick={() => handleMatchProfitLossClick(data?.id)}
                updateMatchStatusLabel="Session Profit/Loss"
                updateMatchStatus={plData?.sessionTotalProfitLoss}
                cursor="pointer"
              />
            )}
          </Box>
        )}
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
                containerStyle={{
                  margin: "5px",
                }}
                onClick={() => {
                  navigate(`/expert/betDetail/${data?.id}`);
                }}
                title="View Bet"
              />
              {isCricketOrPolitics && (
                <>
                  <CustomButton
                    containerStyle={{
                      margin: "5px",
                    }}
                    onClick={() =>
                      navigate(
                        `/expert/sessionBetList/${data?.id}?mid=${data?.marketId}`
                      )
                    }
                    title="View Session"
                  />
                  <CustomButton
                    containerStyle={{
                      margin: "5px",
                    }}
                    onClick={() =>
                      navigate(`/expert/session/${data?.id}?mid=${data?.marketId}`)
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
                margin: "5px",
              }}
              title="View Match"
              onClick={() => {
                isCricketOrPolitics
                  ? navigate(`/expert/market/${data?.id}?mid=${data?.marketId}`)
                  : navigate(
                      `/expert/betOdds/otherGames/${data?.id}?mid=${data?.marketId}`
                    );
              }}
            />
          )}
          {canEdit && (
            <CustomButton
              containerStyle={{
                margin: "5px",
              }}
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
        width: "100%",
        display: "flex",
        background: data?.stopAt
          ? "#f78f65"
          : !upcoming
          ? "#FFE094"
          : "#a6d482",
        justifyContent: { xs: "end" },
        minHeight: "auto",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
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
