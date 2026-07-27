import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2, ExternalLink, Trophy, Target, Flame, Zap, CheckCircle2 } from "lucide-react";
import { achievements, personalInfo } from "../data/portfolioData";

/* =========================================================
   DATA FILTERS
   ========================================================= */
const hackathons = achievements.filter((a) => a.category === "hackathon");

/* =========================================================
   LEETCODE CONFIG
   ========================================================= */
const LEETCODE_USERNAME =
  personalInfo.leetcode?.split("/u/")[1]?.replace("/", "") || "5z8YMTYoQr";
const LEETCODE_API = "https://alfa-leetcode-api.onrender.com/";

const fallbackStats = {
  totalSolved: 121,
  totalQuestions: 3985,
  easySolved: 53,
  totalEasy: 850,
  mediumSolved: 63,
  totalMedium: 1775,
  hardSolved: 5,
  totalHard: 775,
  ranking: 1359212,
  acceptanceRate: 50,
  totalSubmissions: 254,
  attempting: 5,
};

/* =========================================================
   TAB CONFIG
   ========================================================= */
const tabs = [
  { key: "hackathon", label: "Hackathons", count: hackathons.length },
  { key: "leetcode", label: "LeetCode", count: null },
];

/* =========================================================
   INLINE SVG ICONS
   ========================================================= */
const TrophyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#1ABCB0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 19.24 7 20v2" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 19.24 17 20v2" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);



/* =========================================================
   ANIMATION VARIANTS
   ========================================================= */
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
  exit: {},
};

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
  exit: { opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.25, ease: "easeIn" } },
};

/* =========================================================
   ANIMATED COUNTER
   ========================================================= */
function AnimatedCounter({ value, duration = 1.5, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const animate = (currentTime) => {
            const elapsed = (currentTime - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(value * eased));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* =========================================================
   DONUT CHART — SOLVED PROBLEMS
   ========================================================= */
function DonutChart({ easy, medium, hard, totalQuestions, attempting }) {
  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const totalSolved = easy + medium + hard;

  const easyLen = circumference * (totalQuestions > 0 ? easy / totalQuestions : 0);
  const mediumLen = circumference * (totalQuestions > 0 ? medium / totalQuestions : 0);
  const hardLen = circumference * (totalQuestions > 0 ? hard / totalQuestions : 0);

  const mediumOffset = -(easyLen);
  const hardOffset = -(easyLen + mediumLen);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
      <div style={{ position: "relative", width: "160px", height: "160px" }}>
        <svg width="160" height="160" viewBox="0 0 160 160" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="80" cy="80" r={normalizedRadius} fill="none" stroke="rgba(232,237,242,0.06)" strokeWidth={stroke} />
          <motion.circle cx="80" cy="80" r={normalizedRadius} fill="none" stroke="#00B8A3" strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={`${easyLen} ${circumference - easyLen}`} strokeDashoffset={0}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            whileInView={{ strokeDasharray: `${easyLen} ${circumference - easyLen}` }}
            viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }} />
          <motion.circle cx="80" cy="80" r={normalizedRadius} fill="none" stroke="#FFC01E" strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={`${mediumLen} ${circumference - mediumLen}`} strokeDashoffset={mediumOffset}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            whileInView={{ strokeDasharray: `${mediumLen} ${circumference - mediumLen}` }}
            viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }} />
          <motion.circle cx="80" cy="80" r={normalizedRadius} fill="none" stroke="#EF4743" strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={`${hardLen} ${circumference - hardLen}`} strokeDashoffset={hardOffset}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            whileInView={{ strokeDasharray: `${hardLen} ${circumference - hardLen}` }}
            viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }} />
        </svg>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
          <div style={{ fontSize: "1.6rem", fontWeight: 700, fontFamily: "var(--font-heading)", color: "var(--color-offwhite)", lineHeight: 1 }}>
            <AnimatedCounter value={totalSolved} />
            <span style={{ fontSize: "0.8rem", color: "var(--color-muted)", fontWeight: 500 }}>/{totalQuestions}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", fontSize: "0.68rem", color: "var(--color-teal)", marginTop: "6px" }}>
            <CheckCircle2 size={11} /> Solved
          </div>
        </div>
      </div>
      {attempting > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: "var(--color-muted)" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--color-teal)" }} />
          {attempting} Attempting
        </div>
      )}
    </div>
  );
}

/* =========================================================
   DONUT CHART — ACCEPTANCE RATE
   ========================================================= */
