import {
  Box,
  CircularProgress,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { formatToINR } from "../helper";

interface Props {
  type?: string;
  title?: string;
  onClick?: (value: any) => void;
  loading?: boolean;
  bgColor?: string;
  style?: React.CSSProperties;
  buttonStyle?: any;
  containerStyle?: any;
  profitLoss?: any;
  title2Style?: any;
}
const CustomButton = ({
  title,
  onClick,
  loading,
  bgColor,
  style,
  containerStyle,
  profitLoss,
  title2Style,
}: Props) => {
  const inlineStyle: React.CSSProperties = {
    ...style,
  };

  const theme = useTheme();
  const matchesxs = useMediaQuery(theme.breakpoints.down("lg"));

  const formatValue = (value: any) => {
    const formattedValue = formatToINR(value === 0 ? "" : value);
    const [integerPart, decimalPart] = formattedValue.split(".");
    const formattedDecimalPart = decimalPart
      ? decimalPart.padEnd(2, "0").slice(0, 2)
      : "00"; // Ensure exactly 2 digits after the decimal point
    return { integerPart, decimalPart: formattedDecimalPart };
  };
  const { integerPart, decimalPart } = formatValue(profitLoss);
  return (
    <Box
      onClick={onClick}
      sx={[
        containerStyle,
        {
          cursor: "pointer",
          height: "35px",
          //minWidth: "80px",
          width:{lg:"90px",md:"80px",sm:"80px",xs:"80px"},
          // marginLeft: "10px",
          borderRadius: "5px",
          background: bgColor ? bgColor : "#0B4F26",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        },
      ]}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: { lg: "11px", xs: "10px", md: "10px" },
          
          ...inlineStyle,
        }}
      >
        {" "}
        {loading ? (
          <CircularProgress
            sx={{
              color: "#FFF",
            }}
            size={20}
            thickness={4}
            value={60}
          />
        ) : (
          <>
            {title}{" "}
            {profitLoss && (
              <span style={{ fontSize: matchesxs ? "9px" : "11px" }}>
                (Total P/L :
                <span
                  style={{
                    ...title2Style,
                  }}
                >
                  {" "}
                  {profitLoss !== 0 && (
                    <>
                      <span>{integerPart}</span>
                      <span
                        style={{ fontSize: "0.8em", fontWeight: "normal" }}
                      >{`.${decimalPart}`}</span>
                    </>
                  )}
                </span>
                )
              </span>
            )}
          </>
        )}
      </Typography>
    </Box>
  );
};

export default CustomButton;
