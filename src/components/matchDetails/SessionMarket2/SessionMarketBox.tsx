import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { formatNumber } from "../../helper";
import SeparateBox from "../SeparateBox";

const SessionMarketBox = ({ newData, index }: any) => {
  const { success } = useSelector((state: RootState) => state.matchList);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (success) {
      setVisible(false);
    }
  }, [success]);

  return (
    <div style={{ position: "relative" }}>
      {!["live"].includes(newData?.activeStatus) && (
        <Box
          sx={{
            margin: "1px",
            width: { lg: "100%", xs: "100%" },
            height: "100%",
            right: 0,
            position: "absolute",
            background: "rgba(0,0,0,0.4)",
            zIndex: 2,
          }}
        ></Box>
      )}
      <Box
        sx={{
          display: "flex",
          background: visible
            ? "#FFAF45"
            : index % 2 === 0
            ? "#FFE094"
            : "#ECECEC",
          height: "30px",
          width: "100%",
          boxShadow: visible ? 3 : 0,
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            background: visible
              ? "#FFAF45"
              : index % 2 === 0
              ? "#FFE094"
              : "#ECECEC",
            height: "30px",
            width: "50%",
            alignItems: "center",
            boxShadow: visible ? 3 : 0,
          }}
        >
          <Box sx={{ paddingTop: "3px", width: { lg: "100%", xs: "100%" } }}>
            <Typography
              sx={{
                color: "black",
                maxHeight: "30px",
                fontSize: { lg: "11px", md: "10px", xs: "9px" },
                marginLeft: "3px",
                fontWeight: "600",
                lineHeight: "11px",
                overflow: "hidden",
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
              }}
            >
              {newData?.RunnerName ?? newData?.name}
            </Typography>
          </Box>
        </Box>
        {newData?.resultStatus ? (
          <Box
            sx={{
              margin: "1px",
              background: "rgba(0,0,0,1)",
              height: "30px",
              position: "relative",
              width: { lg: "25%", md: "34%", sm: "35%", xs: "34%" },
              justifyContent: { xs: "center", lg: "center" },
              alignItems: "center",
              display: "flex",
              backgroundColor: "#FF4D4D",
            }}
          >
            <h6
              style={{
                textTransform: "uppercase",
                fontSize: "8px",
                textAlign: "center",
                lineHeight: "11px",
                color: "#FFF",
                fontWeight: "400",
                overflowWrap: "anywhere",
              }}
            >
              {Math.max(
                newData?.ex?.availableToLay?.length ?? 0,
                newData?.ex?.availableToBack?.length ?? 0
              ) <= 1 && newData?.resultStatus}
            </h6>
          </Box>
        ) : !["ACTIVE", "active", "", undefined, null, 0].includes(
            newData?.GameStatus
          ) || newData?.result ? (
          <Box
            sx={{
              margin: "1px",
              background: "rgba(0,0,0,1)",
              height: "30px",
              position: "relative",
              width: { lg: "25%", md: "34%", sm: "35%", xs: "34%" },
              justifyContent: { xs: "center", lg: "center" },
              alignItems: "center",
              display: "flex",
            }}
          >
            <h6
              style={{
                textTransform: "uppercase",
                fontSize: "8px",
                textAlign: "center",
                lineHeight: "11px",
                color: "#FFF",
                fontWeight: "400",
              }}
            >
              {Math.max(
                newData?.ex?.availableToLay?.length ?? 0,
                newData?.ex?.availableToBack?.length ?? 0
              ) <= 1 && (newData?.result ? `Declared` : newData?.GameStatus)}
            </h6>
          </Box>
        ) : (
          <Box
            sx={{
              display: "flex",
              position: "relative",
              height: "30px",
              width: { lg: "25%", md: "38%", sm: "39%", xs: "38%" },
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <SeparateBox
              session={true}
              back={true}
              value={formatNumber(
                newData?.type === "oddEven"
                  ? newData?.ex?.availableToBack[0]?.price || 0
                  : newData?.ex?.availableToLay[0]?.price || 0
              )}
              value2={formatNumber(
                newData?.type === "oddEven"
                  ? newData?.ex?.availableToBack[0]?.size || 0
                  : newData?.ex?.availableToLay[0]?.size || 0
              )}
              lock={newData?.GameStatus === "SUSPENDED"}
              color={newData?.type === "oddEven" ? "#B3E0FF" : "#F6D0CB"}
              width="50%"
            />

            <Box
              sx={{ width: ".45%", display: "flex", background: "pink" }}
            ></Box>

            <SeparateBox
              session={true}
              value={formatNumber(
                newData?.type === "oddEven"
                  ? newData?.ex?.availableToLay[0]?.price || 0
                  : newData?.ex?.availableToBack[0]?.price || 0
              )}
              value2={formatNumber(
                newData?.type === "oddEven"
                  ? newData?.ex?.availableToLay[0]?.size || 0
                  : newData?.ex?.availableToBack[0]?.size || 0
              )}
              lock={newData?.GameStatus === "SUSPENDED"}
              color="#B3E0FF"
              width="50%"
            />
          </Box>
        )}
      </Box>
      {Array.from(
        {
          length:
            Math.max(
              newData?.ex?.availableToLay?.length ?? 0,
              newData?.ex?.availableToBack?.length ?? 0
            ) - 1,
        },
        (_, i) => i + 1
      )?.map((item: number) => (
        <>
          <Box
            sx={{
              display: "flex",
              background: visible
                ? "#FFAF45"
                : index % 2 === 0
                ? "#FFE094"
                : "#ECECEC",
              height: "30px",
              width: "100%",
              boxShadow: visible ? 3 : 0,
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                background: visible
                  ? "#FFAF45"
                  : index % 2 === 0
                  ? "#FFE094"
                  : "#ECECEC",
                height: "30px",
                width: "50%",
                alignItems: "center",
                boxShadow: visible ? 3 : 0,
              }}
            >
              <Box
                sx={{ paddingTop: "3px", width: { lg: "100%", xs: "100%" } }}
              ></Box>
            </Box>
            {newData?.resultStatus ? (
              <Box
                sx={{
                  margin: "1px",
                  background: "rgba(0,0,0,1)",
                  height: "30px",
                  position: "relative",
                  width: { lg: "25%", md: "34%", sm: "35%", xs: "34%" },
                  justifyContent: { xs: "center", lg: "center" },
                  alignItems: "center",
                  display: "flex",
                  backgroundColor: "#FF4D4D",
                }}
              >
                <h6
                  style={{
                    textTransform: "uppercase",
                    fontSize: "8px",
                    textAlign: "center",
                    lineHeight: "11px",
                    color: "#FFF",
                    fontWeight: "400",
                    overflowWrap: "anywhere",
                  }}
                >
                  {item === 1 && newData?.resultStatus}
                </h6>
              </Box>
            ) : !["ACTIVE", "active", "", undefined, null, 0].includes(
                newData?.GameStatus
              ) || newData?.result ? (
              <Box
                sx={{
                  margin: "1px",
                  background: "rgba(0,0,0,1)",
                  height: "30px",
                  position: "relative",
                  width: { lg: "25%", md: "34%", sm: "35%", xs: "34%" },
                  justifyContent: { xs: "center", lg: "center" },
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <h6
                  style={{
                    textTransform: "uppercase",
                    fontSize: "8px",
                    textAlign: "center",
                    lineHeight: "11px",
                    color: "#FFF",
                    fontWeight: "400",
                    marginTop:
                      Math.max(
                        newData?.ex?.availableToLay?.length ?? 0,
                        newData?.ex?.availableToBack?.length ?? 0
                      ) === 2
                        ? "-5px"
                        : "0",
                  }}
                >
                  {item === 1 &&
                    (newData?.result ? `Declared` : newData?.GameStatus)}
                </h6>
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  position: "relative",
                  height: "30px",
                  width: { lg: "25%", md: "38%", sm: "39%", xs: "38%" },
                  justifyContent: "flex-end",
                  alignItems: "center",
                }}
              >
                <SeparateBox
                  session={true}
                  back={true}
                  value={formatNumber(
                    newData?.type === "oddEven"
                      ? newData?.ex?.availableToBack[item]?.price || 0
                      : newData?.ex?.availableToLay[item]?.price || 0
                  )}
                  value2={formatNumber(
                    newData?.type === "oddEven"
                      ? newData?.ex?.availableToBack[item]?.size || 0
                      : newData?.ex?.availableToLay[item]?.size || 0
                  )}
                  lock={newData?.GameStatus === "SUSPENDED"}
                  color={newData?.type === "oddEven" ? "#B3E0FF" : "#F6D0CB"}
                  width="50%"
                />

                <Box
                  sx={{ width: ".45%", display: "flex", background: "pink" }}
                ></Box>

                <SeparateBox
                  session={true}
                  value={formatNumber(
                    newData?.type === "oddEven"
                      ? newData?.ex?.availableToLay[item]?.price || 0
                      : newData?.ex?.availableToBack[item]?.price || 0
                  )}
                  value2={formatNumber(
                    newData?.type === "oddEven"
                      ? newData?.ex?.availableToLay[item]?.size || 0
                      : newData?.ex?.availableToBack[item]?.size || 0
                  )}
                  lock={newData?.GameStatus === "SUSPENDED"}
                  color="#B3E0FF"
                  width="50%"
                />
              </Box>
            )}
          </Box>
        </>
      ))}
    </div>
  );
};

export default SessionMarketBox;
