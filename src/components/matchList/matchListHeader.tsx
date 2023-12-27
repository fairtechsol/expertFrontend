import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../components/Common/SearchInput";
import CustomButton from "../Common/CustomButton";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface Props {
  getAllMatchHandle?: (value: any) => void;
}
const MatchListHeader = ({ getAllMatchHandle }: Props) => {
  const navigate = useNavigate();
  const { getProfile } = useSelector((state: RootState) => state.user.profile);

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
