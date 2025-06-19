import { Box } from "@mui/material";
import { Fragment, memo } from "react";
import LargeBox from "./LargeBox";
import SmallBox from "./SmallBox";

const Row = ({ values }: { values: any }) => {
  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      {values?.map((item: any, k: any) => {
        return (
          <Fragment key={k}>
            {!item?.small ? (
              <LargeBox k={k} item={item} />
            ) : (
              <SmallBox item={item} />
            )}
          </Fragment>
        );
      })}
    </Box>
  );
};

export default memo(Row);
