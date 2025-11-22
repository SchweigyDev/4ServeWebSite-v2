// /frontend/src/components/UserCaseShowCase.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import type { FC } from "react";

// ===================
// Tunables
// ===================
const RIBBON_SPEED_PX_PER_SEC = 50;    // pixels/sec auto-scroll
const DRAG_CLICK_THRESHOLD_PX = 6;      // max movement to still count as a click on ribbon
const MODAL_SWIPE_THRESHOLD_PX = 40;    // swipe distance in modal to trigger next/prev

// Images
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

const images: ImageItem[] = [
    { src: i1, alt: "Order flow", caption: "Order Flow" },
    { src: i2, alt: "Chef dashboard", caption: "Chef Dashboard" },
    { src: i3, alt: "Menu builder", caption: "Menu Builder" },
    { src: i4, alt: "Customer chat", caption: "Customer Chat" },
    { src: i5, alt: "Delivery tracking", caption: "Delivery Tracking" },
    { src: i6, alt: "Payments", caption: "Payments" },
    { src: i7, alt: "Reviews", caption: "Reviews" },
    { src: i8, alt: "Favorites", caption: "Favorites" },
];

// ===================
// Infinite ribbon
// ===================
const InfiniteRibbon: FC<{ images: ImageItem[] }> = ({ images }) => {
    const base = useMemo(() => images, [images]);
    const trackImages = useMemo(() => [...base, ...base, ...base], [base]); // seamless loop

    const wrapRef = useRef<HTMLDivElement | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const posRef = useRef(0);
    const lastTsRef = useRef<number | null>(null);
    const rafRef = useRef<number | null>(null);

    const [isPaused, setIsPaused] = useState(false);
    const [dragging, setDragging] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null); // 0..7

    // speed
    const pxPerSecRef = useRef(RIBBON_SPEED_PX_PER_SEC);
    useEffect(() => {
        pxPerSecRef.current = RIBBON_SPEED_PX_PER_SEC;
    }, []);

    const getLoopWidth = () => {
        const track = trackRef.current;
        return track ? Math.max(Math.floor(track.scrollWidth / 3), 1) : 1;
    };

    const wrapPosition = () => {
        const loopW = getLoopWidth();
        if (posRef.current <= -loopW) posRef.current += loopW;
        if (posRef.current >= 0) posRef.current -= loopW;
    };

    // RAF
    const tick = (ts: number) => {
        if (lastTsRef.current == null) lastTsRef.current = ts;
        const dt = (ts - lastTsRef.current) / 1000;
        lastTsRef.current = ts;

        const shouldAuto = !isPaused && !dragging && activeIndex == null;
        if (shouldAuto) {
            posRef.current -= pxPerSecRef.current * dt;
            wrapPosition();
            if (trackRef.current)
                trackRef.current.style.transform = `translateX(${posRef.current}px)`;
        }
        rafRef.current = requestAnimationFrame(tick);
    };

    useEffect(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        lastTsRef.current = null;
        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPaused, dragging, activeIndex]);

    // -------- Click-through on wrapper while using pointer capture --------
    type DragState = {
        startX: number;
        lastX: number;
        moved: number;
        downTargetIdx: number | null; // which card was pressed (base index)
    };

    const dragState = useRef<DragState | null>(null);

    // Helper: climb DOM to find data-base-idx
    const findBaseIdxFromEventTarget = (el: EventTarget | null): number | null => {
        let node = el as HTMLElement | null;
        while (node && node !== wrapRef.current) {
            if (node.hasAttribute?.("data-base-idx")) {
                const v = node.getAttribute("data-base-idx");
                return v ? parseInt(v, 10) : null;
            }
            node = node.parentElement;
        }
        return null;
    };

    const onPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
        // 🔒 When modal is open, ignore ribbon pointer events completely
        if (activeIndex != null) return;

        e.currentTarget.setPointerCapture(e.pointerId);
        dragState.current = {
            startX: e.clientX,
            lastX: e.clientX,
            moved: 0,
            downTargetIdx: findBaseIdxFromEventTarget(e.target),
        };
        setDragging(true);
        setIsPaused(true);
    };

    const onPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
        if (activeIndex != null) return; // ignore when modal open
        if (!dragState.current) return;

        const dx = e.clientX - dragState.current.lastX;
        dragState.current.lastX = e.clientX;
        dragState.current.moved += Math.abs(dx);

        posRef.current += dx;
        wrapPosition();
        if (trackRef.current)
            trackRef.current.style.transform = `translateX(${posRef.current}px)`;
    };

    const onPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
        if (activeIndex != null && dragState.current == null) return; // if modal already open, do nothing

        e.currentTarget.releasePointerCapture(e.pointerId);
        const state = dragState.current;
        dragState.current = null;
        setDragging(false);

        if (activeIndex != null) {
            // if modal opened during this interaction, don't treat as ribbon click
            return;
        }

        const moved = state?.moved ?? 0;
        const pressedIdx = state?.downTargetIdx ?? null;

        // Treat as click if we started on a card & didn't move much
        if (pressedIdx !== null && moved <= DRAG_CLICK_THRESHOLD_PX) {
            setActiveIndex((prev) => {
                if (prev === pressedIdx) {
                    // close if same
                    setIsPaused(false);
                    return null;
                }
                // open new
                setIsPaused(true);
                return pressedIdx;
            });
            return;
        }

        // otherwise resume auto if no modal
        if (activeIndex == null) setIsPaused(false);
    };

    // Modal controls (functional updates so they always work)
    const closeModal = () => {
        setActiveIndex(null);
        setIsPaused(false);
    };

    const nextModal = () => {
        setActiveIndex((prev) => {
            if (prev == null) return prev;
            return (prev + 1) % base.length;
        });
    };

    const prevModal = () => {
        setActiveIndex((prev) => {
            if (prev == null) return prev;
            return (prev - 1 + base.length) % base.length;
        });
    };

    // ESC / arrows
    useEffect(() => {
        if (activeIndex == null) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") closeModal();
            if (e.key === "ArrowRight") nextModal();
            if (e.key === "ArrowLeft") prevModal();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [activeIndex]);

    // -------- Swipe inside modal for next/prev --------
    type ModalDragState = {
        startX: number;
        lastX: number;
        movedX: number;
    };

    const modalDragRef = useRef<ModalDragState | null>(null);

    const onModalPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation(); // don’t bubble to backdrop
        modalDragRef.current = { startX: e.clientX, lastX: e.clientX, movedX: 0 };
    };
    const onModalPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
        if (!modalDragRef.current) return;
        const dx = e.clientX - modalDragRef.current.lastX;
        modalDragRef.current.lastX = e.clientX;
        modalDragRef.current.movedX += dx;
    };
    const onModalPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
        if (!modalDragRef.current) return;
        e.stopPropagation();
        const totalDx = modalDragRef.current.movedX;
        modalDragRef.current = null;

        if (Math.abs(totalDx) >= MODAL_SWIPE_THRESHOLD_PX) {
            if (totalDx < 0) {
                // swipe left -> next
                nextModal();
            } else {
                // swipe right -> prev
                prevModal();
            }
        }
    };

    // CSS
    const styleTag = `
    .ir-wrap {
      --ribbon-gap: 20px;
      --card-w: clamp(140px, 22vw, 260px); /* slightly smaller phones */
    }
    @media (min-width: 1280px) {
      .ir-wrap { --card-w: clamp(180px, 18vw, 280px); --ribbon-gap: 24px; }
    }
    @media (min-width: 1536px) {
      .ir-wrap { --card-w: clamp(200px, 16vw, 300px); --ribbon-gap: 26px; }
    }
    @media (min-width: 1920px) {
      .ir-wrap { --card-w: clamp(220px, 14vw, 320px); --ribbon-gap: 28px; }
    }
    @media (max-width: 640px) {
      .ir-wrap { --card-w: clamp(130px, 44vw, 190px); --ribbon-gap: 16px; }
    }

    .ir-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0,0,0,.7);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      padding: 24px;
    }
    .ir-modal-card {
      position: relative;
      width: min(70vw, 520px); /* smaller pop-out */
      height: calc(min(70vw, 520px) * 4 / 3);
      border-radius: 18px;
      overflow: hidden;
      background: transparent;
      box-shadow: 0 20px 60px rgba(0,0,0,.45);
      animation: irPop .18s ease-out;
      touch-action: pan-y;
    }
    .ir-btn {
      position: absolute;
      border: none;
      color: white;
      background: rgba(0,0,0,.5);
      padding: 8px 12px;
      border-radius: 10px;
      cursor: pointer;
      z-index: 1;
    }
    .ir-close { top: 10px; right: 12px; }
    .ir-prev  { top: 50%; left: 12px; transform: translateY(-50%); }
    .ir-next  { top: 50%; right: 12px; transform: translateY(-50%); }
    .ir-modal-caption {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 8px;
      text-align: center;
      color: white;
      font-weight: 600;
      text-shadow: 0 2px 6px rgba(0,0,0,.45);
      pointer-events: none;
    }
    @keyframes irPop {
      from { transform: scale(.96); opacity: .8; }
      to   { transform: scale(1);   opacity: 1; }
    }
  `;

    return (
        <div
            ref={wrapRef}
            className="ir-wrap"
            key={`speed-${RIBBON_SPEED_PX_PER_SEC}`}
            style={{
                position: "relative",
                overflow: "hidden",
                width: "100%",
                padding: "8px 0",
                touchAction: "pan-y",
            }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
        >
            <style>{styleTag}</style>

            <div
                ref={trackRef}
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "var(--ribbon-gap)",
                    willChange: "transform",
                    transform: `translateX(${posRef.current}px)`,
                    userSelect: dragging ? "none" : "auto",
                    cursor: dragging ? "grabbing" : "grab",
                    minWidth: "100vw",
                    padding: "8px 0",
                }}
            >
                {trackImages.map((img, idx) => {
                    const baseIdx = base.length ? idx % base.length : 0;
                    const isActive = activeIndex === baseIdx;
                    return (
                        <figure
                            key={`${img.src}-r-${idx}`}
                            data-base-idx={baseIdx} // lets wrapper know which card was pressed
                            style={{
                                margin: 0,
                                textAlign: "center",
                                transition: "transform 220ms ease, filter 220ms ease",
                                transform: isActive ? "translateY(-10px) scale(1.08)" : "none",
                                filter: isActive
                                    ? "drop-shadow(0 12px 22px rgba(0,0,0,.35))"
                                    : "none",
                            }}
                        >
                            <div
                                data-base-idx={baseIdx}
                                style={{
                                    position: "relative",
                                    width: "var(--card-w)",
                                    height: "calc(var(--card-w) * 4 / 3)",
                                    borderRadius: 16,
                                    overflow: "hidden",
                                    background: "transparent",
                                    border: "none",
                                    boxShadow: "none",
                                }}
                            >
                                <img
                                    data-base-idx={baseIdx}
                                    src={img.src}
                                    alt={img.alt}
                                    loading="lazy"
                                    style={{
                                        display: "block",
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                        background: "transparent",
                                        pointerEvents: "none", // pointer handled by wrapper
                                    }}
                                />
                            </div>
                            {img.caption && (
                                <figcaption
                                    style={{
                                        marginTop: 8,
                                        fontSize: 13,
                                        opacity: isActive ? 1 : 0.75,
                                        fontWeight: isActive ? 600 : 400,
                                    }}
                                >
                                    {img.caption}
                                </figcaption>
                            )}
                        </figure>
                    );
                })}
            </div>

            {/* status pill */}
            <div
                style={{
                    position: "absolute",
                    right: 10,
                    bottom: 8,
                    fontSize: 12,
                    opacity: 0.65,
                    background: "rgba(0,0,0,.38)",
                    color: "white",
                    padding: "4px 8px",
                    borderRadius: 8,
                    pointerEvents: "none",
                }}
            >
                {activeIndex != null || isPaused ? "Paused" : "Auto"} •{" "}
                {RIBBON_SPEED_PX_PER_SEC} px/s
            </div>

            {/* Modal (click outside = close) */}
            {activeIndex != null && (
                <div
                    className="ir-modal-backdrop"
                    onClick={closeModal}
                    role="dialog"
                    aria-modal="true"
                >
                    <div
                        className="ir-modal-card"
                        onClick={(e) => e.stopPropagation()} // don't close when clicking inside
                        onPointerDown={onModalPointerDown}
                        onPointerMove={onModalPointerMove}
                        onPointerUp={onModalPointerUp}
                        onPointerCancel={onModalPointerUp}
                    >
                        <button
                            className="ir-btn ir-prev"
                            onClick={(e) => {
                                e.stopPropagation();
                                prevModal();
                            }}
                        >
                            ‹ Prev
                        </button>
                        <button
                            className="ir-btn ir-next"
                            onClick={(e) => {
                                e.stopPropagation();
                                nextModal();
                            }}
                        >
                            Next ›
                        </button>
                        <button
                            className="ir-btn ir-close"
                            onClick={(e) => {
                                e.stopPropagation();
                                closeModal();
                            }}
                        >
                            ✕
                        </button>

                        <img
                            src={base[activeIndex].src}
                            alt={base[activeIndex].alt}
                            style={{
                                display: "block",
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                background: "transparent",
                            }}
                        />
                        {base[activeIndex].caption && (
                            <div className="ir-modal-caption">
                                {base[activeIndex].caption}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

// ===================
// Section wrapper
// ===================
const UserCaseShowCase: FC = () => (
    <section
        style={{
            padding: "48px 0",
            background: "rgba(0, 102, 255, 0.08)",
        }}
    >
        <div style={{ maxWidth: "min(1600px, 92vw)", margin: "0 auto" }}>
            <h2 style={{ margin: 0, fontSize: "clamp(20px, 2vw, 28px)" }}>
                Interactive Infinite Ribbon
            </h2>
            <p style={{ margin: "6px 0 16px 0", opacity: 0.8 }}>
                Drag or swipe. Tap a phone to pop it out. Swipe in the modal or use
                arrows. Tap outside or hit Esc to exit.
            </p>
            <InfiniteRibbon
                key={`speed-${RIBBON_SPEED_PX_PER_SEC}`}
                images={images}
            />
        </div>
    </section>
);

export default UserCaseShowCase;




// import React, { useEffect } from "react";
// import { useSpring, animated } from "@react-spring/web";
//
// // ✅ Use your 8 cropped phone images
// import i1 from "../assets/images_cropped/Iphone1.png";
// import i2 from "../assets/images_cropped/Iphone2.png";
// import i3 from "../assets/images_cropped/Iphone3.png";
// import i4 from "../assets/images_cropped/Iphone4.png";
// import i5 from "../assets/images_cropped/Iphone5.png";
// import i6 from "../assets/images_cropped/Iphone6.png";
// import i7 from "../assets/images_cropped/Iphone7.png";
// import i8 from "../assets/images_cropped/Iphone8.png";
//
// const UserCases: React.FC = () => {
//     const images = [
//         { src: i1, name: "Case 1" },
//         { src: i2, name: "Case 2" },
//         { src: i3, name: "Case 3" },
//         { src: i4, name: "Case 4" },
//         { src: i5, name: "Case 5" },
//         { src: i6, name: "Case 6" },
//         { src: i7, name: "Case 7" },
//         { src: i8, name: "Case 8" },
//     ];
//
//     const len = images.length;
//     const angle = 360 / len;
//
//     // 🔁 Continuous spin using react-spring
//     const { rotation } = useSpring({
//         from: { rotation: 0 },
//         to: async (next) => {
//             while (true) {
//                 await next({ rotation: 360 });
//                 await next({ rotation: 0 });
//             }
//         },
//         config: { duration: 20000 }, // slower = higher number; try 10000 for faster
//         loop: true,
//     });
//
//     useEffect(() => {
//         document.title = "User Cases Auto Spin";
//     }, []);
//
//     return (
//         <section
//             id="user-cases-section"
//             style={{
//                 position: "relative",
//                 width: "100%",
//                 overflow: "hidden",
//                 display: "flex",
//                 flexDirection: "column",
//                 justifyContent: "center",
//                 alignItems: "center",
//                 padding: "clamp(100px, 10vw, 120px) 0 80px",
//                 background: "rgba(0, 102, 255, 0.1)",
//                 color: "white",
//                 scrollMarginTop: "100px",
//             }}
//         >
//             {/* Title */}
//             <div
//                 style={{
//                     position: "absolute",
//                     top: "30px",
//                     left: "10%",
//                     padding: "4px 16px",
//                     border: "2px solid white",
//                     borderRadius: "40px",
//                     background: "rgba(0, 102, 255, 0.4)",
//                     color: "white",
//                     fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
//                     fontWeight: "400",
//                     textAlign: "center",
//                     zIndex: 50,
//                 }}
//             >
//                 User Cases
//             </div>
//
//             {/* Slogan */}
//             <div style={{ textAlign: "center", marginBottom: "24px", maxWidth: 800 }}>
//                 <h2
//                     style={{
//                         fontSize: "clamp(1.5rem, 2.5vw, 2rem)",
//                         margin: 0,
//                         color: "#00D4FF",
//                     }}
//                 >
//                     See Our Solutions in Action
//                 </h2>
//                 <p style={{ margin: "8px 0 0 0", color: "#00D4FF" }}>
//                     Explore how our solutions shine across different scenarios.
//                 </p>
//             </div>
//
//             {/* Continuous spinning wheel */}
//             <div
//                 style={{
//                     width: "100%",
//                     maxWidth: 980,
//                     height: 480,
//                     perspective: 1400,
//                     position: "relative",
//                     overflow: "hidden",
//                     zIndex: 30,
//                 }}
//             >
//                 <animated.div
//                     style={{
//                         width: "100%",
//                         height: "100%",
//                         position: "absolute",
//                         transformStyle: "preserve-3d",
//                         rotateY: rotation.to((r) => `${r}deg`),
//                     }}
//                 >
//                     {images.map((img, i) => {
//                         const angleDeg = i * angle;
//                         return (
//                             <div
//                                 key={img.name}
//                                 style={{
//                                     position: "absolute",
//                                     top: "50%",
//                                     left: "50%",
//                                     width: "200px",
//                                     height: "360px",
//                                     transform: `rotateY(${angleDeg}deg) translateZ(400px)`,
//                                     transformStyle: "preserve-3d",
//                                     margin: "-180px -100px",
//                                     transition: "all 0.55s ease",
//                                 }}
//                             >
//                                 <img
//                                     src={img.src}
//                                     alt={img.name}
//                                     style={{
//                                         width: "100%",
//                                         height: "100%",
//                                         objectFit: "contain",
//                                         borderRadius: 20,
//                                         // 👇 removed blue border & background
//                                         border: "none",
//                                         boxShadow: "0 8px 22px rgba(0,0,0,0.45)",
//                                         background: "transparent",
//                                         display: "block",
//                                         pointerEvents: "none",
//                                     }}
//                                 />
//                                 <div
//                                     style={{
//                                         position: "absolute",
//                                         bottom: -28,
//                                         width: "100%",
//                                         textAlign: "center",
//                                         color: "white",
//                                         fontWeight: "700",
//                                         textShadow: "0 2px 6px rgba(0,0,0,0.5)",
//                                     }}
//                                 >
//                                     {img.name}
//                                 </div>
//                             </div>
//                         );
//                     })}
//                 </animated.div>
//             </div>
//         </section>
//     );
// };
//
// export default UserCases;
