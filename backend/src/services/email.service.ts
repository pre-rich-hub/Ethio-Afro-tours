import { env } from "../config/env.js";
import { logger } from "../config/pino.js";

type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

type ResendErrorResponse = {
  name?: string;
  message?: string;
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });
}

function getTransportOptions() {
  if (env.EMAIL_PROVIDER === "resend") {
    return {
      host: "smtp.resend.com",
      port: 465,
      secure: true,
      auth: { user: "resend", pass: env.RESEND_API_KEY },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000
    };
  }

  return {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: env.SMTP_PORT === 465,
    auth: env.SMTP_USER && env.SMTP_PASS ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000
  };
}

function htmlToText(html: string) {
  return html.replace(/<[^>]+>/g, " ");
}

function getErrorMessage(data: unknown) {
  if (typeof data !== "object" || data === null) return "";

  const error = data as ResendErrorResponse;
  return [error.name, error.message].filter(Boolean).join(": ");
}

async function sendWithResend(input: SendEmailInput) {
  const body: Record<string, unknown> = {
    from: env.SMTP_FROM,
    to: [input.to],
    subject: input.subject,
    html: input.html,
    text: htmlToText(input.html)
  };

  if (input.replyTo) body.reply_to = input.replyTo;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15_000)
  });

  if (!response.ok) {
    let data: unknown;
    try {
      data = await response.json();
    } catch {
      data = await response.text().catch(() => "");
    }

    const detail = getErrorMessage(data) || (typeof data === "string" ? data : "");
    throw new Error(
      `Resend email send failed (${response.status}${response.statusText ? ` ${response.statusText}` : ""})${detail ? `: ${detail}` : ""}`
    );
  }
}

async function sendWithSmtp(input: SendEmailInput) {
  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.default.createTransport(getTransportOptions());

  await transporter.sendMail({
    from: env.SMTP_FROM,
    to: input.to,
    subject: input.subject,
    html: input.html,
    text: htmlToText(input.html),
    replyTo: input.replyTo
  });
}

/**
 * Delivers one email. When EMAIL_ENABLED=false this is a pure log statement,
 * which keeps local development usable without any mail server.
 */
export async function sendMail(input: SendEmailInput) {
  if (!env.EMAIL_ENABLED) {
    logger.info({ to: input.to, subject: input.subject }, "[email disabled]");
    return;
  }

  if (env.EMAIL_PROVIDER === "resend") {
    await sendWithResend(input);
    return;
  }

  await sendWithSmtp(input);
}

export async function sendEmail(input: SendEmailInput) {
  await sendMail(input);
}

export async function sendContactAdminEmail(data: {
  name: string;
  email: string;
  message: string;
}) {
  if (!env.ADMIN_EMAIL) return;

  await sendEmail({
    to: env.ADMIN_EMAIL,
    replyTo: data.email,
    subject: `New Contact Inquiry - ${data.name}`,
    html: `
      <h1>New Contact Inquiry</h1>
      <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Message and itinerary details:</strong></p>
      <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
    `,
  });
}

export async function sendSubscriberAdminEmail(data: {
  email: string;
  subscribedAt: Date;
}) {
  if (!env.ADMIN_EMAIL) return;

  const subscribersUrl = `${env.FRONTEND_ORIGIN.replace(/\/$/, "")}/admin/subscribers`;

  await sendEmail({
    to: env.ADMIN_EMAIL,
    replyTo: data.email,
    subject: `New Newsletter Subscriber - ${data.email}`,
    html: `
      <h1>New Newsletter Subscriber</h1>
      <p>A new visitor subscribed to the Ethio Afro Tour newsletter.</p>
      <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
      <p><strong>Subscribed:</strong> ${escapeHtml(data.subscribedAt.toISOString())}</p>
      <p><a href="${escapeHtml(subscribersUrl)}">View all subscribers</a></p>
    `,
  });
}

export async function sendBookingAdminEmail(data: {
  bookingId: number;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  tourName: string;
  chosenDate: string;
  adults: number;
  children: number;
}) {
  if (!env.ADMIN_EMAIL) return;
  await sendEmail({
    to: env.ADMIN_EMAIL,
    replyTo: data.email,
    subject: `New Booking Inquiry (#${data.bookingId}) - ${data.fullName}`,
    html: `
      <h1>New Booking Inquiry</h1>
      <p><strong>Booking ID:</strong> #${data.bookingId}</p>
      <p><strong>Tour:</strong> ${data.tourName}</p>
      <p><strong>Date:</strong> ${data.chosenDate}</p>
      <p><strong>Travelers:</strong> ${data.adults} adults, ${data.children} children</p>
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Country:</strong> ${data.country}</p>
    `
  });
}

export async function sendBookingCustomerEmail(data: {
  email: string;
  fullName: string;
  tourName: string;
  bookingId: number;
  chosenDate: string;
  adults: number;
  children: number;
}) {
  await sendEmail({
    to: data.email,
    subject: "We received your booking inquiry - Ethio Afro Tour",
    html: `
      <h1>Booking Request Received</h1>
      <p>Dear ${data.fullName},</p>
      <p>Thank you for choosing Ethio Afro Tour. We received your booking inquiry for <strong>${data.tourName}</strong>.</p>
      <p><strong>Booking ID:</strong> #${data.bookingId}</p>
      <p><strong>Travel Date:</strong> ${data.chosenDate}</p>
      <p><strong>Travelers:</strong> ${data.adults} adults, ${data.children} children</p>
      <p>Our team will contact you shortly.</p>
    `
  });
}

export async function sendBookingStatusEmail(data: {
  email: string;
  fullName: string;
  tourName: string;
  bookingId: number;
  chosenDate: string;
  status: string;
}) {
  await sendEmail({
    to: data.email,
    subject: `Your Booking Status is now ${data.status} - Ethio Afro Tour`,
    html: `
      <h1>Booking Update</h1>
      <p>Dear ${data.fullName},</p>
      <p>Your booking for <strong>${data.tourName}</strong> has been updated.</p>
      <p><strong>Booking ID:</strong> #${data.bookingId}</p>
      <p><strong>Status:</strong> ${data.status}</p>
      <p><strong>Travel Date:</strong> ${data.chosenDate}</p>
      <p>If you have any questions, reply to this email.</p>
    `
  });
}

export async function sendPasswordChangedEmail(data: { email: string }) {
  await sendEmail({
    to: data.email,
    subject: "Your password was changed - Ethio Afro Tour",
    html: `
      <h1>Password Changed</h1>
      <p>Your Ethio Afro Tour admin password was changed successfully.</p>
      <p>If you did not make this change, contact the site administrator immediately.</p>
    `
  });
}
