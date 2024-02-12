const axios = require('axios');
const express = require('express');
const router = express.Router();



router.post('/send-message', async (req, res) => {
  const { queryUrl, textValue } = req.body;



  axios.post('https://slack.com/api/chat.postMessage', {
    channel: process.env.SLACK_CHANNEL_ID,
    attachments: [
      {
        title: "Sales Explorer",


        text:`${textValue}\n<https://bytecodeef.looker.com/embed/explore/${queryUrl}|Your Looker Explore!>`,

        color: "#913bff",
      },
    ],
  }, {
    headers: {

      Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`
    }
  }).then((r) => {
    const response = r.data;
    if(response.ok) {
      res.status(200).json({ message: 'Message sent to Slack successfully!' });
    } else {
      res.status(500).json({error: response.error});
    }
  }).catch(err => {
    console.error(err);
    res.status(500).json({ error: 'Failed to send message to Slack' });
  })
});

module.exports = router;
