import Registration from "../models/Registration.js";
import Workshop from "../models/Workshop.js";
import { registrationConfirmationTemplate } from "../templates/registrationConfirmationEmail.js";
import { Resend } from "resend";

// 🔒 Lazy initialization (safe for ESM + prod)
function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("❌ RESEND_API_KEY is missing");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

export const sendRegistrationConfirmation = async (registrationId) => {
  try {
    // 1️⃣ Fetch registration
    const registration = await Registration.findById(registrationId);
    if (!registration) {
      console.warn("⚠️ Registration not found for email:", registrationId);
      return;
    }

    // 2️⃣ Defensive email check
    if (!registration.email) {
      console.warn(
        "⚠️ Registration has no email, skipping confirmation:",
        registrationId
      );
      return;
    }

    // 3️⃣ Idempotency guard
    if (registration.confirmationSent) {
      console.log("ℹ️ Confirmation email already sent:", registrationId);
      return;
    }

    // 4️⃣ Fetch workshop
    const workshop = await Workshop.findById(registration.workshopId);
    if (!workshop) {
      console.warn("⚠️ Workshop not found for email:", registration.workshopId);
      return;
    }

    // 5️⃣ Build email HTML
    const html = registrationConfirmationTemplate({
      name: registration.name,
      workshopTitle: workshop.title,
      whatsappGroupLink: process.env.WHATSAPP_GROUP_LINK,
    });

    // 6️⃣ Send email via Resend
    const resend = getResendClient();

    await resend.emails.send({
      from: "Creative Caricature Club <onboarding@resend.dev>", // ✅ safe for now
      to: registration.email,
      subject: "🎉 Workshop Registration Confirmed",
      html,
    });

    // 7️⃣ Mark confirmation sent (ONLY after success)
    registration.confirmationSent = true;
    registration.confirmationSentAt = new Date();
    await registration.save();

    console.log("✅ Confirmation email sent:", registration.email);
  } catch (error) {
    console.error("❌ Failed to send confirmation email:", error);
  }
};
