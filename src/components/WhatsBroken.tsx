// import React from "react";
import { animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";

const WhatsBroken = () => {
    const boxes = [
        {
            title: "Priced Out of Powerful Tools",
            text: `Big company customer connection tools cost big company 
money—budgets most small businesses can't justify.`,
        },
        {
            title: "Messages That Miss the Moment",
            text: `Your customer needs you right now, right outside — 
but your message won't reach them until tonight.`,
        },
        {
            title: "Juggling a Dozen Tools",
            text: `Managing your online presence shouldn't require a 
computer science degree and full-time staff.`,
        },
        {
            title: "Shouting Into the Void",
            text: `You post hoping someone notices, while interested 
customers walk right past your door.`,
        },
    ];

    const [refLeft, inViewLeft] = useInView({ triggerOnce: true, threshold: 0.2 });
    const [refRight, inViewRight] = useInView({ triggerOnce: true, threshold: 0.2 });

    return (
        <section
            id="whats-broken-section"
            style={{
                scrollMarginTop: "10px",
                position: "relative",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "clamp(50px, 6vw, 80px) 10% 80px",
                background: "rgba(0, 102, 255, 0.1)",
                borderTop: "2px solid #0066FF",
                borderRadius: "12px",
                color: "white",
                gap: "clamp(20px, 5vw, 40px)",
                flexWrap: "wrap",
            }}
        >
            {/* Section Title */}
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
                What's Broken
            </div>

            {/* Left Slogan */}
            <div
                ref={refLeft}
                style={{
                    flex: "1 1 300px",
                    maxWidth: "400px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "20px", // slightly larger gap for even spacing
                    marginTop: "30px",
                    marginBottom: "clamp(20px, 3vw, 40px)",
                }}
            >
                {[
                    <>Every <span className="highlight">Business</span></>,
                    <span>Knows These</span>,
                    <span className="plain-word">Problems</span>,
                ].map((line, index) => (
                    <animated.p
                        key={index}
                        className="slogan-text"
                        style={{
                            transform: inViewLeft ? "translateX(0)" : "translateX(-120vw)",
                            opacity: inViewLeft ? 1 : 0,
                            transition: `all 1.5s ease-out ${index * 0.6}s`,
                            margin: 0,
                            whiteSpace: "nowrap",
                            lineHeight: 1.4, // consistent line height for even spacing
                        }}
                    >
                        {line}
                    </animated.p>
                ))}
            </div>

            {/* Right Boxes */}
            <div
                ref={refRight}
                style={{
                    flex: "2 1 500px",
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gridGap: "clamp(15px, 3vw, 20px)",
                    minWidth: "280px",
                }}
            >
                {boxes.map((box, index) => (
                    <div key={index} className="broken-box-wrapper">
                        <animated.div
                            style={{
                                transform: inViewRight
                                    ? "translateX(0)"
                                    : `translateX(${index % 2 === 0 ? "-120vw" : "120vw"})`,
                                opacity: inViewRight ? 1 : 0,
                                transition: `all 1.8s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.4}s`,
                                background: "rgba(0, 102, 255, 0.2)",
                                padding: "clamp(15px, 2vw, 20px)",
                                borderRadius: "10px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "clamp(8px, 1vw, 10px)",
                                minHeight: "140px",
                                border: "1px solid #0066FF",
                                boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
                            }}
                        >
                            <h3
                                style={{
                                    fontSize: "clamp(1rem, 1.5vw, 1.5rem)",
                                    margin: 0,
                                    color: "#00D4FF",
                                }}
                            >
                                {box.title}
                            </h3>
                            <p
                                style={{
                                    fontSize: "clamp(0.85rem, 1.2vw, 1rem)",
                                    margin: 0,
                                    color: "#CCCCCC",
                                    lineHeight: 1.5,
                                }}
                            >
                                {box.text}
                            </p>
                        </animated.div>
                    </div>
                ))}
            </div>

            {/* Styles */}
            <style>{`
        .slogan-text {
          font-size: clamp(1.5rem, 2.5vw, 2.5rem);
          margin: 0;
          font-weight: 600;
        }
        .highlight {
          color: #00CCFF;
          font-weight: 700;
        }
        .plain-word {
          color: #00BFFF;
          font-weight: 800;
        }

        /* Wrapper Hover Pop */
        .broken-box-wrapper {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .broken-box-wrapper:hover {
          transform: scale(1.15) translateY(-8px);
          box-shadow: 0 12px 35px rgba(0,0,0,0.55);
        }

        @media (min-width: 1440px) {
          .slogan-text {
            margin-top: 90px;
            font-size: 3rem;
          }
        }
      `}</style>
        </section>
    );
};

export default WhatsBroken;
