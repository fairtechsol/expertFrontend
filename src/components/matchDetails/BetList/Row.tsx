import { Box } from "@mui/material";
import LargeBox from "./LargeBox";
import SmallBox from "./SmallBox";

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
      {/* {verifyBy && ( 
      <Box sx={{ background: "rgba(0,0,0,0.5)", width: { lg: "92.3%", xs: "88.3%" }, height: "30px", position: "absolute", display: "flex", }} >
      <Box sx={{ flex: 1, display: "flex" }}>
        <Box sx={{ width: "34%", height: "30px" }}></Box>
        <Box sx={{ width: "66%", height: "30px", display: "flex", justifyContent: "center", alignItems: "flex-end", }} >
          {
            <Typography sx={{ fontSize: "12px", fontWeight: "700", color: "white", textTransform: "uppercase", }} >
              <span style={{ color: "#ffffff" }}>
              {verifyBy}
              </span>
            </Typography>
          }
        </Box>
      </Box>
    </Box>
      )} */}
    </Box>
  );
};

export default Row;
