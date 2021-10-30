const sendMessage = ({ recipients, text }) => {
  recipients.forEach((recipient) => {
    const newRecipients = recipients.filter((r) => r !== recipient);
    newRecipients.push(id);
    socket.broadcast.to(recipient).emit("receive-message", {
      recipients: newRecipients,
      sender: id,
      text,
    });
  });
};
