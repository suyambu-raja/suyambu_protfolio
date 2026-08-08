import { Mail, Heart } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { personalInfo, navLinks } from "../data/portfolioData";

export default function Footer() {
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer
      style={{
        background: "#000000",
        borderTop: "3px solid #7C3AED",
        padding: "48px 0 32px",
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "28px",
        }}
      >
        {/* Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#FFFFFF",
          }}
        >
          S<span style={{ color: "#7C3AED" }}>.</span>Dev
        </a>

        {/* Navigation */}
        <nav>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: "24px",
            }}
          >
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    fontSize: "0.85rem",
                    color: "#9CA3AF",
                    transition: "color 0.3s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#A78BFA")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#9CA3AF")
                  }
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Icons */}
        <div style={{ display: "flex", gap: "16px" }}>
          {[
            { icon: GithubIcon, href: personalInfo.github, label: "GitHub" },
            { icon: LinkedinIcon, href: personalInfo.linkedin, label: "LinkedIn" },
            { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={label !== "Email" ? "_blank" : undefined}
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "var(--radius-md)",
                background: "rgba(124, 58, 237, 0.1)",
                border: "1px solid rgba(124, 58, 237, 0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9CA3AF",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#7C3AED";
                e.currentTarget.style.color = "#A78BFA";
                e.currentTarget.style.background = "rgba(124, 58, 237, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(124, 58, 237, 0.25)";
                e.currentTarget.style.color = "#9CA3AF";
                e.currentTarget.style.background = "rgba(124, 58, 237, 0.1)";
              }}
            >
              <Icon size={18} />
            </a>
          ))}
        </div>

        {/* Divider + Copyright */}
        <div
          style={{
            width: "100%",
            height: "1px",
            background: "rgba(124, 58, 237, 0.2)",
          }}
        />
        <p
          style={{
            fontSize: "0.8rem",
            color: "#9CA3AF",
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
        >
          © {new Date().getFullYear()} Suyambu. Built with
          <Heart
            size={14}
            style={{ color: "#7C3AED", fill: "#7C3AED" }}
          />
          using React.
        </p>
      </div>
    </footer>
  );
}
