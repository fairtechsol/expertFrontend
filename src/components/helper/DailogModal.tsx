import { Box, Modal, Typography } from "@mui/material";
// import { BETPLACED, NOT } from "../../assets";

const DailogModal = ({}) => {
  // const dailogModal = useSelector((state: any) => state?.dailogModal)
  // const dispatch = useDispatch()
  return (
    <Modal
      // onClose={() => dispatch(setDailogData({ isModalOpen: false }))}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        outline: "none",
      }}
      open={false}
      disableAutoFocus={true}
    >
      <Box
        sx={{
          width: "260px",
          minHeight: "85px",
          borderRadius: "6px",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "white",
          alignSelf: "center",
          display: "flex",
          paddingTop: "15px",
          paddingBottom: "5px",
          position: "absolute",
          top: "35%",
          zIndex: 999,
        }}
      >
        {false ? (
          <img
            // src={NOT}
            style={{ width: "50px", height: "50px", marginTop: "3px" }}
          />
        ) : (
          <img
            // src={BETPLACED}
            style={{ width: "65px", height: "60px", marginTop: "3px" }}
          />
        )}
        <Typography
          sx={{
            fontSize: "20px",
            fontWeight: "700",
            marginY: "1vh",
            width: "80%",
            alignSelf: "center",
            textAlign: "center",
          }}
        >
          {"abc"}
        </Typography>
        {/* <BoxButton onClick={()=>{
                    dispatch(setDailogData({isModalOpen:false}))
                }} containerStyle={{width:"200px"}}  title={"OK"} /> */}
      </Box>
    </Modal>
  );
};
export default DailogModal;