function AcceptanceDonut({ acceptanceRate, totalSubmissions }) {
  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const filledLen = circumference * (acceptanceRate / 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
      <div style={{ position: "relative", width: "160px", height: "160px" }}>
        <svg width="160" height="160" viewBox="0 0 160 160" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="80" cy="80" r={normalizedRadius} fill="none" stroke="rgba(232,237,242,0.06)" strokeWidth={stroke} />
          <motion.circle cx="80" cy="80" r={normalizedRadius} fill="none" stroke="var(--color-teal)" strokeWidth={stroke} strokeLinecap="round"
            strokeDasharray={`${filledLen} ${circumference - filledLen}`} strokeDashoffset={0}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            whileInView={{ strokeDasharray: `${filledLen} ${circumference - filledLen}` }}
            viewport={{ once: true }} transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }} />
        </svg>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
          <div style={{ fontSize: "1.6rem", fontWeight: 700, fontFamily: "var(--font-heading)", color: "var(--color-offwhite)", lineHeight: 1 }}>
            <AnimatedCounter value={acceptanceRate} suffix="%" />
          </div>
          <div style={{ fontSize: "0.68rem", color: "var(--color-muted)", marginTop: "6px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            Acceptance
          </div>
        </div>
      </div>
      {totalSubmissions > 0 && (
        <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "0.75rem", color: "var(--color-muted)" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--color-teal)" }} />
          {totalSubmissions} submissions
        </div>
      )}
    </div>
  );
}

/* =========================================================
   DIFFICULTY BAR
   ========================================================= */
function DifficultyBar({ label, solved, total, color, icon: Icon, delay }) {
  const percentage = total > 0 ? (solved / total) * 100 : 0;
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      style={{ marginBottom: "16px" }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Icon size={14} style={{ color }} />
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-offwhite)" }}>{label}</span>
        </div>
        <span style={{ fontSize: "0.82rem", fontWeight: 600, color }}>
          <AnimatedCounter value={solved} />
        </span>
      </div>
      <div style={{ height: "6px", borderRadius: "3px", background: "rgba(232,237,242,0.06)", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: delay + 0.2 }}
          style={{ height: "100%", borderRadius: "3px", background: `linear-gradient(90deg, ${color}, ${color}88)` }}
        />
      </div>
    </motion.div>
  );
}

/* =========================================================
   LEETCODE TAB CONTENT
   ========================================================= */
function LeetCodeTab() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [solvedRes, profileRes] = await Promise.all([
          fetch(`${LEETCODE_API}${LEETCODE_USERNAME}/solved`),
          fetch(`${LEETCODE_API}${LEETCODE_USERNAME}`),
        ]);
        if (!solvedRes.ok || !profileRes.ok) throw new Error("Failed to fetch");
        const solvedData = await solvedRes.json();
        const profileData = await profileRes.json();
        setStats({ ...solvedData, ...profileData });
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const totalProblemsAttempted = stats?.totalSubmissionNum?.[0]?.count || 0;
  const totalSolved = stats?.solvedProblem || 0;
  const totalSubmissions = stats?.totalSubmissionNum?.[0]?.submissions || 0;
  const acceptedSubmissions = stats?.acSubmissionNum?.[0]?.submissions || 0;

  const data = stats
    ? {
        totalSolved,
        totalQuestions: stats.totalQuestions || 3985,
        easySolved: stats.easySolved || 0,
        totalEasy: stats.totalSubmissionNum?.find((d) => d.difficulty === "Easy")?.count || 850,
        mediumSolved: stats.mediumSolved || 0,
        totalMedium: stats.totalSubmissionNum?.find((d) => d.difficulty === "Medium")?.count || 1775,
        hardSolved: stats.hardSolved || 0,
        totalHard: stats.totalSubmissionNum?.find((d) => d.difficulty === "Hard")?.count || 775,
        ranking: stats.ranking || 0,
        acceptanceRate: totalSubmissions > 0 ? Math.round((acceptedSubmissions / totalSubmissions) * 100) : 0,
        totalSubmissions,
        attempting: totalProblemsAttempted - totalSolved,
      }
    : fallbackStats;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div
        className="card"
        style={{
          padding: "40px",
          background: "linear-gradient(135deg, var(--color-navy-light) 0%, rgba(13,27,42,0.8) 100%)",
          border: "1px solid rgba(255,165,0,0.15)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative gradient blob */}
        <div
          style={{
            position: "absolute",
            top: "-60px",
            right: "-60px",
            width: "250px",
            height: "250px",
            background: "radial-gradient(circle, rgba(255,165,0,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
            <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}>
              <Code2 size={32} style={{ color: "#FFA500", opacity: 0.5 }} />
            </motion.div>
          </div>
        ) : (
          <div className="leetcode-grid">
            <DonutChart
              easy={data.easySolved}
              medium={data.mediumSolved}
              hard={data.hardSolved}
              totalQuestions={data.totalQuestions}
              attempting={data.attempting}
            />
            <AcceptanceDonut acceptanceRate={data.acceptanceRate} totalSubmissions={data.totalSubmissions} />
            <div>
              {/* Difficulty counts */}
              <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "24px" }}>
                {[
                  { label: "Easy", value: data.easySolved, color: "#00B8A3" },
                  { label: "Medium", value: data.mediumSolved, color: "#FFC01E" },
                  { label: "Hard", value: data.hardSolved, color: "#EF4743" },
                ].map((d) => (
                  <div
                    key={d.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      padding: "8px 16px",
                      background: "rgba(232,237,242,0.04)",
                      borderRadius: "var(--radius-sm)",
                      border: `1px solid ${d.color}22`,
                    }}
                  >
                    <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: d.color }} />
                    <span style={{ fontSize: "0.78rem", color: "var(--color-muted)", fontWeight: 500 }}>{d.label}</span>
                    <span style={{ fontSize: "0.95rem", fontWeight: 700, color: d.color, fontFamily: "var(--font-heading)" }}>
                      <AnimatedCounter value={d.value} />
                    </span>
                  </div>
                ))}
              </div>

              {data.ranking > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    padding: "10px 18px",
                    background: "rgba(255,165,0,0.06)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid rgba(255,165,0,0.12)",
                    marginTop: "24px",
                    width: "fit-content",
                  }}
                >
                  <Trophy size={16} style={{ color: "#FFA500" }} />
                  <div>
                    <div style={{ fontSize: "0.68rem", color: "var(--color-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                      Ranking
                    </div>
                    <div style={{ fontSize: "0.95rem", fontWeight: 700, color: "var(--color-offwhite)", fontFamily: "var(--font-heading)" }}>
                      <AnimatedCounter value={data.ranking} duration={2} />
                    </div>
                  </div>
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                style={{ marginTop: "24px" }}
              >
                <a
                  href={personalInfo.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-ghost"
                  style={{ fontSize: "0.82rem", padding: "10px 20px" }}
                >
                  <Code2 size={15} />
                  View LeetCode Profile
                  <ExternalLink size={13} />
                </a>
              </motion.div>
            </div>
          </div>
        )}

        {error && !stats && (
          <p style={{ fontSize: "0.82rem", color: "var(--color-muted)", textAlign: "center", marginTop: "12px", fontStyle: "italic" }}>
            * Showing cached data — live stats will update shortly.
          </p>
        )}
      </div>
    </motion.div>
  );
}

