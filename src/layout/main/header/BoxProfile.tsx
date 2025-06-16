import { Box, Typography } from "@mui/material";
import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowDown } from "../../../assets/index";
import StyledImage from "../../../components/Common/StyledImages";
import HeaderDropdown from "./HeaderDropdown";

interface BoxProfileProps {
  image: string;
  containerStyle: any;
  value1: string;
}

const BoxProfile = ({ image, containerStyle, value1 }: BoxProfileProps) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | any>(null);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
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
              minWidth: { lg: "110px", xs: "90px" },
              marginLeft: "1vw",
              display: "flex",
              alignItems: "center",
              boxShadow: "0px 3px 10px #B7B7B726",
              justifyContent: "space-between",
              height: { lg: "35px", xs: "30px" },
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
            alt="image"
            sx={{
              height: { lg: "30px", xs: "25px" },
              width: { lg: "30px", xs: "25px" },
              borderRadius: "150px",
              objectFit: "cover",
            }}
          />
          <Box style={{ flex: 1, marginLeft: "5px" }}>
            <Typography
              sx={{ fontSize: "10px", color: "text.white", fontWeight: "600" }}
            >
              {value1}
            </Typography>
          </Box>
          <StyledImage
            src={ArrowDown}
            alt="down"
            sx={{
              height: "6px",
              width: "10px",
              marginRight: "5px",
              marginLeft: "6px",
              objectFit: "cover",
            }}
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

export default memo(BoxProfile);
