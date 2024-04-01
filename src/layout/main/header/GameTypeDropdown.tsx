import { useState } from "react";
import { Menu ,MenuItem,useMediaQuery,useTheme} from "@mui/material";
import { AppDispatch, RootState } from "../../../store/store";
import { useDispatch, useSelector } from "react-redux";
import { getMatchListDropdown } from "../../../store/actions/match/matchAction";



const allMatchg =[
    {title : 'Cricket',value:'cricket'},
    {title : 'Football',value:'football'},
    // {title : 'Tennis',value:'tennis'},
]
const GameTypeDropdown = ({ anchorEl, open, handleClose,anchorrr }: any) => {
    const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const dispatch: AppDispatch = useDispatch();
  const [anchor, setAnchor] = useState(null);
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

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
          width: "230px",
          padding: 0,
        },
      }}
    >
      {allMatchg?.length > 0 &&
        allMatchg?.map((x: any, i: any) => (
            <MenuItem
            dense={true}
            sx={{
              fontSize: matchesMobile ? "10px" : "12px",
              fontWeight: "500",
              marginX: "0px",
              width: { lg: "240px", xs: "240px" },
              borderBottomWidth: 0,
              borderColor: "#EAEFEC",
              paddingY: "0px",
              borderStyle: "solid",
              backgroundColor: selected == i ? "primary.main" : "white",
              color: selected == i ? "white" : "black",
              marginLeft: "-10px",
              marginTop: i == 0 ? "-8px" : "",
              "&:hover": {
                backgroundColor: "primary.main",
                color: "white",
                borderColor: "white",
              },
            }}
            onClick={(e: any) => {
                setSelected(1);
                dispatch(getMatchListDropdown(x.value));
                setAnchor(e?.currentTarget);
                handleClose();
                anchorrr(e?.currentTarget)
            }}
          >
            {x.title}
          </MenuItem>
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
