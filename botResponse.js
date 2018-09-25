const uuid = require('uuid/v1');

const chatbotProfile = {
  _id: 9999,
  name: 'Susi',
  avatar: 'https://placeimg.com/140/140/any'
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
