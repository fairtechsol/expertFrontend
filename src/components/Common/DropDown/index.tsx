import { useState } from "react";
import { Box, Typography } from "@mui/material";
import StyledImage from "../StyledImages";
import { ARROWDROPDOWN } from "../../../assets";
import DropDownItem from "./DropDownItem";
import { DropdownInterface } from "../../../interface/addAccount";

const DropDown = (props: DropdownInterface) => {
  const {
    title,
    data,
    containerStyle,
    titleStyle,
    valueContainerStyle,
    dropStyle,
    dropDownStyle,
    dropDownTextStyle,
    Detail,
    place,
    type,
    matchesSelect,
    disable,
    setSelected,
    name,
  } = props;

  const [value, setValue] = useState(data[0]);
  const [open, setOpen] = useState(false);

  return (
    <Box sx={[{ width: "19%" }, containerStyle]}>
      <Typography
        sx={[
          {
            fontSize: "10px",
            fontWeight: "600",
            marginBottom: ".3vh",
            color: "#202020",
          },
          titleStyle,
        ]}
      >
        {title}
      </Typography>
      <Box
        onClick={() => {
          if (!disable) {
            setOpen((prev) => !prev);
          }
        }}
        sx={[
          {
            width: "100%",
            height: "37px",
            justifyContent: "space-between",
            alignItems: "center",
            display: "flex",
            background: "white",
            borderRadius: "3px",
            border: "2px solid #DEDEDE",
            paddingX: "7px",
          },
          valueContainerStyle,
        ]}
      >
        <Box
          sx={[
            {
              paddingY: "4px",
              paddingLeft: "7px",
              fontSize: "10px",
              fontWeight: "500",
              color: "white",
            },
          ]}
        >
          <Typography
            sx={{
              fontSize: {
                lg: "14px !important",
                xs: "12px !important",
              },
            }}
          >
            {value === "0" ? "0.00" : place ? value : value}
          </Typography>
          {place === 5 && (
            <Typography sx={{ fontSize: "10px !important" }}>
              {Detail[22]?.val}
            </Typography>
          )}
        </Box>
        <StyledImage
          src={ARROWDROPDOWN}
          sx={[
            {
              width: "11px",
              height: "6px",
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
            },
            dropStyle,
          ]}
        />
      </Box>
      {open && (
        <Box
          sx={[
            {
              display: "flex",
              flexDirection: "column",
              background: "white",
              width: "18.7%",
              alignSelf: "center",
              marginTop: "2px",
              position: "absolute",
              borderRadius: "3px",
              border: "2px solid #DEDEDE",
              zIndex: 9999,
            },
            dropDownStyle,
          ]}
        >
          {matchesSelect
            ? data?.map((i: any, idx: any) => {
                return (
                  <DropDownItem
                    key={idx}
                    i={i}
                    mId={i.MarketId}
                    EventId={i.EventId}
                    matchesSelect={matchesSelect}
                    CompetitionName={i}
                    eventDetail={i.EventDetail}
                    type={type}
                    disable={disable}
                    setValue={setValue}
                    setSelected={setSelected}
                    setOpen={setOpen}
                    dropDownTextStyle={dropDownTextStyle}
                    name={name}
                  />
                );
              })
            : data?.map((i: string, idx: any) => {
                return (
                  <DropDownItem
                    key={idx}
                    i={i}
                    disable={disable}
                    setValue={setValue}
                    setSelected={setSelected}
                    setOpen={setOpen}
                    dropDownTextStyle={dropDownTextStyle}
                    name={name}
                  />
                );
              })}
        </Box>
      )}
    </Box>
  );
};

export default DropDown;
