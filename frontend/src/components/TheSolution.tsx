import newLogo from "../assets/images_cropped/Laptop1.png";

const SolutionPage = () => {
    return (
        <section
            id="solution-section"
            style={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "clamp(100px, 10vw, 120px) 10% 80px",
                background: "rgba(0, 102, 255, 0.1)",
                borderRadius: "12px",
                color: "white",
                scrollMarginTop: "100px",
            }}
        >
            {/* Title in pill at top-left */}
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
                    fontWeight: 400,
                    textAlign: "center",
                }}
            >
                The Solution
            </div>

            {/* Centered content column: IMAGE (top) + TEXT (bottom) */}
            <div
                style={{
                    width: "100%",
                    maxWidth: "960px", // controls total width on large screens
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "32px",
                }}
            >
                {/* Top: Laptop + iPad image, large & responsive */}
                <div
                    style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src={newLogo}
                        alt="Solution devices"
                        style={{
                            width: "min(100%, 720px)", // big but still responsive
                            height: "auto",
                            objectFit: "contain",
                            display: "block",
                            border: "none",
                            boxShadow: "none",
                            background: "transparent",
                        }}
                    />
                </div>

                {/* Bottom: Text block, centered */}
                <div
                    style={{
                        width: "100%",
                        maxWidth: "620px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        gap: "14px",
                    }}
                >
                    {/* Slogan */}
                    <h2
                        style={{
                            fontSize: "clamp(1.6rem, 2.6vw, 2.6rem)",
                            margin: 0,
                            color: "#0066FF",
                            fontWeight: 700,
                        }}
                    >
                        Control Back in Your Hands
                    </h2>

                    {/* Subline */}
                    <p
                        style={{
                            fontSize: "1.15rem",
                            fontWeight: 400,
                            margin: "8px 0 0 0",
                        }}
                    >
                        Direct customer connection without custom development, complexity, or cost.
                    </p>

                    {/* Title before bullets */}
                    <p
                        style={{
                            fontSize: "1.5rem",
                            fontWeight: 750,
                            margin: "10px 0 0 0",
                        }}
                    >
                        What small businesses get:
                    </p>

                    {/* Bullets: block is centered, items are left-aligned */}
                    <ul
                        style={{
                            fontSize: "1rem",
                            fontWeight: 400,
                            margin: "10px auto 0",
                            paddingLeft: 0,
                            lineHeight: 1.8,
                            listStylePosition: "inside",
                            textAlign: "left",
                            maxWidth: "460px",
                        }}
                    >
                        <li>Connect with nearby customers when it matters;</li>
                        <li>Own your relationships, not rent them;</li>
                        <li>One simple dashboard for everything;</li>
                        <li>Customers choose you, so messages actually land.</li>
                    </ul>

                    {/* Tagline */}
                    <p
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: 700,
                            fontStyle: "italic",
                            margin: "20px 0 0 0",
                        }}
                    >
                        Simple tools. Real results.
                    </p>
                </div>
            </div>

            {/* Small tweak for very small screens */}
            <style>{`
                @media (max-width: 600px) {
                  #solution-section {
                    padding: 80px 6% 60px;
                  }
                }
            `}</style>
        </section>
    );
};

export default SolutionPage;
