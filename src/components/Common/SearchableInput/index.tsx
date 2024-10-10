import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import { getExtraMarketList } from "../../../store/actions/addMatch/addMatchAction";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";

const SearchableInput = ({
  eventsList,
  labelStyle,
  label,
  setSelected,
  matchesSelect,
  disable,
  name,
  gameType,
}: any) => {
  const dispatch: AppDispatch = useDispatch();

  const handleOnChange = (_: any, eventDetail: any) => {
    if (!disable) {
      if (eventDetail) {
        function setDetailWithRunners() {
          let data = {
            id: eventDetail?.EventId,
            eventType: gameType,
            matchOddId: eventDetail?.MarketId,
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
              eventId: eventDetail?.EventId,
              marketId: eventDetail?.MarketId,
              matchName: eventDetail?.label,
              title: eventDetail?.label,
              f: eventDetail?.f,
              tv: eventDetail?.tv,
              m1: eventDetail?.m1,
              competitionId: eventDetail?.competitionId,
              competitionName: eventDetail?.competitionName,
            };
          });
        }
        setDetailWithRunners();
      } else if (matchesSelect) {
        setSelected((prev: any) => {
          return {
            ...prev,
            [name]: eventDetail?.label,
            tournamentId: eventDetail?.EventId,
          };
        });
      } else {
        setSelected((prev: any) => {
          return {
            ...prev,
            [name]: eventDetail?.label,
          };
        });
      }
    }
  };
  return (
    <>
      <Typography
        style={{
          color: "#575757",
          fontSize: "12px",
          fontWeight: "600",
          ...labelStyle,
        }}
      >
        {label}
      </Typography>
      <Autocomplete
        sx={{
          "& .MuiAutocomplete-input": {
            fontSize: "14px",
          },
          "& .MuiAutocomplete-inputRoot": {
            height: "40px",
          },
          "& .MuiAutocomplete-listbox": {
            textAlign: "left",
          },
          "& .css-20bmp1-MuiSvgIcon-root": {
            color: "white",
          },
        }}
        options={eventsList?.map((item: any) => {
          return {
            ...item,
            option: item?.MarketId,
            label: item?.EventName,
          };
        })}
        getOptionLabel={(option: any) => `${option?.label}`}
        onChange={handleOnChange}
        renderOption={(props: any, option: any) => (
          <Box
            {...props}
            sx={{
              display: "flex",
              flexDirection: "column",
              // alignItems: "flex-start",
              // justifyContent: "flex-start",
              cursor: "pointer",
              textAlign: "left",
              fontSize: "1rem",
            }}
          >
            <Typography style={{textAlign: "left" , width: "100%"}}>{option?.label}</Typography>
            <Typography sx={{ fontSize: "12px" , textAlign: "start", width: "100%"}}>
              {option?.EventDate}
            </Typography>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            placeholder="Select Match"
            {...params}
            style={{
              backgroundColor: "#0B4F26",
              borderRadius: "5px",
            }}
            sx={{
              "& .MuiInputBase-input": { 
                color: "white",  // Input text color
                "&::placeholder": { color: "white", opacity: 1 },  // Placeholder text color and opacity
              },
              "& .MuiInputLabel-root": { color: "white" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#DEDEDE",
                  borderRadius: "5px",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "lightgray",
                },
              },
            }}
          />
        )}
      />
    </>
  );
};

export default SearchableInput;
