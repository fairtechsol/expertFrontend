import { Box, Typography } from "@mui/material";

const DropDownItem = (props: any) => {
  const {
    i,
    CompetitionName,
    disable,
    setValue,
    setOpen,
    dropDownTextStyle,
    setSelected,
    name,
  } = props;
  return (
    <Box
      onClick={() => {
        if (!disable) {
          setValue(i);
          setOpen(false);
          setSelected((prev: any) => ({
            ...prev,
            [name]: i,
          }));
        }
      }}
      sx={[
        {
          paddingY: "4px",
          paddingLeft: "7px",
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
      <Typography sx={{ fontSize: "12px" }}>{CompetitionName}</Typography>
    </Box>
  );
};

export default DropDownItem;
