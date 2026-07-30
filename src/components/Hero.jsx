import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { personalInfo, techStrip } from "../data/portfolioData";

export default function Hero() {
  const [showScroll, setShowScroll] = useState(true);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY < 80);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="hero-section"
    >
      {/* Background gradient orbs */}
      <div className="hero-orb hero-orb--right" />
      <div className="hero-orb hero-orb--left" />

      <div className="container hero-layout">
        {/* Left Column — Text Content */}
        <div className="hero-text">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="section-label"
            style={{ marginBottom: "16px" }}
          >
            {personalInfo.title}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{
              fontSize: "clamp(1.85rem, 5.5vw, 4rem)",
              fontWeight: 700,
              lineHeight: 1.1,
              marginBottom: "24px",
              letterSpacing: "-0.03em",
            }}
          >
            Hi, I'm{" "}
            <span style={{ color: "var(--color-teal)" }}>
              {personalInfo.name}
            </span>
            .
            <br />
            <span style={{ color: "var(--color-muted)" }}>
              {personalInfo.tagline}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            style={{
              fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
              color: "var(--color-muted)",
              lineHeight: 1.7,
              maxWidth: "540px",
              marginBottom: "36px",
            }}
          >
            {personalInfo.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="hero-cta-buttons"
            style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
          >
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="btn btn-primary"
            >
              View Projects <ArrowDown size={16} />
            </a>
            <a
              href={personalInfo.resumeUrl}
              download
              className="btn btn-ghost"
            >
              Download CV <Download size={16} />
            </a>
          </motion.div>

          {/* Tech Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="hero-tech-strip"
          >
            {techStrip.map((tech) => (
              <span key={tech} className="badge" style={{ flexShrink: 0 }}>
                {tech}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right Column — Profile Image Frame */}
        <motion.div
          className="hero-image-col"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <div className="hero-profile-container">
            {/* Radial glow behind */}
            <div className="hero-profile-glow" />

            {/* Rotating gradient border wrapper */}
            <div className="hero-profile-border-wrapper">
              <motion.div
                className="hero-profile-gradient-spin"
                animate={{ rotate: [0, 360] }}
                transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
              />
            </div>

            {/* Inner frame */}
            <div className="hero-profile-inner">
              {!imgError ? (
                <img
                  src={personalInfo.avatarUrl || "/images/profile.jpg"}
                  alt={personalInfo.name}
                  className="hero-profile-image"
                  onLoad={() => setImgLoaded(true)}
                  onError={() => setImgError(true)}
                  style={{ display: imgLoaded ? "block" : "none" }}
                />
              ) : null}

              {/* Initials fallback — always visible if image fails or hasn't loaded */}
              {(imgError || !imgLoaded) && (
                <div className="hero-profile-initials">
                  SR
                </div>
              )}
            </div>

          </div>
        </motion.div>
      </div>

      {/* Scroll indicator — disappears on scroll */}
      <AnimatePresence>
        {showScroll && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="hero-scroll-indicator"
          >
            <span
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.15em",
                color: "var(--color-muted)",
                textTransform: "uppercase",
              }}
            >
              Scroll
            </span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            >
              <ArrowDown size={16} style={{ color: "var(--color-teal)" }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
