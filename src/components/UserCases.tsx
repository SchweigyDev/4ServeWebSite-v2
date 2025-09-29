import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Replace with 10 different photos
import img1 from "../assets/images/4ServeLogoStandAlone.jpg";
import img2 from "../assets/images/4ServeLogoStandAlone.jpg";
import img3 from "../assets/images/4ServeLogoStandAlone.jpg";
import img4 from "../assets/images/4ServeLogoStandAlone.jpg";
import img5 from "../assets/images/4ServeLogoStandAlone.jpg";
import img6 from "../assets/images/4ServeLogoStandAlone.jpg";
import img7 from "../assets/images/4ServeLogoStandAlone.jpg";
import img8 from "../assets/images/4ServeLogoStandAlone.jpg";
import img9 from "../assets/images/4ServeLogoStandAlone.jpg";
import img10 from "../assets/images/4ServeLogoStandAlone.jpg";

const UserCases: React.FC = () => {
    const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10];
    const [index, setIndex] = useState(0);
    const [rotationValue, setRotationValue] = useState(0);
    const [enlarged, setEnlarged] = useState(false);

    const next = () => {
        setIndex((i) => (i + 1) % images.length);
        setRotationValue((prev) => prev - 360 / images.length);
        setEnlarged(false);
    };

    const prev = () => {
        setIndex((i) => (i - 1 + images.length) % images.length);
        setRotationValue((prev) => prev + 360 / images.length);
        setEnlarged(false);
    };

    const jumpTo = (num: number) => {
        const newIndex = (num - 1 + images.length) % images.length;
        setIndex(newIndex);
        setRotationValue(-(360 / images.length) * newIndex);
        setEnlarged(false);
    };

    const { rotation } = useSpring({
        rotation: rotationValue,
        config: { tension: 200, friction: 25 },
    });

    const bind = useDrag(({ down, movement: [mx], direction: [xDir], velocity }) => {
        if (!down && velocity > 0.2) {
            if (xDir < 0) next();
            else prev();
        }
    });

    const arrowStyle: React.CSSProperties = {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        background: "linear-gradient(145deg, #0066FF, #00CCFF)",
        color: "white",
        border: "none",
        borderRadius: "12px",
        width: "42px",
        height: "42px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.1rem",
        boxShadow: "0 0 15px #00CCFF, 0 0 25px #0066FF, 0 4px 10px rgba(0,0,0,0.35)",
        transition: "all 0.25s ease",
        backdropFilter: "blur(6px)",
        zIndex: 3,
    };

    return (
        <section
            style={{
                position: "relative",
                width: "100vw",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "clamp(100px, 10vw, 120px) 0 80px",
                background: "rgba(0, 102, 255, 0.1)", // full-width background
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
                User Cases
            </div>

            {/* Slogan and sentences above the wheel */}
            <div style={{ textAlign: "center", marginBottom: "30px", maxWidth: "800px" }}>
                <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", margin: "0 0 10px 0", color: "#00D4FF" }}>
                    See Our Solutions in Action
                </h2>
                <p style={{ fontSize: "1.15rem", margin: "0 0 10px 0", color: "#00D4FF" }}>
                    Explore how our solutions shine across different scenarios. Swipe or click to see each case.
                </p>
                <p style={{ fontSize: "1rem", margin: "0", color: "#00D4FF" }}>
                    Each case highlights real-world applications tailored for your business needs.
                </p>
            </div>

            {/* Jump Buttons as glowing oval pills */}
            <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "12px", marginBottom: "20px" }}>
                {images.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => jumpTo(i + 1)}
                        style={{
                            padding: "8px 20px",
                            fontSize: "0.95rem",
                            borderRadius: "30px",
                            border: "2px solid rgba(0,204,255,0.7)",
                            cursor: "pointer",
                            background: "rgba(0,102,255,0.3)",
                            color: "white",
                            boxShadow: "0 0 10px #00CCFF, 0 0 20px #0066FF",
                            transition: "transform 0.2s, background 0.2s",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.05)";
                            e.currentTarget.style.background = "rgba(0,102,255,0.6)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.background = "rgba(0,102,255,0.3)";
                        }}
                    >
                        Case {i + 1}
                    </button>
                ))}
            </div>

            {/* Left & Right Arrows */}
            <button onClick={prev} style={{ ...arrowStyle, left: "10px" }}>
                <FaArrowLeft />
            </button>
            <button onClick={next} style={{ ...arrowStyle, right: "10px" }}>
                <FaArrowRight />
            </button>

            {/* Wheel container */}
            <div
                {...bind()}
                style={{
                    width: "100%",
                    height: "460px",
                    perspective: "1400px",
                    position: "relative",
                }}
            >
                <animated.div
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        transformStyle: "preserve-3d",
                        rotateY: rotation.to((r) => `${r}deg`),
                    }}
                >
                    {images.map((img, i) => {
                        const angle = (360 / images.length) * i;
                        const isTop = i === index;

                        // Slight tilt
                        const tilt = ((i - index + images.length) % images.length) - Math.floor(images.length / 2);
                        const tiltRotation = tilt * 1; // further reduced

                        return (
                            <div
                                key={i}
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    width: isTop && enlarged ? "220px" : "160px",
                                    height: isTop && enlarged ? "360px" : "260px",
                                    transform: `rotateY(${angle}deg) translateZ(420px) rotateX(${tiltRotation}deg)`,
                                    transformStyle: "preserve-3d",
                                    margin: isTop && enlarged ? "-180px -110px" : "-130px -80px",
                                    transition: "all 0.3s ease",
                                    cursor: isTop ? "pointer" : "default",
                                    zIndex: isTop ? 10 : 1,
                                }}
                                onClick={() => {
                                    if (isTop) setEnlarged((prev) => !prev);
                                }}
                            >
                                <img
                                    src={img}
                                    alt={`Slide ${i}`}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "20px",
                                        border: "4px solid #0066FF",
                                        boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
                                        background: "white",
                                    }}
                                />
                            </div>
                        );
                    })}
                </animated.div>
            </div>
        </section>
    );
};

export default UserCases;
