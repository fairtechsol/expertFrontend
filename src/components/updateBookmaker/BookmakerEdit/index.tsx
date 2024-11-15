import { Box, Typography, useMediaQuery } from "@mui/material";
import EditBookmaker from "./EditBookmaker";
import ResultComponent from "./ResultComponent";
import theme from "../../../theme";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useState } from "react";
interface Props {
  add: boolean;
  match: any;
  bookmakerId: string;
  type: string;
}

const BookmakerEditSection = ({ add, match, bookmakerId, type }: Props) => {
  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const { bookmakerById } = useSelector((state: RootState) => state.addSession);
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
            {bookmakerById?.stopAt ? (
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
                    <ResultComponent
                      onClick={() => {
                        setVisible1(false);
                      }}
                      currentMatch={match}
                      teamA={match?.teamA}
                      teamB={match?.teamB}
                      tie={match?.matchType === "cricket" ? "Tie" : ""}
                      draw={
                        match?.teamC &&
                        !["tiedMatch2", "completeManual"].includes(type)
                          ? match?.teamC
                          : ""
                      }
                      stopAt={match?.stopAt}
                      // betStatus={localSelectedBookmaker?.betStatus}
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
                    <ResultComponent
                      onClick={() => {
                        setVisible(false);
                      }}
                      currentMatch={match}
                      stopAt={match?.stopAt}
                      teamA={match?.teamA}
                      teamB={match?.teamB}
                      tie={match?.matchType === "cricket" ? "Tie" : ""}
                      draw={
                        match?.teamC &&
                        !["tiedMatch2", "completeManual"].includes(type)
                          ? match?.teamC
                          : ""
                      }
                      // betStatus={localSelectedBookmaker?.betStatus}
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
            type={type}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default BookmakerEditSection;
