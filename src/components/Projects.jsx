import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Sparkles, Lock } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { projects } from "../data/portfolioData";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" },
  }),
};

// Helper function to extract clean domain string from URL
const getDomain = (url) => {
  if (!url) return "";
  try {
    const parsed = new URL(url);
    return parsed.hostname.replace(/^www\./, "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  }
};

function ProjectImagePanel({ project }) {
  const [imgAttempt, setImgAttempt] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  const liveUrl = project.demo;
  const domain = getDomain(liveUrl);

  // Reliable Live Screenshot Providers with Fallback Chain
  const getScreenshotUrl = (url, attempt) => {
    if (project.image) return project.image;
    if (!url) return null;
    const encoded = encodeURIComponent(url);

    if (attempt === 0) {
      // Primary: WordPress mshots API (Free, high reliability, no CORS lock)
      return `https://s0.wp.com/mshots/v1/${encoded}?w=1280&h=800`;
    }
    if (attempt === 1) {
      // Secondary: Thum.io screenshot service
      return `https://image.thum.io/get/width/1280/${url}`;
    }
    return null;
  };

  const currentImgSrc = getScreenshotUrl(liveUrl, imgAttempt);
  const status = project.status || (liveUrl ? "live" : "in-progress");

  const handleImgError = () => {
    if (imgAttempt < 1) {
      setImgAttempt((prev) => prev + 1);
    } else {
      setImgAttempt(2); // Gradient placeholder fallback
    }
  };

  return (
    <div className="project-image-panel">
      {/* Dark Browser Mockup Top Bar (#0a1520) */}
      <div className="project-browser-bar">
        <div className="project-browser-dots">
          <span className="dot dot-red" />
          <span className="dot dot-yellow" />
          <span className="dot dot-green" />
        </div>

        {domain ? (
          <div className="project-browser-url-pill">
            <Lock size={11} className="url-lock-icon" />
            <span className="url-text">{domain}</span>
          </div>
        ) : (
          <div className="project-browser-url-pill">
            <span className="url-text">localhost</span>
          </div>
        )}

        {/* Status Badge in Upper Bar */}
        {status === "live" && (
          <div className="project-status-badge badge-live">
            <span className="pulse-dot green" />
            <span>Live</span>
          </div>
        )}
        {status === "in-progress" && (
          <div className="project-status-badge badge-progress">
            <span className="pulse-dot amber" />
            <span>In Progress</span>
          </div>
        )}
      </div>

      {/* Screenshot Frame Area */}
      <div className="project-image-frame">
        {currentImgSrc && imgAttempt < 2 ? (
          <img
            src={currentImgSrc}
            alt={`${project.title} live screenshot`}
            className={`project-preview-img ${imgLoaded ? "loaded" : "loading"}`}
            onLoad={() => setImgLoaded(true)}
            onError={handleImgError}
          />
        ) : (
          <div className="project-image-placeholder">
            <div className="project-placeholder-glow" />
            <span className="project-placeholder-title">{project.title}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Portfolio</p>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A selection of projects that demonstrate my skills in full-stack
            development, API integrations, and machine learning.
          </p>
        </motion.div>

        <div className="project-cards-container">
          {projects.map((project, i) => {
            const cardNum = String(i + 1).padStart(2, "0");
            return (
              <motion.article
                key={project.id}
                className="project-card"
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={cardVariants}
              >
                {/* Top Gradient Accent Bar */}
                <div className="project-card-accent-bar" />

                <div className="project-card-split">
                  {/* Left Side: Browser Mockup & Screenshot Panel */}
                  <ProjectImagePanel project={project} />

                  {/* Right Side: Content Panel */}
                  <div className="project-content-panel">
                    {/* Watermark Card Number */}
                    <div className="project-watermark-number">{cardNum}</div>

                    <div className="project-content-top">
                      {/* Project Title */}
                      <h3 className="project-card-title">{project.title}</h3>

                      {/* One-Line Highlight */}
                      {project.highlight && (
                        <div className="project-card-highlight">
                          <Sparkles size={14} className="highlight-icon" />
                          <span>{project.highlight}</span>
                        </div>
                      )}

                      {/* Description */}
                      <p className="project-card-description">
                        {project.description}
                      </p>
                    </div>

                    <div className="project-content-bottom">
                      {/* Tech Stack Pills */}
                      <div className="project-tech-pills">
                        {project.tags.map((tag) => (
                          <span key={tag} className="project-tech-badge">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Footer Action Buttons */}
                      <div className="project-card-actions">
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-btn project-btn-primary"
                          >
                            <span>Live Demo</span>
                            <ExternalLink size={15} />
                          </a>
                        )}

                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-btn project-btn-ghost"
                          >
                            <GithubIcon size={16} />
                            <span>GitHub</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
