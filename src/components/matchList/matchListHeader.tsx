import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../components/Common/CustomButton";
// import CusButton from "./CusButton";
// import SearchInput from "./SearchInput";

const MatchListHeader = (
  {
    // getAllMatch
  }
) => {
  const navigate = useNavigate();
  return (
    <>
      <Box
        display={"flex"}
        sx={{ justifyContent: "space-between", px: "10px", py: "10px" }}
      >
        <Typography
          sx={{ fontSize: "16px", color: "white", fontWeight: "500" }}
        >
          Match List
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* <SearchInput
          show={true}
          getAllMatch={getAllMatch}
          placeholder={"Search Match..."} 
        /> */}
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
