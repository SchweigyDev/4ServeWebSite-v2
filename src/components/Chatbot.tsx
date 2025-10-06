import { useState } from "react";
import { FaCommentDots, FaTimes } from "react-icons/fa";
import newLogo from "../assets/images/4ServeLogoStandAlone.jpg";

const ChatbotButton = () => {
    const [open, setOpen] = useState(false);

    const chatBoxStyle = {
        width: "400px",
        maxWidth: "90vw",
        height: "300px",
        backgroundColor: "rgba(0, 0, 51, 0.85)",
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
    };

    const messagesContainerStyle = {
        flex: 1,
        overflowY: "auto" as "auto",
        display: "flex",
        flexDirection: "column" as "column",
        gap: "6px",
        marginBottom: "6px",
    };

    const inputStyle = {
        padding: "10px 12px",
        borderRadius: "10px",
        border: "none",
        outline: "none",
        width: "100%",
        boxSizing: "border-box" as "border-box",
        background: "rgba(255,255,255,0.1)",
        color: "#fff",
    };

    const logoStyle = {
        position: "absolute" as "absolute",
        top: "10px",
        right: "10px",
        height: "40px",
        width: "auto",
        opacity: 0.25,
        pointerEvents: "none" as React.CSSProperties["pointerEvents"], // <-- fixed type
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
            <div style={chatBoxStyle}>
                {/* Logo in corner */}
                <img src={newLogo} alt="4Serve Logo" style={logoStyle} />

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
                <div style={messagesContainerStyle}>
                    <div
                        style={{
                            background: "rgba(0, 102, 255, 0.2)",
                            color: "#fff",
                            padding: "6px 10px",
                            borderRadius: "8px",
                            fontSize: "0.9rem",
                            maxWidth: "80%",
                            alignSelf: "flex-start",
                            backdropFilter: "blur(2px)",
                        }}
                    >
                        Hello! How can I help your business today?
                    </div>
                </div>

                {/* Input */}
                <input
                    type="text"
                    placeholder="Type your message..."
                    style={inputStyle}
                />
            </div>
        </>
    );
};

export default ChatbotButton;
