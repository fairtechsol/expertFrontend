import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useFormik } from "formik";
import moment from "moment";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomErrorMessage from "../../components/Common/CustomErrorMessage";
import DropDown from "../../components/Common/DropDown";
import SearchableInput from "../../components/Common/SearchableInput";
import BoxButtonManualMatch from "../../components/addMatch/ButtonSwitchManualMatch";
import LabelValueComponent from "../../components/addMatch/LabelValueComponent";
import MatchListInput from "../../components/addMatch/MatchListInput";
import Constants from "../../components/helper/constants";
import {
  addMatchExpert,
  addMatchReset,
  editMatchReset,
  eventListReset,
  getAllEventsList,
  getAllLiveTournaments,
  getMatchDetail,
  matchDetailSuccessReset,
  tournamentListReset,
} from "../../store/actions/addMatch/addMatchAction";
import {
  editMatch,
  editSuccessReset,
  updateMatchListCurrentPage,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import { eventWiseMatchData } from "../../utils/Constants";

const initialFormikValues = {
  minBet: "",
  betfairSessionMaxBet: "",
  rateThan100: false,
};

const initialValues = {
  teamA: "",
  teamB: "",
  teamC: "",
  title: "",
  gameType: "",
  tournamentName: "",
  tournamentId: "",
  matchName: "",
  competitionName: "",
  competitionId: "",
  eventId: "",
  marketId: "",
  startAt: new Date(),
  f: false,
  tv: false,
  m1: false,
};

const AddMatch = () => {
  const dispatch: AppDispatch = useDispatch();

  const { state } = useLocation();

  const { eventsList, matchDetail, success, matchAdded, loading } = useSelector(
    (state: RootState) => state.addMatch.addMatch
  );
  const [selected, setSelected] = useState(initialValues);
  const [openDropDown, setOpenDropDown] = useState(null);
  const [manualMatchToggle, setManualMatchToggle] = useState(false);
  const navigate = useNavigate();

  const inputStyle = {
    fontSize: { xs: "14px", lg: "14px", fontWeight: "600" },
    textTransform: "capitalize",
  };

  const { editSuccess } = useSelector((state: RootState) => state.matchList);
  const formik = useFormik({
    initialValues: initialFormikValues,
    onSubmit: (value: any) => {
      if (!eventWiseMatchData[selected.gameType]) {
        toast.error("This game is not available yet.");
      }
      if (value.betFairSessionMaxBet <= value.minBet) {
        toast.error("Session maximum bet could not be less than minimum bet.");
        return;
      }
      if (loading) {
        return;
      }
      if (state?.id) {
        let payload: any;

        if (selected?.teamB) {
          payload = {
            id: state?.id,
            minBet: value.minBet,
            betFairSessionMaxBet: value.betfairSessionMaxBet,
            startAt: selected.startAt,
            rateThan100: value.rateThan100,
          };
        } else {
          payload = {
            id: state?.id,
            minBet: value.minBet,
            betFairSessionMaxBet: value.betfairSessionMaxBet,
            startAt: selected.startAt,
          };
        }
        dispatch(editMatch(payload));
      } else {
        let addMatchpayload: any;

        if (selected.teamB) {
          addMatchpayload = {
            matchType: selected.gameType,
            title: selected.title,
            marketId: selected.marketId,
            eventId: selected.eventId,
            teamA: selected.teamA,
            teamB: selected.teamB,
            teamC: selected.teamC,
            startAt: selected.startAt,
            minBet: value.minBet,
            rateThan100: value.rateThan100,
            isFancy: selected?.f,
            isTv: selected?.tv,
            isBookmaker: selected?.m1,
            betFairSessionMaxBet:
              selected.gameType === "cricket"
                ? value.betfairSessionMaxBet
                : value.minBet + 1,
            competitionName: selected?.competitionName,
            competitionId: selected?.competitionId,
          };
        } else {
          addMatchpayload = {
            matchType: selected.gameType,
            title: selected.title,
            marketId: selected.marketId,
            eventId: selected.eventId,
            teamA: selected.teamA,
            teamB: selected.teamB,
            teamC: selected.teamC,
            startAt: selected.startAt,
            minBet: value.minBet,
            // rateThan100: value.rateThan100,
            isFancy: selected?.f,
            isTv: selected?.tv,
            isBookmaker: selected?.m1,
            competitionName: selected?.competitionName,
            competitionId: selected?.competitionId,
            betFairSessionMaxBet:
              selected.gameType === "cricket"
                ? value.betfairSessionMaxBet
                : value.minBet + 1,
          };
        }
        if (manualMatchToggle) {
          const newPayload = {
            ...addMatchpayload,
            isManualMatch: true,
            competitionName: "manual",
          };
          dispatch(addMatchExpert(newPayload));
        } else {
          dispatch(addMatchExpert(addMatchpayload));
        }
      }

      if (state?.id) {
        dispatch(editMatchReset());
      }
    },
  });

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setSelected((prev: any) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleDateChange = (date: any) => {
    const currentDate = dayjs();

    if (dayjs(date).isBefore(currentDate)) {
      toast.error("Selected date cannot be earlier than the current date", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
      return;
    }
    setSelected((prev: any) => {
      return {
        ...prev,
        startAt: date.toDate(),
      };
    });
  };

  useEffect(() => {
    if (editSuccess) {
      navigate("/expert/match");
      dispatch(editSuccessReset());
    }
  }, [editSuccess]);

  const { handleSubmit, values, touched, errors, handleChange } = formik;

  useEffect(() => {
    if (!state?.id) {
      setSelected((prev: any) => {
        return {
          ...prev,
          teamA: "",
          teamB: "",
          teamC: "",
          title: "",
          tournamentName: "",
          tournamentId: "",
          matchName: "",
          competitionName: "",
          eventId: "",
          marketId: "",
          startAt: moment(),
        };
      });
    }
    if (selected.gameType !== "" && !state?.id) {
      if (!manualMatchToggle) {
        dispatch(tournamentListReset());
        dispatch(getAllLiveTournaments(selected.gameType));
      }
      formik.setValues({
        ...values,
        minBet: 100,
      });
    }
  }, [selected.gameType]);

  useEffect(() => {
    if (!state?.id) {
      setSelected((prev: any) => {
        return {
          ...prev,
          teamA: "",
          teamB: "",
          teamC: "",
          title: "",
          matchName: "",
          competitionName: "",
          eventId: "",
          marketId: "",
          startAt: new Date(),
        };
      });
    }

    if (selected?.tournamentId && !state?.id) {
      dispatch(eventListReset());
      dispatch(getAllEventsList(selected.tournamentId));
    }
  }, [selected.tournamentId]);

  useEffect(() => {
    if (state?.id) {
      dispatch(getMatchDetail(state?.id));
    } else {
      dispatch(tournamentListReset());
      formik.setValues({
        ...values,
        ...initialFormikValues,
      });
      setSelected((prev: any) => {
        return {
          ...prev,
          ...initialValues,
        };
      });
    }
    if (matchAdded) {
      dispatch(updateMatchListCurrentPage(1));
      navigate("/expert/match");
      dispatch(addMatchReset());
    }
  }, [state?.id, matchAdded]);

  useEffect(() => {
    try {
      if (matchDetail && state?.id) {
        if (success) {
          const formikValues = {
            ...values,
            minBet: matchDetail?.betFairSessionMinBet ?? "",
            betfairSessionMaxBet: matchDetail?.betFairSessionMaxBet ?? "",
            rateThan100: matchDetail?.rateThan100 ?? false,
          };
          setIsChecked(matchDetail?.rateThan100);

          formik.setValues(formikValues);
          setSelected((prev: any) => {
            return {
              ...prev,
              teamA: matchDetail?.teamA,
              teamB: matchDetail?.teamB,
              teamC: matchDetail?.teamC,
              title: matchDetail?.title,
              gameType: matchDetail?.matchType,
              tournamentName: matchDetail?.competitionName,
              tournamentId: matchDetail?.competitionId,
              matchName: matchDetail?.title,
              eventId: matchDetail?.eventId,
              marketId: matchDetail?.marketId,
              startAt: matchDetail?.startAt,
            };
          });
          dispatch(matchDetailSuccessReset());
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [matchDetail, success]);

  useEffect(() => {
    setSelected(initialValues);
    formik.resetForm();
  }, [manualMatchToggle]);

  const handleDropDownOpen = (dropdownName: any) => {
    setOpenDropDown(openDropDown === dropdownName ? null : dropdownName);
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  const clearMaxBet = (obj: any) => {
    const newObj = { ...obj };

    Object.keys(newObj).forEach((key) => {
      if (typeof newObj[key] === "object" && newObj[key] !== null) {
        if ("maxBet" in newObj[key]) {
          newObj[key].maxBet = "";
        }
        newObj[key] = clearMaxBet(newObj[key]);
      }
    });

    return newObj;
  };

  useEffect(() => {
    if (!state?.id) {
      const clearedValues = clearMaxBet(values);
      formik.resetForm({
        values: clearedValues,
      });
    }
  }, [selected?.eventId]);

  return (
    <form onSubmit={handleSubmit}>
      <Box
        sx={{
          background: "white",
          borderRadius: "5px",
          margin: "10px",
          p: "10px",
        }}
      >
        <Box
          sx={{
            margin: "15px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <LabelValueComponent
            title={state?.id ? "Edit Match" : "Add Match"}
            titleSize="20px"
            headColor="#000000"
          />
          {!state?.id && (
            <BoxButtonManualMatch
              title={manualMatchToggle === false ? "Live" : "Manual"}
              manualMatchToggle={manualMatchToggle}
              setManualMatchToggle={setManualMatchToggle}
            />
          )}
        </Box>
        <Box
          sx={{
            background: "#F8C851",
            marginTop: "20px",
            borderRadius: "5px",
            p: "10px",
            py: "20px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              width: "100%",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: { xs: "100%", lg: "18%", md: "24%" },
              }}
            >
              <DropDown
                name="gameType"
                valued="Select Game Type..."
                dropStyle={{
                  filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                }}
                disable={!!state?.id}
                title="Game *"
                valueContainerStyle={{
                  height: "45px",
                  marginX: "0px",
                  background: "#0B4F26",
                  border: "1px solid #DEDEDE",
                  borderRadius: "5px",
                  cursor: state?.id ? "not-allowed" : "pointer",
                }}
                containerStyle={{
                  width: "100%",
                  position: "relative",
                }}
                titleStyle={{ marginLeft: "0px", color: "#575757" }}
                data={Constants.matchType}
                dropDownStyle={{
                  width: "100%",
                  marginLeft: "0px",
                  marginTop: "0px",
                  position: "absolute",
                }}
                selected={selected}
                setSelected={setSelected}
                dropDownTextStyle={inputStyle}
                isOpen={openDropDown === "gameType"}
                onOpen={handleDropDownOpen}
              />
            </Box>
            <Box
              sx={{
                position: "relative",
                width: { xs: "100%", lg: "18%", md: "24%" },
              }}
            >
              {!manualMatchToggle ? (
                <SearchableInput
                  eventsList={eventsList}
                  label="Select match*"
                  setSelected={setSelected}
                  name="matchName"
                  selected={selected}
                  matchesSelect={true}
                  gameType={selected.gameType}
                  disabled={state?.id ? true : false}
                />
              ) : (
                <MatchListInput
                  label="Match Name*"
                  type="text"
                  onChange={handleInputChange}
                  placeholder="Enter your Match Name"
                  place={3}
                  id="title"
                  name="title"
                />
              )}
            </Box>

            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <MatchListInput
                label="Team A *"
                placeholder="Enter Name of Team A"
                type="text"
                required={true}
                disable={!manualMatchToggle}
                onChange={(e: any) => {
                  setSelected((prev) => {
                    return {
                      ...prev,
                      teamA: e.target?.value,
                    };
                  });
                }}
                value={selected.teamA}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <MatchListInput
                label="Team B *"
                placeholder="Enter Name of Team B..."
                type="text"
                required={true}
                disable={!manualMatchToggle}
                onChange={(e: any) => {
                  setSelected((prev) => {
                    return {
                      ...prev,
                      teamB: e.target?.value,
                    };
                  });
                }}
                value={selected.teamB}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <MatchListInput
                label="Team C*"
                placeholder="Enter Name of Team C"
                type="text"
                onChange={(e: any) => {
                  setSelected((prev) => {
                    return {
                      ...prev,
                      teamC: e.target?.value,
                    };
                  });
                }}
                disable={!manualMatchToggle}
                value={selected.teamC}
              />
            </Box>

            <Box
              sx={{
                width: { xs: "100%", lg: "18%", md: "24%" },
                mt: -1,
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DateTimePicker"]}>
                  <DemoItem>
                    <Typography sx={{ fontSize: "12px" }}>
                      Start Time*
                    </Typography>
                    <DateTimePicker
                      disabled={
                        state?.id ? false : manualMatchToggle ? false : true
                      }
                      sx={{
                        background: "#fff",
                        overflow: "hidden",
                        borderRadius: "5px",
                        mt: "0 !important",
                        opacity: "0.9",
                        cursor: "not-allowed",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "& .MuiOutlinedInput-input": {
                          paddingBottom: "8px",
                          paddingTop: "8px",
                        },
                      }}
                      value={dayjs(selected?.startAt)}
                      onChange={handleDateChange}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box
              sx={{
                width: { xs: "100%", lg: "18%", md: "24%" },
              }}
            >
              <MatchListInput
                required={true}
                disable={!!state?.id}
                label="Min Bet*"
                type="Number"
                touched={touched.minBet}
                errors={errors.minBet}
                value={values.minBet}
                onChange={handleChange}
                placeholder="Enter your Min Bet..."
                place={3}
                id="minBet"
                name="minBet"
                onBlur={formik.handleBlur}
              />
              <CustomErrorMessage
                touched={touched.minBet}
                errors={errors.minBet}
              />
            </Box>

            {selected.gameType === "cricket" && (
              <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
                <MatchListInput
                  required={true}
                  label="API Session Max Bet*"
                  type="Number"
                  placeholder="API Session Max Bet..."
                  place={11}
                  name="betfairSessionMaxBet"
                  id="betfairSessionMaxBet"
                  touched={touched.betfairSessionMaxBet}
                  value={values.betfairSessionMaxBet}
                  onChange={handleChange}
                  onBlur={formik.handleBlur}
                />
                <CustomErrorMessage
                  touched={touched.betfairSessionMaxBet}
                  errors={errors.betfairSessionMaxBet}
                />
              </Box>
            )}

            {selected?.teamB && (
              <Box
                sx={{
                  width: "100%",
                  cursor: "pointer",
                  display: "flex",
                  justifyContent: "center",
                  gap: "15px",
                }}
              >
                <Box
                  sx={{
                    width: { xs: "100%", lg: "50%", md: "24%" },
                    marginTop: "17px",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        required={false}
                        name="rateThan100"
                        id="rateThan100"
                        value={values.rateThan100}
                        checked={isChecked}
                        onChange={(e) => {
                          handleCheckboxChange(e);
                          handleChange(e);
                        }}
                        disabled={false}
                        sx={{
                          color: "#0B4F26",
                          "&.MuiButtonBase-root": {
                            margin: 0,
                          },
                          "&.MuiCheckbox-root": {
                            margin: 0,
                            width: "40px",
                          },
                          "&.MuiSvgIcon-root": {
                            margin: 0,
                          },
                          "&.MuiTouchRipple-root": {
                            margin: 0,
                          },
                          "&.Mui-checked": {
                            color: "#0B4F26",
                          },
                          width: "100%",
                          position: "relative",
                          marginTop: "5px",
                          textAlign: "center",
                        }}
                      />
                    }
                    label="Manual bookmaker rate limit (more than 100)."
                    sx={{
                      color: "#0B4F26",
                      background: "#F8C851",
                      fontWeight: "500",
                      border: "1px solid #F8C851",
                      borderRadius: "5px",
                      height: "45px",
                      marginX: "0px",
                      width: "100%",
                      position: "relative",
                      marginTop: "5px",
                      paddingLeft: "1px",
                      display: "flex",
                      alignItems: "center",
                      "& .MuiTypography-root": {
                        fontWeight: "500",
                      },
                      "& .MuiTypography-body1": {
                        fontWeight: "500",
                      },
                      "&.MuiFormControlLabel-root": {
                        display: "flex",
                        justifyContent: "center",
                      },
                      "& .MuiFormControlLabel-label": {
                        fontWeight: "600",
                      },
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", justifyContent: "center", marginY: "30px" }}
        >
          <Button
            type="submit"
            sx={{
              background: "#10DC61",
              cursor: "pointer",
              height: "40px",
              width: { xs: "50%", lg: "15%", md: "15%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid black",
              "&:hover": {
                background: "#10DC61",
              },
            }}
          >
            <Typography sx={{ color: "white" }}>
              {state?.id ? "Update" : "Create"}
            </Typography>
          </Button>
          <Box
            onClick={() => {
              setSelected(initialValues);
              formik.resetForm();
              if (state?.id) {
                dispatch(editMatchReset());
              }
              navigate("/expert/match_list");
            }}
            sx={{
              background: "#E32A2A",
              height: "40px",
              cursor: "pointer",
              marginLeft: "20px",
              display: "flex",
              width: { xs: "50%", lg: "15%", md: "15%" },
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "5px",
              border: "2px solid black",
            }}
          >
            <Typography sx={{ color: "white" }}>Cancel</Typography>
          </Box>
        </Box>
      </Box>
    </form>
  );
};

export default memo(AddMatch);
