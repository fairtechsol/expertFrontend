import { Box } from "@mui/system";
import { NavLink } from "react-router-dom";
import {
  ADDACCOUNT,
  CHECKLIST,
  MYACCOUNT,
  Play,
  TEAM,
  TREND,
} from "../../../assets";
import AdminEventComponent from "./AdminEventComponent";

const AdminEventListing = (props: any) => {
  const { selected, setAnchor, setAnchor1, setSelected } = props;

  const data = [
    { id: 3, title: "INPLAY", image: Play, url: "live_market" },
    { id: 1, title: "Add Account", image: ADDACCOUNT, url: "add_account" },
    { id: 2, title: "Client list", image: TEAM, url: "list_of_clients" },

    { id: 4, title: "Analysis", image: TREND, url: "market_analysis" },
    {
      id: 5,
      title: "Reports",
      image: CHECKLIST,
      url: "reports",
    },

    { id: 6, title: "My Account", image: MYACCOUNT, url: "my-account" },
  ];

  return (
    <Box
      sx={[
        {
          width: { xs: "98%", lg: "100%" },
          msOverflowStyle: "none",
          overflowY: "hidden",
          minHeight: { xs: 95, lg: 80 },
          marginLeft: { xs: "0", lg: ".5vw" },
          overflowX: "auto",
          alignSelf: { xs: "center", lg: "flex-start" },
          display: "flex",
        },
      ]}
    >
      {data?.map((i: any, idx: any) => {
        return (
          <NavLink
            key={idx}
            to={`/wallet/${i.url}`}
            style={{ textDecoration: "none" }}
          >
            <AdminEventComponent
              data={i}
              selected={selected}
              setSelected={setSelected}
              setAnchor={setAnchor}
              setAnchor1={setAnchor1}
            />
          </NavLink>
        );
      })}
    </Box>
  );
};

export default AdminEventListing;
