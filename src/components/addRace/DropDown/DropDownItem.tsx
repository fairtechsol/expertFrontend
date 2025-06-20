import { Box, Typography } from "@mui/material";
import { memo, useCallback } from "react";
import { useDispatch } from "react-redux";
import { updateRaceRunners } from "../../../store/actions/addMatch/addMatchAction";
import { AppDispatch } from "../../../store/store";

interface RaceDropDownItemProps {
  item: any;
  EventId: string;
  CompetitionName: string;
  setOpen: (val: any) => void;
  dropDownTextStyle?: React.CSSProperties;
  setSelected: (val: any) => void;
  name: string;
}

const RaceDropDownItem = ({
  item,
  EventId,
  CompetitionName,
  setOpen,
  dropDownTextStyle = {},
  setSelected,
  name,
}: RaceDropDownItemProps) => {
  const dispatch: AppDispatch = useDispatch();

  const handleClick = useCallback(() => {
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
    if (item?.runners) {
      dispatch(updateRaceRunners(item.runners));
    }
    setOpen(false);
  }, []);

  return (
    <Box
      onClick={handleClick}
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

export default memo(RaceDropDownItem);
