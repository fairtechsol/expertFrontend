import { Box, Typography } from "@mui/material";
import moment from "moment";
import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Constants } from "../../utils/Constants";
import CustomButton from "../Common/CustomButton";

const MatchListTable = ({ data, index, currentPage, race }: any) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        background: "#FFE094",
        alignItems: { xs: "stretch", md: "center" },
        borderTop: "2px solid white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          width: "100px",
          paddingLeft: "10px",
          alignItems: "center",
          borderRight: "2px solid white",
        }}
      >
        <Typography sx={{ fontSize: "12px" }}>
          {index + 1 + Constants.pageLimit * (currentPage - 1)}.
        </Typography>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          paddingX: "10px",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row", lg: "row" },
        }}
      >
        <Box
          display="flex"
          alignItems="center"
          sx={{
            order: { xs: "2", sm: "1" },
            marginY: { xs: 1 },
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: "#000",
              alignItems: "center",
              marginRight: { lg: "10px", xs: "6px" },
              justifyContent: "space-between",
              maxWidth: "200px",
            }}
          >
            {data}
          </Typography>
        </Box>
        <Box
          display="flex"
          sx={{
            flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
            order: { xs: "1", sm: "2", md: "3" },
            width: { xs: "100%", sm: "auto" },
            py: { xs: 1, sm: 0 },
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            display="flex"
            sx={{
              alignItems: "center",
              justifyContent: "flex-end",
              flexWrap: "wrap",
            }}
          >
            {data &&
              race[data].map((item: any) => (
                <CustomButton
                  key={item.id}
                  containerStyle={{
                    margin: "5px",
                  }}
                  onClick={() => {
                    navigate(`/expert/betOdds/race`, {
                      state: { id: item?.id, marketId: item?.marketId },
                    });
                  }}
                  title={moment(item.startAt).format("HH:mm")}
                  profitLoss={item?.stopAt ? item?.pl?.totalProfitLoss : ""}
                  style={{ padding: "5px" }}
                  title2Style={{
                    color:
                      item?.stopAt && item?.pl?.totalProfitLoss > 0
                        ? "#46E080"
                        : item?.stopAt && item?.pl?.totalProfitLoss < 0
                        ? "#FF4D4D"
                        : "",
                  }}
                />
              ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default memo(MatchListTable);
