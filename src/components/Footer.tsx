import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import Logo from "../assets/images/4ServeLogoStandAlone.jpg";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
    const navigate = useNavigate();

    const scrollToSection = (sectionId: string) => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <footer
            style={{
                backgroundColor: "#161618",
                color: "white",
                padding: "60px 10% 30px",
                fontSize: "1rem",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: "40px",
                    marginBottom: "40px",
                }}
            >
                {/* LEFT SECTION */}
                <div style={{ flex: "1 1 320px", minWidth: "280px", fontSize: "1.2rem" }}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "4px",
                            cursor: "pointer",
                            transition: "all 0.3s ease",
                        }}
                        className="logo-hover"
                    >
                        <img src={Logo} alt="4Serve Logo" style={{ width: "60px", height: "60px" }} />
                        <h2
                            style={{
                                margin: 0,
                                fontSize: "2.2rem",
                                fontWeight: "bold",
                                lineHeight: 1,
                            }}
                        >
                            4Serve
                        </h2>
                    </div>

                    <p style={{ margin: "16px 0 28px", maxWidth: "350px", fontSize: "1.2rem" }}>
                        Putting control back where it belongs.
                    </p>

                    <p style={{ margin: "8px 0", fontSize: "1.1rem" }}>St. Louis, Missouri</p>

                    <a
                        href="mailto:support@4serve.com"
                        style={{
                            display: "block",
                            margin: "8px 0",
                            color: "white",
                            fontSize: "1.1rem",
                            textDecoration: "none",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            (e.target as HTMLAnchorElement).style.color = "#00D4FF";
                            (e.target as HTMLAnchorElement).style.textDecoration = "underline";
                        }}
                        onMouseLeave={(e) => {
                            (e.target as HTMLAnchorElement).style.color = "white";
                            (e.target as HTMLAnchorElement).style.textDecoration = "none";
                        }}
                    >
                        support@4serve.com
                    </a>

                    <a
                        href="tel:3143842369"
                        style={{
                            display: "block",
                            margin: "8px 0",
                            color: "white",
                            fontSize: "1.1rem",
                            textDecoration: "none",
                            transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                            (e.target as HTMLAnchorElement).style.color = "#00D4FF";
                            (e.target as HTMLAnchorElement).style.textDecoration = "underline";
                        }}
                        onMouseLeave={(e) => {
                            (e.target as HTMLAnchorElement).style.color = "white";
                            (e.target as HTMLAnchorElement).style.textDecoration = "none";
                        }}
                    >
                        314-384-2369
                    </a>

                    <div
                        style={{
                            marginTop: "22px",
                            display: "flex",
                            gap: "18px",
                            flexWrap: "wrap",
                            fontSize: "1.4rem",
                        }}
                    >
                        <a href="#" className="social-icon facebook"><FaFacebookF /></a>
                        <a href="#" className="social-icon twitter"><FaTwitter /></a>
                        <a href="#" className="social-icon instagram"><FaInstagram /></a>
                    </div>
                </div>

                {/* CENTER SECTION */}
                <div className="footer-center">
                    <h3 className="footer-center-title">Platform</h3>
                    <nav className="footer-center-nav">
                        {[
                            { name: "What's Broken", target: "whats-broken-section" },
                            { name: "The Solution", target: "solution-section" },
                            { name: "How It Works", target: "how-it-works-section" },
                            { name: "The User Side", target: "user-side-section" },
                            { name: "Use Cases", target: "user-cases-section" },
                        ].map((link) => (
                            <button
                                key={link.name}
                                className="footer-center-button"
                                onClick={() => scrollToSection(link.target)}
                            >
                                {link.name}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* RIGHT SECTION */}
                <div className="footer-right">
                    <h3 style={{ margin: 0, fontSize: "1.3rem", color: "#00D4FF" }}>
                        Stay Ahead of Big Tech
                    </h3>
                    <p style={{ margin: 0, lineHeight: 1.6, fontSize: "1.05rem" }}>
                        Get early access updates and join the movement today.
                    </p>

                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            style={{
                                flex: "1",
                                padding: "12px",
                                borderRadius: "8px",
                                border: "2px solid transparent",
                                outline: "none",
                                transition: "all 0.3s ease, box-shadow 0.3s ease",
                                fontSize: "1rem",
                            }}
                            onFocus={(e) => {
                                e.target.style.border = "2px solid #00D4FF";
                                e.target.style.boxShadow = "0 0 12px rgba(0, 212, 255, 0.6)";
                            }}
                            onBlur={(e) => {
                                e.target.style.border = "2px solid transparent";
                                e.target.style.boxShadow = "none";
                            }}
                        />
                        <button
                            style={{
                                background: "linear-gradient(135deg, #0066FF, #00D4FF)",
                                border: "none",
                                borderRadius: "8px",
                                padding: "12px 20px",
                                color: "white",
                                fontWeight: "bold",
                                cursor: "pointer",
                                transition: "all 0.3s ease, box-shadow 0.3s ease",
                            }}
                            className="footer-join-button"
                        >
                            Join
                        </button>
                    </div>

                    <button
                        style={{
                            marginTop: "10px",
                            background: "linear-gradient(135deg, #0066FF, #00D4FF)",
                            border: "none",
                            borderRadius: "8px",
                            padding: "14px",
                            color: "white",
                            fontWeight: "bold",
                            cursor: "pointer",
                            width: "100%",
                            transition: "all 0.3s ease, box-shadow 0.3s ease",
                        }}
                        className="footer-download-button floating-button"
                    >
                        Download the App
                    </button>
                </div>
            </div>

            {/* BOTTOM ROW */}
            <div
                style={{
                    borderTop: "2px solid #333",
                    paddingTop: "20px",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "20px",
                }}
            >
                <p style={{ margin: 0, fontSize: "1rem" }}>© 2025 4Serve – Control Where It Belongs</p>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", fontSize: "1rem" }}>
                    <button onClick={() => navigate("/privacy-policy")} className="footer-bottom-link">Privacy Policy</button>
                    <span style={{ color: "#666" }}>•</span>
                    <button onClick={() => navigate("/terms-of-use")} className="footer-bottom-link">Terms of Use</button>
                    <span style={{ color: "#666" }}>•</span>
                    <button onClick={() => navigate("/cookie-policy")} className="footer-bottom-link">Cookie Policy</button>
                </div>
            </div>

            {/* STYLES */}
            <style>{`
                .footer-center {
                    flex: 1 1 200px;
                    min-width: 180px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    margin-left: 50px;
                }
                .footer-center-title {
                    margin-bottom: 20px;
                    font-size: 1.2rem;
                }
                .footer-center-nav {
                    display: flex;
                    flex-direction: column;
                    gap: 14px;
                }
                .footer-center-button {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    font-size: 1.05rem;
                    padding: 2px 0;
                    text-align: left;
                    transition: all 0.3s ease;
                }
                .footer-center-button:hover {
                    color: #00D4FF;
                    transform: scale(1.05);
                }
                .footer-right {
                    flex: 1 1 220px;
                    min-width: 200px;
                    background: #1a1a1a;
                    border-radius: 16px;
                    padding: 28px;
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                }
                .footer-bottom-link {
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    font-size: 1rem;
                    position: relative;
                    padding-bottom: 2px;
                    transition: all 0.3s ease;
                }
                .footer-bottom-link::after {
                    content: '';
                    position: absolute;
                    width: 0%;
                    height: 2px;
                    bottom: 0;
                    left: 0;
                    background: linear-gradient(90deg, #0066FF, #00D4FF);
                    transition: width 0.3s ease;
                    border-radius: 1px;
                }
                .footer-bottom-link:hover::after {
                    width: 100%;
                }
            `}</style>
        </footer>
    );
};

export default Footer;
