const express = require('express');
const { client, config } = require('../config/config');
const line = require('@line/bot-sdk');

const router = express.Router();

router.post('/', line.middleware(config), async (req, res) => {
  try {
    const events = req.body.events;

    if (!events || events.length === 0) {
      return res.status(200).send('No events to process.');
    }

    // ส่งข้อความตอบกลับผู้ใช้
    await Promise.all(events.map(async (event) => {
      if (event.type === 'message' && event.message.type === 'text') {
        const replyMessage = { type: 'text', text: `You said: ${event.message.text}` };
        await client.replyMessage(event.replyToken, replyMessage);
      }
    }));

    res.status(200).send('Events processed.');
  } catch (err) {
    console.error('Error handling webhook event:', err);
    res.status(500).send('Error processing the webhook.');
  }
});

module.exports = router;
