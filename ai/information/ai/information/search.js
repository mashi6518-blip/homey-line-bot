module.exports = async function searchAI(userText) {
  return `🌐 情報収集AI

依頼内容：
${userText}

現在は情報収集モードです。
次のバージョンでGoogle検索・最新ニュース・法令・補助金・相場情報と連携します。`;
};