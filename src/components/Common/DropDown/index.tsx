import { Box, Typography } from "@mui/material";
import { memo, useEffect, useState } from "react";
import { ARROWDROPDOWN } from "../../../assets";
import StyledImage from "../StyledImages";
import DropDownItem from "./DropDownItem";

interface DropDownProps {
  title: string;
  data: any;
  containerStyle: any;
  titleStyle: any;
  valueContainerStyle: any;
  dropStyle: any;
  dropDownStyle: any;
  dropDownTextStyle: any;
  disable: boolean;
  selected: any;
  setSelected: (val: any) => void;
  name: string;
  valued: string;
  onOpen: (val: any) => void;
  isOpen: any;
}

const DropDown = ({
  title,
  data,
  containerStyle,
  titleStyle,
  valueContainerStyle,
  dropStyle,
  dropDownStyle,
  dropDownTextStyle,
  disable,
  selected,
  setSelected,
  name,
  valued,
  onOpen,
  isOpen,
}: DropDownProps) => {
  const [value, setValue] = useState(valued);
  const [open, setOpen] = useState(false);

  let valueToShow =
    value === "0"
      ? "0.00"
      : name
      ? selected[name]
        ? selected[name]
        : value
      : value;

  useEffect(() => {
    setValue(valued);
  }, [selected]);

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <Box sx={[{ width: "19%" }, containerStyle]}>
      <Typography
        sx={[
          {
            fontSize: "12px",
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
            onOpen(name);
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
              lineHeight: 0.9,
            }}
          >
            {valueToShow}
          </Typography>
        </Box>
        <StyledImage
          src={ARROWDROPDOWN}
          alt="arrow down"
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
          {data?.map((i: any, idx: any) => {
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
                onOpen={onOpen}
              />
            );
          })}
        </Box>
      )}
    </Box>
  );
};

export default memo(DropDown);
