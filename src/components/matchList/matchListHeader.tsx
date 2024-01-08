import { Box, Typography, debounce } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../components/Common/SearchInput";
import CustomButton from "../Common/CustomButton";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import { getMatchList } from "../../store/actions/match/matchAction";

interface Props {
  getAllMatchHandle?: (value: any) => void;
}
const MatchListHeader = ({ getAllMatchHandle }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { getProfile } = useSelector((state: RootState) => state.user.profile);

  // const [listSearch, setListSearch] = useState("");

  // const matchListSearch = (e: any) => {
  //   let searchVal = e.target.value
  //   console.log(searchVal, "searchVal")
  // }

  const getMatchListOnchange = debounce((value: any) => {
    dispatch(getMatchList({ keyword: value }))
  }, 500)
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
          Match List
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
            getAllMatch={getAllMatchHandle}
            placeholder={"Search Match..."}
            handleSearch={getMatchListOnchange}
            // handleInputChange={matchListSearch}
          />
          {getProfile?.allPrivilege ? (
            <CustomButton
              onClick={() => {
                navigate("/expert/add_match");
              }}
              title={"Add Match"}
            />
          ) : getProfile?.addMatchPrivilege ? (
            <CustomButton
              onClick={() => {
                navigate("/expert/add_match");
              }}
              title={"Add Match"}
            />
          ) : null}
        </Box>
      </Box>
    </>
  );
};

export default MatchListHeader;
