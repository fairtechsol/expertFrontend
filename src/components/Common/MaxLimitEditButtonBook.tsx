import { memo } from "react";

const MaxLimitEditButtonBook = ({ handleClickOpen }: any) => {
  return (
    <div
      style={{
        width: "35px",
        height: "25px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "2px",
        backgroundColor: "#FF4D4D",
        cursor: "pointer",
      }}
      onClick={handleClickOpen}
    >
      <span
        style={{
          fontSize: "12px",
          fontWeight: "500",
          color: "#fff",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Edit
      </span>
    </div>
  );
};

export default memo(MaxLimitEditButtonBook);
