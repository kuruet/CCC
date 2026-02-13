import { useEffect, useRef } from "react";

const floatKeyframes = `
@keyframes floatBrochure {
  0%, 100% { transform: scale(1.03) translateY(0px); }
  50% { transform: scale(1.03) translateY(-10px); }
}

@keyframes floatBrochureMobile {
  0%, 100% { transform: scale(1.01) translateY(0px); }
  50% { transform: scale(1.01) translateY(-5px); }
}

.brochure-float {
  animation: floatBrochure 5s ease-in-out infinite;
  transform: scale(1.03);
}

.brochure-float:hover {
  animation-play-state: paused;
  transform: scale(1.07) translateY(-6px) !important;
  box-shadow:
    0 40px 80px rgba(138, 115, 62, 0.28),
    0 20px 40px rgba(138, 115, 62, 0.18),
    0 8px 16px rgba(0, 0, 0, 0.10) !important;
  transition: transform 0.4s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.4s cubic-bezier(0.23, 1, 0.32, 1);
}

@media (max-width: 640px) {
  .brochure-float {
    animation: floatBrochureMobile 6s ease-in-out infinite;
    transform: scale(1.01);
  }
  .brochure-float:hover {
    transform: scale(1.01) !important;
    box-shadow:
      0 20px 48px rgba(138, 115, 62, 0.20),
      0 8px 20px rgba(0, 0, 0, 0.08) !important;
  }
}

.btn-primary {
  background-color: #8A733E;
  color: #FFF5DF;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background-color 0.25s ease;
}

.btn-primary:hover {
  background-color: #7a6535;
  transform: scale(1.04);
  box-shadow: 0 6px 24px rgba(138, 115, 62, 0.35);
}

.btn-primary:focus-visible {
  outline: 2px solid #8A733E;
  outline-offset: 3px;
}

.btn-primary:active {
  transform: scale(0.98);
}
`;

export default function Brochure() {
  const styleRef = useRef(null);

  useEffect(() => {
    if (!document.getElementById("brochure-keyframes")) {
      const styleEl = document.createElement("style");
      styleEl.id = "brochure-keyframes";
      styleEl.textContent = floatKeyframes;
      document.head.appendChild(styleEl);
      styleRef.current = styleEl;
    }
    return () => {
      if (styleRef.current && document.getElementById("brochure-keyframes")) {
        document.head.removeChild(styleRef.current);
      }
    };
  }, []);

  return (
    <section
      style={{ backgroundColor: "#FFF5DF" }}
      className="relative w-full py-20 sm:py-28 overflow-hidden"
    >
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "min(700px, 90vw)",
          height: "min(700px, 90vw)",
          background:
            "radial-gradient(ellipse at center, rgba(255, 232, 170, 0.55) 0%, rgba(255, 245, 223, 0.18) 55%, transparent 75%)",
          pointerEvents: "none",
          borderRadius: "50%",
          filter: "blur(18px)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-4xl px-6 sm:px-10 flex flex-col items-center text-center">
        <h2
          style={{ color: "#8A733E" }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight mb-4"
        >
          Workshop Brochure 2026
        </h2>

        <p
          style={{ color: "#8A733E" }}
          className="text-base sm:text-lg max-w-xl leading-relaxed mb-12 opacity-80"
        >
          Explore the full details of our upcoming workshop — curriculum,
          schedule, pricing, and everything you need to know, beautifully laid
          out in one document.
        </p>

        <div className="relative mb-12 flex items-center justify-center w-full">
          <div
            style={{
              borderRadius: "10px",
              boxShadow:
                "0 24px 64px rgba(138, 115, 62, 0.22), 0 10px 28px rgba(138, 115, 62, 0.14), 0 4px 10px rgba(0,0,0,0.08)",
              display: "inline-block",
              lineHeight: 0,
            }}
            className="brochure-float"
          >
            <img
              src="/brochure/workshop-brochure-preview.webp"
              alt="Workshop Brochure 2026 preview — full curriculum, schedule and pricing"
              style={{
                borderRadius: "10px",
                display: "block",
                maxWidth: "min(420px, 88vw)",
                width: "100%",
                height: "auto",
                userSelect: "none",
                WebkitUserDrag: "none",
              }}
              draggable={false}
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full mb-4">
          <a
            href="/brochure/workshop-brochure-2026.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm sm:text-base font-semibold tracking-wide w-full sm:w-auto"
            aria-label="View brochure PDF in a new tab"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            View Brochure
          </a>

          <a
            href="/brochure/workshop-brochure-2026.pdf"
            download="workshop-brochure-2026.pdf"
            className="btn-primary inline-flex items-center justify-center gap-2 rounded-full px-8 py-3.5 text-sm sm:text-base font-semibold tracking-wide w-full sm:w-auto"
            aria-label="Download the workshop brochure as a PDF file"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF
          </a>
        </div>

        <p
          style={{ color: "#8A733E" }}
          className="text-xs sm:text-sm opacity-50 tracking-widest uppercase font-medium"
        >
          PDF &bull; 6MB
        </p>
      </div>
    </section>
  );
}