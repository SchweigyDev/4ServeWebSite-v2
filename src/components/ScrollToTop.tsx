import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        setVisible(scrolled > 300);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisible);
        return () => window.removeEventListener("scroll", toggleVisible);
    }, []);

    return (
        <button
            onClick={scrollToTop}
            style={{
                position: "fixed",
                bottom: "30px",
                right: "100px", // shifted left so it doesn’t overlap chatbot
                width: "60px", // same size as chatbot button
                height: "60px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #003366, #00D4FF)", // same gradient style
                border: "none",
                color: "white",
                fontSize: "1.5rem",
                cursor: "pointer",
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
                display: visible ? "flex" : "none",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 200,
            }}
        >
            <FaArrowUp />
        </button>
    );
};

export default ScrollToTop;
