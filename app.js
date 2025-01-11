const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const webhookRoutes = require('./routes/webhook');

dotenv.config();

const app = express();
app.use(cors());

// Root route
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Webhook route
app.use('/webhook', webhookRoutes);

// Listen only if not running in Vercel dev
if (!process.env.VERCEL) {
  const port = process.env.PORT || 7000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

module.exports = app; // สำคัญสำหรับ Vercel Dev
