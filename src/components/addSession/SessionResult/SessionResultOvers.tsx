import StyledImage from "../../Common/StyledImages";
import { Box, Typography } from "@mui/material";

const SessionResultOvers = (props: any) => {
  const { sessionData, mode, changeSelected, selected } = props;
  return (
    <Box sx={{ border: "2px solid #FFFFFF" }}>
      <Box sx={{ display: "flex" }}>
        <Box sx={{ background: "#319E5B", width: "60%", px: "5px" }}>
          <Typography
            sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}
          >
            Overs
          </Typography>
        </Box>
        <Box
          sx={{
            background: "#303030",
            width: "20%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}
          >
            RESULT
          </Typography>
        </Box>
        <Box
          sx={{
            background: "#303030",
            width: "20%",
            borderLeft: "2px solid white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}
          >
            PROFIT/LOSS
          </Typography>
        </Box>
      </Box>
      {sessionData?.length > 0 &&
        sessionData?.map((item: any, index: any) => {
          if (!item?.betId?.selectionId) {
            let profit_loss = parseInt(item.profitLoss);
            let checkSelcted = !selected.includes(item?.betId?.id);
            return (
              <Box
                onClick={() => changeSelected(item)}
                key={index}
                display={"flex"}
                sx={{
                  borderTop: "2px solid white",
                  background:
                    checkSelcted && mode == "1" ? "rgba(0,0,0,.6)" : "#FFFFFF",
                }}
              >
                <Box
                  sx={{
                    background:
                      checkSelcted && mode == "1"
                        ? "rgba(0,0,0,.6)"
                        : "#FFFFFF",
                    width: "60%",
                  }}
                >
                  <Typography
                    sx={{ fontWeight: "600", fontSize: "14px", px: "5px" }}
                  >
                    {item?.betId?.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    background:
                      checkSelcted && mode == "1"
                        ? "rgba(0,0,0,.6)"
                        : "#ECECEC",
                    width: "20%",
                    display: "flex",
                    height: "30px",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontWeight: "600", fontSize: "14px" }}>
                    {item?.result}
                  </Typography>
                </Box>
                {profit_loss > 0 ? (
                  <Box
                    sx={{
                      background:
                        checkSelcted && mode == "1"
                          ? "rgba(0,0,0,.6)"
                          : "#10DC61",
                      width: "20%",
                      borderLeft: "2px solid white",
                      display: "flex",
                      height: "30px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "14px",
                        color: "white",
                      }}
                    >
                      {profit_loss}
                      <StyledImage
                        src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                        sx={{
                          height: "15px",
                          marginLeft: "5px",
                          filter:
                            "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                          width: "15px",
                        }}
                      />
                    </Typography>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      background:
                        checkSelcted && mode == "1"
                          ? "rgba(0,0,0,.6)"
                          : "#FF4D4D",
                      width: "20%",
                      borderLeft: "2px solid white",
                      display: "flex",
                      height: "30px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: "600",
                        fontSize: "14px",
                        color: "white",
                      }}
                    >
                      {profit_loss}
                      <StyledImage
                        src="https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
                        sx={{
                          height: "15px",
                          marginLeft: "5px",
                          filter:
                            "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                          width: "15px",
                        }}
                      />
                    </Typography>
                  </Box>
                )}
              </Box>
            );
          } else return null;
        })}
    </Box>
  );
};

export default SessionResultOvers;
