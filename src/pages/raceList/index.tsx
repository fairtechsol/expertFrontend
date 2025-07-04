import { Box, Tab, Tabs } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CustomButton from "../../components/Common/CustomButton";
import MatchListHeader from "../../components/raceList/matchListHeader";
import MatchListTable from "../../components/raceList/matchListTable";
import MatchListTableHeader from "../../components/raceList/matchListTableHeader";
import {
  expertSocketService,
  socket,
  socketService,
} from "../../socketManager";
import { matchListReset } from "../../store/actions/match/matchAction";
import {
  getDateList,
  resetDateList,
} from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";
import "./style.css";

const RaceList = () => {
  const dispatch: AppDispatch = useDispatch();
  const [currentPage] = useState(1);
  const { raceType } = useParams();
  const [value, setValue] = useState(raceType);
  const navigate = useNavigate();
  const { profileDetail } = useSelector(
    (state: RootState) => state.user.profile
  );

  const { success, raceList } = useSelector(
    (state: RootState) => ({
      success: state.matchList.success,
      raceList: state.matchList.raceList,
    }),
    shallowEqual
  );

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    // setValue(newValue);
    navigate(`/expert/race/${newValue}`);
  };

  const getMatchListService = (event: any) => {
    if (event?.gameType === raceType || event?.type === raceType) {
      setTimeout(() => {
        dispatch(getDateList({ matchType: value }));
      }, 500);
    }
  };

  useEffect(() => {
    if (success) {
      dispatch(matchListReset());
    }
  }, [success]);

  useEffect(() => {
    try {
      if (socket) {
        expertSocketService.match.matchAdded(getMatchListService);
        socketService.user.matchResultUnDeclared(getMatchListService);
        socketService.user.matchResultDeclared(getMatchListService);
        socketService.user.matchResultUnDeclareAllUser(getMatchListService);
        return () => {
          expertSocketService.match.matchAddedOff();
          socketService.user.matchResultUnDeclaredOff();
          socketService.user.matchResultUnDeclareAllUserOff();
          dispatch(resetDateList());
        };
      }
    } catch (error) {
      console.log(error);
    }
  }, [socket, raceType]);

  useEffect(() => {
    if (raceType) {
      setValue(raceType);
      dispatch(getDateList({ matchType: raceType }));
    }
  }, [raceType]);

  return (
    <>
      <Box
        display="flex"
        flexDirection="row"
        sx={{
          justifyContent: "space-between",
          px: "10px",
          py: "10px",
          gap: "20px",
        }}
      >
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab
            sx={{ color: "white" }}
            value="horseRacing"
            label="Horse Racing"
          />
          <Tab
            sx={{ color: "white" }}
            value="greyHound"
            label="Greyhound Racing"
          />
        </Tabs>
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            flexDirection: { lg: "row-reverse", xs: "row" },
            alignItems: "center",
          }}
        >
          {(profileDetail?.allPrivilege ||
            profileDetail?.addMatchPrivilege) && (
            <CustomButton
              onClick={() => {
                navigate("/expert/add_race");
              }}
              title="Add Race"
              bgColor="#F8C851"
              style={{ color: "#000" }}
            />
          )}
        </Box>
      </Box>
      <Box
        sx={[
          {
            marginX: "10px",
            marginTop: "10px",
            minHeight: "200px",
            borderRadius: "10px",
            border: "2px solid white",
          },
          (theme: any) => ({
            backgroundImage: `${theme.palette.primary.headerGradient}`,
          }),
        ]}
      >
        <MatchListHeader value={value} />
        <MatchListTableHeader />
        {raceList &&
          Object?.keys(raceList)?.map((item: any, index: number) => (
            <MatchListTable
              key={index}
              data={item}
              index={index}
              currentPage={currentPage}
              race={raceList}
            />
          ))}
      </Box>
    </>
  );
};

export default memo(RaceList);
