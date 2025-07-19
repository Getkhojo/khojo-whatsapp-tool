import { useState } from "react";
function App() {
  const [category, setCategory] = useState("");
  const [purpose, setPurpose] = useState("");
  const [result, setResult] = useState("");

  const generate = async () => {
    const res = await fetch("https://khojo-whatsapp-api.onrender.com/generate", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ category, purpose }),
    });
    const data = await res.json();
    setResult(data.message);
  };

  return (
    <div className="container">
      <h1>Khojo WhatsApp Message Generator</h1>
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="">Select Business</option>
        <option value="bakery">Bakery</option>
        <option value="salon">Salon</option>
        <option value="freelancer">Freelancer</option>
      </select>
      <input
        placeholder="Purpose (e.g. Promotion, Reminder)"
        onChange={(e) => setPurpose(e.target.value)}
      />
      <button onClick={generate}>Generate</button>
      {result && (
        <>
          <h3>Generated Message:</h3>
          <pre>{result}</pre>
          <button onClick={() => navigator.clipboard.writeText(result)}>
            Copy
          </button>
        </>
      )}
      <footer>Powered by GetKhojo.com</footer>
    </div>
  );
}

export default App;
