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

// Get the preview image source based on project settings
const getPreviewSrc = (project) => {
  if (project.previewMode === "manual" && project.previewImage) {
    return project.previewImage;
  }
  const liveUrl = project.demo;
  if (!liveUrl) return null;
  return `https://api.microlink.io/?url=${encodeURIComponent(liveUrl)}&screenshot=true&meta=false&embed=screenshot.url`;
};

function ProjectImagePanel({ project, cardNum }) {
  const [imgState, setImgState] = useState("loading");

  const liveUrl = project.demo;
  const domain = getDomain(liveUrl);
  const status = project.status || (liveUrl ? "live" : "in-progress");
  const previewSrc = getPreviewSrc(project);

  return (
    <div className="project-image-panel">
      {/* Dark Browser Mockup Top Bar (#1a1a2e) */}
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

        {/* Live / In-Progress Status Badge */}
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
        {/* Skeleton shimmer loader */}
        {imgState === "loading" && previewSrc && (
          <div className="project-skeleton-loader" />
        )}

        {/* Preview image */}
        {previewSrc && (
          <img
            src={previewSrc}
            alt={`${project.title} live screenshot`}
            className="project-preview-img"
            style={{ display: imgState === "loaded" ? "block" : "none" }}
            onLoad={() => setImgState("loaded")}
            onError={() => setImgState("error")}
          />
        )}

        {/* Fallback placeholder */}
        {(imgState === "error" || !previewSrc) && (
          <div className="project-image-placeholder">
            <div className="project-placeholder-glow" />
            <div className="project-placeholder-content">
              <span className="project-placeholder-title">
                {project.title}
              </span>
              <small className="project-placeholder-subtitle">
                Preview unavailable
              </small>
            </div>
          </div>
        )}

        {/* Bottom-left small purple card number badge */}
        <span className="project-number-badge">{cardNum}</span>
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
                <div className="project-card-split">
                  {/* Left Side: Browser Mockup & Screenshot Panel */}
                  <ProjectImagePanel project={project} cardNum={cardNum} />

                  {/* Right Side: Content Panel */}
                  <div className="project-content-panel">
                    {/* Faint Watermark Card Number */}
                    <div className="project-watermark-number">{cardNum}</div>

                    <div className="project-content-top">
                      {/* Category Label Pill */}
                      {project.category && (
                        <span className="project-category-pill">
                          {project.category}
                        </span>
                      )}

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

                      {/* Thin Divider Line */}
                      <div className="project-divider-line" />

                      {/* Footer Action Buttons */}
                      <div className="project-card-actions">
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="project-btn project-btn-primary"
                          >
                            <ExternalLink size={15} />
                            <span>Live Demo</span>
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
