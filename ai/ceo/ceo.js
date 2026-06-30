const salesAI = require("../sales/sales");
const estimateAI = require("../sales/estimate");
const contractAI = require("../sales/contract");
const reportAI = require("../sales/report");
const newsAI = require("../information/news");
const weatherAI = require("../information/weather");
const economyAI = require("../information/economy");
const statisticsAI = require("../information/statistics");
const searchAI = require("../information/search");
module.exports = async function ceoAI(userText, openai) {
  if (userText.includes("営業") || userText.includes("テレアポ")) {
    return salesAI(userText);
  }

  if (userText.includes("見積") || userText.includes("見積もり")) {
    return estimateAI(userText);
  }

  if (userText.includes("契約")) {
    return contractAI(userText);
  }

  if (
    userText.includes("報告書") ||
    userText.includes("行政") ||
    userText.includes("海のしずく")
  ) {
    return reportAI(userText);
  }
if (userText.includes("ニュース")) {
  return newsAI(userText);
}

if (userText.includes("天気")) {
  return weatherAI(userText);
}

if (
  userText.includes("経済") ||
  userText.includes("株") ||
  userText.includes("為替")
) {
  return economyAI(userText);
}

if (userText.includes("統計")) {
  return statisticsAI(userText);
}

if (
  userText.includes("検索") ||
  userText.includes("調べて")
) {
  return searchAI(userText);
}
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "あなたはHOMEY OSのCEO AIです。短く丁寧に日本語で返答してください。"
      },
      {
        role: "user",
        content: userText
      }
    ]
  });

  return completion.choices[0].message.content;
};