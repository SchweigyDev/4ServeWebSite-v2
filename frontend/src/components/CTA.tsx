import React from "react";

const JoinTrialSection: React.FC = () => {
    return (
        <section
            style={{
                scrollMarginTop: "100px",
                padding: "clamp(60px, 6vw, 100px) 10% 80px",
                background: "rgba(0, 102, 255, 0.08)",
                color: "white",
                textAlign: "center",
                borderBottom: "2px solid #0066FF",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "30px",
                borderRadius: "20px",
                boxShadow: "0 8px 30px rgba(0,212,255,0.15)",
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Slogan */}
            <h2
                className="cta-slogan"
                style={{
                    fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                    margin: 0,
                    color: "#0066FF",
                    fontWeight: "bold",
                    maxWidth: "700px",
                    lineHeight: 1.3,
                    position: "relative",
                }}
            >
                Ready to be among the first to take back control?
            </h2>

            {/* Sentence */}
            <p
                style={{
                    fontSize: "clamp(1rem, 2vw, 1.3rem)",
                    margin: "0 0 20px",
                    maxWidth: "600px",
                    lineHeight: 1.6,
                }}
            >
                Join the businesses shaping the future of customer connection.{" "}
                <span style={{ color: "#00D4FF", fontWeight: "bold" }}>
                    Early access. Limited spots available.
                </span>
            </p>

            {/* CTA Button */}
            <button
                className="cta-button"
                style={{
                    background: "linear-gradient(135deg, #0066FF, #00D4FF)",
                    color: "white",
                    border: "none",
                    borderRadius: "50px",
                    padding: "14px 40px",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
                }}
                onClick={() => alert("Free Trial Coming Soon!")}
            >
                Join the Free Trial
            </button>

            {/* Links Row */}
            <div
                className="cta-links"
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    marginTop: "20px",
                    fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)",
                    color: "white",
                }}
            >
                <a href="#">Free Trial</a>
                <span style={{ color: "#0099FF" }}>•</span>
                <a href="#">Be Part of the Beta</a>
                <span style={{ color: "#0099FF" }}>•</span>
                <a href="#">Help Shape the Platform</a>
            </div>

            <style>{`
                /* Slogan animation on load */
                .cta-slogan {
                    position: relative;
                    display: inline-block;
                }
                .cta-slogan::after {
                    content: '';
                    position: absolute;
                    width: 0%;
                    height: 3px;
                    bottom: -5px;
                    left: 0;
                    background: #00D4FF;
                    transition: width 0.4s ease;
                }
                .cta-slogan:hover::after {
                    width: 100%;
                }

                /* CTA Button hover effect */
                .cta-button:hover {
                    transform: translateY(-4px) scale(1.05);
                    box-shadow: 0 8px 20px rgba(0,212,255,0.5);
                }
                .cta-button:active {
                    transform: translateY(0) scale(1);
                    box-shadow: 0 6px 16px rgba(0,0,0,0.3);
                }

                /* Links hover effect */
                .cta-links a {
                    text-decoration: none;
                    color: white;
                    position: relative;
                    transition: all 0.3s ease;
                }
                .cta-links a::after {
                    content: '';
                    position: absolute;
                    width: 0;
                    height: 2px;
                    bottom: -2px;
                    left: 0;
                    background-color: #00D4FF;
                    transition: width 0.3s ease;
                }
                .cta-links a:hover::after {
                    width: 100%;
                }
            `}</style>
        </section>
    );
};

export default JoinTrialSection;
