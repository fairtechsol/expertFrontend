import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Upload } from "../../assets";
import DropDown from "../../components/Common/DropDown";
import LabelValueComponent from "../../components/addMatch/LabelValueComponent";
import MatchListInput from "../../components/addMatch/MatchListInput";
import Constants from "../../components/helper/constants";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";
import {
  addMatchExpert,
  getAllEventsList,
  getAllLiveTournaments,
  getMatchDetail,
} from "../../store/actions/addMatch/addMatchAction";
import moment from "moment";

const useStyles = makeStyles(() => ({
  dateTimePicker: {
    "& .MuiFormControl-root": {
      height: "30px",
    },
  },
}));

const initialFormikValues = {
  minBet: "",
  betfairMatchMaxBet: "",
  betfairSessionMaxBet: "",
  betfairBookmakerMaxBet: "",
  manualSessionMaxBet: "",
  marketName1: "",
  marketMaxBet1: "",
  marketName2: "",
  marketMaxBet2: "",
  marketName3: "",
  marketMaxBet3: "",
  marketName4: "",
  marketMaxBet4: "",
};

const initialValues = {
  teamA: "",
  teamB: "",
  teamC: "",
  title: "",
  tiedMatch: 0,
  manualBookmaker: 0,
  gameType: "",
  tournamentName: "",
  tournamentId: "",
  matchName: "",
  eventId: "",
  marketId: "",
  startAt: new Date(),
};

const AddMatch = () => {
  const dispatch: AppDispatch = useDispatch();

  const { state } = useLocation();

  const [selected, setSelected] = useState(initialValues);
  const classes = useStyles();
  const navigate = useNavigate();

  const inputStyle = {
    fontSize: { xs: "14px", lg: "14px", fontWeight: "600" },
    textTransform: "capitalize",
  };

  const selectionData = [1, 2, 3];

  const formik = useFormik({
    initialValues: initialFormikValues,
    onSubmit: (value: any) => {
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

      let payload = {
        matchType: selected.gameType,
        competitionId: selected.tournamentId,
        competitionName: selected.matchName,
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
        bookmakers: bookmakers,
        tiedMatch: [
          {
            maxBet: values.marketMaxBet4,
            marketName: values.marketName4,
          },
        ],
      };

      dispatch(addMatchExpert(payload));
    },
  });

  const { handleSubmit, values, touched, errors, handleChange } = formik;

  const { tournamentList, eventsList, matchDetail } = useSelector(
    (state: RootState) => state.addMatch.addMatch
  );

  useEffect(() => {
    if (selected.gameType !== "") {
      dispatch(getAllLiveTournaments(selected.gameType));
    }
    if (selected.tournamentId !== "") {
      dispatch(getAllEventsList(selected.tournamentId));
    }
  }, [selected.gameType, selected.tournamentId]);

  useEffect(() => {
    if (state?.id) {
      dispatch(getMatchDetail(state?.id));
    }
  }, [state?.id]);

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
        <Box sx={{ margin: "15px" }}>
          <LabelValueComponent
            title={state?.id ? "Edit Match" : "Add Match"}
            notShowSub={true}
            titleSize={"20px"}
            headColor={"#000000"}
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
              gap: 1,
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
                valueStyle={{ ...inputStyle, color: "white" }}
                title={"Game *"}
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
                setSelected={setSelected}
                dropDownTextStyle={inputStyle}
                place={1}
              />
            </Box>

            <Box
              sx={{
                position: "relative",
                width: { xs: "100%", lg: "18%", md: "24%" },
              }}
            >
              <DropDown
                name="tournamentName"
                valued="Select tournament"
                dropStyle={{
                  filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                }}
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
                setSelected={setSelected}
              />
            </Box>

            <Box
              sx={{
                position: "relative",
                width: { xs: "100%", lg: "18%", md: "24%" },
              }}
            >
              <DropDown
                name="matchName"
                valued="Select match"
                dropStyle={{
                  filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                }}
                valueStyle={{ ...inputStyle, color: "white" }}
                title={"Match Name"}
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
                dropDownTextStyle={inputStyle}
                setSelected={setSelected}
                place={5}
              />
            </Box>

            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <MatchListInput
                label="Team A *"
                placeholder="Enter Name of Team A"
                type="text"
                disable
                value={selected.teamA}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <MatchListInput
                label="Team B *"
                placeholder="Enter Name of Team B..."
                type="text"
                disable
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
                disable
                value={selected.teamC}
              />
            </Box>

            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" }, mt: 1 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                {" "}
                <DemoContainer
                  components={["DateTimePicker", "DateTimePicker"]}
                >
                  <Typography sx={{ fontSize: "12px" }}>Start Time</Typography>
                  <DateTimePicker
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
                    className={classes.dateTimePicker}
                    // label="Controlled picker"
                    value={moment(selected.startAt)}
                    onChange={handleChange}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Box>
            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
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
            </Box>
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
              />
            </Box>

            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <MatchListInput
                required={true}
                valueStyle={{}}
                containerStyle={{ flex: 1, width: "100%" }}
                label={"Betfair MatchOdd Max Bet"}
                type={"Number"}
                name="betfairMatchMaxBet"
                id="betfairMatchMaxBet"
                touched={touched.betfairMatchMaxBet}
                value={values.betfairMatchMaxBet}
                onChange={handleChange}
                placeholder="Enter your Match Max Bet..."
                InputValType={"InputVal"}
                place={3}
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
              />
            </Box>
            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <MatchListInput
                required={true}
                containerStyle={{ flex: 1, width: "100%" }}
                label={"Betfair Bookmaker Max Bet"}
                type={"Number"}
                // value="Enter  Bookmaker Max Bet..."
                touched={touched.betfairBookmakerMaxBet}
                value={values.betfairBookmakerMaxBet}
                onChange={handleChange}
                placeholder="Enter  Bookmaker Max Bet..."
                InputValType={"InputVal"}
                place={15}
                id="betfairBookmakerMaxBet"
                name="betfairBookmakerMaxBet"
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
            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  width: { xs: "100%", lg: "18%", md: "24%" },
                }}
              >
                <DropDown
                  name="tiedMatch"
                  valued="Select Tied Match"
                  dropStyle={{
                    filter:
                      "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                  }}
                  valueStyle={{ ...inputStyle, color: "white" }}
                  title={"Tied Match"}
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
                  data={[1]}
                  dropDownStyle={{
                    width: "100%",
                    marginLeft: "0px",
                    marginTop: "0px",
                    position: "absolute",
                    maxHeight: "500px",
                    overflow: "auto",
                  }}
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
                {selected.tiedMatch >= 1 && (
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
                        name="marketName4"
                        id="marketName4"
                        value={values.marketName4}
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
                        name="marketMaxBet4"
                        id="marketMaxBet4"
                        value={values.marketMaxBet4}
                        onChange={handleChange}
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
            <Typography sx={{ color: "white" }}>Create</Typography>
          </Button>
          <Box
            onClick={() => {
              setSelected(initialValues);
              formik.resetForm();
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
