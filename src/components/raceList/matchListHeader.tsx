import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CustomButton from "../Common/CustomButton";
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

const MatchListHeader = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { getProfile, dateList } = useSelector(
    (state: RootState) => state.user.profile
  );
  const { countryCode } = useSelector((state: RootState) => state.matchList);
  const [dated, setDated] = useState(dateList[0]?.date);
  const [countryCoded, setCountryCoded] = useState(countryCode[0]?.countryCode);
  useEffect(() => {
    dispatch(getDateList());
  }, []);

  useEffect(() => {
    if (dateList?.length > 0) {
      setDated(dateList[0]?.date);
      setCountryCoded(countryCode[0]?.countryCode);
      dispatch(getCountryCode(dateList[0]?.date));
    }
  }, [dateList]);

  useEffect(() => {
    if (countryCode?.length > 0) {
      setCountryCoded(countryCode[0]?.countryCode);
      dispatch(
        getRaceList({
          cc: countryCode[0]?.countryCode,
          date: moment(dated).format("YYYY-MM-DD"),
        })
      );
    }
  }, [countryCode]);

  const handleChangeDate = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;

    setDated(selectedValue);
    dispatch(getCountryCode(selectedValue));
  };
  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    setCountryCoded(selectedValue);
    dispatch(
      getRaceList({
        cc: selectedValue,
        date: moment(dated).format("YYYY-MM-DD"),
      })
    );
  };

  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event:any, newValue:any) => {
    setSelectedTab(newValue);
  };
  return (
    <>
      <Box
        display={"flex"}
        sx={{
          justifyContent: "space-between",
          px: "10px",
          py: "10px",
          flexDirection: { xs: "column", sm: "row" },
        }}
      >
        <Box sx={{display: "flex", gap: "20px"}}>
        <Typography
          sx={{
            fontSize: "16px",
            color: "white",
            fontWeight: "600",
            display: "flex",
          justifyContent: "center",
          alignItems: "center"          
        }}
        >
          Race List
        </Typography>

        <Box
          sx={{
            // minWidth: "30vw",
            maxWidth: { lg: "60vw", md: "50%" },
            display: "flex",
            alignItems: "center",
            bgcolor: 'background.paper',
            // borderRadius: "10px",
            backgroundColor: "#dddddd",
            height: "5vh"
          }}
        > 
      
      <Tabs
        value={selectedTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="country code tabs"
        sx={{
        
          '& .MuiTabs-scrollButtons': {
            color: '#000', 
          },
          '& .MuiTab-root': {
            overflow: "visible",
            borderRight: "2px solid #f1c40f",
            backgroundColor: "#dddddd",
            minWidth: '20px',
            textTransform: 'none', 
            fontSize: '14px', 
            color: '#000', 
            '&.Mui-selected': {
              color: '#000', 
              backgroundColor: '#f1c40f', 
              border: "1px solid white" 
            },
          },
          '& .MuiTabs-indicator': {
            backgroundColor: '#fff', 
          },
        }}
      >
        {countryCode && countryCode.map((item:any, index:any) => (
          <Tab key={index} label={item?.countryCode} />
        ))}
      </Tabs>
      </Box>
    </Box>
    <Box sx={{ display: "flex",width: "20%", gap: "10px", flexDirection: {lg: "row", xs: "column", md: "column-reverse"}}}>
          <Select
            value={dated}
            onChange={handleChangeDate}
            inputProps={{ "aria-label": "Without label" }}
            sx={{ width: "20vw", backgroundColor: "#fff", height: "40px" }}
          >
            {dateList &&
              dateList?.map((item: any, index: any) => {
                return (
                  <MenuItem key={index} value={item?.date}>
                    {moment(item?.date).format("DD/MM/YYYY")}
                  </MenuItem>
                );
              })}
          </Select>

          {/* <Select
            value={countryCoded}
            onChange={handleChange}
            inputProps={{ "aria-label": "Without label" }}
            sx={{ width: "30%", backgroundColor: "#fff", height: "40px" }}
          >
            {countryCode &&
              countryCode?.map((item: any, index: any) => {
                return (
                  <MenuItem key={index} value={item?.countryCode}>
                    {item?.countryCode}
                  </MenuItem>
                );
              })}
          </Select> */}
          {(getProfile?.allPrivilege || getProfile?.addMatchPrivilege) && (
            <CustomButton
              onClick={() => {
                navigate("/expert/add_race");
              }}
              title={"Add Race"}
            />
          )}
       </Box>
      </Box>
    </>
  );
};


export default MatchListHeader;
