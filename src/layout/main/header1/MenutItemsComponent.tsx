import {
  Box,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import StyledImage from "../../../components/Common/StyledImages";
import { ArrowLeft } from "../../../assets";

const MenutItemsComponent = ({
  x,
  selected,
  index,
  setSelected,
  allLiveEventSession,
  activeUser,
  handleClose,
}: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const navigate = useNavigate();
  return (
    <>
      <MenuItem
        dense={true}
        sx={{
          fontSize: matchesMobile ? "10px" : "12px",
          fontWeight: "500",
          marginX: "0px",
          width: { lg: "240px", xs: "210px" },
          borderBottomWidth: 0,
          borderColor: "#EAEFEC",
          paddingY: "0px",
          borderStyle: "solid",
          backgroundColor: selected == index ? "primary.main" : "white",
          color: selected == index ? "white" : "black",
          marginLeft: "-10px",
          marginTop: index == 0 ? "-8px" : "",
          "&:hover": {
            backgroundColor: "primary.main",
            color: "white",
            borderColor: "white",
          },
        }}
        onClick={() => {
          handleClose();
          if (index == selected) {
            setSelected(null);
          } else {
            setSelected(index);
          }
        }}
      >
        {x.title}
      </MenuItem>
      {selected == index && (
        <Box
          sx={{
            background: "#F8C851",
            width: "80%",
            marginLeft: "20%",
            borderRadius: "5px",
            paddingX: "5px",
            paddingY: "5px",
          }}
        >
          {allLiveEventSession?.length > 0 &&
            allLiveEventSession?.map((event: any) => {
              if (event.id == x.id) {
                return (
                  <>
                    {event.bettings.length > 0 && (
                      <Typography
                        key={event.id}
                        sx={{ fontSize: "12px", fontWeight: "600" }}
                      >
                        {activeUser == "1"
                          ? "Current Live Session"
                          : "Current Live Bookmaker"}
                      </Typography>
                    )}
                    {event.bettings.map((element: any) => {
                      return (
                        <Box
                          key={element.id}
                          onClick={() => {
                            navigate("/expert/live");
                            handleClose();
                          }}
                          sx={{ marginLeft: "10px", marginTop: "3px" }}
                        >
                          <Typography
                            sx={{
                              fontSize: "12px",
                              marginTop: "3px",
                              cursor: "pointer",
                            }}
                          >
                            {element.bet_condition}
                          </Typography>
                        </Box>
                      );
                    })}
                  </>
                );
              } else return null;
            })}
          <Box
            onClick={() => {
              navigate("/expert/live");
              handleClose();
            }}
            sx={{ marginTop: "5px", display: "flex", alignItems: "center" }}
          >
            <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
              Create Session
            </Typography>
            <StyledImage
              src={ArrowLeft}
              sx={{ width: "15px", height: "10px", marginLeft: "10px" }}
            />
          </Box>
          <Box sx={{ marginTop: "5px", display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
              Add Bookmaker
            </Typography>
            <StyledImage
              src={ArrowLeft}
              sx={{ width: "15px", height: "10px", marginLeft: "10px" }}
            />
          </Box>
          {allLiveEventSession?.map((event: any) => {
            if (event.id === x.id) {
              return (
                <>
                  {event?.bookmakers?.map((element: any) => {
                    return (
                      <Box
                        key={element.id}
                        onClick={() => {
                          navigate("/expert/add_book_maker");
                          handleClose();
                        }}
                        sx={{ marginLeft: "10px", marginTop: "3px" }}
                      >
                        <Typography
                          sx={{
                            fontSize: "12px",
                            marginTop: "3px",
                            cursor: "pointer",
                          }}
                        >
                          {element.marketName}
                        </Typography>
                      </Box>
                    );
                  })}
                </>
              );
            } else return null;
          })}
        </Box>
        // </Box>
      )}
    </>
  );
};

export default MenutItemsComponent;
