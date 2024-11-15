import { useState } from "react";
import { Box, Menu, MenuItem, useMediaQuery, useTheme } from "@mui/material";
import { AppDispatch } from "../../../store/store";
import { useDispatch } from "react-redux";
import {
  getMatchListDropdown,
  resetMatchListDropdown,
} from "../../../store/actions/match/matchAction";
import MenutItemsComponent from "./MenutItemsComponent";

const allMatchg = [
  { title: "Cricket", value: "cricket" },
  { title: "Football", value: "football" },
  { title: "Tennis", value: "tennis" },
];
const GameTypeDropdown = ({
  anchorEl,
  open,
  handleClose,
  anchorrr,
  allMatch,
}: any) => {
  const theme = useTheme();
  const [selected, setSelected] = useState<any>("");
  const [selectedMatch, setSelectedMatch] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const [_, setAnchor] = useState(null);
  const matchesMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{ marginTop: "2px", padding: 0 }}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        PaperProps={{
          sx: {
            minWidth: "230px",
            padding: 0,
          },
        }}
      >
        {allMatchg?.length > 0 &&
          allMatchg?.map((x: any, i: any) => (
            <>
              <MenuItem
                key={i}
                dense={true}
                sx={{
                  fontSize: matchesMobile ? "10px" : "12px",
                  fontWeight: "500",
                  marginX: "0px",
                  // width: { lg: "350px", xs: "240px" },
                  borderBottomWidth: 0,
                  borderColor: "#EAEFEC",
                  paddingY: "0px",
                  borderStyle: "solid",
                  backgroundColor:
                    selected == i ? "#004a25 !important" : "white",
                  color: selected == i ? "white" : "black",
                  marginLeft: "-10px",
                  marginTop: i == 0 ? "-8px" : "",
                  "&:hover": {
                    backgroundColor: "#004a25",
                    color: "white",
                    borderColor: "white",
                  },
                }}
                onClick={(e: any) => {
                  if (selected === i) {
                    setSelected("");
                    dispatch(resetMatchListDropdown());
                  } else {
                    setSelected(i);
                    dispatch(getMatchListDropdown(x.value));
                    setAnchor(e?.currentTarget);
                    anchorrr(e?.currentTarget);
                  }
                }}
              >
                {x.title}
              </MenuItem>
              {selected === i && (
                <>
                  <Box
                    sx={{
                      background: "#F8C851",
                      width: "100%",
                      marginLeft: "5%",
                      borderRadius: "5px",
                      paddingX: "5px",
                      paddingY: "8px",
                    }}
                  >
                    {allMatch?.length > 0 &&
                      allMatch?.map((x: any, i: any) => (
                        <MenutItemsComponent
                          key={i}
                          handleClose={handleClose}
                          setSelected={setSelectedMatch}
                          index={i}
                          selected={selectedMatch}
                          x={x}
                        />
                      ))}
                  </Box>
                </>
              )}
            </>
          ))}
      </Menu>
      {/* {matchListDropdown?.length > 0 && (
        <DropDownMenu
          anchorEl={anchor}
          open={Boolean(anchor)}
          allMatch={matchListDropdown}
          handleClose={() => {
            setAnchor(null);
          }}
        />
      )} */}
    </>
  );
};

export default GameTypeDropdown;
