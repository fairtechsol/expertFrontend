import { Box, Tab, Tabs, Typography, debounce, styled } from "@mui/material";
import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../components/Common/SearchInput";
import {
  getMatchList,
  setSelectedTabForMatchList,
  updateMatchListCurrentPage,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import { gameType } from "../../utils/Constants";
import CustomButton from "../Common/CustomButton";

const CustomTabs = styled(Tabs)({
  "& .MuiTab-root": {
    flex: 1,
    backgroundColor: "#FFFFFF",
    color: "black",
    "&:hover": {
      backgroundColor: "#F0F0F0",
    },
    minWidth: "2.5rem",
    minHeight: "1rem",
    transition: "background-color 0.3s ease, color 0.3s ease",
    height: "35px",
    marginTop: "4px",
    textAlign: "center",
    fontWeight: "bold",
  },
  "& .Mui-selected": {
    backgroundColor: "#F8C851",
    "&:hover": {
      backgroundColor: "#E0B744",
    },
  },
  "& .MuiTabs-indicator": {
    height: 0,
  },
});

const MatchListHeader = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const selectedTab = useSelector(
    (state: RootState) => state.matchList.selectedTab
  );

  const allPrivilege = useSelector(
    (state: RootState) => state.user.profile.profileDetail?.allPrivilege
  );
  const addMatchPrivilege = useSelector(
    (state: RootState) => state.user.profile.profileDetail?.addMatchPrivilege
  );

  const getMatchListOnchange = useCallback(
    debounce((value: string) => {
      dispatch(
        getMatchList({ keyword: value, matchType: gameType[selectedTab] })
      );
    }, 500),
    [dispatch, selectedTab]
  );

  const handleTabChange = (_: unknown, newValue: number) => {
    dispatch(setSelectedTabForMatchList(newValue));
    dispatch(updateMatchListCurrentPage(1));
  };

  return (
    <Box
      display="flex"
      sx={{
        justifyContent: "space-between",
        px: "10px",
        py: "10px",
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: { lg: "20px", md: "15px", sm: "30px", xs: "30px" },
          marginTop: "4px",
          alignItems: "center",
        }}
      >
        <Typography
          sx={{
            fontSize: { lg: "20px", md: "15px", sm: "13px", xs: "11px" },
            color: "white",
            fontWeight: "600",
          }}
        >
          Match List
        </Typography>
        <Box sx={{ maxWidth: { lg: "100%", md: "70%", sm: "70%", xs: "70%" } }}>
          <CustomTabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="scrollable"
            textColor="inherit"
            aria-label="Match type tabs"
            scrollButtons="auto"
          >
            {gameType.map((item) => (
              <Tab
                key={item}
                label={item}
                sx={{
                  fontSize: { xs: "7px", sm: "8px", lg: "10px" },
                }}
              />
            ))}
          </CustomTabs>
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: { xs: "space-between", sm: "flex-end" },
        }}
      >
        <SearchInput
          width="50%"
          show={true}
          placeholder="Search Match..."
          handleSearch={getMatchListOnchange}
        />
        {(allPrivilege || addMatchPrivilege) && (
          <CustomButton
            onClick={() => navigate("/expert/add_match")}
            title="Add Match"
          />
        )}
      </Box>
    </Box>
  );
};

export default memo(MatchListHeader);
