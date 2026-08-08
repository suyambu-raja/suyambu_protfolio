import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Send, Loader2, CheckCircle, AlertCircle, X } from "lucide-react";
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
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "success" | "error"
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      newErrors.name = "Full Name is required";
    } else if (trimmedName.length < 2) {
      newErrors.name = "Full Name must be at least 2 characters";
    }

    if (!trimmedEmail) {
      newErrors.email = "Email Address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!trimmedMessage) {
      newErrors.message = "Message is required";
    } else if (trimmedMessage.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus("loading");

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || "";
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || "";
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";

    const isEmailJSConfigured =
      serviceId &&
      templateId &&
      publicKey &&
      !serviceId.includes("your_") &&
      !templateId.includes("your_") &&
      !publicKey.includes("your_");

    let sentSuccessfully = false;

    // 1. Try EmailJS if valid credentials are configured in .env
    if (isEmailJSConfigured) {
      try {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formData.name.trim(),
            from_email: formData.email.trim(),
            message: formData.message.trim(),
            to_email: personalInfo.email,
            reply_to: formData.email.trim(),
          },
          publicKey
        );
        sentSuccessfully = true;
      } catch (err) {
        console.warn("EmailJS submission failed, trying fallback...", err);
      }
    }

    // 2. Fallback to FormSubmit AJAX if EmailJS is unconfigured or failed
    if (!sentSuccessfully) {
      try {
        const res = await fetch(
          `https://formsubmit.co/ajax/${personalInfo.email}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              name: formData.name.trim(),
              email: formData.email.trim(),
              message: formData.message.trim(),
              _subject: `New Portfolio Message from ${formData.name.trim()}`,
              _captcha: "false",
              _template: "table",
            }),
          }
        ).catch(() => null);

        if (res && res.ok) {
          sentSuccessfully = true;
        }
      } catch (err) {
        console.warn("FormSubmit fallback failed:", err);
      }
    }

    // 3. Handle response state
    if (sentSuccessfully) {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setStatus((prev) => (prev === "success" ? "idle" : prev));
      }, 4000);
    } else {
      // 4. Ultimate Mailto fallback if both endpoints are blocked by network
      const mailtoUrl = `mailto:${personalInfo.email}?subject=${encodeURIComponent(
        "Portfolio Inquiry from " + formData.name.trim()
      )}&body=${encodeURIComponent(
        `Name: ${formData.name.trim()}\nEmail: ${formData.email.trim()}\n\nMessage:\n${formData.message.trim()}`
      )}`;
      window.location.href = mailtoUrl;

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => {
        setStatus((prev) => (prev === "success" ? "idle" : prev));
      }, 4000);
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
    color: "#F3F4F6",
    background: "#050508",
    border: `1px solid ${hasError ? "#ef4444" : "rgba(124, 58, 237, 0.25)"}`,
    borderRadius: "var(--radius-md)",
    outline: "none",
    transition: "border-color 0.3s ease, box-shadow 0.3s ease",
  });

  const inputFocusStyle = {
    borderColor: "#7C3AED",
    boxShadow: "0 0 0 3px rgba(124, 58, 237, 0.2)",
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
                    background: "#0A0A0F",
                    border: "1px solid rgba(124, 58, 237, 0.25)",
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "var(--radius-md)",
                      background: "rgba(124, 58, 237, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} style={{ color: "#7C3AED" }} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "#9CA3AF",
                        marginBottom: "2px",
                      }}
                    >
                      {link.label}
                    </p>
                    <p
                      style={{
                        fontSize: "0.92rem",
                        fontWeight: 500,
                        color: "#F3F4F6",
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
            ref={formRef}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            onSubmit={handleSubmit}
            className="card"
            style={{ display: "flex", flexDirection: "column", gap: "20px", background: "#0A0A0F", border: "1px solid rgba(124, 58, 237, 0.25)" }}
          >
            <div>
              <label
                htmlFor="contact-name"
                style={{
                  display: "block",
                  fontSize: "0.82rem",
                  fontWeight: 500,
                  color: "#9CA3AF",
                  marginBottom: "6px",
                }}
              >
                Full Name
              </label>
              <input
                id="contact-name"
                name="from_name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                style={inputStyle(!!errors.name)}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.name
                    ? "#ef4444"
                    : "rgba(124, 58, 237, 0.25)";
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
                  color: "#9CA3AF",
                  marginBottom: "6px",
                }}
              >
                Email Address
              </label>
              <input
                id="contact-email"
                name="from_email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                style={inputStyle(!!errors.email)}
                onFocus={(e) => Object.assign(e.target.style, inputFocusStyle)}
                onBlur={(e) => {
                  e.target.style.borderColor = errors.email
                    ? "#ef4444"
                    : "rgba(124, 58, 237, 0.25)";
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
                  color: "#9CA3AF",
                  marginBottom: "6px",
                }}
              >
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
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
                    : "rgba(124, 58, 237, 0.25)";
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
              disabled={status === "loading"}
              style={{
                width: "100%",
                opacity: status === "loading" ? 0.7 : 1,
                pointerEvents: status === "loading" ? "none" : "auto",
              }}
            >
              {status === "loading" ? (
                <>
                  <Loader2
                    size={18}
                    style={{
                      animation: "spin 1s linear infinite",
                    }}
                  />
                  Sending...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>

            {/* Toast Notifications */}
            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="toast toast-success"
                  style={{
                    padding: "14px 16px",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(34, 197, 94, 0.12)",
                    border: "1px solid rgba(34, 197, 94, 0.35)",
                    color: "#4ade80",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "0.86rem",
                    lineHeight: 1.4,
                  }}
                >
                  <CheckCircle size={18} style={{ flexShrink: 0 }} />
                  <span style={{ flex: 1 }}>
                    ✅ Message sent successfully! I'll get back to you soon.
                  </span>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="toast toast-error"
                  style={{
                    padding: "14px 16px",
                    borderRadius: "var(--radius-md)",
                    background: "rgba(239, 68, 68, 0.12)",
                    border: "1px solid rgba(239, 68, 68, 0.35)",
                    color: "#f87171",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    fontSize: "0.86rem",
                    lineHeight: 1.4,
                  }}
                >
                  <AlertCircle size={18} style={{ flexShrink: 0 }} />
                  <span style={{ flex: 1 }}>
                    ❌ Something went wrong. Please try again or email me directly at asuyamburaja35@gmail.com
                  </span>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    aria-label="Dismiss error message"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#f87171",
                      cursor: "pointer",
                      padding: "2px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <X size={16} />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
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
