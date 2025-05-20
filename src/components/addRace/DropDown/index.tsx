import { Box, Typography } from "@mui/material";
import { memo, useCallback, useEffect, useState } from "react";
import { ARROWDROPDOWN } from "../../../assets";
import StyledImage from "../../Common/StyledImages";
import DropDownItem from "./DropDownItem";

interface RaceDropDownProps {
  title: string;
  name: string;
  valued: string;
  dropStyle: any;
  disable: boolean;
  valueContainerStyle: any;
  containerStyle: any;
  titleStyle: any;
  data: any;
  dropDownStyle: any;
  dropDownTextStyle: any;
  selected: any;
  setSelected: (val: any) => void;
  onOpen: (val: string) => void;
}

const RaceDropDown = ({
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
}: RaceDropDownProps) => {
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

  const handleDisableClick = useCallback(() => {
    if (!disable) {
      setOpen((prev) => !prev);
      onOpen(name);
    }
  }, []);

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
        onClick={handleDisableClick}
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
          {data?.map((item: any, idx: any) => {
            return (
              <DropDownItem
                key={idx}
                item={item}
                EventId={item?.event?.id}
                CompetitionName={item?.marketName}
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

export default memo(RaceDropDown);
