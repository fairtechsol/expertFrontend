import { Box, Typography } from "@mui/material";
import { Fragment, memo, useState } from "react";
import { ARROWUP } from "../../../assets";
import { customSortUpdated } from "../../../helpers";
import Divider from "../../Common/Divider";
import SessionMarketBox from "./SessionMarketBox";

interface SessionMarketProps {
  title: string;
  sessionData: {
    section: Array<{
      id?: string;
      SelectionId?: string;
      isComplete?: boolean;
      activeStatus?: string;
      resultData?: any;
      result?: any;
    }>;
  };
}

const SessionMarket2: React.FC<SessionMarketProps> = ({
  title,
  sessionData,
}) => {
  const [visible, setVisible] = useState(true);

  const filteredSessions = sessionData?.section
    ?.filter(
      (item) =>
        !item?.isComplete &&
        item?.activeStatus !== "unSave" &&
        ((item?.resultData && item?.resultData === null) ||
          item?.result === null)
    )
    ?.slice()
    ?.sort(customSortUpdated);

  const toggleVisibility = () => setVisible((prev) => !prev);

  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "white",
        flexDirection: "column",
        marginY: { lg: "3px" },
        width: "100%",
        alignSelf: {
          xs: "center",
          md: "center",
          lg: "flex-start",
          boxShadow: "0px 5px 10px #0000001A",
        },
        marginBottom: "1rem",
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
              lineHeight: 1,
              textTransform: "capitalize",
            }}
          >
            {title}
          </Typography>
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
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              position: "relative",
              "::-webkit-scrollbar": { display: "none" },
            }}
          >
            {filteredSessions?.map((match: any, index: number) => {
              if (match.id) {
                return (
                  <Fragment key={match?.SelectionId}>
                    <SessionMarketBox newData={match} index={index} />
                    <Divider />
                  </Fragment>
                );
              } else {
                return null;
              }
            })}
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default memo(SessionMarket2);
