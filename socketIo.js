const eventNames = require("./socketEvents/eventNames");
const constants = require("./constants");

/**
 * Import Event Handlers here
 */
const sendMessage = require("./socketEvents/sendMessage");
const sendStatusUpdate = require("./socketEvents/sendStatusUpdate");

const initializeSocketConnection = (socket) => {
  const { userId: id } = socket.handshake.query;
  socket.join(id);

  console.log(`USER ID - ${id} is Connected`);

  let handler;

  /**
   * Event to Handler Mappings
   */
  socket.on(eventNames.SEND_MESSAGE, sendMessage(id, socket));

  // register sendStatusUpdate
  handler = sendStatusUpdate(socket);

  socket.on("disconnect", function () {
    console.log(`USER ID - ${id} is disconnected`);
    if (constants.MODE.toLowerCase() === "interval") {
      // stop sending interval notifications
      clearInterval(handler);
    } else {
      if (handler) {
        // stop watching the specified file
        handler.close();
      }
    }
  });
};

module.exports = initializeSocketConnection;
