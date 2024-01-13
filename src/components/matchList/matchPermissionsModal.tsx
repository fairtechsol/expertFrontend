import { Box } from "@mui/material";
import BoxButtonWithBettings from "../Common/BoxButtonWithBettings";
import BoxButtonWithSwitch from "../Common/BoxButtonWithSwitch";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const MatchPermissionsModal = (props: any) => {
  const {
    data,
    updateBettings,
    setUpdateBettings,
    updateMatchStatus,
    setUpdateMatchStatus,
  } = props;

  const { getProfile } = useSelector((state: RootState) => state.user.profile);
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
  );
};

export default MatchPermissionsModal;
