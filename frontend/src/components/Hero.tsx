import { useState, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import heroVideo from "../assets/vidoes/heroSectionVideo1.mp4";

const Hero = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        const handleScroll = () => setScrollY(window.scrollY);

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const isMobile = windowWidth < 768;

    const leftAnim = useSpring({
        opacity: 1,
        transform: "translateY(0px)",
        from: { opacity: 0, transform: "translateY(20px)" },
        delay: 200,
    });

    const logoAnim = useSpring({
        transform: `translateY(${scrollY * 0.05}px) translateY(${
            Math.sin(scrollY / 50) * 5
        }px) scale(1)`,
        opacity: 1,
        from: { opacity: 0, transform: "scale(0.8) translateY(0px)" },
        config: { mass: 1, tension: 170, friction: 26 },
    });

    const lines = [
        "Tired of platforms deciding who sees your business?",
        "Done with posting and hoping customers notice?",
        "We are too.",
    ];

    return (
        <section
            id="hero-section"
            style={{
                display: "flex",
                justifyContent: "center",
                padding: isMobile ? "40px 5%" : "0px 10%",
                background: "linear-gradient(135deg, #161618 0%, #003366 100%)",
                color: "white",
                minHeight: "90vh",
                textAlign: isMobile ? "center" : "left",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <div
                style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: "center",
                    gap: isMobile ? "40px" : "60px",
                    maxWidth: 1400,   // ⬅️ Extra room for bigger video
                    width: "100%",
                }}
            >
                {/* Left Text Block */}
                <animated.div
                    style={{
                        ...leftAnim,
                        maxWidth: isMobile ? "100%" : "48%", // ⬅️ slightly narrower text to make room
                    }}
                >
                    <p
                        style={{
                            fontSize: isMobile
                                ? "1.4rem"
                                : "clamp(1.6rem, 2vw, 2rem)",
                            marginBottom: "15px",
                            fontWeight: 700,
                            background:
                                "linear-gradient(90deg, #0066FF, #00D4FF)",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                            textShadow:
                                "0 0 8px rgba(0,212,255,0.4)",
                            animation:
                                "glow 2s ease-in-out infinite alternate",
                        }}
                    >
                        Control When It Belongs.
                    </p>

                    {lines.map((line, idx) => (
                        <animated.p
                            key={idx}
                            style={{
                                fontSize: isMobile
                                    ? "1.2rem"
                                    : "clamp(1.3rem, 1.8vw, 1.5rem)",
                                margin: "10px 0",
                                opacity: 0,
                                transform: "translateY(20px)",
                                animation: `slideFadeIn 0.8s forwards ${
                                    idx * 0.4
                                }s`,
                            }}
                        >
                            {line}
                        </animated.p>
                    ))}

                    <p
                        style={{
                            fontSize: isMobile
                                ? "1rem"
                                : "clamp(1rem, 1.2vw, 1.1rem)",
                            marginTop: "20px",
                            color: "#AAAAAA",
                            lineHeight: 1.5,
                        }}
                    >
                        Stop shouting into the void. Start connecting with
                        customers who are actually nearby and ready to act.
                        Simple tools, real results, your control.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: isMobile ? "column" : "row",
                            gap: "15px",
                            marginTop: "20px",
                            alignItems: isMobile
                                ? "center"
                                : "flex-start",
                        }}
                    >
                        <a
                            href="#the-solution"
                            className="hero-btn primary-btn"
                        >
                            Free Trial
                        </a>
                        <a
                            href="#dashboard-login"
                            className="hero-btn secondary-btn"
                        >
                            Learn More
                        </a>
                    </div>
                </animated.div>

                {/* Right: Enlarged Hero Video */}
                <animated.div
                    style={{
                        ...logoAnim,
                        marginLeft: isMobile ? "0" : "60px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        maxWidth: isMobile ? "100%" : "52%", // ⬅️ wider area for video
                    }}
                >
                    <div
                        style={{
                            position: "relative",

                            // 📌 Bigger desktop size
                            width: isMobile
                                ? "min(90vw, 380px)"
                                : "min(48vw, 680px)",

                            height: isMobile
                                ? "min(52vw, 240px)"
                                : "min(28vw, 340px)",

                            borderRadius: 26,
                            overflow: "hidden",
                            background: "transparent",

                            transform: isMobile
                                ? "none"
                                : "rotateY(-8deg) rotateX(2deg)",

                            boxShadow: isMobile
                                ? "0 10px 22px rgba(0,0,0,0.45)"
                                : "0 18px 40px rgba(0,0,0,0.65)",

                            transformStyle: "preserve-3d",
                            border: "1px solid rgba(0,212,255,0.25)",
                        }}
                    >
                        <video
                            src={heroVideo}
                            autoPlay
                            muted
                            loop
                            playsInline
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                borderRadius: 26,
                                opacity: 0.95,
                                mixBlendMode: "screen",
                                filter:
                                    "brightness(1.12) contrast(1.05)",
                                transform: "scale(1.06)",
                                transformOrigin: "center center",
                                display: "block",
                            }}
                        />
                    </div>
                </animated.div>
            </div>

            {/* Styles */}
            <style>{`
        @keyframes glow {
          0% { text-shadow: 0 0 4px rgba(0,212,255,0.3); }
          50% { text-shadow: 0 0 12px rgba(0,212,255,0.6); }
          100% { text-shadow: 0 0 4px rgba(0,212,255,0.3); }
        }

        @keyframes slideFadeIn {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .hero-btn {
          padding: 10px 20px;
          border-radius: 6px;
          font-weight: 500;
          font-size: 0.9rem;
          text-decoration: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hero-btn:hover {
          transform: scale(1.05);
          box-shadow: 0 8px 20px rgba(0,212,255,0.4);
        }

        .primary-btn {
          background: linear-gradient(90deg, #0033CC, #00D4FF);
          color: white;
        }

        .secondary-btn {
          border: 2px solid #00D4FF;
          color: #00D4FF;
          background: transparent;
        }
      `}</style>
        </section>
    );
};

export default Hero;
