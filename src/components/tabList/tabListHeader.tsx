import { Box, Typography, debounce } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchInput from "../Common/SearchInput";
import CustomButton from "../Common/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getMatchList } from "../../store/actions/match/matchAction";

const TabListHeader = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { getProfile } = useSelector((state: RootState) => state.user.profile);

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
