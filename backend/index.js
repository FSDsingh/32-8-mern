const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./Routes/AuthRouter');
const ProductRouter = require('./Routes/ProductRouter');
const sendEmail = require('./services/emailService');


require('dotenv').config();
require('./Models/db');
const PORT = process.env.PORT || 8080;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

app.use(bodyParser.json());

app.get('/send-test-email', async (req, res) => {
    try {
        await sendEmail('your-email@example.com', 'Test Subject', 'Test email body');
        res.status(200).send('Test email sent successfully');
    } catch (error) {
        res.status(500).send('Failed to send test email');
    }
});
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products', ProductRouter);


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`)
})