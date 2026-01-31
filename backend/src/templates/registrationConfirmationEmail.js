// backend/src/templates/registrationConfirmationEmail.js

export const registrationConfirmationTemplate = ({
  name,
  workshopTitle,
  whatsappGroupLink,
}) => {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Workshop Registration Confirmed</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
      <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; padding: 24px; border-radius: 6px;">
              
              <tr>
                <td>
                  <h2 style="color: #333333;">🎉 Registration Confirmed!</h2>
                </td>
              </tr>

              <tr>
                <td style="padding-top: 10px; color: #555555;">
                  <p>Hi <strong>${name}</strong>,</p>

                  <p>
                    Your registration for the workshop
                    <strong>${workshopTitle}</strong>
                    has been successfully confirmed.
                  </p>

                  <p>
                    We’re excited to have you join us!
                  </p>

                  <p>
                    👉 Please join the official WhatsApp group for important updates,
                    announcements, and workshop-related communication:
                  </p>

                  <p style="margin: 20px 0;">
                    <a
                      href="${whatsappGroupLink}"
                      style="
                        display: inline-block;
                        padding: 10px 16px;
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

                  <p>
                    If you have any questions, feel free to reply to this email.
                  </p>

                  <p style="margin-top: 30px;">
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
