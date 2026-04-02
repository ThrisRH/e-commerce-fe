import React, { useState, useEffect, useCallback } from "react";
import banner1 from "@/assets/images/banner1.png";
import banner2 from "@/assets/images/banner2.png";
import banner5 from "@/assets/images/banner5.png";
import banner4 from "@/assets/images/banner4.jpg";
import banner3 from "@/assets/images/banner3.jpg";

const SLIDES = [banner1, banner2];

const SMALL_BANNERS = [
  { src: banner3, alt: "Promo 3" },
  { src: banner4, alt: "Promo 4" },
  { src: banner5, alt: "Promo 5" },
];

const GAP = 8;

function SmallBanner({ src, alt }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{
        flex: 1,
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: hovered
          ? "0 6px 20px rgba(0,0,0,0.18)"
          : "0 2px 8px rgba(0,0,0,0.08)",
        transform: hovered ? "scale(1.02)" : "scale(1)",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        cursor: "pointer",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
        }}
      />
    </div>
  );
}

export default function BannerSection() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const onResize = () => {
      setIsMobile(window.innerWidth < 640);
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const next = useCallback(
    () => setCurrent((c) => (c + 1) % SLIDES.length),
    [],
  );
  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length),
    [],
  );

  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const isStacked = isMobile;

  const sliderHeight = isMobile ? 220 : isTablet ? 300 : 400;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isStacked ? "column" : "row",
        gap: GAP,
        width: "100%",
        marginBottom: 48,
      }}
    >
      <div
        style={{
          flex: isStacked ? "none" : "0 0 30%",
          maxWidth: isStacked ? "100%" : "20%",
          display: "flex",
          flexDirection: isStacked ? "row" : "column",
          gap: GAP,
          height: isStacked ? 140 : sliderHeight,
        }}
      >
        {SMALL_BANNERS.map((b, i) => (
          <SmallBanner key={i} src={b.src} alt={b.alt} />
        ))}
      </div>

      <div
        style={{
          flex: 1,
          position: "relative",
          borderRadius: 8,
          overflow: "hidden",
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
          height: sliderHeight,
        }}
      >
        <div
          style={{
            display: "flex",
            transform: `translateX(-${current * 100}%)`,
            transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
            height: "100%",
          }}
        >
          {SLIDES.map((src, i) => (
            <div key={i} style={{ minWidth: "100%", height: "100%" }}>
              <img
                src={src}
                alt={`Slide ${i + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ))}
        </div>

        <button
          onClick={prev}
          aria-label="Previous"
          style={{
            position: "absolute",
            top: "50%",
            left: 10,
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.38)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 34,
            height: 34,
            fontSize: 18,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(0,0,0,0.6)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(0,0,0,0.38)")
          }
        >
          ‹
        </button>

        <button
          onClick={next}
          aria-label="Next"
          style={{
            position: "absolute",
            top: "50%",
            right: 10,
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.38)",
            color: "#fff",
            border: "none",
            borderRadius: "50%",
            width: 34,
            height: 34,
            fontSize: 18,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 2,
            transition: "background 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(0,0,0,0.6)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(0,0,0,0.38)")
          }
        >
          ›
        </button>

        <div
          style={{
            position: "absolute",
            bottom: 12,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 6,
          }}
        >
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Slide ${i + 1}`}
              style={{
                width: i === current ? 20 : 8,
                height: 8,
                borderRadius: 4,
                background: i === current ? "#fff" : "rgba(255,255,255,0.45)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
