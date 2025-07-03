import { Box, Typography } from "@mui/material";
import moment from "moment";
import { memo } from "react";
import { formatToINR } from "../../helper";

interface RowValues {
  deleteReason?: string;
  isCommissionActive?: boolean;
  user?: any;
  domain?: string;
  betType?: "YES" | "NO";
  odds?: any;
  rate?: any;
  createdAt?: string | Date;
  amount?: any;
  myStake?: any;
}

interface RowProps {
  index: number;
  values: RowValues;
}
const Row = ({ index, values }: RowProps) => {
  const getTime = (date: any) => {
    const timeString = moment
      .utc(date)
      .utcOffset("+05:30")
      .format("hh:mm:ss A");
    return timeString;
  };

  return (
    <div style={{ display: "flex", position: "relative" }}>
      {values?.deleteReason && (
        <Box
          sx={{
            background: "rgba(0,0,0,0.5)",
            width: "100%",
            height: "100%",
            position: "absolute",
            display: "flex",
            zIndex: 2,
          }}
        >
          <Box sx={{ flex: 1, display: "flex" }}>
            <Box sx={{ width: "34%", height: "100%" }} />
            <Box
              sx={{
                width: "66%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
              }}
            >
              <Typography
                sx={{
                  fontSize: "10px",
                  fontWeight: "700",
                  color: "white",
                  textTransform: "uppercase",
                }}
              >
                Bet <span style={{ color: "#e41b23" }}>deleted</span> due to{" "}
                {values?.deleteReason}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
          height: "40px",
          borderTop: "2px solid white",
          width: "100%",
        }}
      >
        <Box
          sx={{
            background: "#F8C851",
            width: "6%",
            px: "5px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: "black", fontWeight: "600", fontSize: "14px" }}
          >
            {index}.
          </Typography>
        </Box>
        <Box
          sx={{
            background: "#0B4F26",
            width: "20%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "2px" }}>
            {values?.isCommissionActive && (
              <Box
                sx={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "#74ee15",
                }}
              />
            )}
            <Typography
              sx={{
                color: "white",
                lineHeight: 1.1,
                fontSize: { lg: "12px", xs: "9px", sm: "10px", md: "12px" },
              }}
            >
              {values?.user?.userName}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontSize: "8px",
              color: "white",
              lineHeight: 1.1,
              wordWrap: "break-word",
              maxWidth: "100%",
            }}
          >
            {values?.domain?.replace(/https?:\/\//, "")}
          </Typography>
        </Box>
        <Box
          sx={{
            background: values?.betType == "YES" ? "#B3E0FF" : "#FFB5B5",
            width: "10%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
            flexDirection: "column",
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: { lg: "14px", xs: "9px", sm: "10px", md: "12px" },
              color: "black",
              lineHeight: 1.1,
              marginRight: "2px",
            }}
          >
            {values?.odds}
          </Typography>
          <Typography
            sx={{
              fontSize: "10px",
              marginTop: -0.4,
              color: "black",
              textAlign: "center",
              fontWeight: "bold",
              marginRight: "2px",
            }}
          >
            {values?.rate}
          </Typography>
        </Box>
        <Box
          sx={{
            background: values.betType == "YES" ? "#B3E0FF" : "#FFB5B5",
            width: "14%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: { lg: "14px", xs: "9px", sm: "10px", md: "12px" },
              color: "black",
              position: "static",
              top: 0,
              right: 5,
            }}
          >
            {getTime(values.createdAt)}
          </Typography>
        </Box>
        <Box
          sx={{
            background: values.betType == "YES" ? "#B3E0FF" : "#FFB5B5",
            width: "10%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: { lg: "14px", xs: "9px", sm: "10px", md: "12px" },
              color: "black",
            }}
          >
            {values.betType == "YES" ? "Yes" : "No"}
          </Typography>
        </Box>
        <Box
          sx={{
            background: values.betType == "YES" ? "#B3E0FF" : "#FFB5B5",
            width: "20%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: { lg: "14px", xs: "9px", sm: "10px", md: "12px" },
              color: "black",
            }}
          >
            {formatToINR(values?.amount)}
          </Typography>
        </Box>
        <Box
          sx={{
            background: "#0B4F26",
            width: "20%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: { lg: "14px", xs: "9px", sm: "10px", md: "12px" },
              color: "white",
            }}
          >
            {formatToINR(
              values?.myStake
                ? values?.myStake
                : (
                    (values?.amount * values?.user?.fwPartnership) /
                    100
                  ).toFixed()
            )}
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default memo(Row);
