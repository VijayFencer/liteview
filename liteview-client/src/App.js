import React, { useState } from "react";
import "./App.css";

const zodiacData = [
  { sign: "Capricorn", start: "01-01", end: "01-19", traits: "Disciplined, Responsible, Ambitious" },
  { sign: "Aquarius", start: "01-20", end: "02-18", traits: "Innovative, Independent, Humanitarian" },
  { sign: "Pisces", start: "02-19", end: "03-20", traits: "Empathetic, Artistic, Intuitive" },
  { sign: "Aries", start: "03-21", end: "04-19", traits: "Courageous, Determined, Confident" },
  { sign: "Taurus", start: "04-20", end: "05-20", traits: "Reliable, Patient, Practical" },
  { sign: "Gemini", start: "05-21", end: "06-20", traits: "Adaptable, Outgoing, Intelligent" },
  { sign: "Cancer", start: "06-21", end: "07-22", traits: "Emotional, Loyal, Caring" },
  { sign: "Leo", start: "07-23", end: "08-22", traits: "Charismatic, Creative, Generous" },
  { sign: "Virgo", start: "08-23", end: "09-22", traits: "Analytical, Kind, Hardworking" },
  { sign: "Libra", start: "09-23", end: "10-22", traits: "Diplomatic, Fair, Social" },
  { sign: "Scorpio", start: "10-23", end: "11-21", traits: "Passionate, Brave, Loyal" },
  { sign: "Sagittarius", start: "11-22", end: "12-21", traits: "Optimistic, Honest, Adventurous" },
  { sign: "Capricorn", start: "12-22", end: "12-31", traits: "Disciplined, Responsible, Ambitious" },
];

const getZodiacSign = (dob) => {
  const [year, month, day] = dob.split("-");
  const date = `${month}-${day}`;

  for (const zodiac of zodiacData) {
    if (date >= zodiac.start && date <= zodiac.end) {
      return zodiac;
    }
  }
  return { sign: "Unknown", traits: "N/A" };
};

function App() {
  const [dob, setDob] = useState("");
  const [zodiac, setZodiac] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleGenerate = () => {
    if (!dob) return;

    const signInfo = getZodiacSign(dob);
    setZodiac(signInfo);

    const avatarSeed = dob.replace(/-/g, "");
    setAvatarUrl(`https://api.dicebear.com/7.x/adventurer/svg?seed=${avatarSeed}`);
  };

  return (
    <div className="app">
      <h1>🔮 Zodiac Vibe</h1>
      <p>Enter your Date of Birth to see your zodiac sign and traits!</p>

      <div className="input-group">
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          max={new Date().toISOString().split("T")[0]}
        />
        <button onClick={handleGenerate}>Reveal My Sign</button>
      </div>

      {zodiac && (
        <div className="result">
          {avatarUrl && <img src={avatarUrl} alt="Avatar" className="avatar" />}
          <h2>♈ {zodiac.sign}</h2>
          <p><strong>Traits:</strong> {zodiac.traits}</p>
        </div>
      )}
    </div>
  );
}

export default App;
