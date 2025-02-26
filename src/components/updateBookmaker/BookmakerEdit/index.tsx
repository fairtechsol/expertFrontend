import { Box, Typography, useMediaQuery } from "@mui/material";
import { useState } from "react";
import theme from "../../../theme";
import CommissionDot from "../../Common/CommissionDot";
import ResultComponentTournamentMarket from "../../matchDetails/TournamentMarkets/ResultComponentTournamentMarket";
import EditBookmaker from "./EditBookmaker";
interface Props {
  add: boolean;
  match: any;
  bookmakerId: string;
  runners: any;
  matchBetting: any;
  teamRates: any;
}

const BookmakerEditSection = ({
  add,
  match,
  bookmakerId,
  runners,
  matchBetting,
  teamRates,
}: Props) => {
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Box
      sx={{
        flex: 1,
        background: "#0B4F26",
        // borderRadius: "5px",
        position: "relative",
        // py: "10px",
        px: "10px",
        pb: "6px",
        top: 0,
      }}
    >
      {!add && (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            position: "absolute",
            left: "0px",
            top: 0,
            zIndex: 1,
          }}
        ></Box>
      )}
      {!matchesMobile && (
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          {matchBetting?.isCommissionActive && <CommissionDot />}
          <Typography
            sx={{
              color: "white",
              fontSize: { lg: "25px", xs: "1rem", md: "20px" },
              fontWeight: "600",
              zIndex: 2,
              position: "relative",
            }}
          >
            {match?.title}
          </Typography>
        </Box>
      )}
      {matchesMobile && (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            zIndex: 2,
            position: "relative",
            justifyContent: "center",
            width: "100%",
            alignSelf: "center",
          }}
        >
          <Box>{matchBetting?.isCommissionActive && <CommissionDot />}</Box>
          <Typography
            sx={{
              width: "100%",
              color: "white",
              fontSize: { lg: "20px", xs: "14px", md: "18px" },
              fontWeight: "600",
              zIndex: 2,
              position: "relative",
            }}
          >
            {match?.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              zIndex: 2,
              position: "relative",
              justifyContent: "flex-end",
              width: "50%",
              marginTop: "2%",
              alignSelf: "center",
            }}
          >
            <Box sx={{ width: "2%" }}></Box>
            {matchBetting?.stopAt ? (
              <Box
                onClick={(e) => {
                  setVisible1(true);
                  setVisible(false);
                  e.stopPropagation();
                }}
                sx={{
                  position: "relative",
                  width: "100%",
                  display: "flex",
                  background: "#FF4D4D",
                  maxWidth: "150px",
                  marginLeft: "5px",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "45px",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                <Typography
                  sx={{ color: "white", fontWeight: "500", fontSize: "12px" }}
                >
                  Un Declare
                </Typography>
                <Box
                  sx={{
                    position: "absolute",
                    zIndex: 999,
                    top: "40px",
                    left: "-120%",
                  }}
                >
                  {visible1 && (
                    <ResultComponentTournamentMarket
                      currentMatch={match}
                      // stopAt={liveData?.stopAt}
                      onClick={() => {
                        setVisible(false);
                      }}
                      liveData={{ ...matchBetting, runners: runners }}
                    />
                  )}
                </Box>
              </Box>
            ) : (
              /* <Box sx={{ width: '2%' }} ></Box> */

              <Box
                onClick={(e) => {
                  setVisible(true);
                  setVisible1(false);
                  e.stopPropagation();
                }}
                sx={{
                  // width: "30%",
                  position: "relative",
                  display: "flex",
                  background: "white",
                  marginBottom: "10px",
                  maxWidth: "150px",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "25px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  padding: "1rem",
                }}
              >
                <Typography
                  sx={{ color: "#0B4F26", fontWeight: "500", fontSize: "12px" }}
                >
                  Declare
                </Typography>
                <Box
                  sx={{
                    position: "absolute",
                    zIndex: 999,
                    top: "40px",
                    right: 0,
                    width: { lg: "50vh", xs: "30vh" },
                  }}
                >
                  {visible && (
                    <ResultComponentTournamentMarket
                      currentMatch={match}
                      // stopAt={liveData?.stopAt}
                      onClick={() => {
                        setVisible(false);
                      }}
                      liveData={{ ...matchBetting, runners: runners }}
                    />
                  )}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
      )}

      <Box sx={{ display: "flex", marginTop: "2px", flexDirection: "column" }}>
        <Box
          sx={{
            flex: 1,
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <EditBookmaker
            add={add}
            match={match}
            Bid={bookmakerId}
            matchBetting={matchBetting}
            runners={runners}
            exposureLimit={matchBetting?.exposureLimit}
            teamRates={teamRates}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BookmakerEditSection;
