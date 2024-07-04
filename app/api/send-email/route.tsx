import { NextResponse, NextRequest } from 'next/server';
import { PublishCommand , PublishCommandOutput, SNSClient } from '@aws-sdk/client-sns';
import { ContactFormValues } from '@/app/contact/page';
import dotenv from 'dotenv';

dotenv.config()

const sns = new SNSClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },

  region: process.env.AWS_REGION,
});

type ResponseData = {
  message: string;
  result?: PublishCommandOutput;
  error?: any;
}

export const POST = async (req: NextRequest) => {
  const {
    firstName,
    lastName,
    email,
    phoneNum,
    prefContact,
    comments
  }: ContactFormValues = await req.json();

  const params = {
    Message: `New contact form submission:\n\n
              Name: ${firstName} ${lastName}\n
              Email: ${email}\n
              Phone Number: ${phoneNum}\n
              Communication Preference: ${prefContact}\n
              Comments: ${comments}`,
    Subject: '[thanson.dev] Contact Submission',
    TopicArn: process.env.AWS_SNS_TOPIC_ARN,
  };

  try {
    const command = new PublishCommand(params);
    const result = await sns.send(command);
    return NextResponse.json({ message: 'Email sent successfully', result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to send email', error }, { status: 500 });
  }
}
