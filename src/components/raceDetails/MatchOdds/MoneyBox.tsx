import { Box, Typography } from "@mui/material";
import { ArrowDownRed, ArrowUpGreen } from "../../../assets";
import { formatToINR } from "../../helper";

const MoneyBox = ({ value }: any) => {
  // const theme = useTheme();
  // const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const formatValue = (value: any) => {
    const formattedValue = formatToINR(value === 0 ? "" : value);
    const [integerPart, decimalPart] = formattedValue.split(".");
    const formattedDecimalPart = decimalPart
      ? decimalPart.padEnd(2, "0").slice(0, 2)
      : "00"; // Ensure exactly 2 digits after the decimal point
    return { integerPart, decimalPart: formattedDecimalPart };
  };

  const { integerPart, decimalPart } = formatValue(value);

  const getFontSize = (text: any) => {
    const length = text.length;
    if (length < 6) return { lg: "12px", xs: "10px" };
    //if (length < 20) return { lg: "10px", xs: "8px" };
    return { lg: "8px", xs: "10px" };
  };
  
  const fontSize = getFontSize(integerPart);
  return (
    <Box
      sx={{
        minWidth: { lg: "40%", xs: "40%" },
        width: { lg: "30%", xs: "40%" },
        justifyContent: "center",

        marginRight: "5px",
        alignItems: "center",
        display: "flex",
        height: "35px",
        borderRadius: "7px",
        border: value === 0 ? "0" : "1px solid #ddd",
      }}
    >
      <Typography
        sx={{
          fontSize: { lg: fontSize.lg, xs: fontSize.xs },
          fontWeight: "bold",
          color: Number(value) > 0 ? "#319E5B" : "#FF4D4D",
          display: "flex",
        }}
      >
        {/* {formatToINR(value === 0 ? "" : value)} */}
        {value !== 0 && (
          <>
            <span style={{ padding: "2px" }}>{integerPart}</span>
            <span
              style={{
          
            
                padding: "2px",
              }}
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
  );
};

export default MoneyBox;
