import { useState, useRef, useEffect } from "react";
import { FaCommentDots, FaTimes } from "react-icons/fa";
import newLogo from "../assets/imageOrginals/4ServeLogoStandAlone.jpg";

interface Message {
    text: string;
    sender: "user" | "bot";
}

const ChatbotButton: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { text: "Hello! How can I help your business today?", sender: "bot" },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);

    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, open]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage = inputValue;
        setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
        setInputValue("");
        setIsTyping(true);

        try {
            const res = await fetch("http://localhost:5000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: userMessage }),
            });
            const data = await res.json();
            setMessages((prev) => [...prev, { text: data.reply, sender: "bot" }]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                { text: "Sorry, something went wrong. Try again.", sender: "bot" },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSend();
    };

    return (
        <>
            {/* Floating Chat Button */}
            <button
                onClick={() => setOpen(!open)}
                style={{
                    position: "fixed",
                    bottom: "30px",
                    right: "30px",
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #003366, #00D4FF)",
                    border: "none",
                    color: "white",
                    fontSize: "1.5rem",
                    cursor: "pointer",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 200,
                }}
            >
                {open ? <FaTimes /> : <FaCommentDots />}
            </button>

            {/* Chat Box */}
            <div
                style={{
                    width: "400px",
                    maxWidth: "90vw",
                    height: "350px",
                    backgroundColor: "rgba(0, 0, 51, 0.95)",
                    borderRadius: "16px",
                    padding: "16px",
                    boxShadow: "0 0 25px rgba(0,212,255,0.5)",
                    display: "flex",
                    flexDirection: "column" as "column",
                    color: "#fff",
                    position: "fixed" as "fixed",
                    bottom: "100px",
                    right: "30px",
                    zIndex: 150,
                    transform: open ? "translateX(0)" : "translateX(110%)",
                    transition: "transform 0.4s ease",
                    overflow: "hidden",
                    backdropFilter: "blur(6px)",
                    border: "1px solid rgba(0,212,255,0.3)",
                }}
            >
                {/* Logo in corner */}
                <img
                    src={newLogo}
                    alt="4Serve Logo"
                    style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        height: "40px",
                        width: "auto",
                        opacity: 0.25,
                        pointerEvents: "none",
                    }}
                />

                {/* Header */}
                <div
                    style={{
                        fontWeight: 700,
                        fontSize: "1.2rem",
                        marginBottom: "12px",
                        zIndex: 1,
                    }}
                >
                    4Serve Chat
                </div>

                {/* Messages */}
                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        display: "flex",
                        flexDirection: "column",
                        gap: "6px",
                        marginBottom: "6px",
                    }}
                >
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            style={{
                                background: msg.sender === "bot"
                                    ? "rgba(0, 102, 255, 0.2)"
                                    : "rgba(0, 212, 255, 0.3)",
                                color: "#fff",
                                padding: "8px 12px",
                                borderRadius: "8px",
                                fontSize: "0.9rem",
                                maxWidth: "80%",
                                alignSelf: msg.sender === "bot" ? "flex-start" : "flex-end",
                                backdropFilter: "blur(2px)",
                                wordBreak: "break-word",
                            }}
                        >
                            {msg.text}
                        </div>
                    ))}

                    {isTyping && (
                        <div
                            style={{
                                fontStyle: "italic",
                                color: "#ccc",
                                padding: "4px 10px",
                                fontSize: "0.85rem",
                                alignSelf: "flex-start",
                            }}
                        >
                            Bot is typing...
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <input
                    type="text"
                    placeholder="Type your message..."
                    style={{
                        padding: "10px 12px",
                        borderRadius: "10px",
                        border: "none",
                        outline: "none",
                        width: "100%",
                        boxSizing: "border-box",
                        background: "rgba(255,255,255,0.1)",
                        color: "#fff",
                    }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </div>
        </>
    );
};

export default ChatbotButton;
