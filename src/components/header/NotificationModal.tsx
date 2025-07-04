import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { memo, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CancelDark } from "../../assets";
import { headerAddNotification } from "../../store/actions/user/userAction";
import { AppDispatch } from "../../store/store";
import CustomErrorMessage from "../Common/CustomErrorMessage";

interface NotificationModalProps {
  visible: boolean;
  setVisible: (val: boolean) => void;
}

const NotificationModal = ({ visible, setVisible }: NotificationModalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const initialValues: any = {
    value: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values: any) => {
      let payload = {
        value: values.value || "",
      };
      dispatch(headerAddNotification(payload));
      setVisible(false);
    },
  });

  const { handleSubmit, errors, touched } = formik;

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
              width: { lg: "500px", xs: "100%" },
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
                Add Notification
              </Typography>
              <img
                onClick={() => setVisible(false)}
                src={CancelDark}
                alt="cancel"
                width={25}
                height={25}
                style={{ cursor: "pointer" }}
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
              <TextField
                name="value"
                id="value"
                value={formik.values.value}
                onChange={formik.handleChange}
                variant="standard"
                placeholder="Add new Notification"
                multiline={true}
                InputProps={{
                  disableUnderline: true,
                  sx: {
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
                  },
                }}
                style={{
                  width: "96%",
                  height: "100px",
                  marginTop: "10px",
                }}
                onBlur={formik.handleBlur}
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
                }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};
export default memo(NotificationModal);
