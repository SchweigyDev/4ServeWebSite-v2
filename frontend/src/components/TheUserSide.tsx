import React, { useState } from "react";
import phone1 from "../assets/images_cropped/UserCaseIphone2.png";
import phone2 from "../assets/images_cropped/UserCaseIphone3.png";
import phone3 from "../assets/images_cropped/UserCaseIphone1.png";

type Phone = {
    src: string;
    alt: string;
};

const phones: Phone[] = [
    { src: phone1, alt: "Phone 1" },
    { src: phone2, alt: "Phone 2" },
    { src: phone3, alt: "Phone 3" },
];

/* ---------- Shared Card Shell for each option ---------- */
const OptionShell: React.FC<{ title: string; children: React.ReactNode }> = ({
                                                                                 title,
                                                                                 children,
                                                                             }) => (
    <div
        style={{
            borderRadius: 18,
            border: "1px solid rgba(0, 0, 0, 0.15)",
            background: "rgba(0, 0, 0, 0.25)",
            padding: "14px 14px 18px",
            marginBottom: 18,
            boxShadow: "0 10px 24px rgba(0, 0, 0, 0.35)",
        }}
    >
        <div
            style={{
                fontSize: "0.9rem",
                opacity: 0.9,
                marginBottom: 8,
                letterSpacing: 0.4,
                textTransform: "uppercase",
            }}
        >
            {title}
        </div>
        {children}
    </div>
);

/* ---------- Small helper: phone image UI ---------- */
const PhoneImage: React.FC<{
    phone: Phone;
    onClick?: () => void;
    width?: number;
    height?: number;
}> = ({ phone, onClick, width = 220, height = 440 }) => (
    <img
        src={phone.src}
        alt={phone.alt}
        style={{
            width,
            height,
            borderRadius: 22,
            objectFit: "contain",
            boxShadow: "0 8px 22px rgba(0,0,0,0.55)",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            transition: "transform 0.2s ease, boxShadow 0.2s ease",
        }}
        onClick={onClick}
        onMouseEnter={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)";
            (e.currentTarget as HTMLImageElement).style.boxShadow =
                "0 10px 28px rgba(0,0,0,0.7)";
        }}
        onMouseLeave={(e) => {
            (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
            (e.currentTarget as HTMLImageElement).style.boxShadow =
                "0 8px 22px rgba(0,0,0,0.55)";
        }}
    />
);

/* ---------- Option 1: Classic Arrow Carousel (fade) ---------- */
const OptionArrowCarousel: React.FC<{
    onPhoneClick: (src: string) => void;
}> = ({ onPhoneClick }) => {
    const [index, setIndex] = useState(0);
    const count = phones.length;

    const prev = () => setIndex((i) => (i - 1 + count) % count);
    const next = () => setIndex((i) => (i + 1) % count);

    return (
        <OptionShell title="Option 1 — Arrow Carousel">
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 12,
                }}
            >
                <button
                    onClick={prev}
                    style={{
                        borderRadius: "999px",
                        border: "none",
                        width: 32,
                        height: 32,
                        cursor: "pointer",
                        background:
                            "radial-gradient(circle at 30% 20%, #00D4FF, #0033AA 80%)",
                        color: "white",
                        fontSize: 14,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                    }}
                >
                    ◀
                </button>
                <div
                    style={{
                        position: "relative",
                        width: 220,
                        height: 440,
                        overflow: "hidden",
                    }}
                >
                    {phones.map((p, i) => (
                        <div
                            key={p.src}
                            style={{
                                position: "absolute",
                                inset: 0,
                                opacity: i === index ? 1 : 0,
                                transform: i === index ? "translateX(0)" : "translateX(10px)",
                                transition: "opacity 320ms ease, transform 320ms ease",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <PhoneImage phone={p} onClick={() => onPhoneClick(p.src)} />
                        </div>
                    ))}
                </div>
                <button
                    onClick={next}
                    style={{
                        borderRadius: "999px",
                        border: "none",
                        width: 32,
                        height: 32,
                        cursor: "pointer",
                        background:
                            "radial-gradient(circle at 70% 20%, #00D4FF, #0033AA 80%)",
                        color: "white",
                        fontSize: 14,
                        boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                    }}
                >
                    ▶
                </button>
            </div>
            <div
                style={{
                    marginTop: 8,
                    display: "flex",
                    justifyContent: "center",
                    gap: 8,
                }}
            >
                {phones.map((_, i) => (
                    <span
                        key={i}
                        style={{
                            width: i === index ? 24 : 8,
                            height: 6,
                            borderRadius: 999,
                            background:
                                i === index ? "rgba(0,212,255,0.9)" : "rgba(255,255,255,0.35)",
                            transition: "all 200ms ease",
                        }}
                    />
                ))}
            </div>
        </OptionShell>
    );
};

