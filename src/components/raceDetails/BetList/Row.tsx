import { Box } from "@mui/material";
import { Fragment, memo } from "react";
import LargeBox from "./LargeBox";
import SmallBox from "./SmallBox";

interface RowProps {
  values: any;
}

const Row = ({ values }: RowProps) => {
  return (
    <Box sx={{ width: "100%", display: "flex" }}>
      {values?.map((item: any, k: any) => (
        <Fragment key={k}>
          {!item?.small ? (
            <LargeBox k={k} item={item} />
          ) : (
            <SmallBox item={item} />
          )}
        </Fragment>
      ))}
    </Box>
  );
};

export default memo(Row);
