import {
  Box,
  MenuItem,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "../../../assets";
import StyledImage from "../../../components/Common/StyledImages";
import { IconConstants } from "../../../components/helper/gameConstants";
import { matchDetailReset } from "../../../store/actions/addMatch/addMatchAction";
import {
  addsuccessReset,
  resetPlacedBets,
  sessionByIdReset,
} from "../../../store/actions/addSession";
import { AppDispatch, RootState } from "../../../store/store";

interface MenutItemsComponentProps {
  x: any;
  selected: any;
  index: number;
  setSelected: (val: any) => void;
  handleClose: () => void;
}

const MenutItemsComponent = ({
  x,
  selected,
  index,
  setSelected,
  handleClose,
}: MenutItemsComponentProps) => {
  const theme = useTheme();
  const dispatch: AppDispatch = useDispatch();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

  const { matchListDropdown } = useSelector(
    (state: RootState) => state.matchList
  );
  const navigate = useNavigate();

  const handleSelected = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (index == selected) {
      setSelected(null);
    } else {
      setSelected(index);
    }
  }, []);

  const handleLiveSeccion = useCallback((e: React.MouseEvent, element: any) => {
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
  }, []);

  return (
    <>
      <MenuItem
        dense={true}
        sx={{
          fontSize: matchesMobile ? "10px" : "12px",
          fontWeight: "500",
          marginX: "0px",
          width: { xs: "auto", md: "auto", lg: "auto" },
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
        onClick={handleSelected}
      >
        <StyledImage
          src={IconConstants[x?.matchType]}
          alt={x?.matchType}
          sx={{ height: "12px", width: "12px", marginRight: "8px" }}
        />{" "}
        {x.title}
      </MenuItem>
      {selected == index && (
        <Box
          sx={{
            background: "#F8C851",
            width: "95%",
            marginLeft: "5%",
            borderRadius: "5px",
            paddingX: "5px",
            paddingY: "5px",
          }}
        >
          {x?.matchType === "cricket" && (
            <>
              {(profileDetail?.allPrivilege ||
                profileDetail?.sessionMatchPrivilege) &&
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
                              onClick={(e) => handleLiveSeccion(e, element)}
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

              {(profileDetail?.allPrivilege ||
                profileDetail?.sessionMatchPrivilege) && (
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
                    alt="left"
                    sx={{ width: "15px", height: "10px", marginLeft: "10px" }}
                  />
                </Box>
              )}
            </>
          )}

          {(profileDetail?.allPrivilege ||
            profileDetail?.bookmakerMatchPrivilege) &&
            matchListDropdown?.map((event: any, index: number) => {
              if (event?.id === x?.id) {
                return (
                  <div key={index}>
                    <Box
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/expert/addManualMarket", {
                          state: {
                            match: x,
                          },
                        });
                        handleClose();
                      }}
                      sx={{
                        marginTop: "5px",
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                    >
                      <Typography sx={{ fontSize: "12px", fontWeight: "600" }}>
                        Add Bookmakers
                      </Typography>
                      <StyledImage
                        src={ArrowLeft}
                        alt="left"
                        sx={{
                          width: "15px",
                          height: "10px",
                          marginLeft: "10px",
                        }}
                      />
                    </Box>
                  </div>
                );
              } else return null;
            })}
          {(profileDetail?.allPrivilege ||
            profileDetail?.bookmakerMatchPrivilege) &&
            matchListDropdown?.map((event: any, index: number) => {
              if (event?.id === x?.id) {
                return (
                  <div key={index}>
                    {event?.tournaments?.map((element: any) => {
                      return (
                        <Box
                          key={element.id}
                          onClick={(e: any) => {
                            e.stopPropagation();
                            navigate("/expert/add_book_maker", {
                              state: {
                                betId: element.id,
                                matchId: x.id,
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

export default memo(MenutItemsComponent);