/* ---------- Option 2: Scrollbar + Snap Strip ---------- */
const OptionScrollSnap: React.FC<{ onPhoneClick: (src: string) => void }> = ({
                                                                                 onPhoneClick,
                                                                             }) => (
    <OptionShell title="Option 2 — Scroll Strip (Snap)">
        <div
            style={{
                overflowX: "auto",
                paddingBottom: 6,
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                display: "flex",
                gap: 24,
                maxWidth: "100%",
            }}
            className="scroll-strip"
        >
            {phones.map((p) => (
                <div
                    key={p.src}
                    style={{
                        flex: "0 0 auto",
                        scrollSnapAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                    }}
                >
                    <PhoneImage phone={p} onClick={() => onPhoneClick(p.src)} />
                </div>
            ))}
        </div>
    </OptionShell>
);

/* ---------- Option 3: Dot-Only Carousel (minimal) ---------- */
const OptionDotCarousel: React.FC<{ onPhoneClick: (src: string) => void }> = ({
                                                                                  onPhoneClick,
                                                                              }) => {
    const [index, setIndex] = useState(0);

    return (
        <OptionShell title="Option 3 — Minimal Dots">
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: 10,
                }}
            >
                <PhoneImage
                    phone={phones[index]}
                    onClick={() => onPhoneClick(phones[index].src)}
                />
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 10,
                }}
            >
                {phones.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setIndex(i)}
                        style={{
                            width: i === index ? 26 : 12,
                            height: 12,
                            borderRadius: 999,
                            border: "none",
                            cursor: "pointer",
                            background:
                                i === index
                                    ? "linear-gradient(90deg, #0066FF, #00D4FF)"
                                    : "rgba(255,255,255,0.3)",
                            transition: "all 200ms ease",
                        }}
                    />
                ))}
            </div>
        </OptionShell>
    );
};

/* ---------- Option 4: Peek Carousel (center focus with side peeks) ---------- */
const OptionPeekCarousel: React.FC<{ onPhoneClick: (src: string) => void }> = ({
                                                                                   onPhoneClick,
                                                                               }) => {
    const [index, setIndex] = useState(0);
    const count = phones.length;

    const prev = () => setIndex((i) => (i - 1 + count) % count);
    const next = () => setIndex((i) => (i + 1) % count);

    const getPhone = (offset: number) =>
        phones[(index + offset + count) % count];

    return (
        <OptionShell title="Option 4 — Peek Carousel">
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                }}
            >
                <button
                    onClick={prev}
                    style={{
                        borderRadius: "999px",
                        border: "none",
                        width: 30,
                        height: 30,
                        cursor: "pointer",
                        background: "rgba(0,0,0,0.7)",
                        color: "white",
                        fontSize: 14,
                    }}
                >
                    ◀
                </button>

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        width: 360,
                        justifyContent: "center",
                    }}
                >
                    {/* Left peek */}
                    <div
                        style={{
                            opacity: 0.45,
                            transform: "scale(0.78)",
                            filter: "blur(0.3px)",
                        }}
                    >
                        <PhoneImage
                            phone={getPhone(-1)}
                            onClick={() => onPhoneClick(getPhone(-1).src)}
                            width={150}
                            height={300}
                        />
                    </div>

                    {/* Center focus */}
                    <div
                        style={{
                            transform: "scale(1.02)",
                        }}
                    >
                        <PhoneImage
                            phone={getPhone(0)}
                            onClick={() => onPhoneClick(getPhone(0).src)}
                            width={220}
                            height={440}
                        />
                    </div>

                    {/* Right peek */}
                    <div
                        style={{
                            opacity: 0.45,
                            transform: "scale(0.78)",
                            filter: "blur(0.3px)",
                        }}
                    >
                        <PhoneImage
                            phone={getPhone(1)}
                            onClick={() => onPhoneClick(getPhone(1).src)}
                            width={150}
                            height={300}
                        />
                    </div>
                </div>

                <button
                    onClick={next}
                    style={{
                        borderRadius: "999px",
                        border: "none",
                        width: 30,
                        height: 30,
                        cursor: "pointer",
                        background: "rgba(0,0,0,0.7)",
                        color: "white",
                        fontSize: 14,
                    }}
                >
                    ▶
                </button>
            </div>
        </OptionShell>
    );
};

