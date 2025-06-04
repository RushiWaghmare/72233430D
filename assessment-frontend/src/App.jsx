import React, { useState } from "react";
import axios from "axios";

function App() {
  const [authToken, setAuthToken] = useState("");

  // Use your registration response data here
  const registrationData = {
    email: "rushiwaghmare789@gmail.com",
    name: "rushikesh ratnakar waghmare",
    rollNo: "72233430d",
    accessCode: "KRjUUU",
    clientID: "17728553-a5f7-46dc-808f-2d5927ff9e64",
    clientSecret: "QFKXnkKffrstUxuq"
  };

  const getAuthToken = async () => {
    try {
      const response = await axios.post("http://20.244.56.144/evaluation-service/auth", registrationData);

      console.log("✅ Auth Token Response:", response.data);
      setAuthToken(response.data.token);
      alert("✅ Auth token received! Check console and below.");
    } catch (error) {
      console.error("❌ Auth Token Error:", error.response?.data || error.message);
      alert("❌ Auth token request failed. See console for details.");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>Get Authorization Token</h2>
      <button onClick={getAuthToken} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Get Auth Token
      </button>

      {authToken && (
        <div style={{ marginTop: "20px" }}>
          <strong>Authorization Token:</strong>
          <pre style={{ backgroundColor: "#eee", padding: "10px" }}>{authToken}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
