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

module.exports = {
  createResponseMessage
};
