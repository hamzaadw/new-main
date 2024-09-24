const nodemailer = require('nodemailer');
const router = require('express').Router();

router.post('/register', async (req, res) => {
  const { recipientEmail, subject, message, message2 } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Load from environment variables
      pass: process.env.GMAIL_PASS  // Load from environment variables
    },
  });

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: recipientEmail,
    subject: subject,
    text: message,
  };

  const mailOptionsToSender = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: "Order Received",
    text: `${message2}`,
  };

  try {
    // Send the email to the recipient
    await transporter.sendMail(mailOptions);

    // Send the confirmation email to the sender
    await transporter.sendMail(mailOptionsToSender);

    res.status(200).json({ message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email', error });
  }
});

module.exports = router;
