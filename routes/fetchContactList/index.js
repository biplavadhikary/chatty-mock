var express = require("express");
var router = express.Router();
var data = require("./index.json");

/* GET users listing. */
router.get("/", function (req, res) {
  const { query: { userId } = {} } = req;

  const contactData = data.find((contactData) => contactData.userId === userId);
  console.log("userid:", contactData);

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

  if (!contactData) {
    sendDelayedResponse(() =>
      res.send({
        success: false,
        message: "No Contacts Data Found",
        data: [],
      })
    );
  } else {
    sendDelayedResponse(() =>
      res.send({
        success: false,
        message: "Sending contacts",
        data: contactData,
      })
    );
  }
});

module.exports = router;
