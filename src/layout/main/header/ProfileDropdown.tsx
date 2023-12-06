import { Box, Typography } from "@mui/material";
import StyledImage from "../../../components/Common/StyledImages";
// import ArrowDown from "../../../assets/arrowDownBlack.svg";
import { ArrowDown } from "../../../assets/index";
import { useEffect, useState } from "react";
import HeaderDropdown from "./HeaderDropdown";
import { useNavigate } from "react-router-dom";

const BoxProfile = (props: any) => {
  const { image, value, containerStyle, value1 } = props;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | any>(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  useEffect(() => {}, [anchorEl]);
  const handleClose = (val: any) => {
    setAnchorEl(0);
    typeof val == "string" &&
      navigate(`/${window.location.pathname.split("/")[1]}/${val}`);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          minWidth: { lg: "120px" },
        }}
      >
        <Box
          onClick={handleClick}
          sx={[
            {
              backgroundColor: "primary.main",
              minWidth: { lg: "120px", xs: "90px" },
              marginLeft: "1vw",
              display: "flex",
              alignItems: "center",
              boxShadow: "0px 3px 10px #B7B7B726",
              justifyContent: "space-between",
              height: { lg: "40px", xs: "35px" },
              overflow: "hidden",
              paddingX: "2px",
              borderRadius: "35px",
              cursor: "pointer",
            },
            containerStyle,
          ]}
        >
          <StyledImage
            src={image}
            sx={{
              height: { lg: "33px", xs: "27px" },
              width: { lg: "33px", xs: "27px" },
              borderRadius: "150px",
            }}
          />
          <Box style={{ flex: 1, marginLeft: "5px" }}>
            <Typography
              sx={{ fontSize: "10px", color: "text.white", fontWeight: "600" }}
            >
              {value}
            </Typography>
            <Typography
              sx={{ fontSize: "10px", color: "text.white", fontWeight: "600" }}
            >
              {value1}
            </Typography>
          </Box>
          <StyledImage
            src={ArrowDown}
            sx={{ height: "6px", width: "10px", marginRight: "5px" }}
          />
        </Box>
      </Box>
      <HeaderDropdown
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
    </>
  );
};

export default BoxProfile;
