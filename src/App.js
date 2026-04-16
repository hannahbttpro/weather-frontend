import { useState } from "react";
import "./App.css";

function App() {
  const [countryCode, setCountryCode] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [response, setResponse] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!countryCode.trim()) return;
    if (!zipCode.trim()) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch(process.env.REACT_APP_BACKEND_ADDRESS, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ countryCode, zipCode }),
      });

      const data = await res.json();
      const temp = data?.main?.temp - 273.15
      const city = data?.name
      setResponse(temp);
      setCity(city)
    } catch (error) {
      setResponse("Error contacting the backend");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header
        className="App-header"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <h1>✅ VERSION FRONTEND DÉPLOYÉE ✅</h1>

        <div>
          <input
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Write your zip code"
            style={{
              padding: "10px",
              width: "300px",
              marginRight: "10px",
              borderRadius: "4px",
              border: "none",
            }}
          />
          <input
            type="text"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            placeholder="Write your country code (fr for France)"
            style={{
              padding: "10px",
              width: "300px",
              marginRight: "10px",
              borderRadius: "4px",
              border: "none",
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              padding: "10px 16px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
            }}
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
        
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            borderRadius: "6px",
            backgroundColor: "#282c34",
            border: "1px solid #444",
            minHeight: "60px",
            width: "400px",
            color: "white",
          }}
        >
          {city}
        </div>
        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            borderRadius: "6px",
            backgroundColor: "#282c34",
            border: "1px solid #444",
            minHeight: "60px",
            width: "400px",
            color: "white",
          }}
        >
          {response + " °C"}
        </div>
      </header>
    </div>
  );
}

export default App;
