var express = require("express");
var router = express.Router();
var data = require("./index.json");

/* GET users listing. */
router.get("/", function (req, res) {
  const { query: { userId } = {} } = req;

  const messageData = data.find(
    (messageData) => messageData.userId === userId
  )?.conversations;
  // console.log("userid:", messageData);

  const sendDelayedResponse = (callback) => {
    setTimeout(callback, 2000);
  };

  if (!userId) {
    sendDelayedResponse(() =>
      res.send({
        success: false,
        message: "Invalid Request Data",
        data: null,
      })
    );
    return;
  }

  if (!messageData) {
    sendDelayedResponse(() =>
      res.send({
        success: false,
        message: "No Message Data Found",
        data: {
          conversationItems: {},
        },
      })
    );
  } else {
    sendDelayedResponse(() =>
      res.send({
        success: false,
        message: "Sending Message Data",
        data: messageData,
      })
    );
  }
});

module.exports = router;
