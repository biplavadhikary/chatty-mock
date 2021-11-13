var express = require("express");
var router = express.Router();
var data = require("./index.json");

/* GET users listing. */
router.get("/", function (req, res) {
  const { query: requestData = {} } = req;

  console.log("DATA:::", requestData);
  const requestEntries = Object.entries(requestData);

  const returnData = data.find((dataObj) => {
    try {
      let matched = false;

      for (let idx = 0; idx < requestEntries.length; idx += 1) {
        const [key, val] = requestEntries[idx];

        if (dataObj[key] && val === dataObj[key]) {
          matched = true;
        } else {
          matched = false;
          break;
        }
      }
      return matched;
    } catch (error) {
      console.log(error);
    }
  });

  const sendDelayedResponse = (callback) => {
    setTimeout(callback, 3000);
  };

  if (!returnData) {
    sendDelayedResponse(() =>
      res.send({
        success: false,
        message: "Data Not Found",
        data: null,
      })
    );
  } else {
    sendDelayedResponse(() =>
      res.send({
        success: true,
        message: "Sending Details...",
        data: returnData.data,
      })
    );
  }
});

module.exports = router;
