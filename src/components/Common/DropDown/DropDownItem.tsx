import { Box, Typography } from "@mui/material";
import { memo } from "react";

interface DropDownItemProps {
  i: string;
  disable: boolean;
  setValue: (val: any) => void;
  setOpen: (val: any) => void;
  dropDownTextStyle?: any;
  setSelected: (val: any) => void;
  name: any;
  onOpen: (val: any) => void;
}
const DropDownItem = ({
  i,
  disable,
  setValue,
  setOpen,
  dropDownTextStyle,
  setSelected,
  name,
  onOpen,
}: DropDownItemProps) => {

  const handleClick = () => {
    if (disable) return;

    setValue(i);
    setSelected((prev: Record<string, any>) => ({
      ...prev,
      [name]: i,
    }));
    setOpen(false);
    onOpen?.(null);
  };
  return (
    <Box
      onClick={handleClick}
      sx={[
        {
          padding: "4px 7px 4px 7px",
          fontSize: "10px",
          fontWeight: "500",
          color: "black",
          "&:hover": {
            cursor: "pointer",
            background: "#3498ff33",
          },
        },
        dropDownTextStyle,
      ]}
    >
      <Typography>{i === "0" ? "0.00" : i}</Typography>
    </Box>
  );
};

export default memo(DropDownItem);