/* =========================================================
   HACKATHON CARD
   ========================================================= */
function HackathonCard({ item, onImageClick }) {
  return (
    <motion.div className="ach-card ach-card--hackathon ach-card--has-image" variants={cardVariants}>
      {item.image && (
        <div
          className="ach-card__image-slot"
          onClick={() => onImageClick && onImageClick(item.image)}
          style={{ cursor: "pointer" }}
          title="Click to view full photo"
        >
          <img src={item.image} alt={item.event} className="ach-card__image" />
          <div className="ach-card__image-overlay">
            <span style={{ color: "#fff", fontSize: "0.82rem", fontWeight: 600 }}>View Photo</span>
          </div>
        </div>
      )}
      <div className="ach-card__content">
        <div className="ach-card__header">
          <TrophyIcon />
          <div>
            <h3 className="ach-card__title">{item.event}</h3>
            <span className="ach-card__org">{item.organizer}</span>
          </div>
        </div>
        {item.description && <p className="ach-card__desc">{item.description}</p>}
        <div className="ach-card__footer">
          <span className="ach-badge ach-badge--teal">{item.result}</span>
          {item.year && <span className="ach-card__year">{item.year}</span>}
          {item.image && (
            <button
              className="btn btn-ghost"
              style={{
                fontSize: "0.78rem",
                padding: "6px 14px",
                borderColor: "var(--color-teal)",
                color: "var(--color-teal)",
                marginLeft: "auto",
                cursor: "pointer",
              }}
              onClick={() => onImageClick && onImageClick(item.image)}
            >
              View Photo
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}



/* =========================================================
   MAIN SECTION
   ========================================================= */
export default function Achievements() {
  const [activeTab, setActiveTab] = useState("hackathon");
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <section id="achievements" className="section">
      <div className="container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Recognition</p>
          <h2 className="section-title">Achievements</h2>
          <p className="section-subtitle">
            Certifications, competitions, and recognitions I've earned.
          </p>
        </motion.div>

        {/* Tab Switcher */}
        <div className="ach-tabs">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              className={`ach-tab ${activeTab === tab.key ? "ach-tab--active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
              {tab.count !== null && (
                <span className="ach-tab__count">{tab.count}</span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === "leetcode" ? (
            <LeetCodeTab key="leetcode" />
          ) : (
            <motion.div
              key={activeTab}
              className="ach-grid"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {activeTab === "hackathon" &&
                hackathons.map((item) => (
                  <HackathonCard
                    key={item.event}
                    item={item}
                    onImageClick={(img) => setLightboxImage(img)}
                  />
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="lightbox-close" onClick={() => setLightboxImage(null)}>
                &times;
              </button>
              <img src={lightboxImage} alt="Certificate Full Size" className="lightbox-image" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
