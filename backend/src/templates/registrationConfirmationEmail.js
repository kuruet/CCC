// backend/src/templates/registrationConfirmationEmail.js

export const registrationConfirmationTemplate = ({
  name,
  workshopTitle,
  whatsappGroupLink,
  slot,
}) => {
  const slotTiming =
    slot === "SLOT_1" ? "12:00 PM – 4:00 PM" : "6:00 PM – 10:00 PM";

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Your Seat is Confirmed – 2 Day Live Caricature Workshop 🎨</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; padding: 24px; border-radius: 6px;">
              
              <tr>
                <td>
                  <h2 style="color: #333333;">🎨 Your Seat is Confirmed!</h2>
                </td>
              </tr>

              <tr>
                <td style="padding-top: 10px; color: #555555; line-height: 1.6;">
                  <p>Hello <strong>${name}</strong> 🙂</p>

                  <p>
                    Your registration for the <strong>${workshopTitle}</strong>
                    is successful and your seat has been confirmed.
                  </p>

                  <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;" />

                  <h3 style="color: #333333;">📅 Workshop Details</h3>
                  <ul>
                    <li><strong>Type:</strong> 2 Day Live Caricature Workshop</li>
                    <li><strong>Dates:</strong> 14 & 15 March</li>
                    <li><strong>Timing:</strong> ${slotTiming}</li>
                    <li><strong>Mode:</strong> Live Online</li>
                  </ul>

                  

                  <p style="margin: 20px 0;">
                    <a
                      href="${whatsappGroupLink}"
                      style="
                        display: inline-block;
                        padding: 12px 18px;
                        background-color: #25D366;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 4px;
                        font-weight: bold;
                      "
                    >
                      Join WhatsApp Group
                    </a>
                  </p>

                  <h3 style="color: #333333;">🖊 What You Should Keep Ready</h3>
                  <ul>
                    <li>A4 sheets / drawing book</li>
                    <li>Black pen / pencil</li>
                    <li>Colors (optional)</li>
                    <li>Good internet connection</li>
                  </ul>

                  <h3 style="color: #333333;">⚠ Refund Policy</h3>
                  <p>
                    <strong>Workshop fees are non-refundable once the seat is booked.</strong>
                  </p>

                  <h3 style="color: #333333;">📞 Need Help?</h3>
                  <p>
                    WhatsApp: <strong>${process.env.SUPPORT_WHATSAPP_NUMBER}</strong><br />
                    Email: <strong>${process.env.SUPPORT_EMAIL}</strong>
                  </p>

                  <p style="margin-top: 30px;">
                    We’re excited to have you in the workshop and can’t wait to draw with you! 🎨✨
                  </p>

                  <p style="margin-top: 20px;">
                    Best regards,<br />
                    <strong>Creative Caricature Club</strong>
                  </p>
                </td>
              </tr>

            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
};
