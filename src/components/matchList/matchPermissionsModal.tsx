import { Box } from "@mui/material";
import BoxButtonWithBettings from "../Common/BoxButtonWithBettings";
import BoxButtonWithSwitch from "../Common/BoxButtonWithSwitch";

const MatchPermissionsModal = (props: any) => {
  const {
    data,
    updateBettings,
    setUpdateBettings,
    updateMatchStatus,
    setUpdateMatchStatus,
  } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flex: 1,
        alignItems: "center",
        p: 2,
        background: "#ffe094",
      }}
    >
      {data?.matchBettings?.map((betting: any) => {
        return (
          <BoxButtonWithBettings
            key={betting?.id}
            title={betting?.name}
            matchId={data?.id}
            matchBettingType={"match"}
            updateBettings={updateBettings}
            setUpdateBettings={setUpdateBettings}
            bettingId={betting.id}
          />
        );
      })}
      <BoxButtonWithSwitch
        title="Session"
        matchId={data?.id}
        matchBettingType={"session"}
        isManualBet={false}
        updateMatchStatus={updateMatchStatus}
        setUpdateMatchStatus={setUpdateMatchStatus}
        place={1}
      />

      <BoxButtonWithSwitch
        title="Manual Session"
        matchId={data?.id}
        matchBettingType={"session"}
        isManualBet={true}
        updateMatchStatus={updateMatchStatus}
        setUpdateMatchStatus={setUpdateMatchStatus}
        place={2}
      />
    </Box>
  );
};

export default MatchPermissionsModal;
