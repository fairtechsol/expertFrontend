import {
  Box,
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
      : "00";
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
          minWidth: { lg: "90px", md: "80px", sm: 0, xs: 0 },
          padding: { xs: "6px", sm: "6px", md: 0, lg: 0 },
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          ...inlineStyle,
        }}
      >
        <span>{title}</span>
        {profitLoss && (
          <span style={{ fontSize: matchesxs ? "9px" : "10px" }}>
            (Total P/L :
            <span
              style={{
                ...title2Style,
              }}
            >
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
      </Typography>
    </Box>
  );
};

export default CustomButton;
