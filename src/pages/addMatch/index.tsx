import { Box, Button, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "../../assets";
import DropDown from "../../components/Common/DropDown";
import LabelValueComponent from "../../components/addMatch/LabelValueComponent";
import Constants from "../../components/helper/constants";

const useStyles = makeStyles((theme) => ({
  dateTimePicker: {
    "& .MuiFormControl-root": {
      height: "30px",
    },
  },
}));

const AddMatch = () => {
  const [value, setValue] = useState<Dayjs | null>(
    dayjs("2022-04-17T15:30") as Dayjs
  );
  const classes = useStyles();
  const navigate = useNavigate();
  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const inputStyle = {
    fontSize: { xs: "14px", lg: "14px", fontWeight: "600" },
    textTransform: "capitalize",
  };

  const selectionData = [1, 2, 3];

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
            title={
              window.location.pathname.includes("add_match")
                ? "Add Match"
                : "Edit Match"
            }
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
                dropDownTextStyle={inputStyle}
                place={1}
              />
              {/* {Error[1]?.val && (
                <Typography
                  color="red"
                  sx={{
                    fontSize: {
                      xs: "10px",
                      lg: "12px",
                      md: "12px",
                    },
                  }}
                >
                  Game Type Required
                </Typography>
              )} */}
            </Box>

            <Box
              sx={{
                position: "relative",
                width: { xs: "100%", lg: "18%", md: "24%" },
              }}
            >
              <DropDown
                valued="Select tournament"
                dropStyle={{
                  filter: "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                }}
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
                data={[]}
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
              />
            </Box>

            <Box
              sx={{
                position: "relative",
                width: { xs: "100%", lg: "18%", md: "24%" },
              }}
            >
              <DropDown
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
                data={[]}
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
                place={5}
              />
            </Box>
            {/* <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <MatchListInput
                label="Team A *"
                placeholder="Enter Name of Team A"
                type="text"
                // required={true}
                // disable
                // value="dsaj67sadsa"
              />
            </Box> */}

            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <LabelValueComponent
                disable={true}
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Team A *"}
                type={"text"}
                required={true}
                value="Enter Name of Team A..."
                InputValType={"InputVal"}
                place={9}
                DetailError={{
                  type: "String",
                }}
              />
              {/* {Error[9]?.val && (
                <Typography
                  color="red"
                  sx={{
                    fontSize: {
                      xs: "10px",
                      lg: "12px",
                      md: "12px",
                    },
                  }}
                >
                  Team A name Required
                </Typography>
              )} */}
            </Box>
            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <LabelValueComponent
                disable={true}
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Team B *"}
                type={"text"}
                required={true}
                value="Enter Name of Team B..."
                InputValType={"InputVal"}
                place={13}
                DetailError={{
                  type: "String",
                }}
              />
              {/* {Error[13]?.val && (
                <Typography
                  color="red"
                  sx={{
                    fontSize: {
                      xs: "10px",
                      lg: "12px",
                      md: "12px",
                    },
                  }}
                >
                  {" "}
                  Team B name Required
                </Typography>
              )} */}
            </Box>
            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              {" "}
              <LabelValueComponent
                disable={true}
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Team C"}
                type={"text"}
                value="Enter Name of Team C..."
                InputValType={"InputVal"}
                place={17}
                DetailError={{
                  type: "String",
                }}
              />
            </Box>

            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
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
                    value={value}
                    onChange={(newValue) => setValue(newValue)}
                  />
                </DemoContainer>
                `
              </LocalizationProvider>
              {/* <LabelValueComponent
                disable={true}
                icon={ArrowDownBlack}
                valueStyle={{}}
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Start Time"}
                value="Select Start Time..."
                InputValType={"DatePickerVal"}
                place={2}
                DetailError={{}}
              /> */}
              {/* {Error[2]?.val && (
                <Typography
                  color="red"
                  sx={{
                    fontSize: {
                      xs: "10px",
                      lg: "12px",
                      md: "12px",
                    },
                  }}
                >
                  Start Time Required
                </Typography>
              )} */}
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
              <LabelValueComponent
                required={true}
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Min Bet"}
                type={"Number"}
                value="Enter your Min Bet..."
                InputValType={"InputVal"}
                place={18}
                DetailError={{
                  type: "String",
                }}
              />
            </Box>

            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <LabelValueComponent
                required={true}
                valueStyle={{}}
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Betfair Match Max Bet"}
                type={"Number"}
                value="Enter your Match Max Bet..."
                InputValType={"InputVal"}
                place={3}
                DetailError={{
                  type: "Number",
                }}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <LabelValueComponent
                required={true}
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Betfair Session Max Bet"}
                type={"Number"}
                value="Betfair Session Max Bet..."
                InputValType={"InputVal"}
                place={11}
                DetailError={{
                  type: "String",
                }}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <LabelValueComponent
                required={true}
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Betfair Bookmaker Max Bet"}
                type={"Number"}
                value="Enter  Bookmaker Max Bet..."
                InputValType={"InputVal"}
                place={15}
                DetailError={{
                  type: "String",
                }}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <LabelValueComponent
                required={true}
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Manaual Session Max Bet"}
                type={"Number"}
                value="Enter Session Max Bet..."
                InputValType={"InputVal"}
                place={19}
                DetailError={{
                  type: "String",
                }}
              />
            </Box>
            <Box sx={{ width: { xs: "100%", lg: "18%", md: "24%" } }}>
              <LabelValueComponent
                required={true}
                containerStyle={{ flex: 1, width: "100%" }}
                title={"Delay Time Limit"}
                type={"Number"}
                value="Enter Delay Time..."
                InputValType={"InputVal"}
                place={21}
                DetailError={{
                  type: "String",
                }}
              />
            </Box>

            <Box sx={{ width: "100%" }}>
              <Box
                sx={{
                  width: { xs: "100%", lg: "18%", md: "24%" },
                }}
              >
                <DropDown
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
                  // setMarketId={setMarketId}
                  // matchesSelect={true}
                  dropDownStyle={{
                    width: "100%",
                    marginLeft: "0px",
                    marginTop: "0px",
                    position: "absolute",
                    maxHeight: "500px",
                    overflow: "auto",
                  }}
                  dropDownTextStyle={inputStyle}
                  place={4}
                />
                {/* {Error[4]?.val && (
                  <Typography
                    color="red"
                    sx={{
                      fontSize: {
                        xs: "10px",
                        lg: "12px",
                        md: "12px",
                      },
                    }}
                  >
                    Atleast One Bookmaker Required
                  </Typography>
                )} */}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: 1,
                }}
              >
                {true && (
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
                      <LabelValueComponent
                        required={true}
                        containerStyle={{ flex: 1, width: "100%" }}
                        title={"Market Name"}
                        type={"Text"}
                        value="Enter Market Name..."
                        InputValType={"InputVal"}
                        place={24}
                        DetailError={{
                          type: "String",
                        }}
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
                      <LabelValueComponent
                        required={true}
                        containerStyle={{ flex: 1, width: "100%" }}
                        title={"Max Limit"}
                        type={"Number"}
                        value="Enter Max Bet..."
                        InputValType={"InputVal"}
                        place={26}
                        DetailError={{
                          type: "String",
                        }}
                      />
                    </Box>
                  </Box>
                )}
                {true && (
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
                      <LabelValueComponent
                        required={true}
                        containerStyle={{ flex: 1, width: "100%" }}
                        title={"Market Name"}
                        type={"Text"}
                        value="Enter Market Name..."
                        InputValType={"InputVal"}
                        place={27}
                        DetailError={{
                          type: "String",
                        }}
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
                      <LabelValueComponent
                        required={true}
                        containerStyle={{ flex: 1, width: "100%" }}
                        title={"Max Limit"}
                        type={"Number"}
                        value="Enter Max Bet..."
                        InputValType={"InputVal"}
                        place={29}
                        DetailError={{
                          type: "String",
                        }}
                      />
                    </Box>
                  </Box>
                )}
                {true && (
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
                      <LabelValueComponent
                        required={true}
                        containerStyle={{ flex: 1, width: "100%" }}
                        title={"Market Name"}
                        type={"Text"}
                        value="Enter Market Name..."
                        InputValType={"InputVal"}
                        place={30}
                        DetailError={{
                          type: "String",
                        }}
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
                      <LabelValueComponent
                        required={true}
                        containerStyle={{ flex: 1, width: "100%" }}
                        title={"Max Limit"}
                        type={"Number"}
                        value="Enter Max Bet..."
                        InputValType={"InputVal"}
                        place={32}
                        DetailError={{
                          type: "String",
                        }}
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
              //   setDetail(stateDetail);
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
