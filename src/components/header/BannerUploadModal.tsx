import { Box, Button, Modal, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CancelDark } from "../../assets";
import { headerAddBanner } from "../../store/actions/user/userAction";
import { AppDispatch, RootState } from "../../store/store";

interface BannerUploadModalProps {
  visible: boolean;
  setVisible: (val: boolean) => void;
  title?: string;
}

const BannerUploadModal = ({
  visible,
  setVisible,
  title,
}: BannerUploadModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const [mobileBanner, setMobileBanner] = useState<any>("");
  const [desktopBanner, setDesktopBanner] = useState<any>("");
  const [loadingType, setLoadingType] = useState("");
  const { loading } = useSelector((state: RootState) => state.user.profile);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  const handleImageChange = (event: any, type: string) => {
    try {
      const inputElement = event.currentTarget;
      const file = inputElement.files[0];

      if (!file.type.includes("jpeg") && !file.type.includes("png")) {
        alert("File should be either JPEG or PNG");
        inputElement.value = "";
        return;
      }

      if (file) {
        if (file.size > 1024 * 1024) {
          alert("File should be smaller than 1 MB");
          inputElement.value = "";
          return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          if (type === "desktop") {
            setDesktopBanner(reader.result);
          } else {
            setMobileBanner(reader.result);
          }
        };
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    setMobileBanner("");
  }, [visible]);

  return (
    <Modal
      open={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      disableAutoFocus={true}
    >
      <Box
        sx={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: { lg: "500px", xs: "80%" },
            padding: 0.2,
            borderRadius: 2,
            boxShadow: "0px 5px 10px #1A568414",
            background: "white",
          }}
        >
          <Box
            sx={[
              {
                width: "100%",
                justifyContent: "space-between",
                paddingX: "10px",
                display: "flex",
                alignItems: "center",
                height: "50px",
                background: "white",
                borderRadius: 2,
              },
              (theme: any) => ({
                backgroundImage: theme.palette.primary.headerGradient,
              }),
            ]}
          >
            <Typography
              sx={{ fontWeight: "bold", color: "white", fontSize: "18px" }}
            >
              {title ? title : "Add Banner"}
            </Typography>
            <img
              onClick={() => setVisible(false)}
              src={CancelDark}
              alt="cancel"
              style={{ width: "25px", height: "25px", cursor: "pointer" }}
            />
          </Box>
          <form onSubmit={handleSubmit}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
              }}
            >
              <Box
                sx={{
                  border: "1px solid black",
                  margin: "4px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    display: "flex",
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <label htmlFor="banner1">Desktop Banner</label>
                  <input
                    name="banner1"
                    id="banner1"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(e: any) => handleImageChange(e, "desktop")}
                    style={{
                      fontWeight: "700",
                      borderRadius: "5px",
                      padding: "5px",
                      margin: "2%",
                      boxShadow: "0px 5px 15px #0000001A",
                      fontSize: "12px",
                      overflow: "hidden",
                      width: "96%",
                      height: "100px",
                      marginTop: "10px",
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    height: "50px",
                    justifyContent: "space-evenly",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="submit"
                    disabled={loadingType === "desktop" && loading}
                    onClick={() => {
                      setLoadingType("desktop");
                      dispatch(
                        headerAddBanner({
                          value: desktopBanner?.split(",")?.[1],
                          type: "desktop",
                        })
                      );
                    }}
                    style={{
                      backgroundColor: "#0B4F26",
                      color: "white",
                    }}
                  >
                    {loadingType === "desktop" && loading
                      ? "Loading..."
                      : "Submit"}
                  </Button>
                </Box>
              </Box>
              <Box
                sx={{
                  border: "1px solid black",
                  margin: "4px",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    display: "flex",
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <label htmlFor="banner">Mobile Banner</label>
                  <input
                    name="banner"
                    id="banner"
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(e: any) => handleImageChange(e, "mobile")}
                    style={{
                      fontWeight: "700",
                      borderRadius: "5px",
                      padding: "5px",
                      margin: "2%",
                      boxShadow: "0px 5px 15px #0000001A",
                      fontSize: "12px",
                      overflow: "hidden",
                      width: "96%",
                      height: "100px",
                      marginTop: "10px",
                    }}
                  />
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    height: "50px",
                    justifyContent: "space-evenly",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="submit"
                    disabled={loadingType === "mobile" && loading}
                    onClick={() => {
                      setLoadingType("mobile");
                      dispatch(
                        headerAddBanner({
                          value: mobileBanner?.split(",")?.[1],
                          type: "mobile",
                        })
                      );
                    }}
                    style={{
                      backgroundColor: "#0B4F26",
                      color: "white",
                    }}
                  >
                    {loadingType === "mobile" && loading
                      ? "Loading..."
                      : "Submit"}
                  </Button>
                </Box>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Modal>
  );
};
export default memo(BannerUploadModal);
