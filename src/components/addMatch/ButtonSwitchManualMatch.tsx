import { Box, Typography } from "@mui/material";
// import { useDispatch } from "react-redux";
// import { updateMatchActiveStatus } from "../../store/actions/match/matchAction";
// import { AppDispatch } from "../../store/store";
import { MaterialUISwitch } from "../matchList/materialUiSwitch";

const BoxButtonManualMatch = (props: any) => {
  const {
    title,
    containerStyle,
    titleStyle,
    manualMatchToggle,
    setManualMatchToggle,
  } = props;
  // const dispatch: AppDispatch = useDispatch();
  // const [background, setBackground] = useState<string>("#0B4F26");
  // const [checked, setChecked] = useState<boolean>(manualMatchToggle || false);

  // useEffect(() => {
  //   if (checked) {
  //     setBackground("#0B4F26");
  //   } else {
  //     setBackground("#FF4D4D");
  //   }
  // }, [checked]);

  return (
    <Box
      sx={[
        {
          height: "35px",
          width: { xs: "100%", sm: "48%", md: "15%" },
          marginTop: { xs: 1, md: 0 },
          marginLeft: "10px",
          borderRadius: "5px",
          margin: "10px",
          border: undefined,
          background: "#0B4F26",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        },
        containerStyle,
      ]}
    >
      <Typography
        sx={[
          {
            color: "white",
            fontWeight: "500",
            fontSize: "13px",
            marginLeft: "1vw",
            lineHeight: "14px",
            display: "-webkit-box",
            overflow: "hidden",
            WebkitLineClamp: { xs: 1, md: 2 },
            WebkitBoxOrient: "vertical",
            lineClamp: { xs: 1, md: 2 },
          },
          titleStyle,
        ]}
      >
        {title}
      </Typography>
      {
        <MaterialUISwitch
          checked={manualMatchToggle}
          onChange={async () => {
            try {
              // setChecked(!checked);
              setManualMatchToggle((state: boolean) => !state);
            } catch (e) {
              console.log(e);
            }
          }}
        />
      }
    </Box>
  );
};

export default BoxButtonManualMatch;
