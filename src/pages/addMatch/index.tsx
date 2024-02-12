import { Box, Button, Typography } from "@mui/material";
// import { makeStyles } from "@mui/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDateTimePicker } from "@mui/x-date-pickers/DesktopDateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import DropDown from "../../components/Common/DropDown";
import LabelValueComponent from "../../components/addMatch/LabelValueComponent";
import MatchListInput from "../../components/addMatch/MatchListInput";
import Constants from "../../components/helper/constants";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  addMatchExpert,
  addMatchReset,
  editMatchReset,
  eventListReset,
  getAllEventsList,
  getAllLiveTournaments,
  getMatchDetail,
  matchDetailReset,
  tournamentListReset,
} from "../../store/actions/addMatch/addMatchAction";
import moment from "moment";
import {
  editMatch,
  editSuccessReset,
} from "../../store/actions/match/matchAction";
import { addMatchValidation } from "../../utils/Validations/login";
import CustomErrorMessage from "../../components/Common/CustomErrorMessage";
import BoxButtonManualMatch from "../../components/addMatch/ButtonSwitchManualMatch";

// const useStyles = makeStyles(() => ({
//   dateTimePicker: {
//     "& .MuiFormControl-root": {
//       height: "30px",
//     },
//   },
// }));

const initialFormikValues = {
  minBet: "",
  betfairMatchMaxBet: "",
  betfairSessionMaxBet: "",
  betfairBookmakerMaxBet: "",
  marketTiedMatchMaxBet: "",
  manualTiedMatchMaxBet: "",
  completeMatchMaxBet: "",
  marketName1: "",
  marketMaxBet1: "",
  marketId1: "",
  marketName2: "",
  marketMaxBet2: "",
  marketId2: "",
  marketName3: "",
  marketMaxBet3: "",
  marketId3: "",
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
  } = useSelector((state: RootState) => state.addMatch.addMatch);

  const [selected, setSelected] = useState(initialValues);
  const [tcheck, setTcheck] = useState(false);
  console.log(tcheck);
  const [ccheck, setCcheck] = useState(false);
  const [manualMatchToggle, setManualMatchToggle] = useState(false);
  const navigate = useNavigate();

  const inputStyle = {
    fontSize: { xs: "14px", lg: "14px", fontWeight: "600" },
    textTransform: "capitalize",
  };

  const selectionData = [1, 2, 3];

  const { editSuccess } = useSelector((state: RootState) => state.matchList);

  const formik = useFormik({
    validationSchema: addMatchValidation,
    initialValues: initialFormikValues,

    onSubmit: (value: any) => {
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
        let payload = {
          id: state?.id,
          minBet: value.minBet,
          matchOddMaxBet: value.betfairMatchMaxBet,
          betFairSessionMaxBet: value.betfairSessionMaxBet,
          betFairBookmakerMaxBet: value.betfairBookmakerMaxBet,
          marketTiedMatchMaxBet: value.marketTiedMatchMaxBet,
          manualTiedMatchMaxBet: value.manualTiedMatchMaxBet,
          completeMatchMaxBet: value.completeMatchMaxBet,
          bookmakers: bookmakers,
        };
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
        let addMatchpayload = {
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
          matchOddMaxBet: value.betfairMatchMaxBet,
          betFairSessionMaxBet: value.betfairSessionMaxBet,
          betFairBookmakerMaxBet: value.betfairBookmakerMaxBet,
          marketTiedMatchMaxBet: value.marketTiedMatchMaxBet,
          manualTiedMatchMaxBet: value.manualTiedMatchMaxBet,
          completeMatchMaxBet: value.completeMatchMaxBet,
          bookmakers: bookmakers,
          matchOddMarketId: extraMarketList?.matchOdds?.marketId,
          marketBookmakerId: extraMarketList?.matchOdds?.marketId,
          tiedMatchMarketId: extraMarketList?.tiedMatch?.marketId,
          completeMatchMarketId: extraMarketList?.completedMatch?.marketId,
        };
        dispatch(addMatchExpert(addMatchpayload));
      }

      if (state?.id) {
        dispatch(editMatchReset());
      }
      if (selected.tournamentId === "") {
        setTcheck(true);
      } else if (selected.competitionName === "") {
        setCcheck(true);
      }
    },
  });

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
          startAt: new Date(),
        };
      });
      formik.setValues({
        ...values,
        minBet: 100,
      });
    }
    if (selected.gameType !== "" && !state?.id) {
      dispatch(tournamentListReset());
      dispatch(getAllLiveTournaments(selected.gameType));
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
          formik.setValues({
            ...values,
            minBet: matchDetail?.betFairSessionMinBet ?? "",
            betfairMatchMaxBet: matchDetail?.matchOdd?.maxBet ?? "",
            betfairSessionMaxBet: matchDetail?.betFairSessionMaxBet ?? "",
            betfairBookmakerMaxBet: matchDetail?.bookmaker?.maxBet ?? "",
            marketTiedMatchMaxBet: matchDetail?.apiTideMatch?.maxBet ?? "",
            manualTiedMatchMaxBet:
              matchDetail?.manualTiedMatch?.maxBet ??
              matchDetail?.manualTideMatch?.maxBet ??
              "",
            completeMatchMaxBet: matchDetail?.marketCompleteMatch?.maxBet ?? "",
            marketName1: matchDetail?.quickBookmaker[0].name ?? "",
            marketMaxBet1: matchDetail?.quickBookmaker[0]?.maxBet ?? "",
            marketId1: matchDetail?.quickBookmaker[0]?.id ?? "",
            marketName2: matchDetail?.quickBookmaker[1]?.name ?? "",
            marketMaxBet2: matchDetail?.quickBookmaker[1]?.maxBet ?? "",
            marketId2: matchDetail?.quickBookmaker[1]?.id ?? "",
            marketName3: matchDetail?.quickBookmaker[2]?.name ?? "",
            marketMaxBet3: matchDetail?.quickBookmaker[2]?.maxBet ?? "",
            marketId3: matchDetail?.quickBookmaker[2]?.id ?? "",
          });
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
          dispatch(matchDetailReset());
        }
      }
    } catch (e) {
      console.log(e);
    }
  }, [matchDetail, success]);

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
          <BoxButtonManualMatch
            title={manualMatchToggle === false ? "Live" : "Manual"}
            manualMatchToggle={manualMatchToggle}
            setManualMatchToggle={setManualMatchToggle}
          />
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
                  title={"Tournament Name"}
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
                />
              ) : (
                <MatchListInput
                  required={true}
                  valueStyle={{}}
                  containerStyle={{ flex: 1, width: "100%" }}
                  label={"Tournament Name"}
                  type={"text"}
                  onChange={handleChange}
                  placeholder="Enter your Tournament Name"
                  InputValType={"InputVal"}
                  place={3}
                  id="tournamentName"
                  name="tournamentName"
                />
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
                  title={"Match Name"}
                  valueContainerStyle={{
                    height: "45px",
                    marginX: "0px",
                    background: "#0B4F26",
                    border: "1px solid #DEDEDE",
                    borderRadius: "5px",
                  }}
                  // touched={touched.competitionName}

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
                />
              ) : (
                <MatchListInput
                  required={true}
                  valueStyle={{}}
                  containerStyle={{ flex: 1, width: "100%" }}
                  label={"Match Name"}
                  type={"text"}
                  onChange={(e: any) => {
                    setSelected((prev) => {
                      return {
                        ...prev,
                        matchName: e.target?.value,
                      };
                    });
                  }}
                  placeholder="Enter your Match Name"
                  InputValType={"InputVal"}
                  place={3}
                  id="matchName"
                  name="matchName"
                />
              )}
              {/* <CustomErrorMessage
                    touched={ccheck}
                    errors={errors.competitionName}
                  /> */}
              {ccheck && <p style={{ color: "red" }}>{"Required"}</p>}
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
                <DemoContainer components={["DesktopDateTimePicker"]}>
                  <DemoItem>
                    <Typography sx={{ fontSize: "12px" }}>
                      Start Time
                    </Typography>
                    <DesktopDateTimePicker
                      disabled
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
                            cursor: "not-allowed",
                            paddingBottom: "8px",
                            paddingTop: "8px",
                          },
                      }}
                      // className={classes.dateTimePicker}
                      // label="Basic date picker"
                      value={moment(selected.startAt)}
                      onChange={handleChange}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            {/* <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <LabelValueComponent
                icon={Upload}
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Image (Optional)"}
                value="No File Selected..."
                InputValType={"FileSelectVal"}
                place={6}
                DetailError={{
                  type: "String",
                }}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <LabelValueComponent
                icon={Upload}
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Team A Image (Optional)"}
                value="No File Selected..."
                InputValType={"FileSelectVal"}
                place={10}
                DetailError={{
                  type: "String",
                }}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <LabelValueComponent
                icon={Upload}
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Team B Image (Optional)"}
                value="No File Selected..."
                InputValType={"FileSelectVal"}
                place={14}
                DetailError={{
                  type: "String",
                }}
              />
            </Box> */}
            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <MatchListInput
                required={true}
                valueStyle={{}}
                containerStyle={{ flex: 1, width: "100%" }}
                label={"Min Bet"}
                type={"Number"}
                touched={touched.minBet}
                errors={errors.minBet}
                value={values.minBet}
                onChange={handleChange}
                placeholder="Enter your Min Bet..."
                InputValType={"InputVal"}
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
                valueStyle={{}}
                containerStyle={{ flex: 1, width: "100%" }}
                label={"Match Odd Max Bet"}
                type={"Number"}
                name="betfairMatchMaxBet"
                id="betfairMatchMaxBet"
                onBlur={formik.handleBlur}
                touched={touched.betfairMatchMaxBet}
                value={values.betfairMatchMaxBet}
                onChange={handleChange}
                placeholder="Enter your Match Max Bet..."
                InputValType={"InputVal"}
                place={3}
              />
              <CustomErrorMessage
                touched={touched.betfairMatchMaxBet}
                errors={errors.betfairMatchMaxBet}
              />
            </Box>

            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <MatchListInput
                required={true}
                containerStyle={{ flex: 1, width: "100%" }}
                label={"Betfair Session Max Bet"}
                type={"Number"}
                placeholder="Betfair Session Max Bet..."
                InputValType={"InputVal"}
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
            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <MatchListInput
                required={true}
                containerStyle={{ flex: 1, width: "100%" }}
                label={"Betfair Bookmaker Max Bet"}
                type={"Number"}
                touched={touched.betfairBookmakerMaxBet}
                value={values.betfairBookmakerMaxBet}
                onChange={handleChange}
                placeholder="Enter Bookmaker Max Bet..."
                InputValType={"InputVal"}
                place={15}
                id="betfairBookmakerMaxBet"
                name="betfairBookmakerMaxBet"
                onBlur={formik.handleBlur}
              />
              <CustomErrorMessage
                touched={touched.betfairBookmakerMaxBet}
                errors={errors.betfairBookmakerMaxBet}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <MatchListInput
                required={true}
                containerStyle={{ flex: 1, width: "100%" }}
                label={"Market Tied Match Max Bet"}
                type={"Number"}
                touched={touched.marketTiedMatchMaxBet}
                value={values.marketTiedMatchMaxBet}
                onChange={handleChange}
                placeholder="Enter Market Tied Match Max Bet..."
                InputValType={"InputVal"}
                place={15}
                id="marketTiedMatchMaxBet"
                name="marketTiedMatchMaxBet"
                onBlur={formik.handleBlur}
              />
              <CustomErrorMessage
                touched={touched.marketTiedMatchMaxBet}
                errors={errors.marketTiedMatchMaxBet}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <MatchListInput
                required={true}
                containerStyle={{ flex: 1, width: "100%" }}
                label={"Manual Tied Match Max Bet"}
                type={"Number"}
                touched={touched.manualTiedMatchMaxBet}
                value={values.manualTiedMatchMaxBet}
                onChange={handleChange}
                placeholder="Enter Manual Tied Match Max Bet..."
                InputValType={"InputVal"}
                place={15}
                id="manualTiedMatchMaxBet"
                name="manualTiedMatchMaxBet"
                onBlur={formik.handleBlur}
              />
              <CustomErrorMessage
                touched={touched.manualTiedMatchMaxBet}
                errors={errors.manualTiedMatchMaxBet}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <MatchListInput
                required={true}
                containerStyle={{ flex: 1, width: "100%" }}
                label={"Complete Match Max Bet"}
                type={"Number"}
                touched={touched.completeMatchMaxBet}
                value={values.completeMatchMaxBet}
                onChange={handleChange}
                placeholder="Enter Manual Tied Match Max Bet..."
                InputValType={"InputVal"}
                place={15}
                id="completeMatchMaxBet"
                name="completeMatchMaxBet"
                onBlur={formik.handleBlur}
              />
              <CustomErrorMessage
                touched={touched.completeMatchMaxBet}
                errors={errors.completeMatchMaxBet}
              />
            </Box>
            <Box sx={{ width: "100%" }}>
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
                  title={"Bookmaker"}
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
                        containerStyle={{ flex: 1, width: "100%" }}
                        label={"Market Name"}
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
                        containerStyle={{ flex: 1, width: "100%" }}
                        label={"Max Limit"}
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
                        containerStyle={{ flex: 1, width: "100%" }}
                        label={"Market Name"}
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
                        containerStyle={{ flex: 1, width: "100%" }}
                        label={"Max Limit"}
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
                        containerStyle={{ flex: 1, width: "100%" }}
                        label={"Market Name"}
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
                        containerStyle={{ flex: 1, width: "100%" }}
                        label={"Max Limit"}
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
