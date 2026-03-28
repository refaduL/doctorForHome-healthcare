function Spinner({ size = 16 }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: "2px solid #ccc",
        borderTop: "2px solid black",
        borderRadius: "50%",
        animation: "spin 0.6s linear infinite",
      }}
    />
  );
}

export default Spinner;
