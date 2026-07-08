import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { Code2, ExternalLink, Trophy, Target, Flame, Zap, CheckCircle2 } from "lucide-react";
import { personalInfo } from "../data/portfolioData";

const LEETCODE_USERNAME = personalInfo.leetcode
  ?.split("/u/")[1]
  ?.replace("/", "") || "5z8YMTYoQr";

const LEETCODE_API = "https://alfa-leetcode-api.onrender.com/";

function AnimatedCounter({ value, duration = 1.5, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = 0;
          const end = value;
          const startTime = performance.now();

          const animate = (currentTime) => {
            const elapsed = (currentTime - startTime) / 1000;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(start + (end - start) * eased));
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

function DonutChart({ easy, medium, hard, total, totalQuestions, attempting }) {
  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  const totalSolved = easy + medium + hard;
  const easyPct = totalQuestions > 0 ? easy / totalQuestions : 0;
  const mediumPct = totalQuestions > 0 ? medium / totalQuestions : 0;
  const hardPct = totalQuestions > 0 ? hard / totalQuestions : 0;

  const easyLen = circumference * easyPct;
  const mediumLen = circumference * mediumPct;
  const hardLen = circumference * hardPct;

  const easyOffset = 0;
  const mediumOffset = -(easyLen);
  const hardOffset = -(easyLen + mediumLen);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
      <div style={{ position: "relative", width: "160px", height: "160px" }}>
        <svg
          width="160"
          height="160"
          viewBox="0 0 160 160"
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Background track */}
          <circle
            cx="80"
            cy="80"
            r={normalizedRadius}
            fill="none"
            stroke="rgba(232, 237, 242, 0.06)"
            strokeWidth={stroke}
          />
          {/* Easy arc */}
          <motion.circle
            cx="80"
            cy="80"
            r={normalizedRadius}
            fill="none"
            stroke="#00B8A3"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${easyLen} ${circumference - easyLen}`}
            strokeDashoffset={easyOffset}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            whileInView={{ strokeDasharray: `${easyLen} ${circumference - easyLen}` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          />
          {/* Medium arc */}
          <motion.circle
            cx="80"
            cy="80"
            r={normalizedRadius}
            fill="none"
            stroke="#FFC01E"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${mediumLen} ${circumference - mediumLen}`}
            strokeDashoffset={mediumOffset}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            whileInView={{ strokeDasharray: `${mediumLen} ${circumference - mediumLen}` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          />
          {/* Hard arc */}
          <motion.circle
            cx="80"
            cy="80"
            r={normalizedRadius}
            fill="none"
            stroke="#EF4743"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${hardLen} ${circumference - hardLen}`}
            strokeDashoffset={hardOffset}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            whileInView={{ strokeDasharray: `${hardLen} ${circumference - hardLen}` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.8 }}
          />
        </svg>
        {/* Center text */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "1.6rem",
              fontWeight: 700,
              fontFamily: "var(--font-heading)",
              color: "var(--color-offwhite)",
              lineHeight: 1,
            }}
          >
            <AnimatedCounter value={totalSolved} />
            <span style={{ fontSize: "0.8rem", color: "var(--color-muted)", fontWeight: 500 }}>/{totalQuestions}</span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              fontSize: "0.68rem",
              color: "var(--color-teal)",
              marginTop: "6px",
            }}
          >
            <CheckCircle2 size={11} />
            Solved
          </div>
        </div>
      </div>
      {/* Attempting label below donut */}
      {attempting > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.75rem",
            color: "var(--color-muted)",
          }}
        >
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--color-teal)" }} />
          {attempting} Attempting
        </div>
      )}
    </div>
  );
}

function AcceptanceDonut({ acceptanceRate, totalSubmissions }) {
  const radius = 70;
  const stroke = 10;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  const pct = acceptanceRate / 100;
  const filledLen = circumference * pct;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
      <div style={{ position: "relative", width: "160px", height: "160px" }}>
        <svg
          width="160"
          height="160"
          viewBox="0 0 160 160"
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Background track */}
          <circle
            cx="80"
            cy="80"
            r={normalizedRadius}
            fill="none"
            stroke="rgba(232, 237, 242, 0.06)"
            strokeWidth={stroke}
          />
          {/* Acceptance arc - using a gradient feel with teal */}
          <motion.circle
            cx="80"
            cy="80"
            r={normalizedRadius}
            fill="none"
            stroke="var(--color-teal)"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={`${filledLen} ${circumference - filledLen}`}
            strokeDashoffset={0}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            whileInView={{ strokeDasharray: `${filledLen} ${circumference - filledLen}` }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
          />
        </svg>
        {/* Center text */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "1.6rem",
              fontWeight: 700,
              fontFamily: "var(--font-heading)",
              color: "var(--color-offwhite)",
              lineHeight: 1,
            }}
          >
            <AnimatedCounter value={acceptanceRate} suffix="%" />
          </div>
          <div
            style={{
              fontSize: "0.68rem",
              color: "var(--color-muted)",
              marginTop: "6px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Acceptance
          </div>
        </div>
      </div>
      {/* Submissions label below donut */}
      {totalSubmissions > 0 && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.75rem",
            color: "var(--color-muted)",
          }}
        >
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "var(--color-teal)" }} />
          {totalSubmissions} submissions
        </div>
      )}
    </div>
  );
}

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "8px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Icon size={14} style={{ color }} />
          <span
            style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              color: "var(--color-offwhite)",
            }}
          >
            {label}
          </span>
        </div>
        <span
          style={{
            fontSize: "0.82rem",
            fontWeight: 600,
            color,
          }}
        >
          <AnimatedCounter value={solved} />
        </span>
      </div>
      <div
        style={{
          height: "6px",
          borderRadius: "3px",
          background: "rgba(232, 237, 242, 0.06)",
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut", delay: delay + 0.2 }}
          style={{
            height: "100%",
            borderRadius: "3px",
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function LeetCode() {
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

  // Fallback static data (your real stats as of last fetch)
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

  // Map the alfa-leetcode-api response to our component's expected shape
  const totalProblemsAttempted = stats?.totalSubmissionNum?.[0]?.count || 0;
  const totalSolved = stats?.solvedProblem || 0;
  const totalSubmissions = stats?.totalSubmissionNum?.[0]?.submissions || 0;
  const acceptedSubmissions = stats?.acSubmissionNum?.[0]?.submissions || 0;

  const data = stats
    ? {
        totalSolved,
        totalQuestions: stats.totalQuestions || 3985,
        easySolved: stats.easySolved || 0,
        totalEasy: (stats.totalSubmissionNum?.find(d => d.difficulty === "Easy")?.count) || 850,
        mediumSolved: stats.mediumSolved || 0,
        totalMedium: (stats.totalSubmissionNum?.find(d => d.difficulty === "Medium")?.count) || 1775,
        hardSolved: stats.hardSolved || 0,
        totalHard: (stats.totalSubmissionNum?.find(d => d.difficulty === "Hard")?.count) || 775,
        ranking: stats.ranking || 0,
        acceptanceRate: totalSubmissions > 0
          ? Math.round((acceptedSubmissions / totalSubmissions) * 100)
          : 0,
        totalSubmissions,
        attempting: totalProblemsAttempted - totalSolved,
      }
    : fallbackStats;

  return (
    <section id="leetcode" className="section">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Problem Solving</p>
          <h2 className="section-title">LeetCode Stats</h2>
          <p className="section-subtitle">
            Sharpening data structures & algorithms skills — one problem at a
            time. Here's my progress on LeetCode.
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="card"
          style={{
            marginTop: "48px",
            padding: "40px",
            background:
              "linear-gradient(135deg, var(--color-navy-light) 0%, rgba(13, 27, 42, 0.8) 100%)",
            border: "1px solid rgba(26, 188, 176, 0.12)",
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
              background:
                "radial-gradient(circle, rgba(26, 188, 176, 0.07) 0%, transparent 70%)",
              borderRadius: "50%",
              pointerEvents: "none",
            }}
          />

          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "200px",
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
              >
                <Code2
                  size={32}
                  style={{ color: "var(--color-teal)", opacity: 0.5 }}
                />
              </motion.div>
            </div>
          ) : (
            <div
              className="leetcode-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto 1fr",
                gap: "40px",
                alignItems: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              {/* Left: Solved Donut */}
              <DonutChart
                easy={data.easySolved}
                medium={data.mediumSolved}
                hard={data.hardSolved}
                total={data.totalQuestions}
                totalQuestions={data.totalQuestions}
                attempting={data.attempting}
              />

              {/* Center: Acceptance Donut */}
              <AcceptanceDonut
                acceptanceRate={data.acceptanceRate}
                totalSubmissions={data.totalSubmissions}
              />

              {/* Right: Stats breakdown */}
              <div>
                <DifficultyBar
                  label="Easy"
                  solved={data.easySolved}
                  total={data.totalEasy}
                  color="#00B8A3"
                  icon={Zap}
                  delay={0.1}
                />
                <DifficultyBar
                  label="Medium"
                  solved={data.mediumSolved}
                  total={data.totalMedium}
                  color="#FFC01E"
                  icon={Target}
                  delay={0.25}
                />
                <DifficultyBar
                  label="Hard"
                  solved={data.hardSolved}
                  total={data.totalHard}
                  color="#EF4743"
                  icon={Flame}
                  delay={0.4}
                />

                {/* Extra stats row */}
                <div
                  style={{
                    display: "flex",
                    gap: "24px",
                    marginTop: "24px",
                    flexWrap: "wrap",
                  }}
                >
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
                        background: "rgba(26, 188, 176, 0.06)",
                        borderRadius: "var(--radius-md)",
                        border: "1px solid rgba(26, 188, 176, 0.1)",
                      }}
                    >
                      <Trophy
                        size={16}
                        style={{ color: "var(--color-teal)" }}
                      />
                      <div>
                        <div
                          style={{
                            fontSize: "0.68rem",
                            color: "var(--color-muted)",
                            textTransform: "uppercase",
                            letterSpacing: "0.08em",
                          }}
                        >
                          Ranking
                        </div>
                        <div
                          style={{
                            fontSize: "0.95rem",
                            fontWeight: 700,
                            color: "var(--color-offwhite)",
                            fontFamily: "var(--font-heading)",
                          }}
                        >
                          <AnimatedCounter
                            value={data.ranking}
                            duration={2}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}


                </div>

                {/* CTA */}
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
                    style={{
                      fontSize: "0.82rem",
                      padding: "10px 20px",
                    }}
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
            <p
              style={{
                fontSize: "0.82rem",
                color: "var(--color-muted)",
                textAlign: "center",
                marginTop: "12px",
                fontStyle: "italic",
              }}
            >
              * Showing cached data — live stats will update shortly.
            </p>
          )}
        </motion.div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          #leetcode .leetcode-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          #leetcode .leetcode-grid > div:last-child {
            grid-column: 1 / -1;
          }
        }
        @media (max-width: 580px) {
          #leetcode .leetcode-grid {
            grid-template-columns: 1fr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </section>
  );
}
