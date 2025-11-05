import React, { useEffect, useMemo, useRef, useState } from "react";
import type { FC } from "react";

// ---------- Image imports ----------
import i1 from "../assets/images_cropped/Iphone1.png";
import i2 from "../assets/images_cropped/Iphone2.png";
import i3 from "../assets/images_cropped/Iphone3.png";
import i4 from "../assets/images_cropped/Iphone4.png";
import i5 from "../assets/images_cropped/Iphone5.png";
import i6 from "../assets/images_cropped/Iphone6.png";
import i7 from "../assets/images_cropped/Iphone7.png";
import i8 from "../assets/images_cropped/Iphone8.png";

export interface ImageItem {
    src: string;
    alt: string;
    caption?: string;
}

const baseImages: ImageItem[] = [
    { src: i1, alt: "Order flow", caption: "Order Flow" },
    { src: i2, alt: "Chef dashboard", caption: "Chef Dashboard" },
    { src: i3, alt: "Menu builder", caption: "Menu Builder" },
    { src: i4, alt: "Customer chat", caption: "Customer Chat" },
    { src: i5, alt: "Delivery tracking", caption: "Delivery Tracking" },
    { src: i6, alt: "Payments", caption: "Payments" },
    { src: i7, alt: "Reviews", caption: "Reviews" },
    { src: i8, alt: "Favorites", caption: "Favorites" },
];

const toEight = (items: ImageItem[]) => {
    const out: ImageItem[] = [];
    while (out.length < 8) out.push(...items.slice(0, 8 - out.length));
    return out.slice(0, 8);
};
const images8 = toEight(baseImages);

// ---------- Section wrapper ----------
const SectionCard: FC<{ title: string; subtitle?: string; children: React.ReactNode }> = ({
                                                                                              title,
                                                                                              subtitle,
                                                                                              children,
                                                                                          }) => (
    <section style={{ padding: "48px 0" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 16px" }}>
            <header style={{ marginBottom: 16 }}>
                <h2 style={{ fontSize: 28, fontWeight: 600, margin: 0 }}>{title}</h2>
                {subtitle && <p style={{ marginTop: 6, opacity: 0.75 }}>{subtitle}</p>}
            </header>
            <div
                style={{
                    borderRadius: 16,
                    border: "1px solid rgba(0,0,0,.08)",
                    background: "rgba(255,255,255,.04)",
                    padding: 16,
                    boxShadow: "0 10px 24px rgba(0,0,0,.08)",
                }}
            >
                {children}
            </div>
        </div>
    </section>
);

// ---------- Option 1: Infinite Ribbon ----------
const InfiniteRibbon: FC<{ images: ImageItem[]; speed?: number }> = ({ images, speed = 50 }) => {
    const track = useMemo(() => [...images, ...images], [images]);
    const durationSec = Math.max((images.length * 280) / speed, 10);
    const keyframes = `
    @keyframes ribbonScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  `;

    return (
        <div style={{ position: "relative", overflow: "hidden" }}>
            <style>{keyframes}</style>
            <div
                style={{
                    width: "200%",
                    display: "flex",
                    alignItems: "center",
                    gap: 24,
                    animation: `ribbonScroll ${durationSec}s linear infinite`,
                    padding: "8px 0",
                }}
            >
                {track.map((img, idx) => (
                    <figure key={`${img.src}-r1-${idx}`} style={{ margin: 0, textAlign: "center" }}>
                        <div
                            style={{
                                position: "relative",
                                width: "min(26vw, 300px)",
                                height: "calc(min(26vw, 300px) * 4 / 3)",
                                borderRadius: 16,
                                overflow: "hidden",
                                background: "transparent",
                                border: "none",
                                boxShadow: "none",
                            }}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                loading="lazy"
                                style={{
                                    display: "block",
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    background: "transparent",
                                }}
                            />
                        </div>
                        {img.caption && (
                            <figcaption style={{ marginTop: 8, fontSize: 13, opacity: 0.75 }}>
                                {img.caption}
                            </figcaption>
                        )}
                    </figure>
                ))}
            </div>
        </div>
    );
};

// ---------- Option 3: Arced Coverflow ----------
const ArcedCoverflow: FC<{ images: ImageItem[]; intervalMs?: number }> = ({
                                                                              images,
                                                                              intervalMs = 2400,
                                                                          }) => {
    const [index, setIndex] = useState(0);
    const count = images.length || 1;
    const timer = useRef<number | null>(null);

    useEffect(() => {
        timer.current = window.setInterval(() => setIndex((i) => (i + 1) % count), intervalMs);
        return () => {
            if (timer.current !== null) window.clearInterval(timer.current);
            timer.current = null;
        };
    }, [count, intervalMs]);

    const positions = useMemo(() => {
        const radius = 320;
        const maxTilt = 14;
        return images.map((_, i) => {
            const offset = (i - index + count) % count;
            const half = Math.floor(count / 2);
            let pos = offset;
            if (offset > half) pos = offset - count;
            const x = pos * (radius / Math.max(half, 1));
            const scale = 1 - Math.min(Math.abs(pos) * 0.1, 0.45);
            const tilt = -pos * maxTilt;
            const zIndex = 100 - Math.abs(pos);
            const opacity = 1 - Math.min(Math.abs(pos) * 0.08, 0.5);
            return { x, scale, tilt, zIndex, opacity };
        });
    }, [images, index, count]);

    return (
        <div style={{ position: "relative", height: 560, maxWidth: 1200, margin: "0 auto" }}>
            {images.map((img, i) => {
                const { x, scale, tilt, zIndex, opacity } = positions[i];
                return (
                    <figure
                        key={img.src + i}
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transform: `translate(calc(-50% + ${x}px), -50%) rotate(${tilt}deg) scale(${scale})`,
                            zIndex,
                            opacity,
                            transition: "transform 500ms, opacity 500ms",
                            margin: 0,
                        }}
                    >
                        <div
                            style={{
                                width: "min(60vw, 520px)",
                                height: "calc(min(60vw, 520px) * 4 / 3)",
                                borderRadius: 16,
                                overflow: "hidden",
                                background: "transparent",
                                border: "none",
                                boxShadow: "none",
                            }}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                loading="lazy"
                                style={{
                                    display: "block",
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    background: "transparent",
                                }}
                            />
                        </div>
                        {i === index && img.caption && (
                            <figcaption style={{ marginTop: 10, textAlign: "center", opacity: 0.8 }}>
                                {img.caption}
                            </figcaption>
                        )}
                    </figure>
                );
            })}
        </div>
    );
};

