const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure environment variables are loaded

const app = express();

// Enable CORS for requests from your frontend
const corsOrigin = process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : 'http://localhost:5000';

app.use(cors({
    origin: 'https://real-frontend-sandy.vercel.app', // Your frontend URL
    methods: ['POST', 'GET'],
    credentials: true,
}));

// Middleware to parse incoming JSON requests
app.use(express.json());

// Rest of your code...


// Route to send email with nodemailer
app.post('/register', async (req, res) => {
    const { recipientEmail, subject, message, message2 } = req.body;

    console.log('Request received at /register:', req.body);

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

// Root route for basic checks
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start the server on port 5000 or from environment variable
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
