import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import Constants from "../../components/helper/constants";
import MatchListHeader from "../../components/matchList/matchListHeader";
import MatchListTable from "../../components/matchList/matchListTable";
import MatchListTableHeader from "../../components/matchList/matchListTableHeader";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getMatchList } from "../../store/actions/match/matchAction";

const MatchList = ({}) => {
  const dispatch: AppDispatch = useDispatch();
  const [pageCount] = useState(Constants.pageCount);
  const [currentPage, setCurrentPage] = useState(1);
  const { matchList } = useSelector((state: RootState) => state.matchList);

  function callPage(value: any) {
    setCurrentPage(parseInt(value));
  }

  useEffect(() => {
    dispatch(getMatchList());
  }, []);

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
        <MatchListHeader getAllMatchHandle={() => {}} />
        <MatchListTableHeader />
        {matchList?.map((item: any, index: number) => {
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
          count={pageCount}
          color="primary"
          onChange={callPage}
        />
      </Box>
    </>
  );
};

export default MatchList;
