import { Box } from "@mui/material";
import SessionLargeBox from "./SessionLargeBox";
import SessionSmallBox from "./SessionSmallBox";

const SessionRow = ({ values }: any) => {
  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      {values?.map((item: any, k: any) => {
        if (!item?.small) {
          return <SessionLargeBox k={k} key={k} item={item} />;
        } else {
          return <SessionSmallBox k={k} key={k} item={item} />;
        }
      })}
    </Box>
  );
};

export default SessionRow;
