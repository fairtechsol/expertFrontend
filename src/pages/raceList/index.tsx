import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import MatchListHeader from "../../components/raceList/matchListHeader";
import MatchListTable from "../../components/raceList/matchListTable";
import MatchListTableHeader from "../../components/raceList/matchListTableHeader";
import "./style.css";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { matchListReset } from "../../store/actions/match/matchAction";
import {
  expertSocketService,
  socket,
  socketService,
} from "../../socketManager";
import CustomButton from "../../components/Common/CustomButton";
import { useNavigate, useParams } from "react-router-dom";
import { getDateList } from "../../store/actions/user/userAction";

const RaceList = ({}) => {
  const dispatch: AppDispatch = useDispatch();
  const [currentPage] = useState(1);
  const { raceType } = useParams();
  const [value, setValue] = useState(raceType);
  const navigate = useNavigate();
  const { getProfile } = useSelector((state: RootState) => state.user.profile);

  const { success, raceList } = useSelector(
    (state: RootState) => ({
      success: state.matchList.success,
      raceList: state.matchList.raceList,
    }),
    shallowEqual
  );

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    // setValue(newValue);
    navigate(`/expert/race/${newValue}`);
  };

  const getMatchListService = (event: any) => {
    if (event?.gameType === raceType || event?.type === raceType) {
      setTimeout(() => {
        dispatch(getDateList({ matchType: value }));
      }, 500);
    }
  };

  useEffect(() => {
    if (success) {
      dispatch(matchListReset());
    }
  }, [success]);

  useEffect(() => {
    try {
      if (socket) {
        expertSocketService.match.matchAdded(getMatchListService);
        socketService.user.matchResultUnDeclared(getMatchListService);
        socketService.user.matchResultDeclared(getMatchListService);
        socketService.user.matchResultUnDeclareAllUser(getMatchListService);
        return () => {
          expertSocketService.match.matchAddedOff();
          socketService.user.matchResultUnDeclaredOff();
          socketService.user.matchResultUnDeclareAllUserOff();
        };
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, raceType]);

  useEffect(() => {
    if (raceType) {
      setValue(raceType);
      dispatch(getDateList({ matchType: raceType }));
    }
  }, [raceType]);

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
          Object?.keys(raceList)?.map((item: any, index: number) => (
            <MatchListTable
              key={item?.[0]?.venue}
              data={item}
              index={index}
              currentPage={currentPage}
              race={raceList}
            />
          ))}

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
