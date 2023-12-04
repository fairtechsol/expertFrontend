import { Box, Typography } from "@mui/material";
import BoxButtonWithSwitch from "../Common/BoxButtonWithSwitch";

const MatchListTable = () => {
  return (
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
        <Typography sx={{ fontSize: "9px", padding: "4px", fontWeight: "700" }}>
          14-oct-2022
          {/* {moment(data?.startAt).format("DD-MM-YYYY")} <br />
          {moment(data?.startAt).format("LT")} */}
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
            containerStyle={{ width: "20%" }}
            updateMatchStatus="qewertyuiop"
            setUpdateMatchStatus="{setUpdateMatchStatus}"
            place={1}
          />
          <BoxButtonWithSwitch
            title="Karachi Region Whites v Abbottabad Region"
            containerStyle={{ width: "20%" }}
            updateMatchStatus="qewertyuiop"
            setUpdateMatchStatus="{setUpdateMatchStatus}"
            place={1}
          />
          <BoxButtonWithSwitch
            title="Karachi Region Whites v Abbottabad Region"
            containerStyle={{ width: "20%" }}
            updateMatchStatus="qewertyuiop"
            setUpdateMatchStatus="{setUpdateMatchStatus}"
            place={1}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MatchListTable;
