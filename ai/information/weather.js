module.exports = async function weatherAI(userText) {
  return `気象AIです。

調査内容：
${userText}

最新の天気・気象・台風・警報情報を収集して報告します。`;
};