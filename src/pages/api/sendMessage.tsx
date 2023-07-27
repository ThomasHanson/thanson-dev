import type { NextApiRequest, NextApiResponse } from 'next';
import twilio from 'twilio';

interface RequestBody {
  phone: string;
  message: string;
}

export default function sendMessage(req: NextApiRequest, res: NextApiResponse) {
  const twilioNumber = process.env.TWILIO_PHONE_NUMBER
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, token);
  const { phone, message } = req.body as RequestBody;
  // console.log(phone, message);
  client.messages
    .create({
      body: message,
      from: twilioNumber,
      to: phone,
    })
    .then(() =>
      res.json({
        success: true,
      })
    )
    .catch((error) => {
      res.json(error);
    });
}