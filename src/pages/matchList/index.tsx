import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import Constants from "../../components/helper/constants";
import MatchListHeader from "../../components/matchList/matchListHeader";
import MatchListTable from "../../components/matchList/matchListTable";
import MatchListTableHeader from "../../components/matchList/matchListTableHeader";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  getMatchList,
  matchListReset,
} from "../../store/actions/match/matchAction";

const MatchList = ({ }) => {
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { matchList, success } = useSelector(
    (state: RootState) => state.matchList
  );

  function callPage(event: any, newPage: any) {
    setCurrentPage(newPage);
  }

  useEffect(() => {
    dispatch(getMatchList({ currentPage: currentPage }));
  }, [currentPage]);

  useEffect(() => {
    if (success) {
      dispatch(matchListReset());
    }
  }, [success]);


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
        <MatchListHeader getAllMatchHandle={() => { }} />
        <MatchListTableHeader />
        {matchList && matchList?.matches?.map((item: any, index: number) => {
          return <MatchListTable key={item?.id} data={item} index={index} />;
        })}
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
            parseInt(
              matchList?.count ? matchList?.count : 1
            ) / Constants.pageLimit
          )}
          color="primary"
          onChange={callPage}
        />
      </Box>
    </>
  );
};

export default MatchList;
