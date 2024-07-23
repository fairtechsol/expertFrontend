import { useState } from "react";
import { Menu,useMediaQuery,useTheme } from "@mui/material";
import MenutItemsComponent from "./MenutItemsComponent";

const DropDownMenu = ({ anchorEl, open, handleClose, allMatch }: any) => {
  const theme = useTheme();
  const [selected, setSelected] = useState(0);
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      sx={{ marginTop:{xs: "50px", md: "40px", lg: "35px"}, padding: 0, left: matchesMobile? "200px" :'260px' }}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      PaperProps={{
        sx: {
          width: "auto",
          padding: 0,
        },
      }}
    >
      {allMatch?.length > 0 &&
        allMatch?.map((x: any, i: any) => (
          <MenutItemsComponent
            key={i}
            handleClose={handleClose}
            setSelected={setSelected}
            index={i}
            selected={selected}
            x={x}
          />
        ))}
    </Menu>
  );
};

export default DropDownMenu;
