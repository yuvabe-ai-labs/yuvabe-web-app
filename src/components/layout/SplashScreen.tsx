export function SplashScreen() {
  return (
    <div
      style={{
        height: "90vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
      }}
    >
      <img
        src="/public/logo/logo.png"
        alt="App Logo"
        style={{
          width: 120,
          height: 120,
        }}
      />
    </div>
  );
}
