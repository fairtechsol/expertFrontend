import { memo } from "react";

interface AddMarketButtonProps {
  handleClickOpen: () => void;
}

const AddMarketButton = ({ handleClickOpen }: AddMarketButtonProps) => {
  return (
    <div
      style={{
        width: "40px",
        height: "18px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "2px",
        backgroundColor: "#46e080",
        cursor: "pointer",
      }}
      onClick={handleClickOpen}
    >
      <span
        style={{
          fontSize: "8px",
          fontWeight: "500",
          color: "#fff",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        Add
      </span>
    </div>
  );
};

export default memo(AddMarketButton);
