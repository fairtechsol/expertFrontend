import { Box } from "@mui/material";
import SmallBox from "./SmallBox";
import LargeBox from "./LargeBox";

const Row = ({ values }: any) => {
  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      {values?.map((item: any, k: any) => {
        if (!item?.small) {
          return <LargeBox k={k} key={k} item={item} />;
        } else {
          return <SmallBox k={k} key={k} item={item} />;
        }
      })}
    </Box>
  );
};

export default Row;
