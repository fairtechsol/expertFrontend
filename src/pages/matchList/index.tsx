import { Box, Pagination } from "@mui/material";
import { useState } from "react";
import Constants from "../../components/helper/constants";
import MatchListHeader from "../../components/matchList/matchListHeader";
import MatchListTable from "../../components/matchList/matchListTable";
import MatchListTableHeader from "../../components/matchList/matchListTableHeader";

const MatchList = ({}) => {
  const [pageCount] = useState(Constants.pageCount);
  const [currentPage, setCurrentPage] = useState(1);

  function callPage(value: any) {
    setCurrentPage(parseInt(value));
  }

  const getAllMatch = () => {
    alert("getAllMatch");
  };
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
        <MatchListHeader getAllMatchHandle={getAllMatch} />
        <MatchListTableHeader />
        {[1, 2, 3].map((item: number) => {
          return <MatchListTable key={item} />;
        })}
        <Pagination
          sx={{
            background: "#073c25",
            overflow: "hidden",
            borderRadius: "0px 0px 10px 10px",
          }}
          page={currentPage}
          className="whiteTextPagination d-flex justify-content-center"
          count={pageCount}
          color="primary"
          onChange={callPage}
        />
      </Box>
    </>
  );
};

export default MatchList;
