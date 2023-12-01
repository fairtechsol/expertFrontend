import { TextField, useMediaQuery, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import StyledImage from "./StyledImages";
import { SEARCH, Search } from "../../assets";

const SearchInput = (props: any) => {
  const {
    placeholder,
    inputContainerStyle,
    showTextInput,
    header,
    setShowSearch,
    show,
    width,
    searchContainerStyle,
    onChange,
    getListOfUser,
  } = props;

  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

  const handleInputChange = async (event: any) => {
    const value = event.target.value;
    // setSearchValue(value);
    if (onChange && typeof onChange === "function") {
      onChange(value);
    }
    try {
      getListOfUser(value);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Box
        onClick={setShowSearch}
        sx={[
          {
            backgroundColor: {
              xs: showTextInput || show ? "white" : "transparent",
              lg: "white",
            },
            minWidth: {
              lg: header ? "10vw" : "17vw",
              xs: "10vw",
            },
            width: {
              xs: width ? width : "36%",
              lg: "17vw",
              md: "17vw",
            },
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            boxShadow: "0px 3px 10px #B7B7B726",
            height: { lg: "35px", xs: "35px" },
            overflow: "hidden",
            paddingX: "5px",
            borderRadius: "35px",
          },
          inputContainerStyle,
        ]}
      >
        {(!matchesMobile || show) && (
          <TextField
            variant="standard"
            placeholder={placeholder}
            // value={searchValue}
            onChange={handleInputChange}
            InputProps={{
              disableUnderline: true,
              autoComplete: "new-password",
              style: {
                fontSize: "12px",
                fontWeight: "600",
                fontStyle: "italic",
                color: "black",
              },
            }}
            sx={{
              borderColor: "white",
              display: "flex",
              flex: 1,
              marginLeft: "5px",
              fontSize: { lg: "10px", xs: "8px" },
            }}
          />
        )}
        {showTextInput && (
          <TextField
            variant="standard"
            placeholder={placeholder}
            // value={searchValue}
            onChange={handleInputChange}
            InputProps={{
              disableUnderline: true,
              autoComplete: "new-password",

              style: {
                fontSize: "12px",
                fontWeight: "600",
                fontStyle: "italic",
              },
            }}
            sx={{
              borderColor: "white",
              display: "flex",
              flex: 1,
              marginLeft: "5px",
              fontSize: { lg: "10px", xs: "8px" },
            }}
          />
        )}
        <Box
          sx={[
            {
              height: "30px",
              width: "30px",
              borderRadius: "20px",
              border: "1px solid white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "primary.main",
              marginRight: -0.3,
              cursor: "pointer",
            },
            searchContainerStyle,
          ]}
        >
          <StyledImage
            src={header ? SEARCH : Search}
            sx={{ height: "40%", width: "auto" }}
          />
        </Box>
      </Box>
    </>
  );
};

export default SearchInput;
