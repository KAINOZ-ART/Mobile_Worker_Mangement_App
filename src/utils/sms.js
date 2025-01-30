import axios from 'axios';

export const sendSMS = async (to, message) => {
  const accountSid = "your_account_sid";
  const authToken = "your_auth_token";
  const twilioNumber = "your_twilio_number";

  try {
    const response = await axios.post(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        To: to,
        From: twilioNumber,
        Body: message,
      },
      {
        auth: {
          username: TWILIO_ACCOUNT_SID,
          password: TWILIO_AUTH_TOKEN,
        },
      }
    );
    console.log("SMS sent successfully!");
  } catch (error) {
    console.error("Error sending SMS:", error);
  }
};
