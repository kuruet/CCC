// import nodemailer from "nodemailer";

// const emailTransporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: Number(process.env.EMAIL_PORT),
//   secure: false, // true only for port 465
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Optional: verify transporter at startup (recommended)
// emailTransporter.verify((error, success) => {
//   if (error) {
//     console.error("❌ Email transporter error:", error.message);
//   } else {
//     console.log("✅ Email transporter is ready");
//   }
// });

// export default emailTransporter;
