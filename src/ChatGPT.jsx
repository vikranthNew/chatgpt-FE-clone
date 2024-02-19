import React, { useState } from "react";
import "./ChatGPT.css"; // Import your CSS file

const ChatGPT = () => {
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const sendMessage = async () => {
    // Display user message in the console (you can replace this with your actual logic)
    console.log("User: ", inputText);

    // Clear input field
    setInputText("");

    // Call the Node.js server to generate a response
    try {
      const response = await fetch("http://localhost:3001/generate-response", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: inputText }),
      });

      const responseData = await response.json();

      // Display the generated response in the chat history
      setChatHistory([
        { type: "gpt", message: responseData.response },
        { type: "user", message: inputText },
        ...chatHistory,
      ]);
    } catch (error) {
      console.error("Error generating response:", error.message);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {chatHistory.map((item, index) => (
          <div
            key={index}
            className={item.type === "gpt" ? "gpt left" : "user right"}
          >
            {item.message}
          </div>
        ))}
      </div>
      <div className="user-input">
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="dark-input"
        />
        <button onClick={sendMessage} className="dark-button">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatGPT;
