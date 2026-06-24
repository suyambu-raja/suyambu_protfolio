import { motion } from "framer-motion";
import { skillGroups } from "../data/portfolioData";

function SkillBar({ name, level, delay }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "6px",
        }}
      >
        <span
          style={{
            fontSize: "0.82rem",
            fontWeight: 500,
            color: "var(--color-offwhite)",
          }}
        >
          {name}
        </span>
        <span
          style={{
            fontSize: "0.75rem",
            color: "var(--color-muted)",
            fontWeight: 500,
          }}
        >
          {level}%
        </span>
      </div>
      <div
        style={{
          height: "4px",
          borderRadius: "2px",
          background: "rgba(232, 237, 242, 0.06)",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: delay, duration: 0.8, ease: "easeOut" }}
          style={{
            height: "100%",
            borderRadius: "2px",
            background:
              "linear-gradient(90deg, var(--color-teal), rgba(26, 188, 176, 0.5))",
          }}
        />
      </div>
    </div>
  );
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Expertise</p>
          <h2 className="section-title">Skills & Technologies</h2>
          <p className="section-subtitle">
            A comprehensive view of my technical skill set across frontend,
            backend, machine learning, and developer tools.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
            gap: "24px",
            marginTop: "48px",
          }}
        >
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              className="card"
              custom={groupIndex}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={cardVariants}
            >
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "var(--color-teal)",
                  marginBottom: "20px",
                  letterSpacing: "0.03em",
                }}
              >
                {group.title}
              </h3>

              {group.skills.map((skill, skillIndex) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  delay={groupIndex * 0.1 + skillIndex * 0.08}
                />
              ))}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
