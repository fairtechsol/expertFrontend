import { Box, Tab, Tabs, Typography } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useState } from "react";
import { getDateList } from "../../store/actions/user/userAction";
import {
  getCountryCode,
  getRaceList,
} from "../../store/actions/match/matchAction";
import moment from "moment";

interface MatchListHeader {
  value: string;
}

const MatchListHeader = ({ value }: MatchListHeader) => {
  const dispatch: AppDispatch = useDispatch();
  const { dateList } = useSelector((state: RootState) => state.user.profile);
  const { countryCode } = useSelector((state: RootState) => state.matchList);
  const [dated, setDated] = useState("");
  useEffect(() => {
    dispatch(getDateList({ matchType: value }));
  }, []);

  useEffect(() => {
    if (dateList?.length > 0) {
      setDated(dateList[0]?.date);
      dispatch(getCountryCode({ date: dateList[0]?.date, matchType: value }));
    }
    setSelectedTab(0);
  }, [dateList, value]);

  useEffect(() => {
    if (countryCode?.length >= 0 && dated !== "") {
      dispatch(
        getRaceList({
          cc: countryCode[0]?.countryCode,
          date: moment(dated).format("YYYY-MM-DD"),
          matchType: value,
        })
      );
    }
  }, [countryCode, value]);

  const handleChangeDate = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;

    setDated(selectedValue);
    dispatch(getCountryCode({ date: selectedValue, matchType: value }));
  };
  const handleChange = (newValue: any) => {
    dispatch(
      getRaceList({
        cc: newValue,
        date: moment(dated).format("YYYY-MM-DD"),
        matchType: value,
      })
    );
  };

  const [selectedTab, setSelectedTab] = useState(0);

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
              maxWidth: { lg: "60vw", md: "100%", sm: "20vw" },
              display: "flex",
              alignItems: "center",
              bgcolor: "background.paper",
              // borderRadius: "10px",
              backgroundColor: "#dddddd",
              height: "5vh",
            }}
          >
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="country code tabs"
              sx={{
                "& .MuiTabs-scrollButtons": {
                  color: "#000",
                },
                "& .MuiTab-root": {
                  minHeight: "0.5rem !important",
                  padding: "8px 4px 4px 8px !important",
                  marginTop: "10px",
                  overflow: "visible",
                  borderRight: "2px solid #f1c40f",
                  backgroundColor: "#dddddd",
                  minWidth: "20px",
                  textTransform: "none",
                  fontSize: "14px",
                  color: "#000",
                  "&.Mui-selected": {
                    color: "#000",
                    backgroundColor: "#f1c40f",
                  },
                },
                "& .MuiTabs-indicator": {
                  backgroundColor: "#fff",
                },
              }}
            >
              {countryCode &&
                countryCode.map((item: any, index: any) => (
                  <Tab key={index} label={item?.countryCode} />
                ))}
            </Tabs>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            width: { lg: "30%", xs: "100%" },
            gap: "10px",
            flexDirection: { lg: "row-reverse", xs: "row" },
            alignItems: "center",
          }}
        >
          <Select
            value={dated}
            onChange={handleChangeDate}
            inputProps={{ "aria-label": "Without label" }}
            sx={{ width: "50%", backgroundColor: "#fff", height: "40px" }}
          >
            {dateList &&
              dateList.map((item: any, index: any) => (
                <MenuItem key={index} value={item?.date}>
                  {moment(item?.date).format("DD/MM/YYYY")}
                </MenuItem>
              ))}
          </Select>
        </Box>
      </Box>
    </>
  );
};

export default MatchListHeader;
