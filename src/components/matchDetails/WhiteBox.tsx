import { Box } from "@mui/material";

const Whitebox=()=>{
    return (
        <>
          {/* <Popover
            isOpen={isPopoverOpen}
            align={matchesMobile ? "end" : "center"}
            positions={["bottom"]} // preferred positions by priority
            onClickOutside={() => setIsPopoverOpen(false)}
            content={<div></div>}
          > */}
            <Box
             
              sx={{
                background: "#fff",
                border:"0px solid white",
                width: { xs: "25%", lg:  "45%" },
                height: "94%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
           
              
            </Box>
          {/* </Popover> */}
        </>
      );
}
export default Whitebox;