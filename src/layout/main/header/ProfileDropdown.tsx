import { Box, MenuItem, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ArrowDown } from "../../../assets";
import StyledImage from "../../../components/Common/StyledImages";

const ProfileDropdown = (props: any) => {
  const menutItems = [
    { title: "Bet Odds", navigateTo: "betodds" },
    { title: "Market", navigateTo: "market" },
    { title: "Add Book Maker", navigateTo: "add_book_maker" },
    { title: "Add Match", navigateTo: "add_match" },
    { title: "Change Password", navigateTo: "change_password" },
  ];

  const { value, containerStyle, balance } = props;
  const [open, setOpen] = useState(false);

  const [anchorEl] = useState(null);

  useEffect(() => {}, [anchorEl]);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        position: "relative",
        justifyContent: "space-between",
        minWidth: { lg: "150px", xs: "100px" },
      }}
    >
      <Box
        onClick={(event) => {
          setOpen(!open);
          event?.stopPropagation();
        }}
        sx={[
          {
            backgroundColor: "primary.main",
            minWidth: { lg: "150px", xs: "100px" },
            display: "flex",
            alignItems: "center",
            boxShadow: "0px 3px 10px #B7B7B726",
            justifyContent: "space-between",
            height: { lg: "45px", xs: "35px" },
            overflow: "hidden",
            paddingX: "10px",
            borderRadius: "5px",
          },
          containerStyle,
        ]}
      >
        <Box style={{}}>
          <Typography
            sx={{
              fontSize: { lg: "11px", xs: "9px" },
              color: "white",
              fontWeight: "600",
            }}
          >
            {value}
          </Typography>
          <Typography
            sx={{
              fontSize: { lg: "13px", xs: "11px" },
              color: "white",
              fontWeight: "700",
            }}
          >
            {balance}
          </Typography>
        </Box>
        <StyledImage
          src={ArrowDown}
          sx={{
            height: "6px",
            width: "10px",
            marginRight: { lg: "5px", xs: -"10px" },
          }}
        />
      </Box>
      {open && (
        <Box
          // ref={innerRef}
          sx={{
            position: "absolute",
            background: "white",
            top: { lg: "45px", xs: "35px" },
            right: 0,
            paddingY: "10px",
            paddingX: "2px",
            borderRadius: "5px",
            marginTop: "2px",
          }}
        >
          {menutItems.map((x, i) => (
            <MenuItem
              key={i}
              dense={true}
              sx={{
                fontSize: { lg: "12px", xs: "10px" },
                fontWeight: "500",
                marginX: "5px",
                width: { lg: "200px", xs: "200px" },
                color: "black",
                borderBottomWidth: 1,
                borderColor: "#EAEFEC",
                paddingY: "2px",
                borderStyle: "solid",
                "&:hover": {
                  backgroundColor: "primary.main",
                  color: "white",
                  borderColor: "white",
                  borderRadius: "5px",
                  transform: "scale(1.02)",
                },
              }}
              // onClick={() => handleClose(x.navigateTo)}
            >
              {x.title}
            </MenuItem>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ProfileDropdown;
