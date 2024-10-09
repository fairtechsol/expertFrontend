import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import StyledImage from "../../../components/Common/StyledImages";
import HeaderDropdown from "./HeaderDropdown";
import { ArrowDown } from "../../../assets";

const ActiveUsers = (props: any) => {
  const { image, value, containerStyle } = props;
  const [anchorEl, setAnchorEl] = useState<any>(null);
  useEffect(() => {}, [anchorEl]);
  const handleClose = () => {
    setAnchorEl(0);
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
          onClick={() => {}}
          sx={[
            {
              backgroundColor: "white",
              minWidth: { lg: "120px" },
              marginLeft: "1vw",
              display: "flex",
              alignItems: "center",
              boxShadow: "0px 3px 10px #B7B7B726",
              justifyContent: "space-between",
              height: { lg: "40px", xs: "35px" },
              overflow: "hidden",
              paddingX: "2px",
              borderRadius: "35px",
              width: { xs: "80px", md: "100px" },
            },
            containerStyle,
          ]}
        >
          <Box
            sx={{
              height: { lg: "35px", xs: "25px", md: "30px" },
              width: { lg: "35px", xs: "25px", md: "30px" },
              borderRadius: "35px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background: "#175731",
            }}
          >
            <StyledImage src={image} sx={{ height: "20px", width: "20px" }} />
          </Box>
          <Box style={{ flex: 1, marginLeft: "5px" }}>
            <Typography
              sx={{
                fontSize: "8px",
                color: "text.primary",
                fontWeight: "500",
                lineHeight: "0.8",
                marginTop: { xs: "5px" },
              }}
            >
              Active Users
            </Typography>
            <Typography
              sx={{ fontSize: "14px", color: "#27AC1E", fontWeight: "700" }}
            >
              {value}
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

export default ActiveUsers;
