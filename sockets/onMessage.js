const { sendRequest } = require('../dialogflow');
const { createResponseMessage } = require('../botResponse');

const mapDialogflowResult = result => {
  console.log(result);
  return result.fulfillmentMessages.map(({ text }) =>
    createResponseMessage(text.text[0])
  );
};

module.exports = io => messages => {
  const { user, text } = messages[0];

  sendRequest(text)
    .then(responses => {
      console.log('RESPONSES:\n', responses);
      const responseMessages = mapDialogflowResult(responses[0].queryResult);
      io.sockets.emit('message', responseMessages);
    })
    .catch(err => {
      console.error('ERROR', err);
    });
};
