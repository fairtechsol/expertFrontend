import { Box, Typography, debounce } from "@mui/material";
import { useDispatch } from "react-redux";
import { getMatchList } from "../../store/actions/match/matchAction";
import { AppDispatch } from "../../store/store";
import SearchInput from "../Common/SearchInput";

const TabListHeader = () => {
  const dispatch: AppDispatch = useDispatch();

  const getMatchListOnchange = debounce((value: string) => {
    dispatch(getMatchList({ keyword: value }));
  }, 500);

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
        <Typography
          sx={{
            fontSize: "20px",
            color: "white",
            fontWeight: "600",
          }}
        >
          Tab Match List
        </Typography>
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
        </Box>
      </Box>
    </>
  );
};

export default TabListHeader;
