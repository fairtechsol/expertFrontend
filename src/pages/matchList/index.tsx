import { Box, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import Constants from "../../components/helper/constants";
import { MatchListTableData } from "../../components/matchList/index.json";
import MatchListHeader from "../../components/matchList/matchListHeader";
import MatchListTable from "../../components/matchList/matchListTable";
import MatchListTableHeader from "../../components/matchList/matchListTableHeader";

const MatchList = ({}) => {
  // const navigate = useNavigate();
  const [pageCount, setPageCount] = useState(Constants.pageCount);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [allMatch, setAllMatch] = useState();
  // const { userAllMatches } = useSelector((state) => state?.matchDetails);

  useEffect(() => {
    // if (userAllMatches) {
    //   setAllMatch(userAllMatches);
    // }
  }, []);

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
        {MatchListTableData().map((item: any) => {
          return (
            <>
              <MatchListTable />
            </>
          );
        })}
        {/* {allMatch.length > 0 &&
          allMatch?.map((element, i) => {
            return (
              <Row
                key={i}
                index={i + 1}
                containerStyle={{
                  background: (i + 1) % 2 === 0 ? "#ECECEC" : "",
                }}
                data={element}
              />
            );
          })} */}
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
