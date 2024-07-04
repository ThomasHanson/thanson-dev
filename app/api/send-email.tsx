import type { NextApiRequest, NextApiResponse } from 'next';
import AWS from 'aws-sdk';

// AWS.config.update({
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: process.env.AWS_REGION,
// });

// const sns = new AWS.SNS();

type ContactFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  comments: string;
};

type ResponseData = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  res.status(200).json({ message: 'Hello from Next.js!' })
  // if (req.method === 'POST') {
  //   const { firstName, lastName, email, comments }: ContactFormValues = req.body;

  //   const params = {
  //     Message: `New contact form submission:\n\nName: ${firstName} ${lastName}\nEmail: ${email}\nComments: ${comments}`,
  //     Subject: 'New Contact Form Submission',
  //     TopicArn: process.env.AWS_SNS_TOPIC_ARN,
  //   };

  //   try {
  //     const result = await sns.publish(params).promise();
  //     res.status(200).json({ message: 'Email sent successfully', result });
  //   } catch (error) {
  //     res.status(500).json({ message: 'Failed to send email', error });
  //   }
  // } else {
  //   res.status(405).json({ message: 'Method not allowed', request: req, res: res });
  // }
}
