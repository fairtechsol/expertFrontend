import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import MatchListHeader from "../../components/raceList/matchListHeader";
import MatchListTable from "../../components/raceList/matchListTable";
import MatchListTableHeader from "../../components/raceList/matchListTableHeader";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  getRaceList,
  matchListReset,
} from "../../store/actions/match/matchAction";
import {
  expertSocketService,
  socket,
  socketService,
} from "../../socketManager";
import moment from "moment";
import CustomButton from "../../components/Common/CustomButton";
import { useNavigate } from "react-router-dom";
import { getDateList } from "../../store/actions/user/userAction";

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <div
      className="p-0"
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
      sx={{
        padding: 0,
      }}
    >
      {value === index && <Box sx={{ mt: 2 }}>{children}</Box>}
    </div>
  );
}

const RaceList = ({}) => {
  const dispatch: AppDispatch = useDispatch();
  const [currentPage] = useState(1);
  const [value, setValue] = useState("horseRacing");

  const navigate = useNavigate();
  const { getProfile, dateList } = useSelector(
    (state: RootState) => state.user.profile
  );

  const { success, raceList, countryCode } = useSelector(
    (state: RootState) => state.matchList
  );

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  // function callPage(_: any, newPage: any) {
  //   setCurrentPage(newPage);
  // }

  // useEffect(() => {
  //   try {
  //     if (sessionStorage.getItem("jwtExpert")) {
  //       dispatch(getMatchList({ currentPage: currentPage }));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [currentPage, sessionStorage]);

  const getMatchListService = () => {
    // setCurrentPage(1);
    dispatch(
      getRaceList({
        cc: countryCode[0]?.countryCode,
        date: moment(dateList[0]?.date).format("YYYY-MM-DD"),
        matchType: value,
      })
    );
  };

  useEffect(() => {
    if (success) {
      dispatch(matchListReset());
    }
  }, [success]);

  useEffect(() => {
    dispatch(getDateList({ matchType: value }));
  }, [value]);

  useEffect(() => {
    try {
      if (socket) {
        expertSocketService.match.matchAdded(getMatchListService);
        socketService.user.matchResultUnDeclared(getMatchListService);
        socketService.user.matchResultDeclared(getMatchListService);
        return () => {
          expertSocketService.match.matchAddedOff();
          socketService.user.matchResultUnDeclaredOff();
        };
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket]);

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
        <Box>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab
              sx={{ color: "white" }}
              value="horseRacing"
              label="Horse Racing"
            />
            <Tab
              sx={{ color: "white" }}
              value="greyHound"
              label="Greyhound Racing"
            />
          </Tabs>

          <TabPanel value={value} index="horseRacing"></TabPanel>
          <TabPanel value={value} index="greyHound"></TabPanel>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            flexDirection: { lg: "row-reverse", xs: "row" },
            alignItems: "center",
          }}
        >
          {(getProfile?.allPrivilege || getProfile?.addMatchPrivilege) && (
            <CustomButton
              onClick={() => {
                navigate("/expert/add_race");
              }}
              title={"Add Race"}
              bgColor="#f1c40f"
              style={{ color: "#000" }}
            />
          )}
        </Box>
      </Box>
      <Box
        sx={[
          {
            marginX: "10px",
            marginTop: "10px",
            minHeight: "200px",
            borderRadius: "10px",
            border: "2px solid white",
          },
          (theme: any) => ({
            backgroundImage: `${theme.palette.primary.headerGradient}`,
          }),
        ]}
      >
        <MatchListHeader value={value} />
        <MatchListTableHeader />
        {raceList &&
          Object.keys(raceList).map((item: any, index: number) => {
            return (
              <MatchListTable
                key={item?.id}
                data={item}
                index={index}
                currentPage={currentPage}
                race={raceList}
              />
            );
          })}
        {/* <Pagination
          sx={{
            background: "#073c25",
            overflow: "hidden",
            borderRadius: "0px 0px 10px 10px",
            color: "white",
            "& .MuiPaginationItem-page": {
              color: "white", // Change the text color for other pages
            },
            "& .MuiPaginationItem-ellipsis": {
              color: "white", // Change the text color for ellipsis (...) items
            },
            "& .MuiPaginationItem-next": {
              color: "white", // Change the text color for the "Next" button
            },
          }}
          page={currentPage}
          className="whiteTextPagination matchList-pagination d-flex justify-content-center"
          count={Math.ceil(
            parseInt(matchList?.count ? matchList?.count : 1) /
              Constants.pageLimit
          )}
          color="primary"
          // onChange={callPage}
        /> */}
      </Box>
    </>
  );
};

export default RaceList;
