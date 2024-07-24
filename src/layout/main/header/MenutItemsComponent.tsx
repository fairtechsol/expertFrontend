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
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import {
  addsuccessReset,
  resetPlacedBets,
  sessionByIdReset,
} from "../../../store/actions/addSession";
import { matchDetailReset } from "../../../store/actions/addMatch/addMatchAction";
import { IconConstants } from "../../../components/helper/gameConstants";
import { useState } from "react";

const MenutItemsComponent = ({
  x,
  selected,
  index,
  setSelected,
  handleClose,
}: any) => {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { getProfile } = useSelector((state: RootState) => state.user.profile);

  const { matchListDropdown } = useSelector(
    (state: RootState) => state.matchList
  );
  const navigate = useNavigate();

  const [toggle, setToggle] = useState<boolean>(true);
  return (
    <>
      <MenuItem
        dense={true}
        sx={{
          fontSize: matchesMobile ? "10px" : "12px",
          fontWeight: "500",
          marginX: "0px",
          width: { xs: "auto", md: "550px", lg: "550px" },
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
        onClick={(e:any) => {
          e.stopPropagation();

          if (index == selected) {
          
            setToggle(false);
            setSelected(null);
          } else {
            setToggle(true);
            setSelected(index);
          }
        }}
      >
        <StyledImage
          src={IconConstants[x?.matchType]}
          sx={{ height: "12px", width: "12px", marginRight: "8px" }}
        />{" "}
        {x.title}
      </MenuItem>
      {selected == index  && (
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
          {x?.matchType === "cricket" && (
            <>
              {(getProfile?.allPrivilege ||
                getProfile?.sessionMatchPrivilege) &&
                matchListDropdown?.length > 0 &&
                matchListDropdown?.map((event: any, index: number) => {
                  if (event?.id == x?.id) {
                    return (
                      <div key={index}>
                        {event?.sessions?.length > 0 && (
                          <Typography
                            key={event?.id}
                            sx={{ fontSize: "12px", fontWeight: "600" }}
                          >
                            {"Current Live Session"}
                          </Typography>
                        )}
                        {event?.sessions?.map((element: any) => {
                          return (
                            <Box
                              key={element.id}
                              onClick={(e: any) => {
                                e.stopPropagation();
                                navigate(`/expert/live/${element?.id}`, {
                                  state: {
                                    createSession: false,
                                    match: x,
                                    sessionEvent: element,
                                    betId: element?.id,
                                  },
                                });
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
                                {element?.name}
                              </Typography>
                            </Box>
                          );
                        })}
                      </div>
                    );
                  } else return null;
                })}

              {(getProfile?.allPrivilege ||
                getProfile?.sessionMatchPrivilege) && (
                <Box
                  onClick={(e: any) => {
                    e.stopPropagation();
                    dispatch(matchDetailReset());
                    dispatch(addsuccessReset());
                    dispatch(sessionByIdReset());
                    dispatch(resetPlacedBets());
                    navigate("/expert/live", {
                      state: {
                        createSession: true,
                        match: x,
                      },
                    });
                    handleClose();
                  }}
                  sx={{
                    marginTop: "5px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "12px",
                      fontWeight: "600",
                      cursor: "pointer",
                    }}
                  >
                    Create Session
                  </Typography>
                  <StyledImage
                    src={ArrowLeft}
                    sx={{ width: "15px", height: "10px", marginLeft: "10px" }}
                  />
                </Box>
              )}
            </>
          )}

          {(getProfile?.allPrivilege ||
            getProfile?.bookmakerMatchPrivilege) && (
            <Box
              sx={{ marginTop: "5px", display: "flex", alignItems: "center" }}
            >
              <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
                Bookmakers
              </Typography>
              <StyledImage
                src={ArrowLeft}
                sx={{ width: "15px", height: "10px", marginLeft: "10px" }}
              />
            </Box>
          )}
          {(getProfile?.allPrivilege || getProfile?.bookmakerMatchPrivilege) &&
            matchListDropdown?.map((event: any, index: number) => {
              if (event?.id === x?.id) {
                return (
                  <div key={index}>
                    {event?.bookmakers?.map((element: any) => {
                      return (
                        <Box
                          key={element.id}
                          onClick={(e: any) => {
                            e.stopPropagation();
                            navigate("/expert/add_book_maker", {
                              state: {
                                id: element.id,
                                match: x,
                                type: element?.type,
                              },
                            });
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
                            {element.name}
                          </Typography>
                        </Box>
                      );
                    })}
                  </div>
                );
              } else return null;
            })}
        </Box>
      )}
    </>
  );
};

export default MenutItemsComponent;
