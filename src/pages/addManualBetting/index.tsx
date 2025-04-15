import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { TiDelete } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import MatchListInput from "../../components/addMatch/MatchListInput";
import CustomErrorMessage from "../../components/Common/CustomErrorMessage";
import { MaterialUISwitch } from "../../components/tabList/materialUiSwitch";
import { socket, socketService } from "../../socketManager";
import { updateMarketRates } from "../../store/actions/addMatch/addMatchAction";
import { AppDispatch, RootState } from "../../store/store";
import theme from "../../theme";
import { addManualMatchBettingValidation } from "../../utils/Validations/login";

const AddManualMarket = () => {
  const { state }: any = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { addedBettingId } = useSelector(
    (states: RootState) => states.addMatch.addMatch
  );
  const matchBettingRunner = {
    matchId: state?.match?.id,
    metadata: {},
    runnerName: "",
    selectionId: "0",
    sortPriority: 0,
  };

  const formik = useFormik({
    validationSchema: addManualMatchBettingValidation(),
    initialValues: {
      name: "",
      minBet: state?.match?.betFairSessionMinBet,
      maxBet: 0,
      betLimit: 0,
      exposureLimit: 0,
      isCommissionActive: false,
      runners: [matchBettingRunner],
      teamType: 0,
    },
    onSubmit: (value: any, { setSubmitting }) => {
      let data = {
        matchId: state?.match?.id,
        type: "tournament",
        name: value.name,
        maxBet: parseFloat(value.maxBet),
        minBet: parseFloat(value.minBet),
        exposureLimit: parseFloat(value.exposureLimit),
        betLimit: value.betLimit,
        gtype: "match1",
        isCommissionActive: values.isCommissionActive,
        runners: values.runners,
        marketId: new Date().getTime()?.toString(),
        isManual: true,
        sNo: 3,
      };
      if (values.runners?.length <= 1) {
        setSubmitting(false);
        toast.error("Please add at least two team");
        return;
      }
      dispatch(updateMarketRates(data));
      setSubmitting(false);
    },
  });

  const {
    handleSubmit,
    values,
    touched,
    setValues,
    errors,
    handleChange,
    isSubmitting,
  } = formik;
  const resultDeclared = (event: any) => {
    try {
      if (event?.matchId === state?.match?.id) {
        navigate("/expert/match");
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    try {
      if (!state?.match?.id) {
        navigate("/expert/match");
      }
    } catch (error) {
      console.error(error);
    }
  }, [state?.id]);

  useEffect(() => {
    if (socket) {
      socketService.user.userMatchBetPlacedOff();
      socketService.user.matchResultDeclaredOff();
      socketService.user.matchDeleteBetOff();
      socketService.user.updateDeleteReasonOff();
      socketService.user.matchBettingMinMaxChangeOff();
      socketService.user.matchResultDeclared(resultDeclared);
      return () => {
        socketService.user.userMatchBetPlacedOff();
        socketService.user.matchResultDeclaredOff();
        socketService.user.matchDeleteBetOff();
        socketService.user.updateDeleteReasonOff();
        socketService.user.matchBettingMinMaxChangeOff();
      };
    }
  }, [socket, state?.id]);

  useEffect(() => {
    if (addedBettingId) {
      navigate("/expert/add_book_maker", {
        state: {
          betId: addedBettingId,
          matchId: state.match.id,
        },
      });
    }
  }, [addedBettingId]);

  return (
    <Box display="flex">
      <Paper style={{ margin: "10px" }}>
        <Box
          sx={{
            background: "white",
            // borderRadius: "5px",
            borderRadius: "5px",
            margin: "10px",
          }}
        >
          {!matchesMobile && (
            <Typography
              sx={{
                color: "black",
                fontSize: { lg: "25px", xs: "1rem", md: "20px" },
                fontWeight: "600",
                zIndex: 2,
                position: "relative",
              }}
            >
              {state?.match?.title}
            </Typography>
          )}
          {matchesMobile && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                zIndex: 2,
                position: "relative",
                justifyContent: "center",
                width: "100%",
                alignSelf: "center",
              }}
            >
              <Typography
                sx={{
                  width: "100%",
                  color: "black",
                  fontSize: { lg: "20px", xs: "14px", md: "18px" },
                  fontWeight: "600",
                  zIndex: 2,
                  position: "relative",
                }}
              >
                {state?.match?.title}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  zIndex: 2,
                  position: "relative",
                  justifyContent: "flex-end",
                  width: "50%",
                  marginTop: "2%",
                  alignSelf: "center",
                }}
              >
                <Box sx={{ width: "2%" }} />
              </Box>
            </Box>
          )}

          <Box
            sx={{
              display: "flex",
              marginBottom: "10px",
              flexDirection: "column",
              background: "#F8C851",
              marginTop: "20px",
              borderRadius: "5px",

              p: "10px",
              py: "20px",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item lg={12} sm={12}>
                  <MatchListInput
                    required={true}
                    label="Market name*"
                    type="text"
                    touched={touched.name}
                    errors={errors.name}
                    value={values.name}
                    onChange={handleChange}
                    placeholder="Market name"
                    id="name"
                    name="name"
                    onBlur={formik.handleBlur}
                  />
                  <CustomErrorMessage
                    touched={touched.name}
                    errors={errors.name}
                  />
                </Grid>
                <Grid item lg={6} sm={6}>
                  <MatchListInput
                    required={true}
                    label="Min. amount*"
                    type="number"
                    touched={touched.minBet}
                    errors={errors.minBet}
                    value={values.minBet}
                    onChange={handleChange}
                    placeholder="Min. bet"
                    id="minBet"
                    name="minBet"
                    onBlur={formik.handleBlur}
                  />
                  <CustomErrorMessage
                    touched={touched.minBet}
                    errors={errors.minBet}
                  />
                </Grid>
                <Grid item lg={6} sm={6}>
                  <MatchListInput
                    required={true}
                    label="Max. amount*"
                    type="number"
                    touched={touched.maxBet}
                    errors={errors.maxBet}
                    value={values.maxBet}
                    onChange={handleChange}
                    placeholder="Max. bet"
                    id="maxBet"
                    name="maxBet"
                    onBlur={formik.handleBlur}
                  />
                  <CustomErrorMessage
                    touched={touched.maxBet}
                    errors={errors.maxBet}
                  />
                </Grid>
                <Grid item lg={6} sm={6}>
                  <MatchListInput
                    required={true}
                    label="Bet Limit*"
                    type="number"
                    touched={touched.betLimit}
                    errors={errors.betLimit}
                    value={values.betLimit}
                    onChange={handleChange}
                    placeholder="Bet Limit"
                    id="betLimit"
                    name="betLimit"
                    onBlur={formik.handleBlur}
                  />
                  <CustomErrorMessage
                    touched={touched.betLimit}
                    errors={errors.betLimit}
                  />
                </Grid>
                <Grid item lg={6} sm={6}>
                  <MatchListInput
                    required={true}
                    label="Exposure Limit*"
                    type="number"
                    touched={touched.exposureLimit}
                    errors={errors.exposureLimit}
                    value={values.exposureLimit}
                    onChange={handleChange}
                    placeholder="Exposure Limit"
                    id="exposureLimit"
                    name="exposureLimit"
                    onBlur={formik.handleBlur}
                  />
                  <CustomErrorMessage
                    touched={touched.exposureLimit}
                    errors={errors.exposureLimit}
                  />
                </Grid>
                <Grid item lg={6} sm={6}>
                  <Box
                    sx={{
                      width: {
                        xs: "100%",
                        lg: "50%",
                        md: "50%",
                      },
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: "6px",
                        background: "#004a25",
                        color: "#fff",
                        borderRadius: "8px",
                        padding: "1px 5px",
                      }}
                    >
                      <Typography
                        sx={{
                          color: "#fff",
                          fontSize: { lg: "11px", md: "10px", xs: "9px" },
                        }}
                      >
                        Set Commission
                      </Typography>
                      <MaterialUISwitch
                        id="commission-switch"
                        name="isCommissionActive"
                        checked={values.isCommissionActive}
                        onChange={handleChange}
                      />
                    </div>
                  </Box>
                </Grid>
                <Grid item lg={12} sm={12}>
                  <FormControl>
                    <FormLabel id="teamType">Select team type</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="teamType"
                      name="teamType"
                      value={values.teamType}
                      onChange={(e) => {
                        if (e.target.value == "1") {
                          setValues({
                            ...values,
                            runners: ["teamA", "teamB", "teamC"]
                              .map((item: any, index: any) => ({
                                ...matchBettingRunner,
                                runnerName: state?.match?.[item],
                                selectionId: index?.toString(),
                                sortPriority: index,
                              }))
                              .filter((item: any) => !!item.runnerName),
                            teamType: e.target.value,
                          });
                        } else {
                          setValues({
                            ...values,
                            runners: ["YES", "NO"].map(
                              (item: any, index: any) => ({
                                ...matchBettingRunner,
                                runnerName: item,
                                selectionId: index?.toString(),
                                sortPriority: index,
                              })
                            ),
                            teamType: e.target.value,
                          });
                        }
                      }}
                    >
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label="Team name"
                      />
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label="Yes/No"
                      />
                    </RadioGroup>
                  </FormControl>
                </Grid>
                <Grid item lg={12} sm={12}>
                  <Box
                    sx={{ border: "2px solid #FFFFFF", position: "relative" }}
                  >
                    <Box sx={{ display: "flex" }}>
                      <Box
                        sx={{
                          background: "#319E5B",
                          width: "100%",
                          px: "5px",
                          color: "white",
                        }}
                      >
                        Team Names
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Box sx={{ background: "#FFFFFF", width: "100%" }}>
                        {values.runners?.map((item: any, index: any) => {
                          return (
                            <Box
                              sx={{
                                borderWidth: 0,
                                justifyContent: "space-between",
                                alignItems: "center",
                                display: "flex",
                                width: "100%",
                              }}
                            >
                              <TextField
                                name={`runners[${index}].runnerName`}
                                id={`teamName${index}`}
                                value={item.runnerName}
                                onChange={handleChange}
                                placeholder={`Team ${String.fromCharCode(
                                  (index % 26) + 65
                                )}`}
                                size="small"
                                fullWidth
                                variant="standard"
                                sx={{ outline: "none" }}
                              />
                              <IconButton>
                                <TiDelete
                                  onClick={() => {
                                    setValues({
                                      ...values,
                                      runners: values?.runners?.filter(
                                        (_: any, indexes: any) =>
                                          indexes != index
                                      ),
                                    });
                                  }}
                                />
                              </IconButton>
                            </Box>
                          );
                        })}
                        <Button
                          size="small"
                          variant="contained"
                          sx={{ my: 1 }}
                          onClick={() => {
                            setValues({
                              ...values,
                              runners: [
                                ...values.runners,
                                {
                                  ...matchBettingRunner,
                                  selectionId:
                                    values.runners?.length?.toString(),
                                  sortPriority: values.runners?.length,
                                },
                              ],
                            });
                          }}
                        >
                          Add team
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
                <Grid item lg={12}>
                  <Button
                    disabled={isSubmitting}
                    size="small"
                    variant="contained"
                    sx={{ float: "right" }}
                    type="submit"
                  >
                    Save
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default AddManualMarket;
