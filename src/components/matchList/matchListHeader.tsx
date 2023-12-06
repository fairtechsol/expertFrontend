import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchInput from "../../components/Common/SearchInput";
import CustomButton from "../Common/CustomButton";

interface Props {
  getAllMatchHandle?: (value: any) => void;
}
const MatchListHeader = ({ getAllMatchHandle }: Props) => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        display={"flex"}
        sx={{ justifyContent: "space-between", px: "10px", py: "10px" }}
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
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <SearchInput
            show={true}
            getAllMatch={getAllMatchHandle}
            placeholder={"Search Match..."}
          />
          <CustomButton
            onClick={() => {
              navigate("/expert/add_match");
            }}
            title={"Add Match"}
          />
        </Box>
      </Box>
    </>
  );
};

export default MatchListHeader;
