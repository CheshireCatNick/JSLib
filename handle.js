"use strict";
/**
 * @description: handle err and process result for restful api
 * @author: Nicky
 */
const Debug = require('./debug');

/**
 * res: response to client
 * err: error returned by some callback
 * process: function to execute if there's no error
 */
function handle(res, err, process) {
  if (err) {
    Debug.warning(['error', err]);
    res.sendStatus(500);
  }
  else {
    res.status(200);
    process();
  }
};

module.exports = handle;
