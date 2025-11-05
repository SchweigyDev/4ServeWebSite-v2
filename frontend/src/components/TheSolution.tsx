// import React from "react";
import newLogo from "../assets/images/4ServeLogoStandAlone.jpg";

const SolutionPage = () => {
    return (
        <section
            id="solution-section"
            style={{
                position: "relative",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: "clamp(100px, 10vw, 120px) 10% 80px",
                background: "rgba(0, 102, 255, 0.1)",
                borderRadius: "12px",
                color: "white",
                flexWrap: "wrap",
                gap: "40px",
                scrollMarginTop: "100px",
            }}
        >
            {/* Title inside oval, left aligned */}
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
                The Solution
            </div>

            {/* Left Side: Tablet Photo */}
            <div
                style={{
                    flex: "1 1 400px",
                    maxWidth: "500px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        background: "black",
                        borderRadius: "30px",
                        padding: "15px",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
                        aspectRatio: "4 / 3",
                        width: "100%",
                        maxWidth: "480px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        overflow: "hidden",
                    }}
                >
                    <img
                        src={newLogo}
                        alt="Solution Tablet"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "center 40%",
                            borderRadius: "20px",
                        }}
                    />
                </div>
            </div>

            {/* Right Side: Text */}
            <div
                style={{
                    flex: "1 1 400px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    textAlign: "left",
                    gap: "15px",
                    transform: "translateX(60px)",
                }}
            >
                {/* Section 1: Slogan */}
                <h2
                    style={{
                        fontSize: "clamp(1rem, 2.5vw, 2.5rem)",
                        margin: 0,
                        color: "#0066FF",
                        fontWeight: "700",
                        paddingLeft: "50px",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    Control Back in Your Hands
                </h2>

                {/* Section 2 */}
                <p
                    style={{
                        fontSize: "1.15rem",
                        fontWeight: "400",
                        margin: "10px 0 0 0",
                        paddingLeft: "0",
                    }}
                >
                    Direct customer connection without custom development, complexity, or cost.
                </p>

                {/* Section 3: Title */}
                <p
                    style={{
                        fontSize: "1.5rem",
                        fontWeight: "750",
                        margin: "10px 0 0 0",
                        paddingLeft: "0",
                    }}
                >
                    What small businesses get:
                </p>

                {/* Section 4: Bullet points */}
                <ul
                    style={{
                        fontSize: "1rem",
                        fontWeight: "400",
                        margin: "10px 0 0 0",
                        paddingLeft: "60px",
                        lineHeight: 1.8,
                    }}
                >
                    <li>Connect with nearby customers when it matters;</li>
                    <li>Own your relationships, not rent them;</li>
                    <li>One simple dashboard for everything;</li>
                    <li>Customers choose you, so messages actually land.</li>
                </ul>

                {/* Section 5 */}
                <p
                    style={{
                        fontSize: "1.2rem",
                        fontWeight: "700",
                        fontStyle: "italic",
                        margin: "20px 0 0 0",
                        paddingLeft: "0",
                    }}
                >
                    Simple tools. Real results.
                </p>
            </div>

            {/* Responsive tweaks */}
            <style>{`
                @media (max-width: 768px) {
                    #solution-section {
                        flex-direction: column;
                        padding: 80px 5% 60px;
                    }

                    #solution-section div:nth-child(3) {
                        align-items: center !important;
                        text-align: center !important;
                        transform: none !important;
                        margin-left: 0 !important;
                        max-width: 100%;
                    }

                    /* Center text sections */
                    #solution-section div:nth-child(3) h2,
                    #solution-section div:nth-child(3) p {
                        padding-left: 0 !important;
                        text-align: center !important;
                        margin-left: 0 !important;
                        transform: none !important;
                    }

                    /* ✅ Bullets aligned vertically + centered as a block */
                    #solution-section div:nth-child(3) ul {
                        list-style-position: inside;
                        padding-left: 0 !important;
                        margin: 0 auto !important;
                        text-align: center !important;
                        display: inline-block;
                    }

                    #solution-section div:nth-child(3) ul li {
                        text-align: left;
                        display: list-item;
                    }

                    /* Section 5 aligned */
                    #solution-section div:nth-child(3) p:last-child {
                        padding-left: 0 !important;
                        margin-left: 0 !important;
                        text-align: center !important;
                        font-size: 1.15rem !important;
                    }

                    /* Section 1: bigger on mobile */
                    #solution-section div:nth-child(3) h2 {
                        font-size: clamp(2rem, 6vw, 2.8rem) !important;
                        margin-bottom: 10px;
                    }

                    /* Sections 2 & 3: slightly larger */
                    #solution-section div:nth-child(3) p:nth-child(2),
                    #solution-section div:nth-child(3) p:nth-child(3) {
                        font-size: 1.25rem !important;
                    }
                }

                /* Medium screens: shrink Section 1 to fit */
                @media (max-width: 1024px) and (min-width: 769px) {
                    #solution-section div:nth-child(3) h2 {
                        font-size: clamp(1rem, 2.2vw, 2rem);
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                    }
                }
            `}</style>
        </section>
    );
};

export default SolutionPage;
