const eventNames = require("./socketEvents/eventNames");

/**
 * Import Event Handlers here
 */
const sendMessage = require("./socketEvents/sendMessage");

const initializeSocketConnection = (socket) => {
  const { userId: id } = socket.handshake.query;
  socket.join(id);

  console.log(`USER ID - ${id} is Connected`);

  /**
   * Event to Handler Mappings
   */
  socket.on(eventNames.SEND_MESSAGE, sendMessage(id, socket));
};

module.exports = initializeSocketConnection;
