const AddMarketButton = ({ handleClickOpen }: any) => {
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
        // marginRight: "10px",
      }}
      onClick={handleClickOpen}
    >
      <span
        style={{
          fontSize: "10px",
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

export default AddMarketButton;
