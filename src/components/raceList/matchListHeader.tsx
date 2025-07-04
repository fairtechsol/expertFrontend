import { Badge, Box, Tab, Tabs, Typography, styled } from "@mui/material";
import {
  DatePicker,
  LocalizationProvider,
  PickersDay,
} from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  getCountryCode,
  getRaceList,
  resetContryCodeList,
  resetRaceList,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";

interface MatchListHeaderProps {
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

const MatchListHeader = ({ value }: MatchListHeaderProps) => {
  const dispatch: AppDispatch = useDispatch();
  const { dateList } = useSelector((state: RootState) => state.user.profile);
  const { countryCode } = useSelector((state: RootState) => state.matchList);
  const [dated, setDated] = useState<any>("");
  const [selectedTab, setSelectedTab] = useState(0);

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
    } else if (dateList?.length === 0) {
      dispatch(resetRaceList());
      dispatch(resetContryCodeList());
      setDated("");
    }
    setSelectedTab(0);
  }, [dateList]);

  useEffect(() => {
    if (
      countryCode[0]?.countryCode?.length > 0 &&
      dated !== "" &&
      countryCode[0]?.countryCode !== undefined
    ) {
      dispatch(
        getRaceList({
          cc: countryCode[0]?.countryCode,
          date: moment(dated).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"),
          matchType: value,
        })
      );
    }
  }, [countryCode]);

  return (
    <Box
      display="flex"
      flexDirection="row"
      sx={{
        justifyContent: "space-between",
        px: "10px",
        py: "10px",
        gap: "20px",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: {
            lg: "20px",
            xl: "20px",
            md: "15px",
            sm: "30px",
            xs: "30px",
          },
          marginTop: "4px",
        }}
      >
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
                transition: "background-color 0.3s ease, color 0.3s ease",
              },
            }}
          >
            {countryCode &&
              countryCode.map((item: any, index: any) => (
                <Tab
                  sx={{
                    backgroundColor:
                      selectedTab === index ? "#F8C851" : "#FFFFFF",
                    color: "black",
                    "&:hover": {
                      backgroundColor:
                        selectedTab === index ? "#E0B744" : "#F0F0F0",
                    },
                    height: "35px",
                    marginTop: "4px",
                    textAlign: "center",
                    paddingTop: "15px",
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
          sx={{
            backgroundColor: "#0B4F26",
            color: "white",
            borderRadius: "5px",

            marginRight: {
              lg: "6px",
              xl: "8px",
              md: "8px",
              sm: "10x",
            },
            width: {
              xs: "47%",
              sm: "30%",
              md: "20%",
              lg: "15%",
              xl: "15%",
            },

            "& .MuiInputBase-input": {
              color: "white",
              marginLeft: {
                lg: "12px",
                xl: "12px",
                md: "20px",
                sm: "20px",
                xs: "10px",
              },
              marginTop: "9px",

              height: "100%",
            },
            "& .MuiOutlinedInput-input": {
              padding: "0px",
              paddingBottom: "5px",
              border: "none",
              height: "100%",
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
            "& .MuiSvgIcon-root": {
              color: "white",
              paddingTop: "2px",
              display: {
                lg: "block",
                xl: "block",
                md: "block",
                sm: "block",
                xs: "block",
              },
            },
            height: "40px",
          }}
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
                    currentDate.getFullYear() === highlightedDate.getFullYear()
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
    </Box>
  );
};

export default memo(MatchListHeader);
