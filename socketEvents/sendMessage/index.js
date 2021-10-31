const eventNames = require("../eventNames");

const sendMessage = (id, socket) => {
  const sendMessageHandler = ({ recipients, messageItem }) => {
    console.log("Received Data", { recipients, messageItem });

    recipients.forEach((recipient) => {
      const otherReceipients = recipients.filter((r) => r !== recipient);
      socket.broadcast.to(recipient).emit(eventNames.RECEIVE_MESSAGE, {
        recipients: otherReceipients,
        sender: id,
        messageItem: {
          ...messageItem,
          isSender: false,
        },
      });
    });
  };
  return sendMessageHandler;
};

module.exports = sendMessage;
