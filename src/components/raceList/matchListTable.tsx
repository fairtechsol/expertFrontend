import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, useMediaQuery } from "@mui/material";
import ModalMUI from "@mui/material/Modal";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMatchListSessionProfitLoss } from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import theme from "../../theme";
import CustomButton from "../Common/CustomButton";
import MatchPermissionsModal from "./matchPermissionsModal";
import MatchListProfitLoss from "./profitLoss";
import SessionResultComponent from "./sessionResultComponent";
import { Constants } from "../../utils/Constants";

const MatchListTable = React.memo((props: any) => {
  const { data, index, currentPage, race } = props;
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { sessionProLoss } = useSelector((state: RootState) => state.matchList);
  const [showPopup, setShowPopup] = useState(false);
  const [showUserModal] = useState(false);
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

  const handleMatchProfitLossClick = useCallback(
    (id: any) => {
      try {
        setShowPopup(true);
        dispatch(getMatchListSessionProfitLoss(id));
      } catch (e) {
        console.log(e);
      }
    },
    [dispatch]
  );

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
        sx={{
          display: "flex",
          background: "#FFE094",
          alignItems: { xs: "stretch", md: "center" },
          borderTop: "2px solid white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100px",
            paddingLeft: "10px",
            alignItems: "center",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px" }}>
            {index + 1 + Constants.pageLimit * (currentPage - 1)}.
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
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            sx={{
              order: { xs: "2", sm: "1" },
              marginY: { xs: 1 },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#000",
                alignItems: "center",
                marginRight: { lg: "10px", xs: "6px" },
                justifyContent: "space-between",
                maxWidth: "200px",
              }}
            >
              {data}
            </Typography>
          </Box>

          <Box
            display="flex"
            sx={{
              flexDirection: { xs: "column", sm: "row", md: "row", lg: "row" },
              order: { xs: "1", sm: "2", md: "3" },
              width: { xs: "100%", sm: "auto" },
              py: { xs: 1, sm: 0 },
              display: showUserModal && !matchesMobile ? "none" : "flex",
              alignItems: "center",
            }}
          >
            {data?.stopAt && (
              <MatchListProfitLoss
                updateMatchStatusLabel="Total P/L"
                updateMatchStatus={
                  data?.pl &&
                  data?.pl?.length > 0 &&
                  data?.pl[0]?.totalProfitLoss
                }
                place="1"
                cursor="default"
              />
            )}
            {data?.stopAt && (
              <MatchListProfitLoss
                updateMatchStatusLabel="Commission"
                updateMatchStatus={
                  data?.pl && data?.pl?.length > 0 && data?.pl[0]?.commission
                }
                place="1"
                cursor="default"
              />
            )}

            <Box
              display="flex"
              sx={{
                alignItems: "center",
                justifyContent: "flex-end",
                flexWrap: "wrap",
              }}
            >
              {data &&
                race[data].map((item: any) => (
                  <CustomButton
                    key={item.id}
                    containerStyle={{
                      margin: "5px",
                    }}
                    onClick={() => {
                      navigate(`/expert/betOdds/race`, {
                        state: { id: item?.id, marketId: item?.marketId },
                      });
                    }}
                    title={moment(item.startAt).format("HH:mm")}
                    profitLoss={item?.stopAt ? item?.pl?.totalProfitLoss : ""}
                    style={{ padding: "5px" }}
                    title2Style={{
                      color:
                        item?.stopAt && item?.pl?.totalProfitLoss > 0
                          ? "#46E080"
                          : item?.stopAt && item?.pl?.totalProfitLoss < 0
                          ? "#FF4D4D"
                          : "",
                    }}
                  />
                ))}
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
        <>
          <SessionResultComponent
            setShowPopup={setShowPopup}
            sessionResults={sessionProLoss}
          />
        </>
      </ModalMUI>
    </>
  );
});

export default MatchListTable;
