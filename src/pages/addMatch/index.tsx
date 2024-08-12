import { Box, Button, Typography } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { useFormik } from "formik";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomErrorMessage from "../../components/Common/CustomErrorMessage";
import DropDown from "../../components/Common/DropDown";
import BoxButtonManualMatch from "../../components/addMatch/ButtonSwitchManualMatch";
import LabelValueComponent from "../../components/addMatch/LabelValueComponent";
import MatchListInput from "../../components/addMatch/MatchListInput";
import Constants from "../../components/helper/constants";
import { Checkbox, FormControlLabel } from "@mui/material";
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
  updateExtraMarketListOnEdit,
} from "../../store/actions/addMatch/addMatchAction";
import {
  editMatch,
  editSuccessReset,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import { eventWiseMatchData, matchBettingType } from "../../utils/Constants";
// import { addMatchValidation } from "../../utils/Validations/login";

// const useStyles = makeStyles(() => ({
//   dateTimePicker: {
//     "& .MuiFormControl-root": {
//       height: "30px",
//     },
//   },
// }));

function flattenObject(obj: any) {
  if (obj) {
    return Object.keys(obj).reduce((acc: any, key) => {
      if (Array.isArray(obj[key])) {
        obj[key].forEach((item: any) => {
          acc[item?.type] = item;
        });
      } else {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
  }
  return {};
}

const initialFormikValues = {
  minBet: "",
  [matchBettingType.matchOdd]: {
    maxBet: "",
  },
  betfairSessionMaxBet: "",
  [matchBettingType.bookmaker]: {
    maxBet: "",
  },
  [matchBettingType.tiedMatch1]: {
    maxBet: "",
  },
  [matchBettingType.completeMatch]: {
    maxBet: "",
  },
  [matchBettingType.tiedMatch2]: {
    maxBet: "",
  },
  marketName1: "",
  marketMaxBet1: "",
  marketId1: "",
  marketName2: "",
  marketMaxBet2: "",
  marketId2: "",
  marketName3: "",
  marketMaxBet3: "",
  marketId3: "",
  rateThan100: "",
};

const initialValues = {
  teamA: "",
  teamB: "",
  teamC: "",
  title: "",
  manualBookmaker: 0,
  gameType: "",
  tournamentName: "",
  tournamentId: "",
  matchName: "",
  competitionName: "",
  eventId: "",
  marketId: "",
  startAt: new Date(),
};

const AddMatch = () => {
  const dispatch: AppDispatch = useDispatch();

  const { state } = useLocation();

  const {
    tournamentList,
    eventsList,
    extraMarketList,
    matchDetail,
    success,
    matchAdded,
    loading,
  } = useSelector((state: RootState) => state.addMatch.addMatch);

  const [selected, setSelected] = useState(initialValues);
  const [openDropDown, setOpenDropDown] = useState(null);
  const [error, setError] = useState({
    torunamentName: false,
    competitionName: false,
  });
  const [manualMatchToggle, setManualMatchToggle] = useState(false);
  const navigate = useNavigate();

  const inputStyle = {
    fontSize: { xs: "14px", lg: "14px", fontWeight: "600" },
    textTransform: "capitalize",
  };

  const selectionData = [1, 2, 3];

  const { editSuccess } = useSelector((state: RootState) => state.matchList);
  const formik = useFormik({
    // validationSchema: addMatchValidation(manualMatchToggle, selected.gameType,extraMarketList),
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
        let bookmakers;

        if (selected.manualBookmaker === 1) {
          bookmakers = [
            {
              maxBet: values.marketMaxBet1,
              id: values.marketId1,
            },
          ];
        } else if (selected.manualBookmaker === 2) {
          bookmakers = [
            {
              maxBet: values.marketMaxBet1,
              id: values.marketId1,
            },
            {
              maxBet: values.marketMaxBet2,
              id: values.marketId2,
            },
          ];
        } else if (selected.manualBookmaker === 3) {
          bookmakers = [
            {
              maxBet: values.marketMaxBet1,
              id: values.marketId1,
            },
            {
              maxBet: values.marketMaxBet2,
              id: values.marketId2,
            },
            {
              maxBet: values.marketMaxBet3,
              id: values.marketId3,
            },
          ];
        }
        const payload: any = {
          id: state?.id,
          minBet: value.minBet,
          marketData: [],
          betFairSessionMaxBet: value.betfairSessionMaxBet,
          bookmakers: bookmakers,
          startAt: selected.startAt,
          rateThan100: value.rateThan100,
        };

        eventWiseMatchData[selected.gameType]?.manual?.forEach((item) => {
          payload.marketData.push({
            maxBet: value?.[item?.matchType]?.maxBet,
            type: item?.matchType,
          });
        });

        if (!manualMatchToggle) {
          eventWiseMatchData[selected.gameType]?.market?.forEach((item) => {
            if (value?.[item?.matchType]?.maxBet) {
              payload.marketData.push({
                maxBet: value?.[item?.matchType]?.maxBet,
                type: item?.matchType,
              });
            }
          });
        }
        dispatch(editMatch(payload));
      } else {
        let bookmakers;
        if (selected.manualBookmaker === 1) {
          bookmakers = [
            {
              maxBet: values.marketMaxBet1,
              marketName: values.marketName1,
            },
          ];
        } else if (selected.manualBookmaker === 2) {
          bookmakers = [
            {
              maxBet: values.marketMaxBet1,
              marketName: values.marketName1,
            },
            {
              maxBet: values.marketMaxBet2,
              marketName: values.marketName2,
            },
          ];
        } else if (selected.manualBookmaker === 3) {
          bookmakers = [
            {
              maxBet: values.marketMaxBet1,
              marketName: values.marketName1,
            },
            {
              maxBet: values.marketMaxBet2,
              marketName: values.marketName2,
            },
            {
              maxBet: values.marketMaxBet3,
              marketName: values.marketName3,
            },
          ];
        }
        if (selected.title === "") {
          setError((prev: any) => {
            return {
              ...prev,
              title: true,
            };
          });
          return;
        } else if (selected.competitionName === "") {
          setError((prev: any) => {
            return {
              ...prev,
              competitionName: true,
            };
          });
          return;
        }
        const addMatchpayload: any = {
          matchType: selected.gameType,
          competitionId: selected.tournamentId,
          competitionName: selected.competitionName,
          title: selected.title,
          marketId: selected.marketId,
          eventId: selected.eventId,
          teamA: selected.teamA,
          teamB: selected.teamB,
          teamC: selected.teamC,
          startAt: selected.startAt,
          minBet: value.minBet,
          marketData: [],
          rateThan100: value.rateThan100,
          betFairSessionMaxBet:
            selected.gameType === "cricket"
              ? value.betfairSessionMaxBet
              : value.minBet + 1,
          bookmakers: bookmakers,
        };

        eventWiseMatchData[selected.gameType]?.manual?.forEach((item) => {
          addMatchpayload.marketData.push({
            maxBet: value?.[item?.matchType]?.maxBet,
            type: item?.matchType,
          });
        });

        if (!manualMatchToggle) {
          eventWiseMatchData[selected.gameType]?.market?.forEach((item) => {
            if (extraMarketList?.[item?.marketIdKey]?.marketId) {
              addMatchpayload.marketData.push({
                maxBet: value?.[item?.matchType]?.maxBet,
                type: item?.matchType,
                marketId: extraMarketList?.[item?.marketIdKey]?.marketId,
              });
            }
          });
        }
        if (manualMatchToggle) {
          const newPayload = {
            ...addMatchpayload,
            isManualMatch: true,
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
          manualBookmaker: 0,
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
          manualBookmaker: 0,
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
    if (selected.title !== "") {
      setError((prev: any) => {
        return {
          ...prev,
          title: false,
        };
      });
    }
    if (selected.competitionName !== "") {
      setError((prev: any) => {
        return {
          ...prev,
          competitionName: false,
        };
      });
    }
  }, [selected.competitionName, selected.title]);

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
            marketName1: matchDetail?.quickBookmaker[0].name ?? "",
            marketMaxBet1: matchDetail?.quickBookmaker[0]?.maxBet ?? "",
            marketId1: matchDetail?.quickBookmaker[0]?.id ?? "",
            marketName2: matchDetail?.quickBookmaker[1]?.name ?? "",
            marketMaxBet2: matchDetail?.quickBookmaker[1]?.maxBet ?? "",
            marketId2: matchDetail?.quickBookmaker[1]?.id ?? "",
            marketName3: matchDetail?.quickBookmaker[2]?.name ?? "",
            marketMaxBet3: matchDetail?.quickBookmaker[2]?.maxBet ?? "",
            marketId3: matchDetail?.quickBookmaker[2]?.id ?? "",
            rateThan100: matchDetail?.rateThan100 ?? false,
          };
          setIsChecked(matchDetail?.rateThan100)
          
          if (!manualMatchToggle) {
            eventWiseMatchData[matchDetail?.matchType]?.market?.forEach(
              (item) => {
                if (matchDetail[item?.apiKey]) {
                  formikValues[item?.matchType] = {
                    maxBet: matchDetail[item?.apiKey].maxBet,
                  };
                }
              }
            );
          }

          eventWiseMatchData[matchDetail?.matchType]?.manual?.forEach(
            (item) => {
              if (matchDetail[item?.apiKey]) {
                formikValues[item?.matchType] = {
                  maxBet: matchDetail[item?.apiKey].maxBet,
                };
              }
            }
          );
          let extraMarketListArray = {};
          eventWiseMatchData[matchDetail?.matchType]?.market?.forEach(
            (item) => {
              let updatedMatchDetail: any = flattenObject(matchDetail);
              if (updatedMatchDetail[item?.apiKey]) {
                formikValues[item?.matchType] = {
                  maxBet: updatedMatchDetail[item?.apiKey].maxBet,
                };
                extraMarketListArray = {
                  ...extraMarketListArray,
                  [item?.apiKey]: {
                    marketId: updatedMatchDetail[item?.apiKey].marketId,
                  },
                };
              }
            }
          );

          dispatch(updateExtraMarketListOnEdit(extraMarketListArray));

          formik.setValues(formikValues);
          setSelected((prev: any) => {
            return {
              ...prev,
              teamA: matchDetail?.teamA,
              teamB: matchDetail?.teamB,
              teamC: matchDetail?.teamC,
              manualBookmaker: matchDetail?.quickBookmaker?.length,
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
            notShowSub={true}
            titleSize={"20px"}
            headColor={"#000000"}
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
                disable={state?.id ? true : false}
                valueStyle={{ ...inputStyle, color: "white" }}
                title={"Game *"}
                id={"gameType"}
                value={values.gameType}
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
                  marginTop: "5px",
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
                place={1}
                isOpen={openDropDown === "gameType"}
                onOpen={handleDropDownOpen}
              />
            </Box>
            {/* {touched.gameType && errors.gameType && (
              <p style={{ color: "#fa1e1e" }}>
                {errors.gameType as string}
              </p>
            )} */}

            <Box
              sx={{
                position: "relative",
                width: { xs: "100%", lg: "18%", md: "24%" },
              }}
            >
              {!manualMatchToggle ? (
                <DropDown
                  name="tournamentName"
                  valued="Select tournament"
                  dropStyle={{
                    filter:
                      "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                  }}
                  disable={state?.id ? true : false}
                  data={tournamentList}
                  valueStyle={{ ...inputStyle, color: "white" }}
                  title={"Tournament Name*"}
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
                    marginTop: "5px",
                  }}
                  type={"tournament"}
                  titleStyle={{ marginLeft: "0px", color: "#575757" }}
                  matchesSelect={true}
                  dropDownStyle={{
                    width: "100%",
                    marginLeft: "0px",
                    marginTop: "0px",
                    position: "absolute",
                    maxHeight: "500px",
                    overflow: "auto",
                  }}
                  place={33}
                  id="tournamentName"
                  selected={selected}
                  setSelected={setSelected}
                  isOpen={openDropDown === "tournamentName"}
                  onOpen={handleDropDownOpen}
                />
              ) : (
                <MatchListInput
                  required={true}
                  label={"Tournament Name*"}
                  type={"text"}
                  onChange={handleInputChange}
                  placeholder="Enter your Tournament Name"
                  place={3}
                  id="competitionName"
                  name="competitionName"
                />
              )}
              {error.torunamentName && (
                <span style={{ color: "red" }}>{"Field is Required"}</span>
              )}
            </Box>
            <Box
              sx={{
                position: "relative",
                width: { xs: "100%", lg: "18%", md: "24%" },
              }}
            >
              {!manualMatchToggle ? (
                <DropDown
                  name="matchName"
                  valued="Select match"
                  dropStyle={{
                    filter:
                      "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                  }}
                  disable={state?.id ? true : false}
                  valueStyle={{ ...inputStyle, color: "white" }}
                  title={"Match Name*"}
                  valueContainerStyle={{
                    height: "45px",
                    marginX: "0px",
                    background: "#0B4F26",
                    border: "1px solid #DEDEDE",
                    borderRadius: "5px",
                    cursor: state?.id ? "not-allowed" : "pointer",
                  }}
                  // touched={touched.competitionName}
                  gameType={selected.gameType}
                  // onBlur={formik.handleBlur}
                  // error={touched.competitionName}
                  value={values.competitionName}
                  containerStyle={{
                    width: "100%",
                    position: "relative",
                    marginTop: "5px",
                  }}
                  type={"cricket"}
                  titleStyle={{ marginLeft: "0px", color: "#575757" }}
                  data={eventsList}
                  matchesSelect={true}
                  dropDownStyle={{
                    width: "100%",
                    marginLeft: "0px",
                    marginTop: "0px",
                    position: "absolute",
                    maxHeight: "500px",
                    overflow: "auto",
                  }}
                  onChange={(e: any) => {
                    setSelected((prev) => {
                      return {
                        ...prev,
                        competitionName: e.target?.value,
                      };
                    });
                  }}
                  dropDownTextStyle={inputStyle}
                  selected={selected}
                  setSelected={setSelected}
                  place={5}
                  isOpen={openDropDown === "matchName"}
                  onOpen={handleDropDownOpen}
                />
              ) : (
                <MatchListInput
                  // required={true}
                  label={"Match Name*"}
                  type={"text"}
                  onChange={handleInputChange}
                  placeholder="Enter your Match Name"
                  place={3}
                  id="title"
                  name="title"
                />
              )}
              {error.competitionName && (
                <span style={{ color: "red" }}>{"Field is Required"}</span>
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
              {" "}
              <MatchListInput
                label="Team C *"
                placeholder="Enter Name of Team C"
                type="text"
                // required={true}
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
                {" "}
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
                        // height: "40px",
                        background: "#fff",
                        overflow: "hidden",
                        borderRadius: "5px",
                        mt: "0 !important",
                        opacity: "0.9",
                        cursor: "not-allowed",
                        "& .MuiOutlinedInput-notchedOutline": {
                          border: "none",
                        },
                        "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input":
                          {
                            // cursor: "not-allowed",
                            paddingBottom: "8px",
                            paddingTop: "8px",
                          },
                      }}
                      // className={classes.dateTimePicker}
                      // label="Basic date picker"
                      value={dayjs(selected?.startAt)}
                      onChange={handleDateChange}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            {/* <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <LabelValueComponent
                icon={Upload}
                title={"Image (Optional)"}
                value="No File Selected..."
                place={6}
                DetailError={{
                  type: "String",
                }}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <LabelValueComponent
                icon={Upload}
                title={"Team A Image (Optional)"}
                value="No File Selected..."
                place={10}
                DetailError={{
                  type: "String",
                }}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <LabelValueComponent
                icon={Upload}
                title={"Team B Image (Optional)"}
                value="No File Selected..."
                place={14}
                DetailError={{
                  type: "String",
                }}
              />
            </Box> */}
            <Box
              sx={{
                width: { xs: "100%", lg: "18%", md: "24%" },
              }}
            >
              <MatchListInput
                required={true}
                disable={state?.id}
                label={"Min Bet*"}
                type={"Number"}
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
                  containerStyle={{ flex: 1, width: "100%" }}
                  label={"Betfair Session Max Bet*"}
                  type={"Number"}
                  placeholder="Betfair Session Max Bet..."
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

            {eventWiseMatchData[selected.gameType]?.manual?.map((item: any) => {
              return (
                <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
                  <MatchListInput
                    required={true}
                    containerStyle={{ flex: 1, width: "100%" }}
                    label={`${item?.label}*`}
                    {...formik.getFieldProps(`${item?.matchType}.maxBet`)}
                    type={"Number"}
                    touched={(touched?.[item?.matchType] as any)?.maxBet}
                    value={values?.[item?.matchType]?.maxBet}
                    // onChange={handleChange}
                    placeholder={`Enter ${item?.name} Max Bet...`}
                    place={15}
                    onBlur={formik.handleBlur}
                  />
                  <CustomErrorMessage
                    touched={(touched?.[item?.matchType] as any)?.maxBet}
                    errors={(errors?.[item?.matchType] as any)?.maxBet}
                  />
                </Box>
              );
            })}

            {!manualMatchToggle &&
              eventWiseMatchData[selected.gameType]?.market
                ?.filter(
                  (item: any) =>
                    extraMarketList[item.marketIdKey]?.marketId !== null &&
                    extraMarketList[item.marketIdKey]?.marketId !== undefined
                )
                ?.map((item: any) => {
                  return (
                    <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
                      <MatchListInput
                        required={true}
                        containerStyle={{ flex: 1, width: "100%" }}
                        label={`${item?.label}*`}
                        {...formik.getFieldProps(`${item?.matchType}.maxBet`)}
                        onChange={(e: any) => {
                          formik.setValues({
                            ...values,
                            [item.matchType]: {
                              ...values[item.matchType],
                              maxBet: e.target.value,
                            },
                          });
                        }}
                        type={"Number"}
                        touched={(touched?.[item?.matchType] as any)?.maxBet}
                        value={values?.[item?.matchType]?.maxBet}
                        placeholder={`Enter ${item?.name} Max Bet...`}
                        place={15}
                        onBlur={formik.handleBlur}
                      />
                      <CustomErrorMessage
                        touched={(touched?.[item?.matchType] as any)?.maxBet}
                        errors={(errors?.[item?.matchType] as any)?.maxBet}
                      />
                    </Box>
                  );
                })}

            <Box
              sx={{
                width: "100%",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <Box
                sx={{
                  width: { xs: "100%", lg: "18%", md: "24%" },
                }}
              >
                <DropDown
                  name="manualBookmaker"
                  valued="Select Bookmaker"
                  dropStyle={{
                    filter:
                      "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                  }}
                  disable={state?.id ? true : false}
                  valueStyle={{ ...inputStyle, color: "white" }}
                  title={"Bookmaker*"}
                  valueContainerStyle={{
                    height: "45px",
                    marginX: "0px",
                    background: "#0B4F26",
                    border: "1px solid #DEDEDE",
                    borderRadius: "5px",
                  }}
                  containerStyle={{
                    width: "100%",
                    position: "relative",
                    marginTop: "5px",
                  }}
                  titleStyle={{ marginLeft: "0px", color: "#575757" }}
                  data={selectionData}
                  dropDownStyle={{
                    width: "100%",
                    marginLeft: "0px",
                    marginTop: "0px",
                    position: "absolute",
                    maxHeight: "500px",
                    overflow: "auto",
                  }}
                  selected={selected}
                  setSelected={setSelected}
                  dropDownTextStyle={inputStyle}
                  place={4}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: 1,
                }}
              >
                {selected.manualBookmaker >= 1 && (
                  <Box sx={{ display: "flex", width: "100%", gap: 1 }}>
                    <Box
                      sx={{
                        width: {
                          xs: "100%",
                          lg: "18%",
                          md: "24%",
                        },
                      }}
                    >
                      <MatchListInput
                        required={true}
                        label={"Market Name*"}
                        type={"text"}
                        placeholder="Enter Market Name..."
                        place={11}
                        name="marketName1"
                        id="marketName1"
                        disable={state?.id ? true : false}
                        value={values.marketName1}
                        onChange={handleChange}
                      />
                    </Box>

                    <Box
                      sx={{
                        width: {
                          xs: "100%",
                          lg: "18%",
                          md: "24%",
                        },
                      }}
                    >
                      <MatchListInput
                        required={true}
                        label={"Max Limit*"}
                        type={"number"}
                        placeholder="Enter Max Bet..."
                        place={11}
                        name="marketMaxBet1"
                        id="marketMaxBet1"
                        value={values.marketMaxBet1}
                        onChange={handleChange}
                      />
                    </Box>
                  </Box>
                )}
                {selected.manualBookmaker >= 2 && (
                  <Box sx={{ display: "flex", width: "100%", gap: 1 }}>
                    <Box
                      sx={{
                        width: {
                          xs: "100%",
                          lg: "18%",
                          md: "24%",
                        },
                      }}
                    >
                      <MatchListInput
                        required={true}
                        label={"Market Name*"}
                        type={"text"}
                        placeholder="Enter Market Name..."
                        place={11}
                        name="marketName2"
                        id="marketName2"
                        disable={state?.id ? true : false}
                        onChange={handleChange}
                        value={values.marketName2}
                      />
                    </Box>

                    <Box
                      sx={{
                        width: {
                          xs: "100%",
                          lg: "18%",
                          md: "24%",
                        },
                      }}
                    >
                      <MatchListInput
                        required={true}
                        label={"Max Limit*"}
                        type={"number"}
                        placeholder="Enter Max Bet..."
                        place={11}
                        name="marketMaxBet2"
                        id="marketMaxBet2"
                        onChange={handleChange}
                        value={values.marketMaxBet2}
                      />
                    </Box>
                  </Box>
                )}
                {selected.manualBookmaker === 3 && (
                  <Box sx={{ display: "flex", width: "100%", gap: 1 }}>
                    <Box
                      sx={{
                        width: {
                          xs: "100%",
                          lg: "18%",
                          md: "24%",
                        },
                      }}
                    >
                      <MatchListInput
                        required={true}
                        label={"Market Name*"}
                        type={"text"}
                        placeholder="Enter Market Name..."
                        place={11}
                        name="marketName3"
                        id="marketName3"
                        disable={state?.id ? true : false}
                        value={values.marketName3}
                        onChange={handleChange}
                      />
                    </Box>

                    <Box
                      sx={{
                        width: {
                          xs: "100%",
                          lg: "18%",
                          md: "24%",
                        },
                      }}
                    >
                      <MatchListInput
                        required={true}
                        label={"Max Limit*"}
                        type={"number"}
                        placeholder="Enter Max Bet..."
                        place={11}
                        name="marketMaxBet3"
                        id="marketMaxBet3"
                        onChange={handleChange}
                        value={values.marketMaxBet3}
                      />
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>

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
                    fontWeight: "500", // This sets the fontWeight for the label text
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
                      fontWeight: "500", // Adjust fontWeight specifically for the label
                    },
                    "& .MuiTypography-body1": {
                      fontWeight: "500", // Ensures body1 variant also has the correct fontWeight
                    },
                    "&.MuiFormControlLabel-root": {
                      display: "flex",
                      justifyContent: "center",
                    },
                    "& .MuiFormControlLabel-label": {
                      fontWeight: "600", // Adjusts the fontWeight for the label text
                    },
                  }}
                />
              </Box>
            </Box>
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

export default AddMatch;
