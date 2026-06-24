import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Award } from "lucide-react";
import { experiences } from "../data/portfolioData";

const iconMap = {
  work: Briefcase,
  education: GraduationCap,
  certification: Award,
};

const entryVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
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
            My professional timeline — internships, education, and certifications
            that have shaped my development career.
          </p>
        </motion.div>

        {/* Timeline */}
        <div
          style={{
            marginTop: "48px",
            position: "relative",
            paddingLeft: "40px",
          }}
        >
          {/* Vertical line */}
          <div
            style={{
              position: "absolute",
              left: "15px",
              top: "8px",
              bottom: "8px",
              width: "2px",
              background:
                "linear-gradient(180deg, var(--color-teal) 0%, rgba(26, 188, 176, 0.1) 100%)",
              borderRadius: "1px",
            }}
          />

          {experiences.map((exp, i) => {
            const Icon = iconMap[exp.type] || Briefcase;

            return (
              <motion.div
                key={i}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
                variants={entryVariants}
                style={{
                  position: "relative",
                  marginBottom: i < experiences.length - 1 ? "40px" : "0",
                }}
              >
                {/* Dot */}
                <div
                  style={{
                    position: "absolute",
                    left: "-33px",
                    top: "4px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "var(--color-navy)",
                    border: "2px solid var(--color-teal)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "var(--color-teal)",
                    }}
                  />
                </div>

                {/* Card */}
                <div className="card">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "8px",
                    }}
                  >
                    <Icon
                      size={18}
                      style={{ color: "var(--color-teal)", flexShrink: 0 }}
                    />
                    <h3
                      style={{
                        fontFamily: "var(--font-heading)",
                        fontSize: "1.1rem",
                        fontWeight: 600,
                        color: "var(--color-offwhite)",
                      }}
                    >
                      {exp.title}
                    </h3>
                  </div>

                  {exp.organization && (
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--color-teal)",
                        fontWeight: 500,
                        marginBottom: "4px",
                      }}
                    >
                      {exp.organization}
                    </p>
                  )}

                  {exp.duration && (
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--color-muted)",
                        marginBottom: "10px",
                      }}
                    >
                      {exp.duration}
                    </p>
                  )}

                  {exp.description && (
                    <p
                      style={{
                        fontSize: "0.88rem",
                        color: "var(--color-muted)",
                        lineHeight: 1.65,
                        marginBottom:
                          exp.tech?.length || exp.certifications?.length
                            ? "14px"
                            : "0",
                      }}
                    >
                      {exp.description}
                    </p>
                  )}

                  {exp.tech && exp.tech.length > 0 && (
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                      }}
                    >
                      {exp.tech.map((t) => (
                        <span key={t} className="badge">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {exp.certifications && exp.certifications.length > 0 && (
                    <ul
                      style={{
                        listStyle: "none",
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      {exp.certifications.map((cert) => (
                        <li
                          key={cert}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            fontSize: "0.88rem",
                            color: "var(--color-muted)",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-block",
                              width: "6px",
                              height: "6px",
                              borderRadius: "50%",
                              background: "var(--color-teal)",
                              flexShrink: 0,
                            }}
                          />
                          {cert}
                        </li>
                      ))}
                    </ul>
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
