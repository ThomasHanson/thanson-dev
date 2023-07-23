import sendgrid from '@sendgrid/mail';
import fs from 'fs';
import handlebars from 'handlebars';
import type { NextApiRequest, NextApiResponse } from 'next';
import siteDetails from '../../../data/siteDetails';

sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '');

interface RequestBody {
  email: string;
  subjectIn: string;
  subjectOut: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  preferredCommMethod: string;
  comments: string;
}

interface EmailData {
  subject: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  preferredCommMethod: string;
  comments: string;
  bodyText: string;
  senderName: string;
  showGreeting: boolean;
  includeRegards: boolean;
}

async function sendEmail(req: NextApiRequest, res: NextApiResponse) {
  const {
    email: emailTo,
    subjectIn,
    subjectOut,
    firstName,
    lastName,
    phoneNumber,
    emailAddress,
    preferredCommMethod,
    comments,
  } = req.body as RequestBody;

  // Validate if the subject fields are not empty
  if (!subjectIn || !subjectOut) {
    return res.status(400).json('Both subjectIn and subjectOut fields are required.');
  }

  // Additional checks to ensure all required fields are present
  if (!firstName || !lastName || !phoneNumber || !emailAddress || !preferredCommMethod || !comments) {
    return res
      .status(400)
      .json('All fields (firstName, lastName, phoneNumber, emailAddress, preferredCommMethod, comments) are required.');
  }

  // Read the template file
  const emailTemplate: string = fs.readFileSync('data/templates/emailTemplate.hbs', 'utf-8');

  // Compile the Handlebars template
  const compiledTemplate = handlebars.compile<EmailData>(emailTemplate);

  const inboundEmailData: EmailData = {
    subject: subjectIn,
    firstName,
    lastName,
    phoneNumber,
    emailAddress,
    preferredCommMethod,
    comments,
    bodyText: `${firstName} ${lastName} completed the form submission. See details below:`,
    senderName: '',
    showGreeting: false,
    includeRegards: false,
  };

  // Fill the template with data
  const inboundEmailContent = compiledTemplate(inboundEmailData);

  const inboundEmailMsg = {
    to: siteDetails.email,
    from: siteDetails.email,
    subject: subjectIn,
    html: inboundEmailContent,
  };

  const outboundEmailData: EmailData = {
    subject: subjectOut,
    firstName,
    lastName,
    phoneNumber,
    emailAddress,
    preferredCommMethod,
    comments,
    bodyText: 'Thanks for reaching out to me! I received your form submission with the following details:',
    senderName: 'Thomas Hanson',
    showGreeting: true,
    includeRegards: true,
  };

  // Fill the template with data
  const outboundEmailContent = compiledTemplate(outboundEmailData);

  const outboundEmailMsg = {
    to: emailTo,
    from: siteDetails.email,
    subject: subjectOut,
    html: outboundEmailContent,
  };

  try {
    // Send the email using SendGrid
    await sendgrid.send(inboundEmailMsg);
    await sendgrid.send(outboundEmailMsg);

    return res.status(200).json('Email(s) sent successfully!');
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}

export default sendEmail;
