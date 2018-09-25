const onMessage = require('./onMessage');
const { createResponseMessage } = require('../botResponse');

const onSchedulesCreated = io => schedules => {
  io.sockets.emit('message', schedules);
};

const onSchedulesRemind = io => schedules => {
  io.sockets.emit('message', schedules);
};

module.exports = io => {
  io.on('connection', client => {
    console.log('A client just joined on', client.id);

    client.on('disconnect', () =>
      console.log(`${client.id} has disconnected.`)
    );

    client.on('notification', message => {
      io.sockets.emit('message', [createResponseMessage(message)]);
    });

    client.on('message', onMessage(io));
    client.on('schedulesCreated', onSchedulesCreated(io));
    client.on('schedulesRemind', onSchedulesRemind(io));
  });
};
