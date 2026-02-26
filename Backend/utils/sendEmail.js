import axios from "axios";

export const sendEmail = async ({ to, subject, html }) => {
  try {
    await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "LocalTrust",
          email: "panditjee2712@gmail.com", // MUST be verified in Brevo
        },
        to: [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error(
      "Brevo error:",
      error.response?.data || error.message
    );
    throw new Error("Email sending failed");
  }
};