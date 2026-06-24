import { motion } from "framer-motion";
import { ExternalLink, Sparkles } from "lucide-react";
import { GithubIcon } from "./BrandIcons";
import { projects } from "../data/portfolioData";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 480px), 1fr))",
            gap: "24px",
            marginTop: "48px",
          }}
        >
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              className="card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {/* Card Header with gradient accent */}
              <div
                style={{
                  height: "4px",
                  borderRadius: "2px",
                  background:
                    "linear-gradient(90deg, var(--color-teal), rgba(26, 188, 176, 0.2))",
                  marginBottom: "4px",
                }}
              />

              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: "12px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.2rem",
                    fontWeight: 600,
                    color: "var(--color-offwhite)",
                  }}
                >
                  {project.title}
                </h3>
                <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} GitHub repository`}
                      style={{
                        color: "var(--color-muted)",
                        transition: "color 0.2s",
                        padding: "4px",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--color-teal)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--color-muted)")
                      }
                    >
                      <GithubIcon size={18} />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                      style={{
                        color: "var(--color-muted)",
                        transition: "color 0.2s",
                        padding: "4px",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--color-teal)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--color-muted)")
                      }
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                </div>
              </div>

              <p
                style={{
                  fontSize: "0.9rem",
                  color: "var(--color-muted)",
                  lineHeight: 1.65,
                  flex: 1,
                }}
              >
                {project.description}
              </p>

              {project.highlight && (
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.8rem",
                    color: "var(--color-teal)",
                    fontWeight: 500,
                  }}
                >
                  <Sparkles size={14} />
                  {project.highlight}
                </div>
              )}

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                  marginTop: "4px",
                }}
              >
                {project.tags.map((tag) => (
                  <span key={tag} className="badge">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
