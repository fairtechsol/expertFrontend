import { Box, Typography } from "@mui/material";
import { stripUrl } from "../../helpers";
import { memo } from "react";

const SingleBox = ({
  data,
  header,
  color,
  up,
  first,
  time,
  isPercent,
  rate,
  domain,
}: any) => {
  return !header ? (
    first ? (
      <Box
        sx={{
          width: "140%",
          height: "40px",
          flexDirection: "column",
          background: "#F8C851",
          display: { xs: "initial", lg: "flex" },
          justifyContent: { lg: "center", xs: "initial" },
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: { xs: "9px", lg: "0.6vw" },
            color: "black",
            textAlign: "center",
          }}
        >
          {time}
        </Typography>
      </Box>
    ) : up ? (
      <Box
        sx={{
          width: "100%",
          height: "40px",
          flexDirection: "column",
          background: color,
          marginX: { xs: "1px", lg: "1px" },
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "8px",
            color: "black",
            textAlign: "end",
            marginRight: "3px",
          }}
        >
          {data.time}
        </Typography>
        <Box sx={{ height: ".4vh" }} />
        <Typography
          sx={{
            fontWeight: "600",
            fontSize: "12px",
            color: "black",
            textAlign: "start",
            marginLeft: "3px",
          }}
        >
          {data.country}
        </Typography>
      </Box>
    ) : (
      <Box
        sx={{
          width: "100%",
          height: "40px",
          background: color,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontSize: {
              xs: "11px",
              lg: "13px",
              textTransform: "capitalize",
            },
            color: "black",
          }}
        >
          {data}
        </Typography>
        {isPercent && (
          <Typography
            sx={{
              fontSize: "9px",
              marginTop: -0.4,
              color: color == "white" ? "white" : "black",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            {rate || stripUrl(domain)}
          </Typography>
        )}
      </Box>
    )
  ) : header && first ? (
    <Box
      sx={{
        width: "140%",
        height: "25px",
        background: "#319E5B",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontWeight: "400",
          fontSize: "11px",
          color: "white",
          wordWrap: "break-word",
          lineHeight: "0.9",
        }}
      >
        {data}
      </Typography>
    </Box>
  ) : (
    <Box
      sx={{
        width: "100%",
        height: "25px",
        background: "#319E5B",
        marginX: { xs: "0px", lg: "0px" },
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontWeight: "400",
          fontSize: { lg: ".7vw", xs: "10px" },
          color: "white",
          flexWrap: "wrap",
        }}
      >
        {data}
      </Typography>
    </Box>
  );
};
export default memo(SingleBox);
