import { Box } from "@mui/material";
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
import { expertSocketService, socket, socketService } from "../../socketManager";
import moment from "moment";


const RaceList = ({}) => {
  const dispatch: AppDispatch = useDispatch();
  const [currentPage] = useState(1);
 
  const {success, raceList,countryCode } = useSelector(
    (state: RootState) => state.matchList
  );
  const {  dateList } = useSelector(
    (state: RootState) => state.user.profile
  );
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

  useEffect(() => {
    if (success) {
      dispatch(matchListReset());
    }
  }, [success]);

  const getMatchListService = () => {
    // setCurrentPage(1);
    dispatch(
      getRaceList({
        cc: countryCode[0]?.countryCode,
        date: moment(dateList[0]?.date).format("YYYY-MM-DD"),
      })
    );
  };

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
        <MatchListHeader />
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
