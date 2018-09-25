const { sendMessage } = require('../dialogflow');
const { mapDialogflowResult } = require('../botResponse');

module.exports = io => params => {
  const { medicineLabel, dosePerDay } = params;
  sendMessage(`prescriptionCreated ${medicineLabel}, ${dosePerDay}`)
    .then(responses => {
      console.log('RESPONSES:\n', responses);
      const responseMessages = mapDialogflowResult(responses[0].queryResult);
      io.sockets.emit('message', responseMessages);
    })
    .catch(err => {
      console.error('ERROR', err);
    });
};
