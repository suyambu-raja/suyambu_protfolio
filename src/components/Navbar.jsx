import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data/portfolioData";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (isMobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Determine active section
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileOpen(false);
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: "var(--nav-height)",
        display: "flex",
        alignItems: "center",
        transition: "all 0.3s ease",
        background: "rgba(0, 0, 0, 0.9)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(124, 58, 237, 0.25)",
        boxShadow: isScrolled
          ? "0 4px 20px rgba(124, 58, 237, 0.15)"
          : "none",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.35rem",
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
          }}
        >
          S<span style={{ color: "#7C3AED" }}>.</span>Dev
        </a>

        {/* Desktop Nav Links */}
        <ul
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
            listStyle: "none",
          }}
          className="desktop-nav"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    color: isActive
                      ? "#7C3AED"
                      : "#9CA3AF",
                    transition: "color 0.3s ease",
                    position: "relative",
                    paddingBottom: "4px",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      e.currentTarget.style.color = "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      e.currentTarget.style.color = "#9CA3AF";
                  }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "2px",
                        background: "#7C3AED",
                        borderRadius: "1px",
                      }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Mobile Hamburger */}
        <button
          className="mobile-menu-btn"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label="Toggle menu"
          style={{
            display: "none",
            background: "none",
            color: "#FFFFFF",
            padding: "8px",
            minWidth: "44px",
            minHeight: "44px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mobile-nav"
            style={{
              position: "absolute",
              top: "var(--nav-height)",
              left: 0,
              right: 0,
              background: "rgba(10, 10, 15, 0.98)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderBottom: "1px solid rgba(124, 58, 237, 0.25)",
              padding: "16px 0",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
            }}
          >
            <ul
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      style={{
                        display: "block",
                        padding: "10px 24px",
                        fontSize: "0.95rem",
                        fontWeight: 500,
                        color: isActive
                          ? "#7C3AED"
                          : "#9CA3AF",
                        transition: "color 0.3s ease",
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive CSS via style tag */}
      <style>{`
        .desktop-nav {
          display: flex !important;
        }
        .mobile-menu-btn {
          display: none !important;
        }
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
}
