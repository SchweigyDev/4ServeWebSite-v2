import React, { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "react-use-gesture";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// Use your placement image
import placeholder from "../assets/images/4ServeLogoStandAlone.jpg";

const UserCases: React.FC = () => {
    const images = [
        { src: placeholder, name: "Case 1" },
        { src: placeholder, name: "Case 2" },
        { src: placeholder, name: "Case 3" },
        { src: placeholder, name: "Case 4" },
        { src: placeholder, name: "Case 5" },
        { src: placeholder, name: "Case 6" },
        { src: placeholder, name: "Case 7" },
        { src: placeholder, name: "Case 8" },
        { src: placeholder, name: "Case 9" },
        { src: placeholder, name: "Case 10" },
    ];

    const len = images.length;
    const angle = 360 / len; // degrees between cards

    const [topIndex, setTopIndex] = useState(0); // logical top card
    const [enlarged, setEnlarged] = useState(false);

    const SHRINK_DURATION = 180;
    const ROTATE_DURATION = 480;

    // track the wheel rotation in degrees
    const { rotation } = useSpring({
        rotation: -topIndex * angle,
        config: { tension: 220, friction: 28 },
    });

    // helper: compute minimal angular path for jump
    const minimalIndexDiff = (from: number, to: number) => {
        let diff = to - from;
        if (diff > len / 2) diff -= len;
        if (diff < -len / 2) diff += len;
        return diff;
    };

    // arrows: move one visual card left/right
    const next = () => {
        if (enlarged) {
            setEnlarged(false);
            setTimeout(() => setTopIndex((prev) => (prev + 1) % len), SHRINK_DURATION);
        } else {
            setTopIndex((prev) => (prev + 1) % len);
        }
    };

    const prev = () => {
        if (enlarged) {
            setEnlarged(false);
            setTimeout(
                () => setTopIndex((prev) => (prev - 1 + len) % len),
                SHRINK_DURATION
            );
        } else {
            setTopIndex((prev) => (prev - 1 + len) % len);
        }
    };

    // jump to a specific card using minimal rotation
    const jumpTo = (num: number) => {
        const targetIndex = (num - 1 + len) % len;

        if (targetIndex === topIndex) {
            setEnlarged((p) => !p);
            return;
        }

        const diff = minimalIndexDiff(topIndex, targetIndex);

        if (enlarged) {
            setEnlarged(false);
            setTimeout(() => {
                setTopIndex((prev) => (prev + diff + len) % len);
                setTimeout(() => setEnlarged(true), ROTATE_DURATION);
            }, SHRINK_DURATION);
        } else {
            setTopIndex((prev) => (prev + diff + len) % len);
            setTimeout(() => setEnlarged(true), ROTATE_DURATION);
        }
    };

    // swipe/drag
    const bind = useDrag(({ down, direction: [xDir], velocity }) => {
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
        width: "44px",
        height: "44px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.1rem",
        boxShadow: "0 0 15px #00CCFF, 0 0 25px #0066FF, 0 4px 10px rgba(0,0,0,0.35)",
        transition: "all 0.25s ease",
        backdropFilter: "blur(6px)",
        zIndex: 40,
    };

    return (
        <section
            id="user-cases-section"
            style={{
                position: "relative",
                width: "100%",
                overflowX: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                padding: "clamp(100px, 10vw, 120px) 0 80px",
                background: "rgba(0, 102, 255, 0.1)",
                color: "white",
                scrollMarginTop: "100px",
            }}
        >
            {/* Title badge */}
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
                    zIndex: 50,
                }}
            >
                User Cases
            </div>

            {/* Slogan */}
            <div style={{ textAlign: "center", marginBottom: "24px", maxWidth: 800 }}>
                <h2 style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", margin: 0, color: "#00D4FF" }}>
                    See Our Solutions in Action
                </h2>
                <p style={{ margin: "8px 0 0 0", color: "#00D4FF" }}>
                    Explore how our solutions shine across different scenarios. Swipe or click a case.
                </p>
            </div>

            {/* Jump buttons */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 10,
                    marginBottom: 18,
                    zIndex: 50,
                }}
            >
                {images.map((img, i) => (
                    <button
                        key={img.name}
                        onClick={() => jumpTo(i + 1)}
                        style={{
                            padding: "8px 18px",
                            fontSize: "0.92rem",
                            borderRadius: 26,
                            border: "2px solid rgba(0,204,255,0.7)",
                            cursor: "pointer",
                            background: "rgba(0,102,255,0.28)",
                            color: "white",
                            boxShadow: "0 0 8px #00CCFF, 0 0 16px #0066FF",
                            transition: "transform 0.15s, background 0.15s",
                        }}
                        onMouseEnter={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.06)";
                            (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,102,255,0.6)";
                        }}
                        onMouseLeave={(e) => {
                            (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                            (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,102,255,0.28)";
                        }}
                    >
                        {img.name}
                    </button>
                ))}
            </div>

            {/* Arrows */}
            <button onClick={prev} style={{ ...arrowStyle, left: "16%" }}>
                <FaArrowLeft />
            </button>
            <button onClick={next} style={{ ...arrowStyle, right: "16%" }}>
                <FaArrowRight />
            </button>

            {/* debug top */}
            <div style={{ position: "absolute", top: 10, right: 16, color: "white", zIndex: 60 }}>
                Top: {topIndex + 1} {enlarged ? "(enlarged)" : ""}
            </div>

            {/* Wheel */}
            <div
                {...bind()}
                style={{
                    width: "100%",
                    maxWidth: 980,
                    height: 480,
                    perspective: 1400,
                    position: "relative",
                    overflow: "hidden",
                    zIndex: 30,
                }}
            >
                <animated.div
                    style={{
                        width: "100%",
                        height: "100%",
                        position: "absolute",
                        transformStyle: "preserve-3d",
                        rotateY: rotation.to((r) => `${r}deg`),
                        scale: 0.92,
                    }}
                >
                    {images.map((img, i) => {
                        const isTop = i === topIndex;
                        const angleDeg = i * angle;

                        return (
                            <div
                                key={img.name}
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    width: isTop && enlarged ? "220px" : "160px",
                                    height: isTop && enlarged ? "360px" : "260px",
                                    transform: `rotateY(${angleDeg}deg) translateZ(380px)`,
                                    transformStyle: "preserve-3d",
                                    margin: isTop && enlarged ? "-180px -110px" : "-130px -80px",
                                    transition: "all 0.55s ease",
                                    cursor: isTop ? "pointer" : "default",
                                    zIndex: isTop ? 60 : 20,
                                    pointerEvents: isTop ? "auto" : "none",
                                }}
                                onClick={() => {
                                    if (isTop) setEnlarged((p) => !p);
                                }}
                            >
                                <img
                                    src={img.src}
                                    alt={img.name}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: 20,
                                        border: "4px solid #0066FF",
                                        boxShadow: "0 8px 22px rgba(0,0,0,0.45)",
                                        background: "white",
                                        display: "block",
                                        pointerEvents: "none",
                                    }}
                                />
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: -28,
                                        width: "100%",
                                        textAlign: "center",
                                        color: "white",
                                        fontWeight: "700",
                                        textShadow: "0 2px 6px rgba(0,0,0,0.5)",
                                    }}
                                >
                                    {img.name}
                                </div>
                            </div>
                        );
                    })}
                </animated.div>
            </div>
        </section>
    );
};

export default UserCases;
