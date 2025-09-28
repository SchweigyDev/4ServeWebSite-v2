import React from "react";
import phone1 from "../assets/images/4ServeLogoStandAlone.jpg";
import phone2 from "../assets/images/4ServeLogoStandAlone.jpg";
import phone3 from "../assets/images/4ServeLogoStandAlone.jpg";
import phone4 from "../assets/images/4ServeLogoStandAlone.jpg";

const TheNextSection: React.FC = () => {
    return (
        <section
            id="user-cases-section"
            style={{
                scrollMarginTop: "100px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "clamp(60px, 6vw, 100px) 10% 60px",
                background: "rgba(0, 102, 255, 0.1)",
                color: "white",
                gap: "40px",
            }}
        >
            {/* Title Badge */}
            <div
                className="section-title-badge"
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
                User Cases
            </div>

            {/* Slogan + Sentences */}
            <div
                className="section-text-block"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "16px",
                    maxWidth: "600px",
                    textAlign: "center",
                }}
            >
                <p
                    style={{
                        fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                        color: "#0066FF",
                        fontWeight: "bold",
                        margin: 0,
                    }}
                >
                    <span style={{ fontWeight: "bold", color: "#0066FF" }}>4Serve</span>{" "}
                    in Action.
                </p>

                <p
                    style={{
                        fontSize: "clamp(1rem, 2.2vw, 1.3rem)",
                        margin: 0,
                    }}
                >
                    Small businesses across industries use <span style={{ fontWeight: "bold", color: "#0066FF" }}>4Serve</span>{" "}
                    to connect with<br />
                    customers at the perfect moment.
                </p>
            </div>

            {/* Phones */}
            <div
                className="phones-container"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    width: "100%",
                    maxWidth: "1100px",
                    flexWrap: "wrap",
                    gap: "20px",
                }}
            >
                {[phone1, phone2, phone3, phone4].map((phone, index) => (
                    <img
                        key={index}
                        src={phone}
                        alt={`Phone ${index + 1}`}
                        className="phone-img"
                        style={{
                            width: "160px",
                            height: "320px",
                            borderRadius: "20px",
                            objectFit: "cover",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
                            border: "4px solid #0066FF",
                        }}
                    />
                ))}
            </div>

            {/* Responsive Styles */}
            <style>{`
                /* Tablet: 2x2 layout */
                @media (max-width: 1024px) {
                    .phones-container {
                        justify-content: space-around;
                    }

                    .phone-img {
                        width: 140px;
                        height: 280px;
                    }
                }

                /* Mobile: horizontal scroll carousel */
                @media (max-width: 768px) {
                    .phones-container {
                        display: flex;
                        overflow-x: auto;
                        gap: 12px;
                        padding-bottom: 8px;
                        scroll-snap-type: x mandatory;
                    }

                    .phone-img {
                        flex: 0 0 auto;
                        width: 120px;
                        height: 240px;
                        scroll-snap-align: start;
                    }

                    /* Optional: hide scrollbar */
                    .phones-container::-webkit-scrollbar {
                        display: none;
                    }
                    .phones-container {
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    }
                }

                /* Extra spacing for title/text on smaller screens */
                @media (max-width: 1024px) {
                    .section-text-block {
                        margin-top: clamp(40px, 6vw, 60px);
                    }
                }
                @media (max-width: 768px) {
                    .section-text-block {
                        margin-top: clamp(50px, 8vw, 80px);
                    }
                }
                @media (max-width: 500px) {
                    .phone-img {
                        width: 100px;
                        height: 200px;
                    }
                }
            `}</style>
        </section>
    );
};

export default TheNextSection;
