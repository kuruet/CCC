import emailTransporter from "../utils/emailTransport.js";
import Registration from "../models/Registration.js";
import Workshop from "../models/Workshop.js";
import { registrationConfirmationTemplate } from "../templates/registrationConfirmationEmail.js";

export const sendRegistrationConfirmation = async (registrationId) => {
  try {
    // 1️⃣ Fetch registration FIRST
    const registration = await Registration.findById(registrationId);
    if (!registration) {
      console.warn("⚠️ Registration not found for email:", registrationId);
      return;
    }

    // 2️⃣ Defensive email check (NOW SAFE)
    if (!registration.email) {
      console.warn(
        "⚠️ Registration has no email, skipping confirmation:",
        registrationId
      );
      return;
    }

    // 3️⃣ Idempotency check
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

    // 6️⃣ Send email
    await emailTransporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: registration.email,
      subject: "🎉 Workshop Registration Confirmed",
      html,
    });

    // 7️⃣ Update confirmation flags
    registration.confirmationSent = true;
    registration.confirmationSentAt = new Date();
    await registration.save();

    console.log("✅ Confirmation email sent:", registration.email);
  } catch (error) {
    console.error("❌ Failed to send confirmation email:", error);
  }
};
