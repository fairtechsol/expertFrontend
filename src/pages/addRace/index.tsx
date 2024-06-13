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
import BoxButtonManualMatch from "../../components/addRace/ButtonSwitchManualMatch";
import LabelValueComponent from "../../components/addRace/LabelValueComponent";
import MatchListInput from "../../components/addRace/MatchListInput";
import Constants from "../../components/helper/constants";
import {
  addMatchReset,
  addRaceExpert,
  editMatchReset,
  eventListReset,
  getMatchDetail,
  getRaceMatches,
  runnerDetailReset,
  tournamentListReset,
} from "../../store/actions/addMatch/addMatchAction";
import {
  editMatch,
  editSuccessReset,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import RaceDropDown from "../../components/addRace/DropDown";
// import { addMatchValidation } from "../../utils/Validations/login";

// const useStyles = makeStyles(() => ({
//   dateTimePicker: {
//     "& .MuiFormControl-root": {
//       height: "30px",
//     },
//   },
// }));

const gameTypes = [
  { label: "horse racing", value: "horseRacing" },
  { label: "greyhound  racing", value: "greyhoundRacing" },
];
const initialFormikValues = {
  minBet: "",
  maxBet: "",
};

const initialValues = {
  title: "",
  gameType: "",
  matchName: "",
  competitionName: "",
  eventId: "",
  marketId: "",
  competitionId: "",
  countryCode: "",
  venue: "",
  raceType: "",
  startAt: new Date(),
};

const AddRace = () => {
  const dispatch: AppDispatch = useDispatch();

  const { state } = useLocation();

  const { eventsList, matchAdded, loading, raceRunners } = useSelector(
    (state: RootState) => state.addMatch.addMatch
  );
  const { raceDetail, success } = useSelector((state: RootState) => state.matchList);
  const [selected, setSelected] = useState(initialValues);
  const [openDropDown, setOpenDropDown] = useState(null);
  const [matchType, setMatchType] = useState<any>("");
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

  const { editSuccess } = useSelector((state: RootState) => state.matchList);
  const formik = useFormik({
    // validationSchema: addMatchValidation(manualMatchToggle, selected.gameType,extraMarketList),
    initialValues: initialFormikValues,
    onSubmit: (value: any) => {
      if (!selected.gameType) {
        toast.error("This game is not available yet.");
      }
      if (!selected.marketId) {
        toast.error("Select a valid match.");
        return;
      }
      if (loading) {
        return;
      }
      if (value.maxBet < value.minBet) {
        toast.error("Maxbet should be greater then Minbet");
        return;
      }
      if (state?.id) {
        const payload: any = {
          id: state?.id,
          minBet: value.minBet,
        };
        dispatch(editMatch(payload));
      } else {
        const addMatchpayload: any = {
          matchType: matchType === "greyhoundRacing" ? "greyHound" : matchType,
          title: selected.title,
          marketId: selected.marketId,
          eventId: selected.eventId,
          startAt: selected.startAt,
          countryCode: selected.countryCode,
          minBet: value.minBet,
          maxBet: value.maxBet,
          type: "matchOdd",
          venue: selected.venue,
          runners: raceRunners,
          raceType: selected.raceType
            ? selected.raceType
            : matchType === "greyhoundRacing"
            ? "greyHound"
            : matchType,
        };

        if (manualMatchToggle) {
          // const newPayload = {
          //   ...addMatchpayload,
          //   isManualMatch: true,
          // };
          // dispatch(addMatchExpert(newPayload));
        } else {
          dispatch(addRaceExpert(addMatchpayload));
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
          title: "",
          competitionName: "",
          eventId: "",
          marketId: "",
          startAt: moment(),
        };
      });
    }
    setSelected((prev: any) => {
      return {
        ...prev,
        matchName: "",
      };
    });
    if (selected.gameType !== "" && !state?.id) {
      if (!manualMatchToggle) {
        const gameType = gameTypes.find(
          (game) => game.label === selected.gameType
        );
        setMatchType(gameType?.value);
        dispatch(eventListReset());
        dispatch(getRaceMatches(gameType ? gameType?.value : ""));
      }
      formik.setValues({
        ...values,
        minBet: 100,
      });
    }
  }, [selected.gameType]);

  // useEffect(() => {
  //   if (!state?.id) {
  //     setSelected((prev: any) => {
  //       return {
  //         ...prev,
  //         teamA: "",
  //         teamB: "",
  //         teamC: "",
  //         title: "",
  //         manualBookmaker: 0,
  //         matchName: "",
  //         competitionName: "",
  //         eventId: "",
  //         marketId: "",
  //         startAt: new Date(),
  //       };
  //     });
  //   }

  //   if (!state?.id) {
  //     dispatch(eventListReset());
  //   }
  // }, [selected.tournamentId]);

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
      navigate(
        `/expert/race/${
          matchType
            ? matchType === "greyhoundRacing"
              ? "greyHound"
              : matchType
            : "horseRacing"
        }`
      );
      dispatch(addMatchReset());
    }
  }, [state?.id, matchAdded]);

  useEffect(() => {
    try {
      dispatch(runnerDetailReset());
    } catch (e) {
      console.log(e);
    }
  }, [raceDetail, success]);

  useEffect(() => {
    setSelected(initialValues);
    formik.resetForm();
  }, [manualMatchToggle]);

  const handleDropDownOpen = (dropdownName: any) => {
    setOpenDropDown(openDropDown === dropdownName ? null : dropdownName);
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
            title={state?.id ? "Edit Race" : "Add Race"}
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
                data={Constants.raceType}
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
                <RaceDropDown
                  name="matchName"
                  valued="Select Race"
                  dropStyle={{
                    filter:
                      "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                  }}
                  disable={state?.id ? true : false}
                  valueStyle={{ ...inputStyle, color: "white" }}
                  title={"Race Name*"}
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
                  required={true}
                  label={"Race Name*"}
                  type={"text"}
                  onChange={handleInputChange}
                  placeholder="Enter your Race Name"
                  place={3}
                  id="title"
                  name="title"
                />
              )}
              {error.competitionName && (
                <span style={{ color: "red" }}>{"Field is Required"}</span>
              )}
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
                      disabled={state?.id || !manualMatchToggle}
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

            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
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

            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <MatchListInput
                required={true}
                containerStyle={{ flex: 1, width: "100%" }}
                label={"Betfair Match Odd Max Bet*"}
                type={"Number"}
                placeholder="Betfair Match Odd Max Bet..."
                place={11}
                name="maxBet"
                id="maxBet"
                touched={touched.maxBet}
                value={values.maxBet}
                onChange={handleChange}
                onBlur={formik.handleBlur}
              />
              <CustomErrorMessage
                touched={touched.maxBet}
                errors={errors.maxBet}
              />
            </Box>

            {raceRunners?.map((item: any, index: number) => {
              return (
                <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
                  <Typography
                    style={{
                      color: "#575757",
                      fontSize: "12px",
                      fontWeight: "600",
                      // ...labelStyle,
                    }}
                  >
                    Runner {index + 1}
                  </Typography>
                  <Box
                    sx={{
                      width: "100%",
                      height: "50px",
                      borderRadius: "5px",
                      px: "10px",
                      py: "4px",
                      display: "flex",
                      // alignItems: "center",
                      justifyContent: "flex-start",
                      background: "white",
                      backgroundColor: " ",
                      flexDirection: "column",
                    }}
                  >
                    <Typography sx={{ fontSize: "16px" }}>
                      {item?.runnerName}
                    </Typography>

                    <Typography sx={{ fontSize: "11px" }}>
                      {item?.metadata?.TRAINER_NAME}
                    </Typography>
                  </Box>
                </Box>
              );
            })}

            {/* {!manualMatchToggle &&
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
                })} */}
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
              navigate(
                `/expert/race/${
                  matchType
                    ? matchType === "greyhoundRacing"
                      ? "greyHound"
                      : matchType
                    : "horseRacing"
                }`
              );
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

export default AddRace;
