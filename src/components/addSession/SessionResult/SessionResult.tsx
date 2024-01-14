import { useState } from "react";
import { Box, Typography } from "@mui/material";
import SessionResultOvers from "./SessionResultOvers";
import SessionResultModal from "./SessionResultModal";

const SessionResult = (props: any) => {
  const { createSession, betId, handleSession, matchId } = props;

  const [mode, setMode] = useState("0");
  const [selected, setSelected] = useState<any>([]);
  const [sessionData] = useState<any>([]);

  const changeSelected = (item: any) => {
    if (mode === "0") {
      return false;
    }
    const x: any = [...selected];
    const itemId = item.bet_id.id;

    if (x.includes(itemId)) {
      return;
    }
    setSelected([item.bet_id.id]);
    handleSession(item);
  };

  return (
    <Box
      sx={{
        flex: 1,
        background: "#F8C851",
        marginTop: "5px",
        borderRadius: "5px",
        minHeight: "300px",
        py: "30px",
        px: "20px",
        pt: "5px",
      }}
    >
      <Typography
        sx={{ color: "#0B4F26", fontSize: "25px", fontWeight: "600" }}
      >
        Session Result
      </Typography>
      <Box sx={{ display: "flex", marginTop: "8px" }}>
        <Box
          sx={{
            flex: 1,
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <SessionResultOvers
            createSession={createSession}
            sessionData={sessionData}
            mode={mode}
            changeSelected={changeSelected}
            selected={selected}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "14px",
            }}
          >
            <Box
              onClick={(e) => {
                setMode("1");
                e.stopPropagation();
                // setVisible1(true)
              }}
              sx={{
                position: "relative",
                width: "30%",
                display: "flex",
                maxWidth: "120px",
                background: "#FF4D4D",
                justifyContent: "center",
                alignItems: "center",
                height: "35px",
                borderRadius: "5px",
              }}
            >
              <Typography
                sx={{ color: "white", fontWeight: "500", fontSize: "12px" }}
              >
                Un Declare
              </Typography>
              <Box
                sx={{ position: "absolute", zIndex: 999, top: "40px", left: 0 }}
              >
                {false && sessionData.length > 0 && (
                  <SessionResultModal
                    matchId={matchId}
                    betId={betId}
                    undeclare={true}
                    onClick={() => {
                      //   setVisible1(false);
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SessionResult;
