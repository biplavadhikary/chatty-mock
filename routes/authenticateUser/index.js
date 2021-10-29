var express = require("express");
var router = express.Router();
var data = require("./index.json");

/* GET users listing. */
router.get("/", function (req, res) {
  const { query: { userName, password } = {} } = req;

  const userData = data.find((userData) => userData.userName === userName);

  const sendDelayedResponse = (callback) => {
    setTimeout(callback, 3000);
  };

  if (!userName || !password) {
    sendDelayedResponse(() =>
      res.send({
        success: false,
        message: "Invalid Request Data",
        data: null,
      })
    );
    return;
  }

  if (!userData) {
    sendDelayedResponse(() =>
      res.send({
        success: false,
        message: "Could not find the required user",
        data: null,
      })
    );
  } else {
    if (userData.password !== password) {
      sendDelayedResponse(() =>
        res.send({ success: false, message: "Invalid Credentials", data: null })
      );
    } else {
      success = true;
      sendDelayedResponse(() =>
        res.send({
          success: true,
          message: "Sending Data...",
          data: userData.data,
        })
      );
    }
  }
});

module.exports = router;
