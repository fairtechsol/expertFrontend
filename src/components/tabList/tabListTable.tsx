import { Box, Typography } from "@mui/material";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addBlinking,
  deleteBlinking,
  getMatchList,
  getTabList,
} from "../../store/actions/match/matchAction";
import { AppDispatch, RootState } from "../../store/store";
import CustomButton from "../Common/CustomButton";
import StyledImage from "../Common/StyledImages";
import { IconConstants } from "../helper/gameConstants";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";
const TabListTable = (props: any) => {
  const { data, index, currentPage } = props;
  const dispatch: AppDispatch = useDispatch();
  const { tabList } = useSelector((state: RootState) => state.matchList);
  const idd = tabList.filter((tab: any) => tab.matchId === data.id);
  const [showPopup, setShowPopup] = useState(false);
  const [selected, setSelected] = useState<any>(
    idd?.length > 0 ? idd?.[0]?.order : null
  );

  const handleAdd = () => {
    let payload = {
      matchType: data?.matchType,
      matchId: data?.id,
      matchName: data?.title,
      order: selected,
    };
    dispatch(addBlinking(payload));
    setTimeout(() => {
      handleList();
      handlclose();
    }, 1000);
  };

  const handleList = () => {
    dispatch(getMatchList({ currentPage: currentPage, stopAt: true }));
    dispatch(getTabList({ currentPage: currentPage }));
  };

  const handleEdit = () => {
    let payload = {
      id: idd?.[0].id,
      order: selected,
    };
    dispatch(addBlinking(payload));
    handlclose();
  };

  const handlclose = () => {
    setSelected(idd?.length > 0 ? idd?.[0]?.order : null);
    setShowPopup(false);
  };

  const handleDelete = () => {
    dispatch(deleteBlinking({ id: idd?.[0].id }));
    setTimeout(() => {
      handleList();
    }, 700);
  };

  return (
    <>
      <Box
        sx={[
          {
            display: "flex",
            background: "#FFE094",
            alignItems: { xs: "stretch", md: "center" },
            borderTop: "2px solid white",
          },
        ]}
      >
        <Box
          sx={{
            display: "flex",
            width: { lg: "15%", md: "15%", sm: "20%", xs: "20%" },
            alignItems: "center",
            borderRight: "2px solid white",
          }}
        >
          <Typography sx={{ fontSize: "12px" }}>
            ({index + 1 + 20 * (currentPage - 1)})
          </Typography>
          <Typography
            sx={{
              fontSize: "9px",
              padding: "4px",
              fontWeight: "700",
              marginLeft: "2px",
            }}
          >
            {moment(data?.startAt).format("DD-MM-YYYY")}{" "}
            {moment(data?.startAt).format("LT")}
          </Typography>
        </Box>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: { xs: "column", sm: "row", lg: "row" },
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            sx={{
              order: { xs: "2", sm: "2" },
            }}
          >
            <StyledImage
              src={IconConstants[data?.matchType]}
              sx={{ height: "20px", width: "20px", margin: "0.5rem" }}
            />
            <Typography
              variant="h5"
              sx={[
                {
                  color: "000",
                  alignItems: "center",
                  marginRight: { lg: "10px", xs: "6px" },
                  justifyContent: "space-between",
                  width: { lg: "300px", xs: "200" },
                },
              ]}
            >
              {data?.title}
            </Typography>
          </Box>

          <Box
            display={"flex"}
            sx={{
              flexDirection: {
                xs: "column",
                sm: "column",
                md: "row",
                lg: "row",
              },
              order: { xs: "1", sm: "2", md: "3" },
              // py: { xs: 1, sm: 0 },
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: {
                  xs: "column",
                  md: "row",
                  sm: "row",
                  lg: "row",
                },
                justifyContent: "center",

                alignItems: "center",
                marginTop: { sm: "5px", lg: "2.5px", md: 0 },
                paddingRight: "5px",
              }}
            ></Box>
            <Box
              display={"flex"}
              sx={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: {
                  lg: "flex-end",
                  md: "flex-end",
                  sm: "flex-end",
                  xs: "center",
                },
                flexWrap: "wrap",
              }}
            >
              {tabList?.length > 0 &&
              tabList.some((tab: any) => tab.matchId === data.id) ? (
                <>
                  <CustomButton
                    containerStyle={{ margin: "5px" }}
                    onClick={() => setShowPopup(true)}
                    title={"Edit"}
                  />
                  <CustomButton
                    bgColor={"#e74c3c"}
                    containerStyle={{ margin: "5px" }}
                    onClick={handleDelete}
                    title={"Delete"}
                  />
                </>
              ) : (
                <CustomButton
                  containerStyle={{ margin: "5px" }}
                  onClick={() => setShowPopup(true)}
                  title={"Add"}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>

      <Dialog open={showPopup} onClose={handlclose}>
        <DialogTitle
          sx={{
            textAlign: "center",
            color: "#fff",
            background: "linear-gradient(90deg, #004A25 5%, #FDCB52 100%)",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          {"Position"}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#fff" }}>
          <div
            style={{
              width: "100%",
              height: "80px",
              backgroundColor: "#fff",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              type="number"
              placeholder="Enter match position"
              value={selected}
              onChange={(e: any) => {
                setSelected(e.target.value);
              }}
              // style={{
              //   width: "80%",
              //   height: "50px",
              // }}
            />
          </div>
        </DialogContent>
        <DialogActions
          sx={{
            background: "linear-gradient(90deg, #004A25 5%, #FDCB52 100%)",
          }}
        >
          <button
            style={{
              width: "25%",
              height: "40px",
              color: "#fff",
              backgroundColor: "#004A25",
              fontSize: "14px",
              borderRadius: "5px",
              border: "1px #004A25 solid",
              cursor: "pointer",
              fontFamily: "Poppins, sans-serif",
            }}
            onClick={() => {
              idd?.length > 0 ? handleEdit() : handleAdd();
            }}
          >
            Submit
          </button>

          <button
            style={{
              width: "25%",
              height: "40px",
              color: "#fff",
              backgroundColor: "#004A25",
              fontSize: "14px",
              borderRadius: "5px",
              border: "1px #004A25 solid",
              cursor: "pointer",
              fontFamily: "Poppins, sans-serif",
            }}
            onClick={handlclose}
          >
            Cancel
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TabListTable;
