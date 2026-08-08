import { motion } from "framer-motion";
import { Briefcase, GraduationCap, BookOpen, Laptop, Building2 } from "lucide-react";
import { experiences } from "../data/portfolioData";

const iconMap = {
  GraduationCap: GraduationCap,
  BookOpen: BookOpen,
  Briefcase: Briefcase,
  Laptop: Laptop,
};

const entryVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
  }),
};

export default function Experience() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Journey</p>
          <h2 className="section-title">Experience & Education</h2>
          <p className="section-subtitle">
            My professional timeline — internships, education, and freelance projects.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="timeline-container">
          <div className="timeline-line" />

          {experiences.map((exp, i) => {
            const Icon = iconMap[exp.icon] || Briefcase;

            return (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={entryVariants}
                className="timeline-item"
              >
                <div className="timeline-dot" />

                <div className="timeline-card" style={{ position: "relative" }}>
                  {/* Top Row: Icon + Bold White Heading */}
                  <div className="timeline-header">
                    <div className="timeline-icon">
                      <Icon size={20} />
                    </div>
                    <div style={{ flex: 1, paddingRight: exp.logoPlaceholder ? "48px" : "0" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                        <h3 className="timeline-title">{exp.title}</h3>
                        {exp.badge && (
                          <span
                            style={{
                              display: "inline-block",
                              padding: "3px 10px",
                              fontSize: "0.7rem",
                              fontWeight: 700,
                              borderRadius: "99px",
                              background: "rgba(245, 166, 35, 0.12)",
                              color: "#F5A623",
                              border: "1px solid rgba(245, 166, 35, 0.3)",
                            }}
                          >
                            {exp.badge}
                          </span>
                        )}
                      </div>

                      {/* Second Row: Institution / Organization in muted gray */}
                      {exp.organization && (
                        <p className="timeline-org">{exp.organization}</p>
                      )}
                    </div>
                  </div>

                  {/* Far right Company Logo Placeholder (for Card 3) */}
                  {exp.logoPlaceholder && (
                    <div
                      style={{
                        position: "absolute",
                        top: "24px",
                        right: "24px",
                        width: "40px",
                        height: "40px",
                        borderRadius: "8px",
                        background: "rgba(124, 58, 237, 0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid rgba(124, 58, 237, 0.25)",
                      }}
                    >
                      <Building2 size={20} style={{ color: "#7C3AED" }} />
                    </div>
                  )}

                  {/* Third Row: Duration Badge + Status / Type Badge Side by Side */}
                  {(exp.duration || exp.status || exp.type === "work") && (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginTop: "12px", marginBottom: "8px" }}>
                      {exp.duration && <span className="timeline-date">{exp.duration}</span>}
                      {exp.status && (
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            color: exp.status === "Completed" ? "#34D399" : "#F59E0B",
                            background: exp.status === "Completed" ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                            padding: "3px 10px",
                            borderRadius: "99px",
                            border: `1px solid ${exp.status === "Completed" ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"}`,
                          }}
                        >
                          {exp.status}
                        </span>
                      )}
                      {exp.type === "work" && (
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            color: "#A78BFA",
                            background: "rgba(124, 58, 237, 0.15)",
                            padding: "3px 10px",
                            borderRadius: "99px",
                            border: "1px solid rgba(124, 58, 237, 0.25)",
                          }}
                        >
                          Internship
                        </span>
                      )}
                    </div>
                  )}

                  {/* Fourth Row: Detail text */}
                  {exp.description && (
                    <p style={{ fontSize: "0.85rem", color: "#F3F4F6", marginTop: "4px" }}>
                      {exp.description}
                    </p>
                  )}

                  {/* Bullets Row (for Card 3) */}
                  {exp.bullets && (
                    <ul className="timeline-bullets timeline-body" style={{ marginTop: "10px" }}>
                      {exp.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}

                  {/* Tech Tags Row (for Card 3) */}
                  {exp.tech && exp.tech.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "14px" }}>
                      {exp.tech.map((t) => (
                        <span key={t} className="badge">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Sub-cards Row (for Card 4 — Freelance Work) */}
                  {exp.projects && (
                    <div className="freelance-grid">
                      {exp.projects.map((proj, idx) => (
                        <div key={idx} className="freelance-card">
                          <div className="freelance-card-header">
                            <div>
                              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                                <h4 style={{ fontFamily: "var(--font-heading)", fontSize: "0.95rem", fontWeight: 700, color: "#F3F4F6" }}>
                                  {proj.name}
                                </h4>
                                {proj.status && (
                                  <span
                                    style={{
                                      fontSize: "0.7rem",
                                      fontWeight: 700,
                                      color: proj.status === "Completed" ? "#34D399" : "#F59E0B",
                                      padding: "2px 8px",
                                      borderRadius: "99px",
                                      border: `1px solid ${proj.status === "Completed" ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"}`,
                                      background: proj.status === "Completed" ? "rgba(16, 185, 129, 0.15)" : "rgba(245, 158, 11, 0.15)",
                                    }}
                                  >
                                    {proj.status}
                                  </span>
                                )}
                              </div>
                              <p style={{ fontSize: "0.8rem", color: "#9CA3AF", marginTop: "2px" }}>
                                Client: {proj.client}
                              </p>
                            </div>
                          </div>
                          <p style={{ fontSize: "0.85rem", color: "#9CA3AF", lineHeight: 1.5, marginTop: "8px" }}>
                            {proj.work}
                          </p>
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "10px" }}>
                            {proj.stack.map((s) => (
                              <span
                                key={s}
                                style={{
                                  fontSize: "0.7rem",
                                  padding: "2px 8px",
                                  background: "rgba(124, 58, 237, 0.15)",
                                  borderRadius: "4px",
                                  color: "#A78BFA",
                                  border: "1px solid rgba(124, 58, 237, 0.25)",
                                }}
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

