import React, { useState } from 'react';
import './Chat.css';
import axios from 'axios';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSendMessage = async () => {
        if (input.trim() === '') return;

        setMessages((prevMessages) => [
            ...prevMessages,
            { text: input, sender: 'user' }
        ]);

        setInput('');

        try {
            const response = await axios.post('https://api.openai.com/v1/chat/completions', {
                model: "gpt-3.5-turbo", 
                messages: [{ role: "user", content: input }],
            }, {
                headers: {
                    'Authorization': `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`, 
                    'Content-Type': 'application/json'
                }
            });

            const botResponse = response.data.choices[0].message.content;
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: botResponse, sender: 'bot' }
            ]);
        } catch (error) {
            console.error('Error sending message:', error);
            setMessages((prevMessages) => [
                ...prevMessages,
                { text: 'Hello, welcome to NeonNexus!', sender: 'bot' }
            ]);
        }
    };

    return (
        <div className="chat-container">
            <h2 className="chat-title">Chat with NeonNexus</h2>
            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div key={index} className={`chat-message ${message.sender}`}>
                        <strong>{message.sender === 'user' ? 'You' : 'NeonNexus'}:</strong> {message.text}
                    </div>
                ))}
            </div>
            <div className="chat-input-container">
                <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="Type your message..." 
                    className="chat-input"
                />
                <button onClick={handleSendMessage} className="chat-button">Send</button>
            </div>
        </div>
    );
}

export default Chat;