// ---------- Option 4: 3D Orbital Ring (centered) ----------
const OrbitalRing: FC<{ images: ImageItem[]; radius?: number; speedSec?: number }> = ({
                                                                                          images,
                                                                                          radius = 400,
                                                                                          speedSec = 26,
                                                                                      }) => {
    const base = toEight(images);
    const step = 360 / base.length;
    const keyframes = `
    @keyframes spinY { from { transform: rotateY(0deg); } to { transform: rotateY(360deg); } }
  `;

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 680,
                maxWidth: 1200,
                margin: "0 auto",
                position: "relative",
                perspective: "1200px",
                overflow: "hidden",
            }}
        >
            <style>{keyframes}</style>

            <div
                style={{
                    width: 560,
                    height: 560,
                    position: "relative",
                    transformStyle: "preserve-3d",
                    animation: `spinY ${speedSec}s linear infinite`,
                }}
            >
                {base.map((img, i) => (
                    <figure
                        key={img.src + i}
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            transformStyle: "preserve-3d",
                            transform: `translate(-50%, -50%) rotateY(${i * step}deg) translateZ(${radius}px)`,
                            margin: 0,
                        }}
                    >
                        <div
                            style={{
                                width: 260,
                                height: (260 * 4) / 3,
                                borderRadius: 16,
                                overflow: "hidden",
                                background: "transparent",
                                border: "none",
                                boxShadow: "none",
                                backfaceVisibility: "hidden",
                            }}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                loading="lazy"
                                style={{
                                    display: "block",
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    background: "transparent",
                                }}
                            />
                        </div>
                    </figure>
                ))}
            </div>

            <div
                style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: 220,
                    height: 220,
                    transform: "translate(-50%, -50%)",
                    borderRadius: "50%",
                    background:
                        "radial-gradient(closest-side, rgba(255,255,255,.18), rgba(255,255,255,0))",
                    filter: "blur(4px)",
                    pointerEvents: "none",
                }}
            />
        </div>
    );
};

// ---------- Option 5: Infinite Ribbon (exactly 8 phones) ----------
const InfiniteRibbonEight: FC<{ images: ImageItem[]; speed?: number }> = ({
                                                                              images,
                                                                              speed = 55,
                                                                          }) => {
    const base = toEight(images);
    const track = useMemo(() => [...base, ...base], [base]);
    const durationSec = Math.max((base.length * 300) / speed, 10);
    const keyframes = `
    @keyframes ribbonScroll8 { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  `;

    return (
        <div style={{ position: "relative", overflow: "hidden" }}>
            <style>{keyframes}</style>
            <div
                style={{
                    width: "200%",
                    display: "flex",
                    alignItems: "center",
                    gap: 28,
                    animation: `ribbonScroll8 ${durationSec}s linear infinite`,
                    padding: "8px 0",
                }}
            >
                {track.map((img, idx) => (
                    <figure key={`${img.src}-r8-${idx}`} style={{ margin: 0, textAlign: "center" }}>
                        <div
                            style={{
                                position: "relative",
                                width: "min(26vw, 300px)",
                                height: "calc(min(26vw, 300px) * 4 / 3)",
                                borderRadius: 16,
                                overflow: "hidden",
                                background: "transparent",
                                border: "none",
                                boxShadow: "none",
                            }}
                        >
                            <img
                                src={img.src}
                                alt={img.alt}
                                loading="lazy"
                                style={{
                                    display: "block",
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "contain",
                                    background: "transparent",
                                }}
                            />
                        </div>
                        {img.caption && (
                            <figcaption style={{ marginTop: 8, fontSize: 13, opacity: 0.75 }}>
                                {img.caption}
                            </figcaption>
                        )}
                    </figure>
                ))}
            </div>
        </div>
    );
};

// ---------- Main ----------
const UserCaseShowCase: FC = () => (
    <div style={{ width: "100%" }}>
        <SectionCard title="Option 1 — Infinite Ribbon" subtitle="Smooth, minimal ribbon.">
            <InfiniteRibbon images={images8} />
        </SectionCard>

        <SectionCard title="Option 3 — Arced Coverflow (Bigger)" subtitle="Curved track with larger phones.">
            <ArcedCoverflow images={images8} />
        </SectionCard>

        <SectionCard title="Option 4 — 3D Orbital Ring (Centered)" subtitle="Phones orbit in 3D around a soft glow.">
            <OrbitalRing images={images8} />
        </SectionCard>

        <SectionCard title="Option 5 — Ribbon (Exactly 8 Phones)" subtitle="Loops the 8 phones exactly.">
            <InfiniteRibbonEight images={images8} />
        </SectionCard>
    </div>
);

export default UserCaseShowCase;
