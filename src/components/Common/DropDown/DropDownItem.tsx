import { Box, Typography } from "@mui/material";
import { getExtraMarketList } from "../../../store/actions/addMatch/addMatchAction";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
const DropDownItem = (props: any) => {
  const {
    i,
    mId,
    EventId,
    matchesSelect,
    eventDetail,
    CompetitionName,
    disable,
    setValue,
    setOpen,
    dropDownTextStyle,
    setSelected,
    name,
    gameType,
  } = props;

  const dispatch: AppDispatch = useDispatch();

  return (
    <Box
      onClick={() => {
        if (!disable) {
          setValue(i);
          if (eventDetail) {
            function setDetailWithRunners() {
              let data = {
                id: EventId,
                eventType: gameType,
                matchOddId: mId,
              };

              dispatch(getExtraMarketList(data));

              let allrunners: any = [];
              eventDetail.runners.map((runner: any) => {
                allrunners.push(runner?.runnerName);
              });
              setSelected((prev: any) => {
                return {
                  ...prev,
                  teamA: allrunners[0],
                  teamB: allrunners[1],
                  teamC: allrunners[2] ? allrunners[2] : undefined,
                  startAt: new Date(
                    eventDetail?.EventDate.replace("AM", " AM")
                      .replace("PM", " PM")
                      .replace(" (IST)", "")
                  ),
                  eventId: EventId,
                  marketId: mId,
                  matchName: i,
                  title: i,
                  f: eventDetail?.f,
                  tv: eventDetail?.tv,
                  m1: eventDetail?.m1,
                  competitionId:eventDetail?.competitionId,
                  competitionName:eventDetail?.competitionName
                };
              });
            }
            setDetailWithRunners();
          } else if (matchesSelect) {
            setSelected((prev: any) => {
              return {
                ...prev,
                [name]: i,
                tournamentId: EventId,
              };
            });
          } else {
            setSelected((prev: any) => {
              return {
                ...prev,
                [name]: i,
              };
            });
          }
          setOpen(false);
        }
      }}
      sx={[
        {
          padding: "4px 7px 4px 7px",
          fontSize: "10px",
          fontWeight: "500",
          color: "black",
          "&:hover": {
            cursor: "pointer",
            background: "#3498ff33",
          },
        },
        dropDownTextStyle,
      ]}
    >
      <Typography>{i === "0" ? "0.00" : i}</Typography>
      <Typography sx={{ fontSize: "12px" }}>{CompetitionName}</Typography>
    </Box>
  );
};

export default DropDownItem;
