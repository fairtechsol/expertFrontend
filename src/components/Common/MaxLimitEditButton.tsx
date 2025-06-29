const MaxLimitEditButton = ({ handleClickOpen }: any) => {
  return (
    <div
      style={{
        width: "20px",
        height: "18px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "2px",
        backgroundColor: "#FF4D4D",
        cursor: "pointer",
        // marginRight: "10px",
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
        Edit
      </span>
    </div>
  );
};

export default MaxLimitEditButton;