/* ---------- Option 5: “Filmstrip” with progress-like bar ---------- */
const OptionFilmstrip: React.FC<{ onPhoneClick: (src: string) => void }> = ({
                                                                                onPhoneClick,
                                                                            }) => {
    const [index, setIndex] = useState(0);
    const count = phones.length;

    const next = () => setIndex((i) => (i + 1) % count);
    const prev = () => setIndex((i) => (i - 1 + count) % count);

    return (
        <OptionShell title="Option 5 — Filmstrip Slider">
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    alignItems: "center",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                    }}
                >
                    <button
                        onClick={prev}
                        style={{
                            borderRadius: "999px",
                            border: "none",
                            width: 30,
                            height: 30,
                            cursor: "pointer",
                            background: "#003366",
                            color: "white",
                            fontSize: 14,
                        }}
                    >
                        ◀
                    </button>

                    {/* Main slide */}
                    <PhoneImage
                        phone={phones[index]}
                        onClick={() => onPhoneClick(phones[index].src)}
                    />

                    <button
                        onClick={next}
                        style={{
                            borderRadius: "999px",
                            border: "none",
                            width: 30,
                            height: 30,
                            cursor: "pointer",
                            background: "#003366",
                            color: "white",
                            fontSize: 14,
                        }}
                    >
                        ▶
                    </button>
                </div>

                {/* Small filmstrip below */}
                <div
                    style={{
                        display: "flex",
                        gap: 6,
                        paddingTop: 4,
                    }}
                >
                    {phones.map((p, i) => (
                        <img
                            key={p.src}
                            src={p.src}
                            alt={p.alt}
                            onClick={() => setIndex(i)}
                            style={{
                                width: 60,
                                height: 120,
                                objectFit: "contain",
                                borderRadius: 10,
                                opacity: i === index ? 1 : 0.4,
                                border:
                                    i === index
                                        ? "2px solid rgba(0,212,255,0.9)"
                                        : "1px solid rgba(255,255,255,0.2)",
                                cursor: "pointer",
                                transition: "all 200ms ease",
                            }}
                        />
                    ))}
                </div>
            </div>
        </OptionShell>
    );
};

/* ---------- Option 6: Slider Bar (range input, 1 phone at a time) ---------- */
const OptionRangeSlider: React.FC<{ onPhoneClick: (src: string) => void }> = ({
                                                                                  onPhoneClick,
                                                                              }) => {
    const [index, setIndex] = useState(0);
    const maxIndex = phones.length - 1;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIndex(parseInt(e.target.value, 10));
    };

    return (
        <OptionShell title="Option 6 — Range Slider">
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                }}
            >
                <PhoneImage
                    phone={phones[index]}
                    onClick={() => onPhoneClick(phones[index].src)}
                />
                <div
                    style={{
                        width: "100%",
                        maxWidth: 260,
                        display: "flex",
                        flexDirection: "column",
                        gap: 6,
                    }}
                >
                    <input
                        type="range"
                        min={0}
                        max={maxIndex}
                        step={1}
                        value={index}
                        onChange={handleChange}
                        style={{
                            width: "100%",
                        }}
                        className="phone-range-slider"
                    />
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontSize: "0.7rem",
                            opacity: 0.8,
                        }}
                    >
                        {phones.map((p, i) => (
                            <span
                                key={p.src}
                                style={{
                                    color: i === index ? "#00D4FF" : "#FFFFFF99",
                                }}
                            >
                {i + 1}
              </span>
                        ))}
                    </div>
                </div>
            </div>
        </OptionShell>
    );
};

