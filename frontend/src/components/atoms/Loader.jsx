const Loader = () => (
  <div
    style={{
      border: "2px solid #f3f3f3",
      borderTop: "2px solid #3498db",
      borderRadius: "50%",
      width: "16px",
      height: "16px",
      animation: "spin 0.8s linear infinite",
    }}
  >
    <style>
      {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
    </style>
  </div>
);

export default Loader;
