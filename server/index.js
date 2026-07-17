import "dotenv/config";
import cors from "cors";
import express from "express";
import sgMail from "@sendgrid/mail";

const app = express();
const port = Number(process.env.PORT || 3001);

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || "";
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || "partners@ascendranetwork.com";
const SENDGRID_FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL || "noreply@ascendranetwork.com";
const SENDGRID_FROM_NAME = process.env.SENDGRID_FROM_NAME || "Ascendra Network";

if (SENDGRID_API_KEY) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

app.use(cors({ origin: true }));
app.use(express.json({ limit: "32kb" }));

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    sendgridConfigured: Boolean(SENDGRID_API_KEY),
  });
});

app.post("/api/contact", async (req, res) => {
  try {
    if (!SENDGRID_API_KEY) {
      return res.status(503).json({
        ok: false,
        error: "SendGrid is not configured. Set SENDGRID_API_KEY in the server environment.",
      });
    }

    const name = String(req.body?.name || "").trim();
    const email = String(req.body?.email || "").trim();
    const company = String(req.body?.company || "").trim();
    const message = String(req.body?.message || "").trim();

    if (!name || name.length > 120) {
      return res.status(400).json({ ok: false, error: "Please provide a valid name." });
    }
    if (!email || !isValidEmail(email) || email.length > 200) {
      return res.status(400).json({ ok: false, error: "Please provide a valid email address." });
    }
    if (company.length > 200) {
      return res.status(400).json({ ok: false, error: "Company / website is too long." });
    }
    if (!message || message.length < 10 || message.length > 4000) {
      return res.status(400).json({
        ok: false,
        error: "Please include a message between 10 and 4000 characters.",
      });
    }

    const subject = `New affiliate inquiry from ${name}`;
    const text = [
      "New Ascendra Network affiliate contact submission",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Company / Website: ${company || "—"}`,
      "",
      "Message:",
      message,
    ].join("\n");

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0b1c2c">
        <h2 style="margin:0 0 12px">New affiliate inquiry</h2>
        <p style="margin:0 0 16px">A partner submitted the Ascendra Network contact form.</p>
        <table style="border-collapse:collapse;width:100%;max-width:560px">
          <tr>
            <td style="padding:8px 0;font-weight:700;width:160px">Name</td>
            <td style="padding:8px 0">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-weight:700">Email</td>
            <td style="padding:8px 0"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-weight:700">Company / Website</td>
            <td style="padding:8px 0">${escapeHtml(company || "—")}</td>
          </tr>
        </table>
        <h3 style="margin:20px 0 8px">Message</h3>
        <p style="white-space:pre-wrap;margin:0;padding:12px;background:#f3f7f5;border-radius:8px">${escapeHtml(message)}</p>
      </div>
    `;

    await sgMail.send({
      to: CONTACT_TO_EMAIL,
      from: {
        email: SENDGRID_FROM_EMAIL,
        name: SENDGRID_FROM_NAME,
      },
      replyTo: {
        email,
        name,
      },
      subject,
      text,
      html,
    });

    return res.json({ ok: true });
  } catch (error) {
    console.error("Contact form SendGrid error:", error?.response?.body || error);
    return res.status(502).json({
      ok: false,
      error: "Unable to send your message right now. Please try again or email partners@ascendranetwork.com.",
    });
  }
});

app.listen(port, () => {
  console.log(`Ascendra API listening on http://localhost:${port}`);
});
