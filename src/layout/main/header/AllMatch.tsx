import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import * as React from "react";
import AllMatcheDropdown from "./AllMatchDropdown";

export default function AllMatch() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        size="small"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          backgroundColor: "#fff",
          color: "green",
          height: "26px",
          fontWeight: "700",
          fontSize: "11px",
        }}
      >
        All Matches
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem sx={{ m: 0, p: 0 }}>
          <AllMatcheDropdown
            title="Sydney Sixers v Melbourne Renegades"
            subTitle1="Create Session"
            subTitle2="Add Bookamker"
            subTitle3="456"
            dropdownURL1="/expert"
            dropdownURL2="/expert"
            dropdownURL3="/expert"
          />
        </MenuItem>
        <MenuItem sx={{ m: 0, p: 0 }}>
          <AllMatcheDropdown
            title="Sydney Sixers v Melbourne Renegades"
            subTitle1="Create Session"
            subTitle2="Add Bookamker"
            subTitle3="po"
            dropdownURL1="/expert"
            dropdownURL2="/expert"
            dropdownURL3="/expert"
          />
        </MenuItem>
      </Menu>
    </div>
  );
}
