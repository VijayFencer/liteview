import React, { useState } from "react";
import "./App.css";

function App() {
  const [dob, setDob] = useState("");
  const [quote, setQuote] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [dayInfo, setDayInfo] = useState({ birthDay: "", today: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getDayName = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { weekday: "long" });
  };

  const handleGenerate = async () => {
    setQuote("");
    setError("");
    setIsLoading(true);

    if (!dob) {
      setError("Please select your Date of Birth.");
      setIsLoading(false);
      return;
    }

    // Set day info and avatar
    const birthDay = getDayName(dob);
    const today = getDayName(new Date());
    setDayInfo({ birthDay, today });

    const avatarSeed = dob.replace(/-/g, "");
    setAvatarUrl(`https://api.dicebear.com/7.x/identicon/svg?seed=${avatarSeed}`);

    try {
      // Try primary API first
      let res = await fetch("https://api.quotable.io/random");
      
      if (!res.ok) {
        // Fallback to secondary API if primary fails
        res = await fetch("https://zenquotes.io/api/random");
      }

      const data = await res.json();
      
      // Handle different API response structures
      let quoteText, quoteAuthor;
      
      if (Array.isArray(data)) {
        // ZenQuotes format
        quoteText = data[0]?.q;
        quoteAuthor = data[0]?.a;
      } else {
        // Quotable format
        quoteText = data.content;
        quoteAuthor = data.author;
      }

      if (quoteText && quoteAuthor) {
        setQuote(`${quoteText} — ${quoteAuthor}`);
      } else {
        throw new Error("Invalid quote data received");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to fetch fresh quote. Using a default one.");
      setQuote("The secret of getting ahead is getting started. — Mark Twain");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>🌟 LiteView — Personalized Quote of the Day</h1>
      <p>Enter your Date of Birth to receive a motivational quote:</p>
      
      <div className="input-group">
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          max={new Date().toISOString().split('T')[0]} // Prevent future dates
        />
        <button 
          onClick={handleGenerate} 
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Get My Quote"}
        </button>
      </div>

      {error && <p className="error-message">{error}</p>}

      {quote && (
        <div className="result">
          {avatarUrl && <img src={avatarUrl} alt="User Avatar" className="avatar" />}
          <h3>🧠 Quote for You</h3>
          <p>
            You were born on <strong>{dayInfo.birthDay}</strong> and today is{" "}
            <strong>{dayInfo.today}</strong>.
          </p>
          <blockquote>"{quote}"</blockquote>
        </div>
      )}
    </div>
  );
}

export default App;