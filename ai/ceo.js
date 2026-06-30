const salesAI = require("./sales");
const estimateAI = require("./estimate");
module.exports = async function ceoAI(userText, openai) {

if (userText.includes("見積")) {
  return estimateAI(userText);
}

if (
  userText.includes("営業") ||
  userText.includes("今日の仕事")
) {
  return salesAI(userText);
}

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "あなたはHOMEY LINE Botです。短く丁寧に日本語で返答してください。"
      },
      {
        role: "user",
        content: userText
      }
    ]
  });

  return completion.choices[0].message.content;
};