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

// 🔒 Resolve WhatsApp link strictly based on slot
function getWhatsAppLinkForSlot(slot) {
  if (slot === "SLOT_1") {
    return process.env.WHATSAPP_SLOT1_LINK || null;
  }

  if (slot === "SLOT_2") {
    return process.env.WHATSAPP_SLOT2_LINK || null;
  }

  return null;
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
      console.log("ℹ️ Confirmation email already sent:", registrationId);
      return;
    }

    // 4️⃣ Resolve WhatsApp link (STRICT)
    const whatsappGroupLink = getWhatsAppLinkForSlot(registration.slot);
    if (!whatsappGroupLink) {
      console.error(
        `❌ Missing WhatsApp group link for slot ${registration.slot}. Email NOT sent.`
      );
      return;
    }

    // 5️⃣ Fetch workshop
    const workshop = await Workshop.findById(registration.workshopId).lean();
    if (!workshop) {
      console.warn("⚠️ Workshop not found:", registration.workshopId);
      return;
    }

    // 6️⃣ Build email HTML
    const html = registrationConfirmationTemplate({
  name: registration.name,
  workshopTitle: workshop.title,
  whatsappGroupLink,
  slot: registration.slot, // ✅ REQUIRED
});


    // 7️⃣ Send email
    const resend = getResendClient();
    await resend.emails.send({
      from: "Creative Caricature Club <no-reply@creativecaricatureclub.com>",
      to: registration.email,
      subject: "🎉 Your Seat is Confirmed – 2 Day Live Caricature Workshop",
      html,
    });

    // 8️⃣ Atomic success update
    await Registration.updateOne(
      { _id: registrationId, confirmationSent: { $ne: true } },
      {
        $set: {
          confirmationSent: true,
          confirmationSentAt: new Date(),
        },
      }
    );

    console.log(
      `✅ Confirmation email sent to ${registration.email} (${registration.slot})`
    );
  } catch (error) {
    // ❗ Never throw — email is a side-effect
    console.error("❌ Email send failed:", error.message);
  }
};
