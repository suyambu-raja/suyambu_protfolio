import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import emailjs from "@emailjs/browser";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { personalInfo } from "../data/portfolioData";

const contactLinks = [
  {
    icon: Mail,
    label: "Email",
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
  },
  {
    icon: GithubIcon,
    label: "GitHub",
    value: "github.com/suyambu-raja",
    href: personalInfo.github,
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    value: "linkedin.com/in/suyambu-raja-a-088994293",
    href: personalInfo.linkedin,
  },
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus("sending");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      if (serviceId && templateId && publicKey) {
        // Send email via EmailJS
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_email: personalInfo.email,
            reply_to: formData.email,
          },
          publicKey
        );
      } else {
        // Direct email API fallback
        const res = await fetch(`https://formsubmit.co/ajax/${personalInfo.email}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: `New Portfolio Message from ${formData.name}`,
          }),
        }).catch(() => null);

        if (!res || !res.ok) {
          // Reliable mailto trigger fallback if CORS or API fails
          window.open(
            `mailto:${personalInfo.email}?subject=${encodeURIComponent(
              "Portfolio Message from " + formData.name
            )}&body=${encodeURIComponent(
              formData.message + "\n\nFrom: " + formData.name + " (" + formData.email + ")"
            )}`,
            "_self"
          );
        }
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("Failed to send message via EmailJS:", err);
      // Fallback to mailto
      window.open(
        `mailto:${personalInfo.email}?subject=${encodeURIComponent(
          "Portfolio Message from " + formData.name
        )}&body=${encodeURIComponent(
          formData.message + "\n\nFrom: " + formData.name + " (" + formData.email + ")"
        )}`,
        "_self"
      );
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const inputStyle = (hasError) => ({
    width: "100%",
    padding: "12px 16px",
    fontSize: "0.9rem",
    fontFamily: "var(--font-body)",
    color: "var(--color-offwhite)",
    background: "rgba(232, 237, 242, 0.04)",
    border: `1px solid ${hasError ? "#ef4444" : "rgba(232, 237, 242, 0.1)"}`,
    borderRadius: "var(--radius-md)",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  });

  const inputFocusStyle = {
    borderColor: "var(--color-teal)",
    boxShadow: "0 0 0 3px rgba(26, 188, 176, 0.1)",
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <p className="section-label">Get In Touch</p>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">
            Have a project in mind or want to collaborate? Feel free to reach out
            — I'm always open to new opportunities.
          </p>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "40px",
            marginTop: "48px",
          }}
          className="contact-grid"
        >
          {/* Left Panel — Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            {contactLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label !== "Email" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="card"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "var(--radius-md)",
                      background: "var(--color-teal-glow)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} style={{ color: "var(--color-teal)" }} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "var(--color-muted)",
                        marginBottom: "2px",
                      }}
                    >
                      {link.label}
                    </p>
                    <p
                      style={{
                        fontSize: "0.92rem",
                        fontWeight: 500,
                        color: "var(--color-offwhite)",
                      }}
                    >
                      {link.value}
                    </p>
                  </div>
                </a>
              );
            })}
          </motion.div>

          {/* Right Panel — Contact Form */}
          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="card"
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <div>
              <label
                htmlFor="contact-name"
                style={{
                  display: "block",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  color: "var(--color-muted)",
                  marginBottom: "6px",
                }}
              >
                Full Name
              </label>
              <input
                id="contact-name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                style={inputStyle(!!errors.name)}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.name
                    ? "#ef4444"
                    : "rgba(232, 237, 242, 0.1)";
                  e.target.style.boxShadow = "none";
                }}
              />
              {errors.name && (
                <p style={{ fontSize: "0.78rem", color: "#ef4444", marginTop: "4px" }}>
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-email"
                style={{
                  display: "block",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  color: "var(--color-muted)",
                  marginBottom: "6px",
                }}
              >
                Email Address
              </label>
              <input
                id="contact-email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                style={inputStyle(!!errors.email)}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.email
                    ? "#ef4444"
                    : "rgba(232, 237, 242, 0.1)";
                  e.target.style.boxShadow = "none";
                }}
              />
              {errors.email && (
                <p style={{ fontSize: "0.78rem", color: "#ef4444", marginTop: "4px" }}>
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="contact-message"
                style={{
                  display: "block",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  color: "var(--color-muted)",
                  marginBottom: "6px",
                }}
              >
                Message
              </label>
              <textarea
                id="contact-message"
                rows={5}
                placeholder="Tell me about your project or idea..."
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                style={{
                  ...inputStyle(!!errors.message),
                  resize: "vertical",
                  minHeight: "120px",
                }}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.message
                    ? "#ef4444"
                    : "rgba(232, 237, 242, 0.1)";
                  e.target.style.boxShadow = "none";
                }}
              />
              {errors.message && (
                <p style={{ fontSize: "0.78rem", color: "#ef4444", marginTop: "4px" }}>
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary"
              disabled={status === "sending"}
              style={{
                width: "100%",
                opacity: status === "sending" ? 0.7 : 1,
                pointerEvents: status === "sending" ? "none" : "auto",
              }}
            >
              {status === "sending" ? (
                <>
                  <Loader2
                    size={18}
                    style={{
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  Sending...
                </>
              ) : status === "success" ? (
                <>
                  <CheckCircle size={18} />
                  Message Sent!
                </>
              ) : status === "error" ? (
                <>
                  <AlertCircle size={18} />
                  Failed — Try Again
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>
          </motion.form>
        </div>
      </div>

      {/* Spinner keyframe + responsive grid */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @media (min-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr 1.4fr !important;
          }
        }
      `}</style>
    </section>
  );
}
