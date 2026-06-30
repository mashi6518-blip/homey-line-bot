module.exports = async function ceoAI(userText, openai) {
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