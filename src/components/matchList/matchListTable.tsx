import { Box, Typography } from "@mui/material";
import { useState } from "react";
import BoxButtonWithSwitch from "../Common/BoxButtonWithSwitch";
import CustomButton from "../Common/CustomButton";
import MatchListProfitLoss from "./profitLoss";
import { useNavigate } from "react-router-dom";

const MatchListTable = (props: any) => {
  const { data } = props;
  const navigate = useNavigate();

  const [updateMatchStatus, setUpdateMatchStatus] = useState({
    1: { field: "apiMatchActive", val: data?.apiMatchActive || false },
    2: {
      field: "apiBookMakerActive",
      val: data?.apiBookMakerActive || false,
    },
    3: {
      field: "apiSessionActive",
      val: data?.apiSessionActive || false,
    },
    5: {
      field: "manualSessionActive",
      val: data?.manualSessionActive || false,
    },
    4: {
      field: "manualBookMakerActive",
      val: data?.manualBookMakerActive || false,
    },
  });
  return (
    <>
      <Box
        sx={[
          {
            display: "flex",
            height: "45px",
            background: "#FFE094",
            alignItems: "center",
            borderBottom: "2px solid white",
          },
        ]}
      >
        <Box
          sx={{
            display: "flex",
            width: "100px",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px" }}>1</Typography>
          <Typography
            sx={{ fontSize: "9px", padding: "4px", fontWeight: "700" }}
          >
            14-oct-2022
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "45px",
          }}
        >
          <Box sx={{ display: "flex", flex: 1, alignItems: "center" }}>
            <BoxButtonWithSwitch
              title="Karachi Region Whites v Abbottabad Region"
              containerStyle={{ width: "15%" }}
              updateMatchStatus={updateMatchStatus}
              setUpdateMatchStatus={setUpdateMatchStatus}
              place={12}
            />
            <BoxButtonWithSwitch
              title="Bookmaker"
              containerStyle={{ width: "15%" }}
              updateMatchStatus={updateMatchStatus}
              setUpdateMatchStatus={setUpdateMatchStatus}
              place={13}
            />
            <BoxButtonWithSwitch
              title="Session"
              containerStyle={{ width: "15%" }}
              updateMatchStatus={updateMatchStatus}
              setUpdateMatchStatus={setUpdateMatchStatus}
              place={14}
            />
            <BoxButtonWithSwitch
              title="BK1"
              containerStyle={{ width: "15%" }}
              updateMatchStatus={updateMatchStatus}
              setUpdateMatchStatus={setUpdateMatchStatus}
              place={15}
            />
            <BoxButtonWithSwitch
              title="Manual Session"
              containerStyle={{ width: "15%" }}
              updateMatchStatus={updateMatchStatus}
              setUpdateMatchStatus={setUpdateMatchStatus}
              place={16}
            />
            <MatchListProfitLoss
              updateMatchStatusLabel="Match Profit/Loss"
              updateMatchStatus="22"
              place="1"
            />
          </Box>
          <CustomButton onClick={() => {}} title={"Submit"} />
          <CustomButton
            onClick={() => {
              navigate(`/expert/edit_match`);
            }}
            title={"Edit"}
          />
        </Box>
      </Box>
    </>
  );
};

export default MatchListTable;
