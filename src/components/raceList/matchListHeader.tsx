import { Box, Tab, Tabs, Typography, styled } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { useEffect, useState } from "react";
import {
  getCountryCode,
  getRaceList,
} from "../../store/actions/match/matchAction";
import moment from "moment";
import {
  LocalizationProvider,
  PickersDay,
  DatePicker,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Badge } from "@mui/material";
import { GoDotFill } from "react-icons/go";

interface MatchListHeader {
  value: string | any;
}

const CustomTabs = styled(Tabs)({
  "& .MuiTab-root": {
    maxWidth: "0.5rem",
    flex: 1,
  },
  "& .Mui-selected": {
    backgroundColor: "#F8C851",
  },
  "& .MuiTabs-indicator": {
    height: 0,
    backgroundColor: "#F8C851",
  },
});

const MatchListHeader = ({ value }: MatchListHeader) => {
  const dispatch: AppDispatch = useDispatch();
  const { dateList } = useSelector((state: RootState) => state.user.profile);
  const { countryCode } = useSelector((state: RootState) => state.matchList);
  const [dated, setDated] = useState<any>("");
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    if (dateList?.length > 0) {
      setDated(dateList[0]?.date);
      dispatch(
        getCountryCode({
          date: moment(new Date(dateList[0]?.date))
            .utc()
            .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"),
          matchType: value,
        })
      );
    }
    setSelectedTab(0);
  }, [dateList, value]);

  useEffect(() => {
    if (
      countryCode?.length >= 0 &&
      dated !== "" &&
      countryCode[0]?.countryCode !== undefined
    ) {
      dispatch(
        getRaceList({
          cc: countryCode[0]?.countryCode,
          date: moment(dated).format("YYYY-MM-DD"),
          matchType: value,
        })
      );
    }
  }, [countryCode, value]);

  const handleChangeDate = (date: any) => {
    setDated(date);
    setSelectedTab(0);
    dispatch(
      getCountryCode({
        date: moment(new Date(date))
          .utc()
          .format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"),
        matchType: value,
      })
    );
  };
  const handleChange = (newValue: any) => {
    if (newValue) {
      dispatch(
        getRaceList({
          cc: newValue,
          date: moment(dated).format("YYYY-MM-DD"),
          matchType: value,
        })
      );
    }
  };

  const handleDateChange = (newValue: any) => {
    const isDateInList = dateList?.some((highlightedDay: any) => {
      const highlightedDate = new Date(highlightedDay?.date);
      return (
        newValue.getDate() === highlightedDate.getDate() &&
        newValue.getMonth() === highlightedDate.getMonth() &&
        newValue.getFullYear() === highlightedDate.getFullYear()
      );
    });
    if (isDateInList) {
      handleChangeDate(newValue);
    } else return;
  };

  const handleTabChange = (_: any, newValue: any) => {
    handleChange(countryCode[newValue]?.countryCode);
    setSelectedTab(newValue);
  };
  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        sx={{
          justifyContent: "space-between",
          px: "10px",
          py: "10px",
          gap: "20px",
        }}
      >
        <Box sx={{ display: "flex", gap: "20px" }}>
          <Typography
            sx={{
              fontSize: "16px",
              color: "white",
              fontWeight: "600",
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
          >
            Race List
          </Typography>

          <Box
            sx={{
              // minWidth: "30vw",
              maxWidth: { lg: "60vw", md: "60%", sm: "50%" },
              display: "flex",
              alignItems: "center",
            }}
          >
            <CustomTabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="scrollable"
              textColor="inherit"
              aria-label="country tabs"
              sx={{
                height: "30px",
                "& .MuiTab-root": {
                  minWidth: "2.5rem",
                  minHeight: "1rem",
                },
              }}
            >
              {countryCode &&
                countryCode.map((item: any, index: number) => (
                  <Tab
                    sx={{
                      backgroundColor: value === index ? "#F8C851" : "#FFFFFF",
                      color: "black",
                    }}
                    key={item?.countryCode}
                    label={item?.countryCode}
                  />
                ))}
            </CustomTabs>
          </Box>
        </Box>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            orientation="portrait"
            value={new Date(dated)}
            disableFuture
            onChange={handleDateChange}
            slots={{
              day: (props) => {
                const currentDate = props.day;
                const isSelected =
                  !props.outsideCurrentMonth &&
                  dateList?.some((highlightedDay: any) => {
                    const highlightedDate = new Date(highlightedDay?.date);
                    return (
                      currentDate.getDate() === highlightedDate.getDate() &&
                      currentDate.getMonth() === highlightedDate.getMonth() &&
                      currentDate.getFullYear() ===
                        highlightedDate.getFullYear()
                    );
                  });

                return (
                  <Badge
                    key={props.day.toString()}
                    overlap="circular"
                    badgeContent={
                      isSelected ? <GoDotFill color="red" /> : undefined
                    }
                  >
                    <PickersDay {...props} disabled={!isSelected} />
                  </Badge>
                );
              },
            }}
          />
        </LocalizationProvider>
        {/* <Box
          sx={{
            display: "flex",
            gap: "10px",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Select
            value={dated}
            onChange={handleChangeDate}
            inputProps={{ "aria-label": "Without label" }}
            sx={{ backgroundColor: "#fff", height: "40px" }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 200,
                  overflowY: "auto",
                },
                sx: {
                  "&::-webkit-scrollbar": {
                    width: "0",
                  },
                  "&::-webkit-scrollbar-track": {
                    background: "transparent",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "transparent",
                  },
                },
              },
            }}
          >
            {dateList &&
              dateList.map((item: any, index: any) => (
                <MenuItem key={index} value={item?.date}>
                  {moment(item?.date).format("DD/MM/YYYY")}
                </MenuItem>
              ))}
          </Select>
        </Box> */}
      </Box>
    </>
  );
};

export default MatchListHeader;
