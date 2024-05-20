import { Box, Typography } from "@mui/material";
import { updateRaceRunners } from "../../../store/actions/addMatch/addMatchAction";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
const raceDropDownItem = (props: any) => {
  const {
    i,
    EventId,
    CompetitionName,
    setOpen,
    dropDownTextStyle,
    setSelected,
    name,
  } = props;

  const dispatch: AppDispatch = useDispatch();

  return (
    <Box
      onClick={() => {
        setSelected((prev: any) => {
          return {
            ...prev,
            [name]: `${i?.event?.countryCode}>${i?.event?.venue}/${CompetitionName}`,
            title: CompetitionName,
            eventId: EventId,
            marketId: i?.marketId,
            competitionName:i?.event?.name,
            competitionId:EventId,
            startAt:i?.marketStartTime ,
          };
        });
        dispatch(updateRaceRunners(i?.runners))
        setOpen(false);
      }
      }
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
      <Typography>{CompetitionName?`${i?.event?.countryCode}>${i?.event?.venue}/${CompetitionName}`:i?.EventName}</Typography>
      {/* <Typography sx={{ fontSize: "12px" }}>{CompetitionName}</Typography> */}
    </Box>
  );
};

export default raceDropDownItem;
