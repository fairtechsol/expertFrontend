import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import { ArrowDownRed, ArrowUpGreen } from "../../../assets";
import { formatToINR } from "../../helper";

const MoneyBox = ({ value }: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const formatValue = (value: any) => {
    const formattedValue = formatToINR(value === 0 ? "" : value);
    const [integerPart, decimalPart] = formattedValue.split(".");
    const formattedDecimalPart = decimalPart
      ? decimalPart.padEnd(2, "0").slice(0, 2)
      : "00"; // Ensure exactly 2 digits after the decimal point
    return { integerPart, decimalPart: formattedDecimalPart };
  };

  const { integerPart, decimalPart } = formatValue(value);
  return (
    <>
      <Box
        sx={{
          minWidth: { lg: "50%", xs: "60%" },
          width: { lg: "60%", xs: "70%" },
          justifyContent: "center",
          position: matchesMobile ? "absolute" : "relative",
          right: matchesMobile ? "-90%" : "10px",
          alignItems: "center",
          display: "flex",
          height: "28px",
          borderRadius: "7px",
          border: value === 0 ? "0" : "1px solid #ddd",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "bold",
            color: Number(value) > 0 ? "#319E5B" : "#FF4D4D",
          }}
        >
          {/* {formatToINR(value === 0 ? "" : value)} */}
          {value !== 0 && (
            <>
              <span>{integerPart}</span>
              <span
                style={{ fontSize: "0.8em", fontWeight: "normal" }}
              >{`.${decimalPart}`}</span>
            </>
          )}
        </Typography>
        {value ? (
          <img
            src={Number(value) > 0 ? ArrowUpGreen : ArrowDownRed}
            style={{ width: "12px", height: "10px" }}
          />
        ) : (
          ""
        )}
      </Box>
    </>
  );
};

export default MoneyBox;
