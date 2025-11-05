import howItWorksImage from "../assets/images/4ServeLogoStandAlone.jpg"; // replace with your tablet image
import React from "react";

const HowItWorks: React.FC = () => {
    return (
        <section
            id="how-it-works-section"
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "clamp(100px, 10vw, 120px) 10% 80px",
                background: "rgba(0, 102, 255, 0.1)",
                color: "white",
                scrollMarginTop: "100px",
            }}
        >
            {/* Title in oval top-left */}
            <div
                style={{
                    position: "absolute",
                    top: "30px",
                    left: "10%",
                    padding: "4px 16px",
                    border: "2px solid white",
                    borderRadius: "40px",
                    background: "rgba(0, 102, 255, 0.4)",
                    color: "white",
                    fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
                    fontWeight: "400",
                    textAlign: "center",
                }}
            >
                How It Works
            </div>

            {/* Left Slogan & Right Tablet */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "60px",
                    width: "100%",
                }}
            >
                {/* Left Slogan */}
                <div style={{ flex: "1 1 400px", maxWidth: "500px" }}>
                    <h2
                        style={{
                            fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                            margin: "0 0 20px 0",
                            color: "#00D4FF",
                        }}
                    >
                        Simple, Powerful, Ready
                    </h2>
                    <p style={{ fontSize: "1.15rem", margin: 0 }}>
                        Our platform makes it easy for small businesses to connect with customers nearby. No complexity, just results.
                    </p>
                </div>

                {/* Right Tablet Image */}
                <div style={{ flex: "1 1 300px", display: "flex", justifyContent: "center" }}>
                    <div
                        style={{
                            background: "black",
                            borderRadius: "30px",
                            padding: "15px",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
                            aspectRatio: "4 / 3",
                            maxWidth: "400px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            overflow: "hidden",
                        }}
                    >
                        <img
                            src={howItWorksImage}
                            alt="Tablet Example"
                            style={{
                                width: "95%",
                                height: "95%",
                                objectFit: "cover",
                                objectPosition: "center 40%",
                                borderRadius: "20px",
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Three Boxes Below */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "30px",
                    marginTop: "60px",
                    justifyContent: "center",
                }}
            >
                {[
                    {
                        number: "1",
                        title: "Register Your Business",
                        text: "Sign up and submit your business for approval. Once verified, you'll have access to your 4Serve dashboard.",
                    },
                    {
                        number: "2",
                        title: "Create Your Profile",
                        text: "Add photos, links, and socials to show customers why to follow you.",
                    },
                    {
                        number: "3",
                        title: "Set Your Location",
                        text: "Add your address and write your message. When customers walk by, they get your message instantly.",
                    },
                ].map((box, index) => (
                    <div
                        key={index}
                        className="how-box"
                        style={{
                            flex: "1 1 250px",
                            minWidth: "250px",
                            maxWidth: "300px",
                            background: "#222224",
                            borderRadius: "20px",
                            padding: "20px",
                            textAlign: "center",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                        }}
                    >
                        <h3 style={{ fontSize: "1.3rem", marginBottom: "10px", color: "#00D4FF", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                            <span
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "30px",
                                    height: "30px",
                                    borderRadius: "50%",
                                    background: "#00D4FF",
                                    color: "#161618",
                                    fontWeight: "700",
                                }}
                            >
                                {box.number}
                            </span>
                            {box.title}
                        </h3>
                        <p style={{ fontSize: "1rem", margin: 0 }}>{box.text}</p>
                    </div>
                ))}
            </div>

            {/* Styles for hover animation and responsiveness */}
            <style>{`
                .how-box:hover {
                    transform: translateY(-10px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }

                @media (max-width: 768px) {
                    #how-it-works-section div:nth-child(2) {
                        flex-direction: column;
                        gap: 40px;
                        align-items: center;
                    }
                }
            `}</style>
        </section>
    );
};

export default HowItWorks;
