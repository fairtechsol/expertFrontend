import { Box, Typography, useMediaQuery } from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DownGIcon } from "../../assets";
import { getMatchListSessionProfitLoss } from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import theme from "../../theme";
import CustomButton from "../Common/CustomButton";
import StyledImage from "../Common/StyledImages";
import MatchPermissionsModal from "./matchPermissionsModal";
import MatchListProfitLoss from "./profitLoss";
import SessionResultComponent from "./sessionResultComponent";
import { IconConstants } from "../helper/gameConstants";

const MatchListTable = (props: any) => {
  const { data, index } = props;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { getProfile } = useSelector((state: RootState) => state.user.profile);
  const { sessionProLoss } = useSelector((state: RootState) => state.matchList);
  const [showPopup, setShowPopup] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));
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

  const handleMatchProfitLossClick = (id: any) => {
    try {
      setShowPopup(true);
      dispatch(getMatchListSessionProfitLoss(id));
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
            borderTop: "2px solid white",
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
              marginY: {xs: 1}
            }}
          >
            <StyledImage
              src={IconConstants[data?.matchType]}
              sx={{ height: "20px", width: "20px", margin: "1rem" }}
            />
            <Typography
              variant="h5"
              // color="primary.main"
              sx={[
                {
                  color: "000",
                  alignItems: "center",
                  marginRight: { lg: "10px", xs: "6px" },
                  justifyContent: "space-between",
                  maxWidth: "200px",
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
              flexDirection: { xs: "column", sm: "column", md: "row" },
              order: { xs: "1", sm: "2", md: "3" },
              width: { xs: "100%", sm: "auto" },
              py: { xs: 1, sm: 0 },
              // px: "10px",
              overflow: "hidden",
              display: showUserModal && !matchesMobile ? "none" : "flex",
              // marginBottom: showUserModal ? { xs: "0%", sm: "-1%", lg: "-20%" } : "0%",
            }}
          >
            {/* <Box sx={{
            width: { xs: "90%", sm: "auto", lg: "100%" },
               display: "flex",
               flexDirection: "row"
            }}> */}
            {data?.stopAt && (
              <MatchListProfitLoss
                // onClick={() => handleMatchProfitLossClick(data?.id)}
                updateMatchStatusLabel="Total P/L"
                updateMatchStatus={
                  data?.pl &&
                  data?.pl?.length > 0 &&
                  data?.pl[0]?.totalProfitLoss
                }
                place="1"
              />
            )}
            {data?.stopAt && (
              <MatchListProfitLoss
                // onClick={() => handleMatchProfitLossClick(data?.id)}
                updateMatchStatusLabel="Commission"
                updateMatchStatus={
                  data?.pl &&
                  data?.pl?.length > 0 &&
                  data?.pl[0]?.commission
                }
                place="1"
              />
            )}
            {data?.stopAt && (
              <MatchListProfitLoss
                onClick={() => handleMatchProfitLossClick(data?.id)}
                updateMatchStatusLabel="Session P/L"
                updateMatchStatus={
                  data?.pl &&
                  data?.pl?.length > 0 &&
                  data?.pl[0]?.sessionTotalProfitLoss
                }
                place="1"
              />
            )}
             
            <Box
              display={"flex"}
              sx={{
                marginY: { xs: 1, sm: 0, lg: 0 },
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              {(getProfile?.allPrivilege ||
                getProfile?.betFairMatchPrivilege) && (
                <CustomButton
                  containerStyle={{
                    minWidth: { xs: "40%", sm: "100px" },
                    width: { xs: "40%", sm: "100px" },
                    marginLeft: { xs: "1%", sm: "10px" },
                  }}
                  onClick={() => {
                    if (data?.matchType === "cricket") {
                      navigate(`/expert/betOdds`, {
                        state: { id: data?.id, marketId: data?.marketId },
                      });
                    } else {
                      navigate(`/expert/betOdds/otherGames`, {
                        state: { id: data?.id, marketId: data?.marketId },
                      });
                    }
                  }}
                  title={"Submit"}
                />
              )}
              {(getProfile?.allPrivilege || getProfile?.addMatchPrivilege) && (
                <CustomButton
                  containerStyle={{
                    minWidth: { xs: "40%", sm: "100px" },
                    width: { xs: "40%", sm: "100px" },
                    marginLeft: { xs: "1%", sm: "10px" },
                  }}
                  onClick={() => {
                    navigate(`/expert/edit_match`, {
                      state: { id: data?.id },
                    });
                  }}
                  title={"Edit"}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      {showUserModal && (
        <MatchPermissionsModal
          showUserModal={showUserModal}
          handleMatchProfitLossClick={handleMatchProfitLossClick}
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
        <SessionResultComponent
          setShowPopup={setShowPopup}
          sessionResults={sessionProLoss}
        />
      </ModalMUI>
    </>
  );
};

export default MatchListTable;
