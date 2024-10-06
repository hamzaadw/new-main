const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Ensure environment variables are loaded

const app = express();

// Enable CORS for requests from your frontend


app.use(cors({
    origin: 'https://new-main-xfd9.vercel.app'  ,

    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.static(path.join(__dirname, 'build')));

// Handle any requests that don't match the ones above
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});


// Middleware to parse incoming JSON requests
app.use(express.json());

// Rest of your code...
app.get('/test-cors', (req, res) => {
    res.json({ message: 'CORS working!' });
});

// Route to send email with nodemailer
app.post('/register', async (req, res) => {
    const { recipientEmail, subject, message, message2 } = req.body;

    console.log('Request received at /register:', req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: "hamzaasadabcd@gmail.com", // Load from environment variables
            pass: "rqws wlbe txgd iiec"  // Load from environment variables
        },
    });

    const mailOptions = {
        from: "hamzaasadabcd@gmail.com",
        to: recipientEmail,
        subject: subject,
        text: message,
    };

    const mailOptionsToSender = {
        from: "hamzaasadabcd@gmail.com",
        to: "hamzaasadabcd@gmail.com",
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
