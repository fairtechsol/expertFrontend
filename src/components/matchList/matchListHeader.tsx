import { Box, Tab, Tabs, Typography, debounce, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../components/Common/SearchInput";
import CustomButton from "../Common/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  getMatchList,
  setSelectedTabForMatchList,
  updateMatchListCurrentPage,
} from "../../store/actions/match/matchAction";
import { gameType } from "../../utils/Constants";

const CustomTabs = styled(Tabs)({
  "& .MuiTab-root": {
    // maxWidth: "0.5rem",
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

const MatchListHeader = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedTab } = useSelector((state: RootState) => state.matchList);

  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

  const getMatchListOnchange = debounce((value: string) => {
    dispatch(
      getMatchList({ keyword: value, matchType: gameType[selectedTab] })
    );
  }, 500);

  const handleTabChange = (_: any, newValue: any) => {
    dispatch(setSelectedTabForMatchList(newValue));
    dispatch(updateMatchListCurrentPage(1));
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
          <Box
            sx={{
              maxWidth: { lg: "100%", md: "70%", sm: "70%", xs: "70%" },
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
              scrollButtons
              allowScrollButtonsMobile
              sx={{
                height: "30px",
                "& .MuiTab-root": {
                  minWidth: "2.5rem",
                  minHeight: "1rem",
                  transition: "background-color 0.3s ease, color 0.3s ease",
                },
              }}
            >
              {gameType.map((item: any, index: any) => (
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
                    fontSize: { xs: "7px", sm: "8px", lg: "10px" },
                    fontWeight: "bold",
                  }}
                  key={item}
                  label={item}
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
          {(profileDetail?.allPrivilege ||
            profileDetail?.addMatchPrivilege) && (
            <CustomButton
              onClick={() => {
                navigate("/expert/add_match");
              }}
              title={"Add Match"}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default MatchListHeader;
