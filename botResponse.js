const uuid = require('uuid/v1');

const chatbotProfile = {
  _id: 9999,
  name: 'Susi',
  avatar: 'https://avatars3.githubusercontent.com/u/43376491?s=200&v=4'
};

const createResponseMessage = textMessage => ({
  _id: uuid(),
  text: textMessage,
  user: chatbotProfile,
  createdAt: new Date()
});

const mapDialogflowResult = dialogflowResult => {
  return dialogflowResult.fulfillmentMessages.map(({ text }) =>
    createResponseMessage(text.text[0])
  );
};

module.exports = {
  createResponseMessage,
  mapDialogflowResult
};
