import { NextResponse, NextRequest } from 'next/server';
import { CheckIfPhoneNumberIsOptedOutCommand, OptInPhoneNumberCommand, PublishCommand, PublishCommandOutput, SNSClient } from '@aws-sdk/client-sns';
import { ContactFormValues } from '@/app/contact/page';
import dotenv from 'dotenv';

dotenv.config();

const sns = new SNSClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  region: process.env.AWS_REGION!,
});

const isOptedOut = async (phoneNumber: string) => {
  const command = new CheckIfPhoneNumberIsOptedOutCommand({
    phoneNumber,
  });

  const response = await sns.send(command);
  return response.isOptedOut;
}

const optIn = async (phoneNumber: string) => {
  const command = new OptInPhoneNumberCommand({
    phoneNumber,
  });

  const response = await sns.send(command);
  return response;
}

type ResponseData = {
  message: string;
  userResponse?: PublishCommandOutput;
  personalResponse?: PublishCommandOutput;
  error?: any;
};

export const POST = async (req: NextRequest) => {
  const {
    firstName,
    lastName,
    email,
    phoneNum,
    prefContact,
    comments,
  }: ContactFormValues = await req.json();

  const userParams = {
    Message: `
        Hi ${firstName},\n\nThanks for checking out my site! I will review your submission and be in contact within 24 hours.\n\nTo ensure easy communication, consider saving this contact for future updates.`,
    PhoneNumber: phoneNum,
  };

  const personalParams = {
    Message: `New contact form submission:\n\n
              Name: ${firstName} ${lastName}\n
              Email: ${email}\n
              Phone Number: ${phoneNum}\n
              Communication Preference: ${prefContact}\n
              Comments: ${comments}`,
    PhoneNumber: process.env.PHONE_NUMBER!,
  };

  try {
    // Send SMS to yourself
    const personalResponse = await sns.send(new PublishCommand(personalParams));

    // Send SMS to the user if their preferred contact method is 'Text'
    let userResponse;
    if (prefContact === 'Text') {
      if (await isOptedOut(phoneNum)) {
        await optIn(phoneNum);
      }
      userResponse = await sns.send(new PublishCommand(userParams));
    }

    return NextResponse.json({ message: 'SMS sent successfully', personalResponse, userResponse }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Failed to send SMS', error }, { status: 500 });
  }
};
