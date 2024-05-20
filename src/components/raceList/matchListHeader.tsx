import { Box, Typography, debounce } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../components/Common/SearchInput";
import CustomButton from "../Common/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getMatchList } from "../../store/actions/match/matchAction";

const MatchListHeader = () => {
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
            fontSize: "16px",
            color: "white",
            fontWeight: "600",
          }}
        >
          Race List
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
            placeholder="Search Race..."
            handleSearch={getMatchListOnchange}
          />
          {(getProfile?.allPrivilege || getProfile?.addMatchPrivilege) && (
            <CustomButton
              onClick={() => {
                navigate("/expert/add_race");
              }}
              title={"Add Race"}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default MatchListHeader;
