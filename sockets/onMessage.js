const { sendMessage } = require('../dialogflow');
const { mapDialogflowResult } = require('../botResponse');

module.exports = io => messages => {
  const { user, text } = messages[0];

  sendMessage(text)
    .then(responses => {
      console.log('RESPONSES:\n', responses);
      const responseMessages = mapDialogflowResult(responses[0].queryResult);
      io.sockets.emit('message', responseMessages);
    })
    .catch(err => {
      console.error('ERROR', err);
    });
};
