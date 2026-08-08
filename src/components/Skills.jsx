import { motion } from "framer-motion";
import { skillGroups } from "../data/portfolioData";

/* Custom SVG icons for skills without Devicon entries */
const customIcons = {
  jwt: (
    <svg viewBox="0 0 40 40" className="skill-custom-icon">
      <circle cx="20" cy="20" r="18" fill="none" stroke="#7C3AED" strokeWidth="2" />
      <text
        x="20"
        y="21"
        textAnchor="middle"
        dominantBaseline="central"
        fill="#7C3AED"
        fontSize="10"
        fontWeight="700"
        fontFamily="var(--font-heading)"
      >
        JWT
      </text>
    </svg>
  ),
  huggingface: (
    <svg viewBox="0 0 40 40" className="skill-custom-icon">
      <text
        x="20"
        y="22"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="28"
      >
        🤗
      </text>
    </svg>
  ),
};

const groupVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: "easeOut" },
  }),
};

export default function Skills() {
  let globalIndex = 0;

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

        <div className="skills-grid-container">
          {skillGroups.map((group, groupIndex) => {
            const groupCards = group.skills.map((skill) => {
              const cardIndex = globalIndex++;
              return { ...skill, cardIndex };
            });

            return (
              <motion.div
                key={group.title}
                className="skill-category"
                custom={groupIndex}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                variants={groupVariants}
              >
                <span className="skill-category-label">{group.title}</span>

                <div className="skill-icon-row">
                  {groupCards.map((skill) => (
                    <div
                      key={`${group.title}-${skill.name}`}
                      className="skill-float-card"
                      style={{
                        animationDelay: `${skill.cardIndex * 0.35}s`,
                      }}
                    >
                      {skill.icon ? (
                        <i className={`${skill.icon} skill-icon`} />
                      ) : (
                        customIcons[skill.customIcon]
                      )}
                      <span className="skill-name">{skill.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
