import { Box, Typography } from "@mui/material";
import { useState } from "react";
import BoxButtonWithSwitch from "../Common/BoxButtonWithSwitch";
import CustomButton from "../Common/CustomButton";
import MatchListProfitLoss from "./profitLoss";
import { useNavigate } from "react-router-dom";
import ModalMUI from "@mui/material/Modal";
import StyledImage from "../Common/StyledImages";

const MatchListTable = (props: any) => {
  const { data } = props;
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const [updateMatchStatus, setUpdateMatchStatus] = useState({
    1: { field: "apiMatchActive", val: data?.apiMatchActive || false },
    2: {
      field: "apiBookMakerActive",
      val: data?.apiBookMakerActive || false,
    },
    3: {
      field: "apiSessionActive",
      val: data?.apiSessionActive || false,
    },
    5: {
      field: "manualSessionActive",
      val: data?.manualSessionActive || false,
    },
    4: {
      field: "manualBookMakerActive",
      val: data?.manualBookMakerActive || false,
    },
  });

  const sessionResults: any = [];

  const handleMatchProfitLossClick = () => {
    try {
      setShowPopup(true);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <Box
        sx={[
          {
            display: "flex",
            height: "45px",
            background: "#FFE094",
            alignItems: "center",
            borderBottom: "2px solid white",
          },
        ]}
      >
        <Box
          sx={{
            display: "flex",
            width: "100px",
            paddingLeft: "10px",
            alignItems: "center",
            height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px" }}>1</Typography>
          <Typography
            sx={{ fontSize: "9px", padding: "4px", fontWeight: "700" }}
          >
            14-oct-2022
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            height: "45px",
          }}
        >
          <Box sx={{ display: "flex", flex: 1, alignItems: "center" }}>
            <BoxButtonWithSwitch
              title="Karachi Region Whites v Abbottabad Region"
              containerStyle={{ width: "15%" }}
              updateMatchStatus={updateMatchStatus}
              setUpdateMatchStatus={setUpdateMatchStatus}
              place={12}
            />
            <BoxButtonWithSwitch
              title="Bookmaker"
              containerStyle={{ width: "15%" }}
              updateMatchStatus={updateMatchStatus}
              setUpdateMatchStatus={setUpdateMatchStatus}
              place={13}
            />
            <BoxButtonWithSwitch
              title="Session"
              containerStyle={{ width: "15%" }}
              updateMatchStatus={updateMatchStatus}
              setUpdateMatchStatus={setUpdateMatchStatus}
              place={14}
            />
            <BoxButtonWithSwitch
              title="BK1"
              containerStyle={{ width: "15%" }}
              updateMatchStatus={updateMatchStatus}
              setUpdateMatchStatus={setUpdateMatchStatus}
              place={15}
            />
            <BoxButtonWithSwitch
              title="Manual Session"
              containerStyle={{ width: "15%" }}
              updateMatchStatus={updateMatchStatus}
              setUpdateMatchStatus={setUpdateMatchStatus}
              place={16}
            />
            <MatchListProfitLoss
              onClick={handleMatchProfitLossClick}
              updateMatchStatusLabel="Match Profit/Loss"
              updateMatchStatus="22"
              place="1"
            />
          </Box>
          <CustomButton
            onClick={() => {
              navigate(`/expert/betOdds`);
            }}
            title={"Submit"}
          />
          <CustomButton
            onClick={() => {
              navigate(`/expert/edit_match`);
            }}
            title={"Edit"}
          />
        </Box>
      </Box>
      <ModalMUI
        open={showPopup}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              alignSelf: "center",
              width: { xs: "90%", lg: "50%" },
            }}
          >
            <Box
              display={"flex"}
              sx={{
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                px: "10px",
                py: "6px",
                backgroundColor: "#F8C851",
              }}
            >
              <Box
                display={"flex"}
                alignItems="center"
                sx={{ alignItems: "center" }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: "14px",
                      lg: "18px",
                      md: "18px",
                    },
                    color: "#000",
                    marginRight: {
                      xs: "10px",
                      lg: "20px",
                      md: "20px",
                    },
                  }}
                >
                  Session Results
                </Typography>
              </Box>
              <Typography
                sx={{
                  color: "#000",
                  fontSize: "30px",
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPopup((prev) => !prev);
                }}
              >
                &times;
              </Typography>
            </Box>
            <Box
              sx={{
                border: "2px solid #FFFFFF",
                overflowY: "auto",
                maxHeight: "30rem",
              }}
            >
              <Box sx={{ display: "flex" }}>
                <Box sx={{ background: "#319E5B", width: "60%", px: "5px" }}>
                  <Typography
                    sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}
                  >
                    Overs
                  </Typography>
                </Box>
                <Box
                  sx={{
                    background: "#303030",
                    width: "20%",
                    borderLeft: "2px solid white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}
                  >
                    RESULT
                  </Typography>
                </Box>
                <Box
                  sx={{
                    background: "#303030",
                    width: "20%",
                    borderLeft: "2px solid white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}
                  >
                    COMMISSION
                  </Typography>
                </Box>
                <Box
                  sx={{
                    background: "#303030",
                    width: "20%",
                    borderLeft: "2px solid white",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ color: "white", fontWeight: "600", fontSize: "12px" }}
                  >
                    PROFIT/LOSS
                  </Typography>
                </Box>
              </Box>
              {sessionResults?.length > 0 &&
                sessionResults?.map((item: any) => {
                  let profit_loss = parseInt(item.profit_loss);
                  return (
                    <Box
                      key={item?.bet_id?.id}
                      display={"flex"}
                      sx={{
                        borderTop: "2px solid white",
                        background: "#FFFFFF",
                      }}
                    >
                      <Box
                        sx={{
                          background: "#FFFFFF",
                          width: "60%",
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: "600",
                            fontSize: "14px",
                            px: "5px",
                          }}
                        >
                          {item?.bet_id?.bet_condition}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          background: "#ECECEC",
                          width: "20%",
                          display: "flex",
                          height: "30px",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "14px" }}
                        >
                          {item?.score}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          background: "#ECECEC",
                          width: "20%",
                          display: "flex",
                          height: "30px",
                          borderLeft: "2px solid white",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{ fontWeight: "600", fontSize: "14px" }}
                        >
                          {item?.commission ?? "NaN"}
                        </Typography>
                      </Box>
                      {profit_loss > 0 ? (
                        <Box
                          sx={{
                            background: "#10DC61",
                            width: "20%",
                            borderLeft: "2px solid white",
                            display: "flex",
                            height: "30px",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "600",
                              fontSize: "14px",
                              color: "white",
                            }}
                          >
                            {profit_loss}
                            <StyledImage
                              src="https://fontawesomeicons.com/images/svg/trending-up-sharp.svg"
                              sx={{
                                height: "15px",
                                marginLeft: "5px",
                                filter:
                                  "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                                width: "15px",
                              }}
                            />
                          </Typography>
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            background: "#FF4D4D",
                            width: "20%",
                            borderLeft: "2px solid white",
                            display: "flex",
                            height: "30px",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              fontWeight: "600",
                              fontSize: "14px",
                              color: "white",
                            }}
                          >
                            {profit_loss}
                            <StyledImage
                              src="https://fontawesomeicons.com/images/svg/trending-down-sharp.svg"
                              sx={{
                                height: "15px",
                                marginLeft: "5px",
                                filter:
                                  "invert(.9) sepia(1) saturate(5) hue-rotate(175deg);",
                                width: "15px",
                              }}
                            />
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  );
                })}
            </Box>
          </Box>
        </Box>
      </ModalMUI>
    </>
  );
};

export default MatchListTable;
