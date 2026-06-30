const express = require("express");
const line = require("@line/bot-sdk");
const OpenAI = require("openai");
const ceoAI = require("./ai/ceo/ceo");

const app = express();

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

const client = new line.Client(config);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

app.get("/", (req, res) => {
  res.send("HOMEY OS is running.");
});

app.post("/webhook", line.middleware(config), async (req, res) => {
  try {
    await Promise.all(req.body.events.map(handleEvent));
    res.status(200).end();
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).end();
  }
});

async function handleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return null;
  }

  const userText = event.message.text;
  const replyText = await ceoAI(userText, openai);

  return client.replyMessage(event.replyToken, {
    type: "text",
    text: replyText,
  });
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`HOMEY OS running on port ${PORT}`);
});