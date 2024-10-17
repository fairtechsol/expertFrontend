import { Box, Button, Input, Modal, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { CancelDark } from "../../assets";
import { headerAddBanner } from "../../store/actions/user/userAction";
import { AppDispatch } from "../../store/store";
import { notificationvalidationSchema } from "../../utils/Validations/login";
import CustomErrorMessage from "../Common/CustomErrorMessage";
// import { depositAmountValidations } from "../../../utils/Validations";

const BannerUploadModal = ({
  visible,
  setVisible,
  title,
  loadingDeleteBet,
}: any) => {
  const dispatch: AppDispatch = useDispatch();
  const initialValues: any = {
    value: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: notificationvalidationSchema,
    onSubmit: (values: any) => {
      let payload = {
        value: values.value?.split(",")?.[1],
      };
      dispatch(headerAddBanner(payload));
      setVisible(false);
    },
  });

  const { handleSubmit, errors, touched } = formik;

  const handleImageChange = (event: any) => {
    try {
      const file = event.currentTarget.files[0];

      if (!file.type.includes("jpeg") && !file.type.includes("png")) {
        alert("File should be either JPEG or PNG");
        return;
      }

      if (file) {
        if (file.size > 1024 * 100 * 5) {
          alert("File should be smaller than 500/400");
          return;
        }

        // Convert the image to base64
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          formik.setFieldValue("value", reader.result);
        };
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    formik.resetForm();
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
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              width: { lg: "500px", xs: "120%" },
              height: "270px",
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
                style={{ width: "25px", height: "25px", cursor: "pointer" }}
              />
            </Box>
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
              <Input
                name="banner"
                id="banner"
                type="file"
                onChange={handleImageChange}
                onBlur={formik.handleBlur}
                sx={{
                  fontWeight: "700",
                  borderRadius: "5px",
                  paddingY: "5px",
                  paddingX: "1vw",
                  boxShadow: "0px 5px 15px #0000001A",
                  width: "100%",
                  height: "100%",
                  fontSize: "12px",
                  overflow: "hidden",
                  marginX: "2%",
                }}
                style={{
                  width: "96%",
                  height: "100px",
                  marginTop: "10px",
                }}
              />
            </Box>
            <Box
              sx={{
                marginX: "6%",
              }}
            >
              <CustomErrorMessage
                touched={touched.value}
                errors={errors.value}
              />
            </Box>
            <Box
              sx={{
                width: "100%",
                height: "100px",
                justifyContent: "space-evenly",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Button
                type="submit"
                style={{
                  backgroundColor: "#0B4F26",
                  color: "white",
                  // "&:hover": { backgroundColor: "#0B4F26" },
                }}
              >
                {loadingDeleteBet ? "Loading..." : "Submit"}
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
export default BannerUploadModal;
