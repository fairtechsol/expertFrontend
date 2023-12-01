import { Box, Typography } from "@mui/material";
import { PaginationInterface } from "../../interface/common";

const Pagination = (props: PaginationInterface) => {
  const { currentPage, pages, callPage } = props;
  return (
    <Box
      sx={{
        height: "50px",
        display: "flex",
        alignItems: "center",
        px: { xs: "5px", lg: "10px" },
        justifyContent: "space-between",
        background: "#FAFAFA",
        marginBottom: "20px",
      }}
    >
      <Typography
        sx={{ fontSize: { xs: "12px", lg: "14px" }, fontWeight: "600" }}
      >
        Showing 1 to {pages}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            height: "35px",
            cursor: "pointer",
            width: { xs: "80px", lg: "100px" },
            background: "#0B4F26",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "5px",
          }}
          onClick={() => {
            callPage(
              parseInt(currentPage) - 1 === 0 ? 1 : parseInt(currentPage) - 1
            );
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { lg: "14px", xs: "12px" },
            }}
          >
            Previous
          </Typography>
        </Box>
        <Box
          sx={{
            height: "35px",
            marginX: { lg: "10px", xs: "5px" },
            width: "40px",
            background: "#262626",
            display: "flex",
            borderRadius: "5px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { lg: "14px", xs: "12px" },
            }}
          >
            {currentPage}
          </Typography>
        </Box>
        <Box
          sx={{
            height: "35px",
            width: { xs: "80px", lg: "100px" },
            background: "#0B4F26",
            display: "flex",
            borderRadius: "5px",
            cursor: "pointer",
            justifyContent: "center",
            alignItems: "center",
          }}
          onClick={() => {
            callPage(
              parseInt(currentPage) === pages
                ? pages
                : parseInt(currentPage) + 1
            );
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontSize: { lg: "14px", xs: "12px" },
            }}
          >
            Next
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Pagination;