/* ===================================================
   Main Section: TheUserSide
=================================================== */
const TheUserSide: React.FC = () => {
    const [activePhone, setActivePhone] = useState<string | null>(null);

    const handlePhoneClick = (src: string) => setActivePhone(src);

    return (
        <section
            id="user-side-section"
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
                The User Side
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    gap: "60px",
                    width: "100%",
                }}
            >
                {/* Left Text */}
                <div
                    className="user-text-block"
                    style={{
                        flex: "1 1 380px",
                        maxWidth: "500px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                        justifyContent: "center",
                    }}
                >
                    <p
                        className="user-slogan"
                        style={{
                            fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                            margin: 0,
                            textAlign: "center",
                            color: "#0066FF",
                            whiteSpace: "nowrap",
                            fontWeight: "bold",
                        }}
                    >
                        Why Customers Choose 4Serve
                    </p>

                    <p
                        className="user-subline"
                        style={{
                            fontSize: "clamp(1rem, 2.2vw, 1.3rem)",
                            margin: 0,
                            textAlign: "left",
                            whiteSpace: "nowrap",
                        }}
                    >
                        Other platforms train users to ignore business messages. <br />
                        <span style={{ fontWeight: "bold", color: "#0066FF" }}>4Serve</span>{" "}
                        makes them want to engage.
                    </p>

                    <ul
                        style={{
                            display: "inline-block",
                            margin: "0 auto",
                            textAlign: "left",
                            paddingLeft: "1.2em",
                            lineHeight: "1.6",
                        }}
                    >
                        <li>
              <span
                  style={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      color: "#0099FF",
                  }}
              >
                Location-based
              </span>{" "}
                            - Messages only appear when customers are nearby and can actually
                            visit your business.
                        </li>
                        <li>
              <span
                  style={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      color: "#0099FF",
                  }}
              >
                Permission-driven
              </span>{" "}
                            - Users follow businesses they want to hear from, so your message
                            lands with interested customers.
                        </li>
                        <li>
              <span
                  style={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      color: "#0099FF",
                  }}
              >
                Real-Time
              </span>{" "}
                            - Customers get updates exactly when they need them, not hours
                            later in a crowded feed.
                        </li>
                    </ul>
                </div>

                {/* Right: All slider experiments stacked */}
                <div
                    className="user-phones-block"
                    style={{
                        flex: "1 1 380px",
                        maxWidth: 520,
                    }}
                >
                    <OptionArrowCarousel onPhoneClick={handlePhoneClick} />
                    <OptionScrollSnap onPhoneClick={handlePhoneClick} />
                    <OptionDotCarousel onPhoneClick={handlePhoneClick} />
                    <OptionPeekCarousel onPhoneClick={handlePhoneClick} />
                    <OptionFilmstrip onPhoneClick={handlePhoneClick} />
                    <OptionRangeSlider onPhoneClick={handlePhoneClick} />
                </div>
            </div>

            {/* Modal for phone */}
            {activePhone && (
                <div
                    onClick={() => setActivePhone(null)}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100vw",
                        height: "100vh",
                        background: "rgba(0,0,0,0.7)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 1000,
                        cursor: "pointer",
                    }}
                >
                    <img
                        src={activePhone}
                        alt="Enlarged Phone"
                        style={{
                            maxWidth: "90%",
                            maxHeight: "90%",
                            borderRadius: "20px",
                            boxShadow: "0 12px 40px rgba(0,0,0,0.6)",
                        }}
                    />
                </div>
            )}

            {/* Responsive Styles */}
            <style>{`
        @media (max-width: 1024px) {
          .user-text-block {
            margin-top: clamp(20px, 5vw, 40px);
          }
          .user-phones-block {
            margin-top: 10px;
          }
        }

        @media (max-width: 768px) {
          .user-text-block {
            margin-top: clamp(30px, 6vw, 50px);
          }
          .user-phones-block {
            margin-top: 20px;
          }
          .user-slogan {
            white-space: normal;
            font-size: 1.4rem;
          }
          .user-subline {
            white-space: normal;
            font-size: 1rem;
          }

          .scroll-strip img {
            width: 190px !important;
            height: 380px !important;
          }
        }

        @media (max-width: 500px) {
          .scroll-strip {
            gap: 18px;
          }
        }

        /* Thin scrollbar for the scroll-strip on desktop */
        .scroll-strip::-webkit-scrollbar {
          height: 6px;
        }
        .scroll-strip::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.25);
          border-radius: 3px;
        }
        .scroll-strip::-webkit-scrollbar-thumb {
          background: rgba(0,212,255,0.7);
          border-radius: 3px;
        }

        /* Range slider styling */
        .phone-range-slider {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          border-radius: 999px;
          background: linear-gradient(90deg, #0066FF, #00D4FF);
          outline: none;
        }
        .phone-range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #00D4FF;
          box-shadow: 0 0 6px rgba(0,212,255,0.7);
          cursor: pointer;
        }
        .phone-range-slider::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #ffffff;
          border: 2px solid #00D4FF;
          box-shadow: 0 0 6px rgba(0,212,255,0.7);
          cursor: pointer;
        }
      `}</style>
        </section>
    );
};

export default TheUserSide;
