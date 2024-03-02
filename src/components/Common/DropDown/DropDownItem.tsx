import { Box, Typography } from "@mui/material";
import { getExtraMarketList } from "../../../store/actions/addMatch/addMatchAction";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import moment from "moment";
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
  } = props;

  const dispatch: AppDispatch = useDispatch();

  return (
    <Box
      onClick={() => {
        if (!disable) {
          setValue(i);
          if (eventDetail) {
            function setDetailWithRunners() {
              dispatch(getExtraMarketList(EventId));
              let allrunners: any = [];
              eventDetail.Runners.map((runner: any) => {
                allrunners.push(runner?.runnerName);
              });
              setSelected((prev: any) => {
                return {
                  ...prev,
                  teamA: allrunners[0],
                  teamB: allrunners[1],
                  teamC: allrunners[2] ? allrunners[2] : undefined,
                  startAt: moment(eventDetail?.EventDate),
                  eventId: EventId,
                  marketId: mId,
                  competitionName: CompetitionName,
                  matchName: i,
                  title: i,
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
          paddingY: "4px",
          paddingLeft: "7px",
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
