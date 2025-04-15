interface MaxLimitEditButtonInterface {
  handleClickOpen: () => void;
}

const MaxLimitEditButton = ({
  handleClickOpen,
}: MaxLimitEditButtonInterface) => {
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
