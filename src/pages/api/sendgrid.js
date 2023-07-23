import sendgrid from '@sendgrid/mail';
import handlebars from 'handlebars';
import siteDetails from '../../../data/siteDetails';
var fs = require('fs');

sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(req, res) {
  const emailTo = req.body.email;
  const subjectIn = req.body.subjectIn;
  const subjectOut = req.body.subjectOut;

  // Validate if the subject fields are not empty
  if (!subjectIn || !subjectOut) {
    return res.status(400).json('Both subjectIn and subjectOut fields are required.');
  }

  // Read the template file
  const emailTemplate = fs.readFileSync('data/templates/emailTemplate.hbs', 'utf-8');

  // Compile the Handlebars template
  const compiledTemplate = handlebars.compile(emailTemplate);

  // Additional checks to ensure all required fields are present
  if (!req.body.firstName || !req.body.lastName || !req.body.phoneNumber || !req.body.emailAddress || !req.body.preferredCommMethod) {
    return res.status(400).json('All fields (firstName, lastName, phoneNumber, emailAddress, and preferredCommMethod) are required.');
  }

  const inboundEmailData = {
    subject: req.body.subjectIn,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    emailAddress: req.body.emailAddress,
    preferredCommMethod: req.body.preferredCommMethod,
    comments: req.body.comments,
    bodyText: req.body.firstName + ' ' + req.body.lastName + ' completed the form submission. See details below:',
    senderName: '',
    showGreeting: false,
    includeRegards: false,
  };

  // Fill the template with data
  const inboundEmailContent = compiledTemplate(inboundEmailData);

  const inboundEmailMsg = {
    to: siteDetails.email,
    from: siteDetails.email,
    subject: req.body.subjectIn,
    html: inboundEmailContent,
  };

  const outboundEmailData = {
    subject: req.body.subjectOut,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    emailAddress: req.body.emailAddress,
    preferredCommMethod: req.body.preferredCommMethod,
    comments: req.body.comments,
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
    subject: req.body.subjectOut,
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
