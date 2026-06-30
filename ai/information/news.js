module.exports = async function newsAI(userText) {
  return `ニュースAIです。

調査内容：
${userText}

最新ニュースを収集・要約して報告します。`;
};