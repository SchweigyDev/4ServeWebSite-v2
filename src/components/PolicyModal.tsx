import React, { useEffect } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    policyType: "privacy" | "terms" | "cookies";
}

const POLICY_IDS: Record<string, string> = {
    privacy: "361ef0b1-979b-4dec-ad85-a0eeccaf5c1b",
    terms: "4e9c9174-36cb-4f40-89cf-1c72ef709007",
    cookies: "YOUR-COOKIE-ID-HERE"
};

const PolicyModal: React.FC<Props> = ({ isOpen, onClose, policyType }) => {

    useEffect(() => {
        if (isOpen) {
            // Remove previous Termly script if it exists
            const existingScript = document.getElementById("termly-script");
            if (existingScript) existingScript.remove();

            // Create a new Termly script
            const script = document.createElement("script");
            script.src = "https://app.termly.io/embed-policy.min.js";
            script.id = "termly-script";
            script.async = true;
            document.body.appendChild(script);
        }
    }, [isOpen, policyType]);

    if (!isOpen) return null;

    // Close if clicking outside modal content
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            onClick={handleOverlayClick}
            style={{
                position: "fixed",
                top:0,
                left:0,
                width:"100%",
                height:"100%",
                backgroundColor:"rgba(0,0,0,0.6)",
                display:"flex",
                justifyContent:"center",
                alignItems:"center",
                zIndex:9999,
                opacity: 1,
                animation: "fadeIn 0.3s ease"
            }}
        >
            <div
                style={{
                    background:"#fff",
                    padding:"30px",
                    borderRadius:"16px",
                    maxWidth:"900px",
                    width:"90%",
                    maxHeight:"90%",
                    overflowY:"auto",
                    position:"relative",
                    transform: "translateY(30px)",
                    animation: "slideUp 0.3s ease forwards"
                }}
            >
                <button
                    onClick={onClose}
                    style={{
                        position:"absolute", top:"16px", right:"16px",
                        fontSize:"1.5rem", fontWeight:"bold", border:"none", background:"none", cursor:"pointer"
                    }}
                >
                    ×
                </button>
                <div
                    name="termly-embed"
                    data-id={POLICY_IDS[policyType]}
                    data-iframe="true"
                    style={{ width: "100%", minHeight: "500px" }}
                />
            </div>

            <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
        </div>
    );
};

export default PolicyModal;
