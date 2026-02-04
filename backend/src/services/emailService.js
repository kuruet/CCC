import Registration from "../models/Registration.js";
import Workshop from "../models/Workshop.js";
import { registrationConfirmationTemplate } from "../templates/registrationConfirmationEmail.js";
import { Resend } from "resend";

// 🔒 Lazy initialization (safe for prod)
function getResendClient() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error("RESEND_API_KEY missing");
  }
  return new Resend(process.env.RESEND_API_KEY);
}

export const sendRegistrationConfirmation = async (registrationId) => {
  try {
    // 1️⃣ Fetch registration (READ-ONLY)
    const registration = await Registration.findById(registrationId).lean();
    if (!registration) {
      console.warn("⚠️ Registration not found:", registrationId);
      return;
    }

    // 2️⃣ Email guard
    if (!registration.email) {
      console.warn("⚠️ No email found, skipping:", registrationId);
      return;
    }

    // 3️⃣ Idempotency guard
    if (registration.confirmationSent) {
      console.log("ℹ️ Email already sent:", registrationId);
      return;
    }

    // 4️⃣ Fetch workshop
    const workshop = await Workshop.findById(registration.workshopId).lean();
    if (!workshop) {
      console.warn("⚠️ Workshop not found:", registration.workshopId);
      return;
    }

    // 5️⃣ Build email HTML
    const html = registrationConfirmationTemplate({
      name: registration.name,
      workshopTitle: workshop.title,
      whatsappGroupLink: process.env.WHATSAPP_GROUP_LINK,
    });

    // 6️⃣ Send email
    const resend = getResendClient();
    await resend.emails.send({
     from: "Creative Caricature Club <no-reply@creativecaricatureclub.com>",
      to: registration.email,
      subject: "🎉 Workshop Registration Confirmed",
      html,
    });

    // 7️⃣ Atomic status update (NO full save)
    await Registration.updateOne(
      { _id: registrationId, confirmationSent: { $ne: true } },
      {
        $set: {
          confirmationSent: true,
          confirmationSentAt: new Date(),
        },
      }
    );

    console.log("✅ Confirmation email sent:", registration.email);
  } catch (error) {
    // ❗ Never throw — email is a side-effect
    console.error("❌ Email send failed:", error.message);
  }
};
