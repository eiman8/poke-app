import { useEffect, useState } from "react";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/test");
        const data = await res.json();

        setMessage(data.message);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        fontSize: "2rem",
      }}
    >
      {message}
    </div>
  );
}

export default App;
