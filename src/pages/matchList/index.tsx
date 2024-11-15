import { Box, Pagination } from "@mui/material";
import { useEffect } from "react";
import MatchListHeader from "../../components/matchList/matchListHeader";
import MatchListTable from "../../components/matchList/matchListTable";
import MatchListTableHeader from "../../components/matchList/matchListTableHeader";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  getMatchList,
  matchListReset,
  updateMatchListCurrentPage,
} from "../../store/actions/match/matchAction";
import {
  expertSocketService,
  socket,
  socketService,
} from "../../socketManager";
import { Constants, gameType } from "../../utils/Constants";

const MatchList = ({}) => {
  const dispatch: AppDispatch = useDispatch();
  const { matchList, success, selectedTab, matchListCurrentPage } = useSelector(
    (state: RootState) => state.matchList
  );

  function callPage(_: any, newPage: any) {
    dispatch(updateMatchListCurrentPage(newPage));
  }

  useEffect(() => {
    try {
      if (sessionStorage.getItem("jwtExpert")) {
        dispatch(
          getMatchList({
            currentPage: matchListCurrentPage,
            matchType: gameType[selectedTab],
          })
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, [matchListCurrentPage, sessionStorage, selectedTab]);

  useEffect(() => {
    if (success) {
      dispatch(matchListReset());
    }
  }, [success]);

  const getMatchListService = (event: any) => {
    dispatch(updateMatchListCurrentPage(1));
    const index = gameType.indexOf(event?.gameType);
    if (index === selectedTab) {
      setTimeout(() => {
        dispatch(
          getMatchList({
            currentPage: 1,
            matchType: event?.gameType,
          })
        );
      }, 500);
    }
  };
  const getMatchListServiceAddMatch = (event: any) => {
    dispatch(updateMatchListCurrentPage(1));
    const index = gameType.indexOf(event?.gameType);
    if (index === selectedTab) {
      setTimeout(() => {
        dispatch(
          getMatchList({
            currentPage: 1,
            matchType: event?.gameType,
          })
        );
      }, 500);
    }
  };

  useEffect(() => {
    try {
      if (socket) {
        expertSocketService.match.matchAdded(getMatchListServiceAddMatch);
        socketService.user.matchResultDeclareAllUser(getMatchListService);
        socketService.user.matchResultDeclared(getMatchListService);
        socketService.user.matchResultUnDeclared(getMatchListService);
        socketService.user.matchResultUnDeclareAllUser(getMatchListService);
        return () => {
          expertSocketService.match.matchAddedOff();
          socketService.user.matchResultUnDeclaredOff();
          socketService.user.matchResultDeclaredOff();
          socketService.user.matchResultDeclareAllUserOff();
          socketService.user.matchResultDeclareAllUserOff();
        };
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, selectedTab]);

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

        {matchList &&
          matchList?.matches?.map((item: any, index: number) => (
            <MatchListTable
              key={item?.id}
              data={item}
              index={index}
              currentPage={matchListCurrentPage}
            />
          ))}
        <Pagination
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
          page={matchListCurrentPage}
          className="whiteTextPagination matchList-pagination d-flex justify-content-center"
          count={Math.ceil(
            parseInt(matchList?.count ? matchList?.count : 1) /
              Constants.pageLimit
          )}
          color="primary"
          onChange={callPage}
        />
      </Box>
    </>
  );
};

export default MatchList;
