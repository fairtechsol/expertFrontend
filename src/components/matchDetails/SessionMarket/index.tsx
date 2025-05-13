import { useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import ModalMUI from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { VariableSizeList } from "react-window";
import { ARROWUP, edit } from "../../../assets";
import { customSortUpdated } from "../../../helpers";
import { sessionBetLiveStatus } from "../../../store/actions/match/matchAction";
import { AppDispatch } from "../../../store/store";
import Divider from "../../Common/Divider";
import SessionMarketBox from "./SessionMarketBox";
import SessionMarketMaxBetAmountEdit from "./SessionMarketMaxBetAmountEdit";
import Stop from "./Stop";

type ItemData = {
  items: any[];
  hideResult: boolean;
  hideTotalBet: boolean;
  profitLossData: any;
  hideEditMaxButton: boolean;
  section: string;
};

interface SessionMarketProps {
  currentMatch: any;
  hideResult: boolean;
  stopAllHide: boolean;
  title: string;
  hideTotalBet: boolean;
  sessionData: any;
  profitLossData: any;
  hideEditMaxButton: boolean;
  cstmStyle?: any;
  section: string;
  name?: string;
}

const Row = memo(
  ({
    index,
    style,
    data,
  }: {
    index: number;
    style: React.CSSProperties;
    data: any;
  }) => {
    const match = data.items[index];

    if (!match?.id) return null;

    return (
      <Box style={style}>
        <SessionMarketBox
          hideResult={data.hideResult}
          hideTotalBet={data.hideTotalBet}
          newData={match}
          profitLossData={data.profitLossData}
          index={index}
          hideEditMaxButton={data.hideEditMaxButton}
          section={data.section}
        />
        <Divider />
      </Box>
    );
  }
);

const SessionMarket = ({
  currentMatch,
  hideResult,
  stopAllHide,
  title,
  hideTotalBet,
  sessionData,
  profitLossData,
  hideEditMaxButton,
  cstmStyle,
  section,
  name,
}: SessionMarketProps) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch: AppDispatch = useDispatch();
  const [visible, setVisible] = useState(true);
  const [sessionMaxBetAmountLimit, setSessionMaxBetAmountLimit] =
    useState(false);
  const listRef = useRef<VariableSizeList>(null);

  const handleFilter = (item: any) =>
    section === "market"
      ? !item?.isComplete &&
      item?.activeStatus !== "unSave" &&
      ((item?.resultData && item?.resultData === null) ||
        item?.result === null)
      : section === "completed"
        ? item?.isComplete &&
        item?.activeStatus !== "unSave" &&
        ((item?.resultData && item?.resultData === null) ||
          item?.result === null)
        : (item?.resultData && item?.resultData !== null) ||
        item?.result !== null;

  const filteredMatches = useMemo(() => {
    if (!sessionData?.section) return [];

    return sessionData.section
      .filter((match: any) => match?.id)
      .filter(handleFilter)
      .slice()
      .sort(customSortUpdated);
  }, [sessionData]);

  const toggleVisibility = useCallback(() => {
    setVisible((prev) => !prev);
  }, []);

  const handleStopClick = useCallback(() => {
    dispatch(
      sessionBetLiveStatus({
        status: "save",
        matchId: currentMatch?.id,
        stopAllSessions: true,
        type: sessionData?.mname,
      })
    );
  }, []);

  const handleEditClick = useCallback(() => {
    setSessionMaxBetAmountLimit(true);
  }, []);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.resetAfterIndex(0, true);
    }
  }, [filteredMatches]);

  const getItemSize = (index: number): number => {
    const row = filteredMatches[index];
    let rowHeight = Math.max(
      row?.ex?.availableToLay?.length ?? 0,
      row?.ex?.availableToBack?.length ?? 0
    );
    if (rowHeight <= 1) return 30;
    if (rowHeight === 2) return 60;
    return 90;
  };

  const totalHeight: number = filteredMatches.reduce(
    (sum: number, _: any, index: number): number => sum + getItemSize(index),
    0
  );

  return (
    <>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "white",
          flexDirection: "column",
          marginY: "4px",
          width: "100%",
          alignSelf: {
            xs: "center",
            md: "center",
            lg: "flex-start",
          },
          boxShadow: "0px 5px 10px #0000001A",
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "20px",
            flexDirection: "row",
            width: "99.7%",
            alignSelf: "center",
          }}
        >
          <Box
            sx={{
              flex: 1,
              background: "#f1c550",
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Typography
              sx={{
                fontSize: "10px",
                fontWeight: "bold",
                marginLeft: "7px",
                textTransform: "capitalize",
              }}
            >
              {title}
            </Typography>
            {!hideEditMaxButton && (
              <img
                onClick={handleEditClick}
                src={edit}
                alt="edit"
                style={{
                  width: "14px",
                  height: "12px",
                  marginLeft: "4px",
                  zIndex: "999",
                  cursor: "pointer",
                  objectFit: "contain",
                }}
              />
            )}
            {!stopAllHide && <Stop onClick={handleStopClick} height="18px" />}
          </Box>
          <Box
            sx={{
              flex: 0.1,
              background: "#262626",
            }}
          >
            <div className="slanted" />
          </Box>
          <Box
            sx={{
              flex: 1,
              background: "#262626",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <img
              onClick={toggleVisibility}
              src={ARROWUP}
              alt="Up Arrow"
              style={{
                transform: !visible ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
                width: "12px",
                height: "12px",
                marginRight: "5px",
                marginLeft: "5px",
                cursor: "pointer",
              }}
            />
          </Box>
        </Box>
        {visible && (
          <Box
            sx={{
              width: "100%",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              sx={[
                {
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  position: "relative",
                  overflowY: "auto",
                  "::-webkit-scrollbar": {
                    display: "none",
                  },
                },
                cstmStyle,
              ]}
            >
              {(() => {
                if (!filteredMatches.length) return null;

                const dynamicHeight = matchesMobile
                  ? Math.min(totalHeight, window.innerHeight * 0.4) + 1
                  : totalHeight + 1;

                return (
                  <VariableSizeList<ItemData>
                    ref={listRef}
                    height={dynamicHeight}
                    width="100%"
                    itemCount={filteredMatches.length}
                    itemSize={getItemSize}
                    itemData={{
                      items: filteredMatches,
                      hideResult,
                      hideTotalBet,
                      profitLossData,
                      hideEditMaxButton,
                      section,
                    }}
                  >
                    {Row}
                  </VariableSizeList>
                );
              })()}
            </Box>
          </Box>
        )}
      </Box>
      <ModalMUI
        open={sessionMaxBetAmountLimit}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SessionMarketMaxBetAmountEdit
          newData={{
            matchId: currentMatch?.id,
            name: title,
            type: name,
            minBet:
              currentMatch?.sessionMaxBets?.[name + "_minBet"] ??
              currentMatch?.betFairSessionMinBet,
            maxBet: name
              ? currentMatch?.sessionMaxBets?.[name]
              : currentMatch?.betFairSessionMaxBet,
            exposureLimit:
              currentMatch?.sessionMaxBets?.[`${name}_exposureLimit`],
          }}
          onClickCancel={() => {
            setSessionMaxBetAmountLimit(false);
          }}
        />
      </ModalMUI>
    </>
  );
};

export default memo(SessionMarket);
