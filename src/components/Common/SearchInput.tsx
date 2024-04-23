import { TextField, useMediaQuery, useTheme, Box } from "@mui/material";
import StyledImage from "./StyledImages";
import { Search } from "../../assets";
import { MatchListSearchInput } from "../../interface/header";

const SearchInput = ({
  placeholder,
  show,
  width,
  handleSearch,
}: MatchListSearchInput) => {
  const theme = useTheme();
  const matchesxs = useMediaQuery(theme.breakpoints.down("lg"));

  const handleInputChange = async (event: any) => {
    const value = event.target.value;
    try {
      handleSearch(value);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Box
        sx={[
          {
            backgroundColor: {
              xs: show ? "white" : "transparent",
              lg: "white",
            },
            minWidth: {
              lg: "17vw",
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
            marginRight: "10px",
          },
        ]}
      >
        {(!matchesxs || show) && (
          <TextField
            variant="standard"
            id="search"
            name={`search_${Math.random().toString(36).substring(7)}`}
            placeholder={placeholder}
            onChange={handleInputChange}
            InputProps={{
              disableUnderline: true,
              autoComplete: "off",
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
          ]}
        >
          <StyledImage src={Search} sx={{ height: "40%", width: "auto" }} />
        </Box>
      </Box>
    </>
  );
};

export default SearchInput;
