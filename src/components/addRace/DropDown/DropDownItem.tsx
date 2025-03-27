import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateRaceRunners } from "../../../store/actions/addMatch/addMatchAction";
import { AppDispatch } from "../../../store/store";

const raceDropDownItem = ({
  item,
  EventId,
  CompetitionName,
  setOpen,
  dropDownTextStyle,
  setSelected,
  name,
}: any) => {
  const dispatch: AppDispatch = useDispatch();

  return (
    <Box
      onClick={() => {
        setSelected((prev: any) => {
          return {
            ...prev,
            [name]: `${item?.event?.countryCode}>${item?.event?.venue}/${CompetitionName}`,
            title: CompetitionName,
            eventId: EventId,
            marketId: item?.marketId,
            competitionName: item?.event?.name,
            competitionId: EventId,
            countryCode: item?.event?.countryCode,
            startAt: item?.marketStartTime,
            venue: item?.event?.venue,
            raceType: item?.description?.raceType,
          };
        });
        dispatch(updateRaceRunners(item?.runners));
        setOpen(false);
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
      <Typography>
        {CompetitionName
          ? `${item?.event?.countryCode}>${item?.event?.venue}/${CompetitionName}`
          : item?.EventName}
      </Typography>
    </Box>
  );
};

export default raceDropDownItem;
