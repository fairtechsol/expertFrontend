import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import MatchListTableHeader from "../../components/matchList/matchListTableHeader";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  getMatchList,
  getTabList,
  matchListReset,
} from "../../store/actions/match/matchAction";
import {
  expertSocketService,
  socket,
  socketService,
} from "../../socketManager";
import TabListHeader from "../../components/tabList/tabListHeader";
import TabListTable from "../../components/tabList/tabListTable";

const TabList = ({}) => {
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { matchList, success } = useSelector(
    (state: RootState) => state.matchList
  );

  function callPage(_: any, newPage: any) {
    setCurrentPage(newPage);
  }

  useEffect(() => {
    try {
      if (sessionStorage.getItem("jwtExpert")) {
        dispatch(
          getMatchList({
            currentPage: currentPage,
            stopAt: true,
            pageLimit: 20,
          })
        );
        dispatch(getTabList({ currentPage: currentPage }));
      }
    } catch (error) {
      console.log(error);
    }
  }, [currentPage, sessionStorage]);

  useEffect(() => {
    if (success) {
      dispatch(matchListReset());
    }
  }, [success]);

  const getMatchListService = () => {
    setCurrentPage(1);
    dispatch(
      getMatchList({
        currentPage: 1,
        pageLimit: 20,
      })
    );
  };

  useEffect(() => {
    try {
      if (socket) {
        expertSocketService.match.matchAdded(getMatchListService);
        socketService.user.matchResultUnDeclared(getMatchListService);
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
        <TabListHeader />
        <MatchListTableHeader />

        {matchList &&
          matchList?.matches?.map((item: any, index: number) => (
            <TabListTable
              key={item?.id}
              data={item}
              index={index}
              currentPage={currentPage}
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
          page={currentPage}
          className="whiteTextPagination matchList-pagination d-flex justify-content-center"
          count={Math.ceil(
            parseInt(matchList?.count ? matchList?.count : 1) / 20
          )}
          color="primary"
          onChange={callPage}
        />
      </Box>
    </>
  );
};

export default TabList;
