import { Box, Typography } from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DownGIcon } from "../../assets";
import CustomButton from "../Common/CustomButton";
import StyledImage from "../Common/StyledImages";
import MatchListProfitLoss from "./profitLoss";
import MatchPermissionsModal from "./matchPermissionsModal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const MatchListTable = (props: any) => {
  const { data, index } = props;
  const navigate = useNavigate();
  const { getProfile } = useSelector((state: RootState) => state.user.profile);
  const [showPopup, setShowPopup] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  const [updateBettings, setUpdateBettings] = useState<any>([]);

  const [updateMatchStatus, setUpdateMatchStatus] = useState({
    1: {
      field: "apiSessionActive",
      val: data?.apiSessionActive,
    },
    2: {
      field: "manualSessionActive",
      val: data?.manualSessionActive,
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

  useEffect(() => {
    if (data) {
      const newBody = data?.matchBettings?.map((betting: any) => ({
        id: betting?.id,
        name: betting?.name,
        isActive: betting?.isActive,
      }));
      setUpdateBettings(newBody);
      setUpdateMatchStatus((prevStatus) => ({
        ...prevStatus,
        1: { ...prevStatus[1], val: data?.apiSessionActive },
        2: { ...prevStatus[2], val: data?.manualSessionActive },
      }));
    }
  }, [data]);

  return (
    <>
      <Box
        sx={[
          {
            display: "flex",
            height: { xs: "auto", md: "45px" },
            background: "#FFE094",
            alignItems: { xs: "stretch", md: "center" },
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
            // height: "45px",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px" }}>({index + 1})</Typography>
          <Typography
            sx={{ fontSize: "9px", padding: "4px", fontWeight: "700" }}
          >
            {moment(data?.startAt).format("DD-MM-YYYY")} <br />
            {moment(data?.startAt).format("LT")}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            paddingX: "10px",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row", lg: "row" },
            // height: "45px",
          }}
        >
          {/* Switch button row =====*/}
          <Box
            display="flex"
            alignItems="center"
            sx={{
              order: { xs: "2", sm: "1" },
            }}
          >
            <Typography
              variant="h5"
              // color="primary.main"
              sx={[
                {
                  color: "000",
                  alignItems: "center",
                  marginRight: { lg: "10px", xs: "6px" },
                  justifyContent: "space-between",
                },
              ]}
            >
              {data?.title}
            </Typography>
            <StyledImage
              onClick={() => {
                setShowUserModal((prev) => !prev);
              }}
              src={showUserModal ? DownGIcon : DownGIcon}
              style={{
                transform: showUserModal ? "rotate(180deg)" : "rotate(0deg)",
                transition: "0.5s",
                cursor: "pointer",
                width: "16px",
                height: "12px",
                color: "#004A25",
              }}
            />
          </Box>

          <Box
            display={"flex"}
            sx={{
              flexDirection: { xs: "column", sm: "row" },
              order: { xs: "1", sm: "2" },
              width: { xs: "100%", sm: "auto" },
              py: { xs: 1, sm: 0 },
            }}
          >
            <MatchListProfitLoss
              onClick={handleMatchProfitLossClick}
              updateMatchStatusLabel="Match Profit/Loss"
              updateMatchStatus="22"
              place="1"
            />
            <Box display={"flex"} sx={{ marginY: { xs: 1, sm: 0 } }}>
              {getProfile?.allPrivilege ? (
                <CustomButton
                  containerStyle={{
                    minWidth: { xs: "49%", sm: "100px" },
                    width: { xs: "49%", sm: "100px" },
                    marginLeft: { xs: "1%", sm: "10px" },
                  }}
                  onClick={() => {
                    navigate(`/expert/betOdds`, {
                      state: { id: data?.id },
                    });
                  }}
                  title={"Submit"}
                />
              ) : getProfile?.betFairMatchPrivilege ? (
                <CustomButton
                  containerStyle={{
                    minWidth: { xs: "49%", sm: "100px" },
                    width: { xs: "49%", sm: "100px" },
                    marginLeft: { xs: "1%", sm: "10px" },
                  }}
                  onClick={() => {
                    navigate(`/expert/betOdds`, {
                      state: { id: data?.id },
                    });
                  }}
                  title={"Submit"}
                />
              ) : null}
              {getProfile?.allPrivilege ? (
                <CustomButton
                  containerStyle={{
                    minWidth: { xs: "49%", sm: "100px" },
                    width: { xs: "49%", sm: "100px" },
                    marginLeft: { xs: "1%", sm: "10px" },
                  }}
                  onClick={() => {
                    navigate(`/expert/edit_match`, {
                      state: { id: data?.id },
                    });
                  }}
                  title={"Edit"}
                />
              ) : getProfile?.addMatchPrivilege ? (
                <CustomButton
                  containerStyle={{
                    minWidth: { xs: "49%", sm: "100px" },
                    width: { xs: "49%", sm: "100px" },
                    marginLeft: { xs: "1%", sm: "10px" },
                  }}
                  onClick={() => {
                    navigate(`/expert/edit_match`, {
                      state: { id: data?.id },
                    });
                  }}
                  title={"Edit"}
                />
              ) : null}
            </Box>
          </Box>
        </Box>
      </Box>
      {showUserModal && (
        <MatchPermissionsModal
          data={data}
          updateBettings={updateBettings}
          setUpdateBettings={setUpdateBettings}
          updateMatchStatus={updateMatchStatus}
          setUpdateMatchStatus={setUpdateMatchStatus}
        />
      )}
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
