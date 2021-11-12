const FILE_PATH_TO_MONITOR = "C:/test.txt";

/**
 * interval: will detect last line on change
 * monitor: will send constant values after every n seconds
 */
const MODE = "interval";

/**
 * If mode is 'interval', then the specify the frequency of updates in ms
 */
const INTERVAL_DURATION = 3000;

module.exports = {
  FILE_PATH_TO_MONITOR,
  MODE,
  INTERVAL_DURATION,
};
