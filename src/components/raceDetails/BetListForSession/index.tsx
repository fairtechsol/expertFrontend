import { Box, Button, Typography } from "@mui/material";
import moment from "moment";
import { memo, useEffect, useRef, useState } from "react";
import { ARROWUP } from "../../../assets";
import { formatToINR } from "../../helper";
import SessionHeaderRow from "./SessionHeaderRow";
import SessionRow from "./SessionRow";

const BetListForSession = ({ tag, allBetRates }: any) => {
  const [newData, setNewBets] = useState([]);
  const [visibleImg, setVisibleImg] = useState(true);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showButton, setShowButton] = useState(false);

  const scrollToTop = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollTop } = scrollRef.current;
      setShowButton(scrollTop > 0);
    }
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener("scroll", handleScroll);
      return () => {
        scrollElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  useEffect(() => {
    if (allBetRates) {
      const body = allBetRates?.map((v: any) => {
        const values = {
          values: [
            {
              name: v?.user?.userName,
              color: ["NO", "YES"].includes(v?.betType) ? "#FFF" : "black",
              background: ["NO", "YES"].includes(v?.betType)
                ? "#319E5B"
                : v?.marketType === "completeMatch" ||
                  v?.marketType === "completeManual" ||
                  v?.marketType === "tiedMatch2" ||
                  v?.marketType === "tiedMatch1"
                ? "#faf11b"
                : "#F1C550",
              deleteReason: v?.deleteReason,
              width: { lg: "17%", xs: "32%" },
            },
            {
              name: v?.teamName,
              color: "black",
              background: ["YES", "BACK"].includes(v?.betType)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              deleteReason: v?.deleteReason,
              width: { lg: "33%", xs: "50%" },
              overflowWrap: "anywhere",
            },
            {
              name: v?.odds,
              color: "black",
              rate: (v?.betType === "NO" || v?.betType === "YES") && v?.rate,
              background: ["YES", "BACK"].includes(v?.betType)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              small: true,
              deleteReason: v?.deleteReason,
              width: { lg: "7%", xs: "35%" },
              fSize: "13px",
              lHeight: 1,
            },
            {
              name: v?.betType,
              color: "black",
              background: ["YES", "BACK"].includes(v?.betType)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              small: true,
              deleteReason: v?.deleteReason,
              width: { lg: "7%", xs: "35%" },
            },
            {
              name: formatToINR(v?.amount),
              color: "black",
              background: ["YES", "BACK"].includes(v?.betType)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              deleteReason: v?.deleteReason,
              width: { lg: "12%", xs: "35%" },
              fSize: "12px",
            },
            {
              name: +v.myStake
                ? formatToINR(+v.myStake)
                : formatToINR(
                    (+v?.amount * +v?.user?.fwPartnership || 0) / 100
                  ),
              color: "white",
              background: "#0B4F26",
              deleteReason: v?.deleteReason,
              width: { lg: "12%", xs: "35%" },
            },
            {
              name: moment.utc(v?.createdAt).utcOffset("+05:30").format("LTS"),
              color: "black",
              background: ["YES", "BACK"].includes(v?.betType)
                ? "#B3E0FF"
                : "rgb(255, 146, 146)",
              time: true,
              date: moment.utc(v?.createdAt).utcOffset("+05:30").format("L"),
              deleteReason: v?.deleteReason,
              width: { lg: "13%", xs: "35%" },
            },
          ],
        };
        return values;
      });

      setNewBets(body);
    }
  }, [allBetRates]);

  return (
    <Box
      sx={{
        width: "100%",
        margin: "0",
        marginTop: ".25vh",
        background: "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          height: 38,
          flexDirection: "row",
          width: "100%",
          alignSelf: "center",
        }}
      >
        <Box>
          {showButton && (
            <Button
              variant="contained"
              onClick={scrollToTop}
              sx={{
                position: "fixed",
                width: "100px",
                fontSize: "9px",
                bottom: 20,
                right: 20,
                backgroundColor: "#F8C851",
                color: "#000",
                "&:hover": {
                  backgroundColor: "#F8C851",
                },
                zIndex: 1000,
              }}
            >
              Scroll to Top
            </Button>
          )}
        </Box>
        <Box
          sx={[
            {
              flex: 1,
              background: "#f1c550",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
            },
          ]}
        >
          <Typography
            sx={{
              fontSize: { lg: "13px", md: "12px", xs: "12px" },
              fontWeight: "bold",
              marginLeft: "7px",
            }}
          >
            All Bets
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 0.1,
            background: "#262626",
            // '#262626'
          }}
        >
          <div className="slanted" />
        </Box>
        <Box
          sx={{
            width: "100px",
            flex: 1,
            background: "#262626",
            // '#262626' ,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              width: "100px",
              height: "90%",
              background: "white",
              justifyContent: "center",
              borderRadius: "3px",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{ fontSize: "12px", fontWeight: "700", color: "#FF1111" }}
            >
              Total Bet
            </Typography>
            <Typography
              sx={{ fontSize: "12px", fontWeight: "700", color: "#0B4F26" }}
            >
              {newData?.length || 0}
            </Typography>
          </Box>
          <img
            onClick={() => {
              setVisibleImg(!visibleImg);
            }}
            src={ARROWUP}
            alt="arrow up"
            style={{
              transform: !visibleImg ? "rotate(180deg)" : "rotate(0deg)",
              width: "15px",
              height: "15px",
              marginRight: "5px",
              marginLeft: "5px",
              cursor: "pointer",
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          overflowX: "auto",
          width: { lg: "33vw", xs: "100vw", md: "100vw" },
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {visibleImg && (
          <>
            <Box
              ref={scrollRef}
              sx={{
                maxHeight: "80vh",
                width: { xs: "100vw", lg: "33vw", md: "100vw" },
                overflow: "auto",
              }}
            >
              <SessionHeaderRow tag={tag} />

              {newData?.length > 0 &&
                newData?.map((i: any, k: any) => {
                  const num = newData?.length - k;
                  return (
                    <div
                      key={k}
                      style={{ display: "flex", position: "relative" }}
                    >
                      <Box
                        sx={{
                          width: { lg: "4%", xs: "6%" },
                          border: "1px solid white",
                          background: "black",
                          height: "30px",
                          justifyContent: "center",
                          alignItems: "center",
                          display: "flex",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: !tag ? "10px" : "13px",
                            fontWeight: tag ? "bold" : "600",
                            color: "white",
                          }}
                        >
                          {num < 10 ? "0" + num : num.toString()}
                        </Typography>
                      </Box>
                      <SessionRow index={k} values={i?.values} />
                      {i?.values[0]?.deleteReason && (
                        <Box
                          sx={{
                            background: "rgba(0,0,0,0.5)",
                            width: "100%",
                            height: "30px",
                            position: "absolute",
                            display: "flex",
                          }}
                        >
                          <Box sx={{ flex: 1, display: "flex" }}>
                            <Box sx={{ width: "34%", height: "30px" }} />
                            <Box
                              sx={{
                                width: "66%",
                                height: "30px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "flex-end",
                              }}
                            >
                              {
                                <Typography
                                  sx={{
                                    fontSize: "10px",
                                    fontWeight: "700",
                                    color: "white",
                                    textTransform: "uppercase",
                                  }}
                                >
                                  Bet{" "}
                                  <span style={{ color: "#e41b23" }}>
                                    deleted
                                  </span>{" "}
                                  due to {i?.values[0]?.deleteReason}
                                </Typography>
                              }
                            </Box>
                          </Box>
                        </Box>
                      )}
                    </div>
                  );
                })}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
};

export default memo(BetListForSession);
