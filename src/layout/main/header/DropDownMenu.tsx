import { Menu } from "@mui/material";
import { useState } from "react";
import MenutItemsComponent from "./MenutItemsComponent";

const DropDownMenu = ({ anchorEl, open, handleClose, allMatch }: any) => {
  const [selected, setSelected] = useState(0);

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      sx={{ marginTop: "2px", padding: 0 }}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
      PaperProps={{
        sx: {
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
