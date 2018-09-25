const onMessage = require('./onMessage');
const onPrescriptionCreated = require('./onPrescriptionCreated');
const onMedicationRemind = require('./onMedicationRemind');

module.exports = io => {
  io.on('connection', client => {
    console.log('A client just joined on', client.id);

    client.on('disconnect', () =>
      console.log(`${client.id} has disconnected.`)
    );

    client.on('message', onMessage(io));
    client.on('prescriptionCreated', onPrescriptionCreated(io));
    client.on('medicationRemind', onMedicationRemind(io));
  });
};
