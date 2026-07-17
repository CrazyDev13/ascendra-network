import { useEffect, useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Logo } from "./components/Logo";
import "./App.css";

const commissions = [
  {
    title: "Revenue Share",
    value: "Up to 50%",
    detail: "Lifetime earnings on net gaming revenue, scaled by monthly FTDs and quality.",
    tag: "RevShare",
  },
  {
    title: "CPA Deals",
    value: "Custom CPA",
    detail: "Fixed payouts per qualified player, tailored to region and traffic source.",
    tag: "CPA",
  },
  {
    title: "Hybrid Plans",
    value: "CPA + RS",
    detail: "Blend upfront CPA with ongoing RevShare for balanced, high-LTV partnerships.",
    tag: "Hybrid",
  },
  {
    title: "Sub-Affiliates",
    value: "Up to 5%",
    detail: "Earn lifelong override commissions from partners you introduce to Ascendra.",
    tag: "Network",
  },
];

const verticals = [
  "Casino",
  "Sportsbook",
  "Live Casino",
  "Poker",
  "Virtual Sports",
  "Crash Games",
  "Lottery",
  "Esports",
];

const benefits = [
  {
    title: "Real-time reporting",
    text: "Monitor clicks, registrations, FTDs, and revenue the moment they happen.",
  },
  {
    title: "Marketing materials",
    text: "Banners, landing pages, and ready-to-use creatives localized for your GEOs.",
  },
  {
    title: "Tracking links",
    text: "Unique tracking codes with reliable attribution and a 30-day cookie window.",
  },
  {
    title: "Dedicated managers",
    text: "A personal affiliate manager to optimize deals, creatives, and campaign strategy.",
  },
  {
    title: "Fast transparent payments",
    text: "Clear commission cycles with crypto and fiat options — no hidden surprises.",
  },
  {
    title: "Multi-brand & multi-country",
    text: "Promote across markets with localized offers and brand-specific reporting.",
  },
  {
    title: "Advanced analytics",
    text: "Deep funnel insights, GEO performance, and conversion trends in one dashboard.",
  },
  {
    title: "API integrations",
    text: "Connect reporting and postbacks to your stack for automated optimization.",
  },
  {
    title: "24/7 support",
    text: "Round-the-clock partner support whenever campaigns need attention.",
  },
];

const capabilities = [
  { title: "Crypto & fiat", text: "BTC, USDT, cards, e-wallets, and local methods." },
  { title: "Multiple payment rails", text: "Flexible player deposits and affiliate payouts." },
  { title: "Mobile-first UX", text: "High-converting journeys across phones and tablets." },
  { title: "High performance", text: "Low-latency infrastructure built for peak traffic." },
  { title: "Secure & scalable", text: "Enterprise-grade security with elastic capacity." },
  { title: "Advanced tracking", text: "Cookie + postback tracking for accurate attribution." },
];

const steps = [
  {
    step: "01",
    title: "Contact us",
    text: "Share your traffic profile, target GEOs, and partnership goals with our team.",
  },
  {
    step: "02",
    title: "Verify",
    text: "Meet your affiliate manager and unlock personalized commission plans.",
  },
  {
    step: "03",
    title: "Promote & earn",
    text: "Launch with iBets24 creatives, track results live, and scale what converts.",
  },
];

const faqs = [
  {
    q: "How do I join Ascendra Network?",
    a: "Send us a message through the contact form. An account manager will review your details and assign a dedicated affiliate manager.",
  },
  {
    q: "Which commission models are available?",
    a: "We offer Revenue Share, CPA, Hybrid, and sub-affiliate override commissions. Plans are tailored to your GEOs and traffic quality.",
  },
  {
    q: "Which brand can I promote?",
    a: "Ascendra Network powers partner acquisition for iBets24.com — covering casino, sportsbook, live casino, poker, and more.",
  },
  {
    q: "How are commissions paid?",
    a: "Commissions are calculated early each month and paid on a transparent schedule via crypto and fiat methods.",
  },
  {
    q: "Do you support international traffic?",
    a: "Yes. We support multi-country campaigns with localized creatives and 80+ languages across the player experience.",
  },
];

