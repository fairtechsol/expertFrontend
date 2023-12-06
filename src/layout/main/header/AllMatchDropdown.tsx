import Button from "@mui/material/Button";
import * as React from "react";
import { NavLink } from "react-router-dom";

import { Box } from "@mui/material";
import "./index.css";

interface Props {
  title: string;
  subTitle1?: string;
  subTitle2?: string;
  subTitle3?: string;
  dropdownURL1?: string;
  dropdownURL2?: string;
  dropdownURL3?: string;
  dropdownHandle?: (value: any) => void;
}
export default function AllMatcheDropdown({
  title,
  subTitle1,
  subTitle2,
  subTitle3,
  dropdownURL1,
  dropdownURL2,
  dropdownURL3,
}: Props) {
  const [anchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [dropdownMenuToggle, setDropdownMenuToggle] = React.useState(false);

  const handleClick = () => {
    setDropdownMenuToggle(!dropdownMenuToggle);
  };
  //   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //     setAnchorEl(event.currentTarget);
  //   };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-right",
          flexDirection: "column",
          textAlign: "left",
          maxWidth: "230px",
        }}
      >
        <Button
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{
            position: "relative",
          }}
        >
          {title}
        </Button>

        {dropdownMenuToggle ? (
          <Box
            className="dropDownMenu"
            sx={{
              textAlign: "left",
              background: "#F8C851",
              width: "80%",
              marginLeft: "20%",
              borderRadius: "5px  5px",
              paddingLeft: "5px",
              paddingRight: "5px",
              paddingTop: "5px",
              paddingBottom: "5px",
              marginRight: "-30px",
            }}
          >
            <Box className="dropDownMenu-list">
              <NavLink to={`${dropdownURL1}`}> {subTitle1}</NavLink>
            </Box>
            <Box className="dropDownMenu-list">
              <NavLink to={`${dropdownURL2}`}> {subTitle2}</NavLink>
            </Box>
            <Box className="dropDownMenu-list ">
              <NavLink to={`${dropdownURL3}`}> {subTitle3}</NavLink>
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </>
  );
}
