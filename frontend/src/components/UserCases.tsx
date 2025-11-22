// /frontend/src/components/UserCaseShowCase.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import type { FC } from "react";

// ===================
// Tunables
// ===================
const RIBBON_SPEED_PX_PER_SEC = 42; // pixels/sec auto-scroll
const DRAG_CLICK_THRESHOLD_PX = 6;   // max movement to still count as a click on ribbon
const MODAL_SWIPE_THRESHOLD_PX = 30; // swipe distance in modal to trigger next/prev

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
        // When modal is open, ignore ribbon pointer events completely
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
        if (activeIndex != null) return;
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
        if (activeIndex != null && dragState.current == null) return;

        e.currentTarget.releasePointerCapture(e.pointerId);
        const state = dragState.current;
        dragState.current = null;
        setDragging(false);

        if (activeIndex != null) {
            // modal opened during this interaction → don't treat as ribbon click
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
        movedX: number;
    };

    const modalDragRef = useRef<ModalDragState | null>(null);

    const onModalPointerDown: React.PointerEventHandler<HTMLDivElement> = (e) => {
        e.stopPropagation();
        modalDragRef.current = { startX: e.clientX, movedX: 0 };
    };

    const onModalPointerMove: React.PointerEventHandler<HTMLDivElement> = (e) => {
        if (!modalDragRef.current) return;
        modalDragRef.current.movedX = e.clientX - modalDragRef.current.startX;
    };

    const onModalPointerUp: React.PointerEventHandler<HTMLDivElement> = (e) => {
        if (!modalDragRef.current) return;
        e.stopPropagation();
        const dx = modalDragRef.current.movedX;
        modalDragRef.current = null;

        if (Math.abs(dx) > MODAL_SWIPE_THRESHOLD_PX) {
            if (dx < 0) nextModal(); // swipe left → next
            else prevModal();        // swipe right → prev
        }
    };

    // CSS
    const styleTag = `
    .ir-wrap {
      --ribbon-gap: 22px;
      --card-w: clamp(190px, 24vw, 320px); /* bigger = easier to read */
    }
    @media (min-width: 1280px) {
      .ir-wrap { --card-w: clamp(210px, 20vw, 340px); --ribbon-gap: 26px; }
    }
    @media (min-width: 1536px) {
      .ir-wrap { --card-w: clamp(230px, 18vw, 360px); --ribbon-gap: 28px; }
    }
    @media (min-width: 1920px) {
      .ir-wrap { --card-w: clamp(250px, 16vw, 380px); --ribbon-gap: 30px; }
    }
    @media (max-width: 640px) {
      .ir-wrap { --card-w: clamp(160px, 56vw, 220px); --ribbon-gap: 18px; }
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
      width: min(72vw, 540px);
      height: calc(min(72vw, 540px) * 4 / 3);
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
                            data-base-idx={baseIdx}
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
                            ‹
                        </button>
                        <button
                            className="ir-btn ir-next"
                            onClick={(e) => {
                                e.stopPropagation();
                                nextModal();
                            }}
                        >
                            ›
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
