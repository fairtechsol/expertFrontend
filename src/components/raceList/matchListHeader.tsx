import { Box, Typography, debounce } from "@mui/material";
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
  useEffect(() => {
    dispatch(getDateList());
  }, []);

  useEffect(() => {
    if (dateList?.length > 0) {
      dispatch(getCountryCode(dateList[0]?.date));
    }
  }, [dateList]);

  useEffect(() => {
    if (countryCode?.length > 0) {
      dispatch(getRaceList(countryCode[0]?.countryCode));
    }
  }, [countryCode]);

  const handleChange = (event: SelectChangeEvent) => {
    const selectedValue = event.target.value;
    setDated(selectedValue);
    console.log("first", selectedValue);
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
        <Typography
          sx={{
            fontSize: "16px",
            color: "white",
            fontWeight: "600",
          }}
        >
          Race List
        </Typography>
        <Box
          sx={{
            width: { lg: "40%", md: "50%" },
            display: "flex",
            alignItems: "center",
            justifyContent: { xs: "space-between", sm: "space-between" },
          }}
        >
          <Select
            value={'dated'}
            onChange={handleChange}
            inputProps={{ "aria-label": "Without label" }}
            sx={{ width: "30%", backgroundColor: "#fff", height: "40px" }}
          >
            {dateList &&
              dateList?.map((item: any, index: any) => {
                return (
                  <>
                    <MenuItem key={index} value={item?.date}>
                      {moment(item?.date).format("DD/MM/YYYY")}
                    </MenuItem>
                  </>
                );
              })}
          </Select>

          <Select
            // value={personName}
            // onChange={handleChange}
            inputProps={{ "aria-label": "Without label" }}
            sx={{ width: "30%", backgroundColor: "#fff", height: "40px" }}
          >
            <MenuItem value="">
              <em>Placeholder</em>
            </MenuItem>
            <MenuItem value="">
              <em>Placeholder1</em>
            </MenuItem>
            <MenuItem value="">
              <em>Placeholder2</em>
            </MenuItem>
          </Select>
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
