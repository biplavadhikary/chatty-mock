const fs = require("fs");
const readLastLines = require("read-last-lines");
const eventNames = require("../eventNames");
const constants = require("../../constants");
const mockResponses = require("./index.json");

let idx = 0;

function sendStatusUpdate(socket) {
  const emitMessage = (message) => {
    console.log(`Sending - ${message}`);

    socket.emit(eventNames.SEND_STATUS_UPDATE, {
      message,
    });
  };

  const sendConstantUpdates = () => {
    const updateMessage = mockResponses[idx];
    emitMessage(updateMessage);
    idx = (idx + 1) % mockResponses.length;
  };

  /**
   * For Mode: interval
   */

  const sendConstantUpdatesInterval = () =>
    setInterval(function () {
      sendConstantUpdates();
    }, constants.INTERVAL_DURATION);

  /**
   * For Mode: monitor
   */

  const monitorFileForChanges = () => {
    try {
      return fs.watch(constants.FILE_PATH_TO_MONITOR, (event) => {
        if (event.toLowerCase() == "change") {
          readLastLines
            .read(constants.FILE_PATH_TO_MONITOR, 1)
            .then((lines) => {
              emitMessage(lines);
            });
        }
      });
    } catch (error) {
      console.log("Error in finding the specified File");
    }
  };

  return constants.MODE.toLowerCase() === "interval"
    ? sendConstantUpdatesInterval()
    : monitorFileForChanges();
}

module.exports = sendStatusUpdate;
