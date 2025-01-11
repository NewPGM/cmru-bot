const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const webhookRoutes = require('./routes/webhook');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Webhook route
app.use('/webhook', webhookRoutes);

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
