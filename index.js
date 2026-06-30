const express = require("express");
const line = require("@line/bot-sdk");
const OpenAI = require("openai");

const app = express();

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new line.Client(config);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const ceoAI = require("./ai/ceo");
app.get("/", (req, res) => {
  res.send("HOMEY LINE Bot is running.");
});

app.post("/webhook", line.middleware(config), async (req, res) => {
  Promise.all(req.body.events.map(handleEvent))
    .then(() => res.status(200).end())
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

async function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }

  const userText = event.message.text;

 const replyText = await ceoAI(userText, openai);

try {
  return client.replyMessage(event.replyToken, {
    type: "text",
    text: replyText,
  });
} catch (err) {
  console.error("LINE reply error:", err.response?.data || err.message);
} 
} 
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`HOMEY LINE Bot running on port ${PORT}`);
});