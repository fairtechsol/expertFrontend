import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MatchListHeader from "../../components/matchList/matchListHeader";
// import CusButton from "./CusButton";
// import SearchInput from "./SearchInput";

const MatchList = (
  {
    // getAllMatch
  }
) => {
  const navigate = useNavigate();
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
          (theme) => ({
            // backgroundImage: `${theme.palette.primary.headerGradient}`,
            backgroundColor: "primary.main",
          }),
        ]}
      >
        <MatchListHeader />
      </Box>
    </>
  );
};

export default MatchList;