const languages = [
  "English",
  "Spanish",
  "Portuguese",
  "German",
  "French",
  "Italian",
  "Turkish",
  "Arabic",
  "Hindi",
  "Japanese",
  "Korean",
  "Chinese",
  "Thai",
  "Vietnamese",
  "Indonesian",
  "Russian",
];

const footerHighlights = [
  "RevShare · CPA · Hybrid",
  "Real-time analytics",
  "Crypto & fiat payouts",
  "API integrations",
  "24/7 partner support",
  "80+ Languages Supported",
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
  };
}

export default function App() {
  const [openFaq, setOpenFaq] = useState(0);
  const [navOpen, setNavOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactStatus, setContactStatus] = useState<"idle" | "sent">("idle");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleContactSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const company = String(data.get("company") || "").trim();
    const message = String(data.get("message") || "").trim();

    const subject = encodeURIComponent(`Ascendra Network partnership inquiry — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany / Website: ${company || "—"}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:partners@ascendranetwork.com?subject=${subject}&body=${body}`;
    setContactStatus("sent");
    form.reset();
  }

  return (
    <div id="top" className="page">
      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <div className="container header-inner">
          <Logo />
          <nav className={`nav ${navOpen ? "is-open" : ""}`} aria-label="Primary">
            <a href="#commissions" onClick={() => setNavOpen(false)}>
              Commissions
            </a>
            <a href="#ibets24" onClick={() => setNavOpen(false)}>
              iBets24
            </a>
            <a href="#platform" onClick={() => setNavOpen(false)}>
              Platform
            </a>
            <a href="#global" onClick={() => setNavOpen(false)}>
              Global
            </a>
            <a href="#faq" onClick={() => setNavOpen(false)}>
              FAQ
            </a>
            <a href="#contact" onClick={() => setNavOpen(false)}>
              Contact
            </a>
          </nav>
          <div className="header-actions">
            <a className="btn btn-primary" href="#contact">
              Contact
            </a>
            <button
              className="nav-toggle"
              aria-expanded={navOpen}
              aria-label="Toggle navigation"
              onClick={() => setNavOpen((v) => !v)}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-atmosphere" aria-hidden="true" />
          <div className="container hero-grid">
            <motion.div
              className="hero-copy"
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="hero-brand">Ascendra Network</p>
              <h1>Partner with the affiliate portal built to scale your traffic.</h1>
              <p className="hero-lead">
                Promote iBets24 across casino, sports, and live products — with transparent deals,
                live analytics, and dedicated support.
              </p>
              <div className="hero-cta">
                <a className="btn btn-primary" href="#contact">
                  Contact us
                </a>
                <a className="btn btn-ghost" href="#commissions">
                  View commission plans
                </a>
              </div>
            </motion.div>

            <motion.div
              className="hero-visual"
              aria-hidden="true"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="hero-panel">
                <div className="hero-panel-top">
                  <img src="/logo.svg" alt="" width={56} height={56} />
                  <div>
                    <strong>ascendranetwork.com</strong>
                    <span>Affiliate command center</span>
                  </div>
                </div>
                <div className="metric-row">
                  <div>
                    <span>RevShare</span>
                    <strong>50%</strong>
                  </div>
                  <div>
                    <span>Languages</span>
                    <strong>80+</strong>
                  </div>
                  <div>
                    <span>Support</span>
                    <strong>24/7</strong>
                  </div>
                </div>
                <div className="spark">
                  <svg viewBox="0 0 320 120" preserveAspectRatio="none">
                    <path
                      className="spark-line"
                      d="M0 96 C40 90, 55 70, 80 62 S130 78, 160 48 S220 20, 260 28 S300 18, 320 8"
                    />
                  </svg>
                </div>
                <div className="hero-platform-chip">
                  Powered product · <a href="https://ibets24.com" target="_blank" rel="noreferrer">ibets24.com</a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="commissions" className="section commissions">
          <div className="container">
            <motion.div {...fadeUp()}>
              <p className="section-label">Commission models</p>
              <h2 className="section-title">Deals designed for serious affiliate growth</h2>
              <p className="section-lead">
                Choose RevShare, CPA, Hybrid, or network overrides — personalized to your regions,
                sources, and performance.
              </p>
            </motion.div>
            <div className="commission-grid">
              {commissions.map((item, index) => (
                <motion.article key={item.title} className="commission-item" {...fadeUp(index * 0.06)}>
                  <span className="commission-tag">{item.tag}</span>
                  <h3>{item.title}</h3>
                  <p className="commission-value">{item.value}</p>
                  <p>{item.detail}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="ibets24" className="section brand-feature">
          <div className="container brand-feature-grid">
            <motion.div {...fadeUp()}>
              <p className="section-label">Featured platform</p>
              <h2 className="section-title">iBets24 — the product your traffic converts on</h2>
              <p className="section-lead">
                Ascendra Network is the affiliate portal for{" "}
                <a className="inline-link" href="https://ibets24.com" target="_blank" rel="noreferrer">
                  ibets24.com
                </a>
                . Partners get one dashboard, multi-vertical offers, and creatives tuned for
                high-intent players worldwide.
              </p>
              <ul className="check-list">
                <li>Full iGaming portfolio under one partner account</li>
                <li>Localized landing pages and geo-ready banners</li>
                <li>Crypto and fiat payment coverage for players and affiliates</li>
                <li>Secure, scalable stack ready for high-volume campaigns</li>
              </ul>
              <div className="hero-cta">
                <a className="btn btn-dark" href="https://ibets24.com" target="_blank" rel="noreferrer">
                  Visit ibets24.com
                </a>
                <a className="btn btn-ghost" href="#contact">
                  Contact our team
                </a>
              </div>
            </motion.div>
            <motion.div className="brand-stage" {...fadeUp(0.1)}>
              <div className="brand-stage-card">
                <p className="brand-kicker">Ascendra × iBets24</p>
                <h3>One network. One high-converting platform.</h3>
                <div className="vertical-pills" role="list">
                  {verticals.map((item) => (
                    <span key={item} role="listitem">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="platform" className="section platform">
          <div className="container">
            <motion.div {...fadeUp()}>
              <p className="section-label">Partner services</p>
              <h2 className="section-title">Everything affiliates need to launch and scale</h2>
              <p className="section-lead">
                From creatives and tracking to managers, APIs, and payouts — Ascendra Network is
                built as a complete affiliate portal.
              </p>
            </motion.div>
            <div className="benefit-grid">
              {benefits.map((item, index) => (
                <motion.article key={item.title} {...fadeUp(index * 0.04)}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="section capabilities">
          <div className="container">
            <motion.div className="capabilities-head" {...fadeUp()}>
              <div>
                <p className="section-label">Platform capabilities</p>
                <h2 className="section-title">What the iBets24 stack supports</h2>
              </div>
              <p className="section-lead">
                Promote a modern, mobile-friendly iGaming platform with broad product coverage and
                enterprise-grade reliability.
              </p>
            </motion.div>
            <div className="grid-3 capability-grid">
              {capabilities.map((item, index) => (
                <motion.article key={item.title} className="capability-item" {...fadeUp(index * 0.05)}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="global" className="section global">
          <div className="container global-panel">
            <motion.div {...fadeUp()}>
              <p className="section-label">Global reach</p>
              <h2 className="languages-headline">80+ Languages Supported</h2>
              <p className="section-lead">
                Reach players in their language with multilingual player journeys, localized
                marketing assets, and multi-country campaign support.
              </p>
            </motion.div>
            <motion.div className="language-cloud" {...fadeUp(0.08)}>
              {languages.map((lang) => (
                <span key={lang}>{lang}</span>
              ))}
              <span className="language-more">+60 more</span>
            </motion.div>
          </div>
        </section>

        <section className="section steps">
          <div className="container">
            <motion.div {...fadeUp()}>
              <p className="section-label">Get started</p>
              <h2 className="section-title">Become a partner in three steps</h2>
            </motion.div>
            <div className="steps-grid">
              {steps.map((item, index) => (
                <motion.article key={item.step} {...fadeUp(index * 0.08)}>
                  <span>{item.step}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section faq">
          <div className="container faq-grid">
            <motion.div {...fadeUp()}>
              <p className="section-label">FAQ</p>
              <h2 className="section-title">Answers for new partners</h2>
              <p className="section-lead">
                Still exploring? Reach us at{" "}
                <a className="inline-link" href="mailto:partners@ascendranetwork.com">
                  partners@ascendranetwork.com
                </a>
                .
              </p>
            </motion.div>
            <div className="faq-list">
              {faqs.map((item, index) => {
                const open = openFaq === index;
                return (
                  <motion.div key={item.q} className={`faq-item ${open ? "is-open" : ""}`} {...fadeUp(index * 0.04)}>
                    <button type="button" onClick={() => setOpenFaq(open ? -1 : index)}>
                      <span>{item.q}</span>
                      <em aria-hidden="true">{open ? "−" : "+"}</em>
                    </button>
                    {open ? <p>{item.a}</p> : null}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="container contact-grid">
            <motion.div {...fadeUp()}>
              <p className="section-label">Contact</p>
              <h2 className="section-title">Let’s build your affiliate partnership</h2>
              <p className="section-lead">
                Tell us about your traffic and target markets. Our team will follow up with tailored
                RevShare, CPA, or Hybrid options for iBets24.
              </p>
              <ul className="check-list contact-details">
                <li>
                  Email:{" "}
                  <a className="inline-link" href="mailto:partners@ascendranetwork.com">
                    partners@ascendranetwork.com
                  </a>
                </li>
                <li>Response within 1 business day</li>
                <li>Dedicated affiliate manager after review</li>
                <li>
                  Platform:{" "}
                  <a className="inline-link" href="https://ibets24.com" target="_blank" rel="noreferrer">
                    ibets24.com
                  </a>
                </li>
              </ul>
            </motion.div>

            <motion.form className="contact-form" onSubmit={handleContactSubmit} {...fadeUp(0.08)}>
              <label>
                <span>Full name</span>
                <input name="name" type="text" required placeholder="Alex Morgan" autoComplete="name" />
              </label>
              <label>
                <span>Email</span>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="you@company.com"
                  autoComplete="email"
                />
              </label>
              <label>
                <span>Company / Website</span>
                <input name="company" type="text" placeholder="yourtraffic.com" autoComplete="organization" />
              </label>
              <label>
                <span>Message</span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Share your GEOs, traffic sources, and monthly volume."
                />
              </label>
              <button className="btn btn-primary" type="submit">
                Send message
              </button>
              {contactStatus === "sent" ? (
                <p className="contact-success" role="status">
                  Opening your email client… If nothing opens, write us at partners@ascendranetwork.com.
                </p>
              ) : null}
            </motion.form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-highlights" aria-label="Platform highlights">
            {footerHighlights.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
          <div className="footer-main">
            <div>
              <Logo compact />
              <p>
                Ascendra Network is the affiliate portal for iBets24 — helping partners monetize
                casino, sportsbook, live, and emerging verticals with modern tools and global reach.
              </p>
            </div>
            <div className="footer-links">
              <div>
                <h4>Explore</h4>
                <a href="#commissions">Commissions</a>
                <a href="#ibets24">iBets24</a>
                <a href="#platform">Platform</a>
                <a href="#global">Global reach</a>
              </div>
              <div>
                <h4>Partners</h4>
                <a href="#contact">Contact</a>
                <a href="#faq">FAQ</a>
                <a href="mailto:partners@ascendranetwork.com">Email us</a>
                <a href="https://ibets24.com" target="_blank" rel="noreferrer">
                  ibets24.com
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© {new Date().getFullYear()} Ascendra Network · ascendranetwork.com</p>
            <p className="footer-languages">80+ Languages Supported</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
