import React, { useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

// ✅ Use your 8 cropped phone images
import i1 from "../assets/images_cropped/Iphone1.png";
import i2 from "../assets/images_cropped/Iphone2.png";
import i3 from "../assets/images_cropped/Iphone3.png";
import i4 from "../assets/images_cropped/Iphone4.png";
import i5 from "../assets/images_cropped/Iphone5.png";
import i6 from "../assets/images_cropped/Iphone6.png";
import i7 from "../assets/images_cropped/Iphone7.png";
import i8 from "../assets/images_cropped/Iphone8.png";

const UserCases: React.FC = () => {
    const images = [
        { src: i1, name: "Case 1" },
        { src: i2, name: "Case 2" },
        { src: i3, name: "Case 3" },
        { src: i4, name: "Case 4" },
        { src: i5, name: "Case 5" },
        { src: i6, name: "Case 6" },
        { src: i7, name: "Case 7" },
        { src: i8, name: "Case 8" },
    ];

    const len = images.length;
    const angle = 360 / len;

    // 🔁 Continuous spin using react-spring
    const { rotation } = useSpring({
        from: { rotation: 0 },
        to: async (next) => {
            while (true) {
                await next({ rotation: 360 });
                await next({ rotation: 0 });
            }
        },
        config: { duration: 20000 }, // slower = higher number; try 10000 for faster
        loop: true,
    });

    useEffect(() => {
        document.title = "User Cases Auto Spin";
    }, []);

    return (
        <section
            id="user-cases-section"
            style={{
                position: "relative",
                width: "100%",
                overflow: "hidden",
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
            {/* Title */}
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
                <h2
                    style={{
                        fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
                        margin: 0,
                        color: "#00D4FF",
                    }}
                >
                    See Our Solutions in Action
                </h2>
                <p style={{ margin: "8px 0 0 0", color: "#00D4FF" }}>
                    Explore how our solutions shine across different scenarios.
                </p>
            </div>

            {/* Continuous spinning wheel */}
            <div
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
                    }}
                >
                    {images.map((img, i) => {
                        const angleDeg = i * angle;
                        return (
                            <div
                                key={img.name}
                                style={{
                                    position: "absolute",
                                    top: "50%",
                                    left: "50%",
                                    width: "200px",
                                    height: "360px",
                                    transform: `rotateY(${angleDeg}deg) translateZ(400px)`,
                                    transformStyle: "preserve-3d",
                                    margin: "-180px -100px",
                                    transition: "all 0.55s ease",
                                }}
                            >
                                <img
                                    src={img.src}
                                    alt={img.name}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                        borderRadius: 20,
                                        // 👇 removed blue border & background
                                        border: "none",
                                        boxShadow: "0 8px 22px rgba(0,0,0,0.45)",
                                        background: "transparent",
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
