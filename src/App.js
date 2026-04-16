import { useState } from "react";
import "./App.css";

function App() {
  const [countryCode, setCountryCode] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [temp, setTemp] = useState(null);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!zipCode.trim() || !countryCode.trim()) {
      setError("Please enter both zip code and country code.");
      return;
    }

    setLoading(true);
    setError("");
    setTemp(null);
    setCity("");

    try {
      const res = await fetch(process.env.REACT_APP_BACKEND_ADDRESS, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          zipCode,
          countryCode: countryCode.toLowerCase(),
        }),
      });

      if (!res.ok) {
        throw new Error("Backend error");
      }

      const data = await res.json();

      const temperatureCelsius = data.main.temp - 273.15;

      setTemp(temperatureCelsius.toFixed(1));
      setCity(data.name);
    } catch (err) {
      console.error(err);
      setError("Unable to retrieve weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌦 Weather Lookup</h1>

        <div className="form">
          <input
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Zip code (e.g. 69000)"
          />

          <input
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            placeholder="Country code (e.g. fr)"
          />

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Loading..." : "Get weather"}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {temp && !error && (
          <div className="weather-card">
            <h2>{city}</h2>
            <p className="temperature">{temp} °C</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
