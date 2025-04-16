import { Box } from "@mui/material";
import moment from "moment";
import { formatToINR } from "../../helpers";
import SingleBox from "./SingleBox";
import { memo } from "react";

const RowComponent = ({ header, data }: any) => {
  const getTime = (date: any) => {
    const timeString = moment
      .utc(date)
      .utcOffset("+05:30")
      .format("hh:mm:ss A");
    return timeString;
  };
  const getColor = () => {
    if (header) {
      return "black";
    } else if (data?.betType === "BACK" || data?.betType == "YES") {
      return "#CEEBFF";
    } else if (data?.betType === "LAY" || data?.betType == "NO") {
      return "#F2CBCB";
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: header ? "25px" : "40px",
        background: "white",
        justifyContent: "space-between",
        alignItems: "center",
        display: "flex",
        gap: "1px",
        marginBottom: { xs: "1px", lg: "1px" },
      }}
    >
      {!header && (
        <>
          <SingleBox
            color={getColor}
            data={data?.teamName}
            first={true}
            header={header}
            time={getTime(data.createdAt)}
          />
          <SingleBox
            color={getColor()}
            data={data?.username || data?.userName || data?.user?.userName}
            isPercent={true}
            header={header}
            domain={data?.domain}
          />
          <SingleBox
            color={getColor()}
            data={data?.odds}
            header={header}
            isPercent={true}
            rate={data?.rate}
          />
          <SingleBox color={getColor()} data={data?.betType} header={header} />
          <SingleBox
            color={getColor()}
            data={formatToINR(data?.stack || data?.stake || data?.amount)}
            header={header}
          />
        </>
      )}
      {header && (
        <>
          <SingleBox
            color={getColor}
            data={data[0]}
            first={true}
            header={header}
          />
          <SingleBox color={getColor()} data={data[1]} header={header} />
          <SingleBox color={getColor()} data={data[2]} header={header} />
          <SingleBox color={getColor()} data={data[3]} header={header} />
          <SingleBox color={getColor()} data={data[4]} header={header} />
        </>
      )}
    </Box>
  );
};

export default memo(RowComponent);
