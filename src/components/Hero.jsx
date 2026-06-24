import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { personalInfo, techStrip } from "../data/portfolioData";

export default function Hero() {
  const handleScrollToProjects = (e) => {
    e.preventDefault();
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        paddingTop: "var(--nav-height)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background gradient orbs */}
      <div
        style={{
          position: "absolute",
          top: "-20%",
          right: "-10%",
          width: "600px",
          height: "600px",
          background:
            "radial-gradient(circle, rgba(26, 188, 176, 0.06) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "-30%",
          left: "-15%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(26, 188, 176, 0.04) 0%, transparent 70%)",
          borderRadius: "50%",
          pointerEvents: "none",
        }}
      />

      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "48px",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Content */}
        <div>
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
              fontSize: "clamp(2.25rem, 6vw, 4rem)",
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
              fontSize: "1.05rem",
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
            style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}
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
            style={{
              marginTop: "56px",
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
            }}
          >
            {techStrip.map((tech) => (
              <span key={tech} className="badge">
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
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
    </section>
  );
}
