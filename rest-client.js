"use strict";
/**
 * @description: Restful API client (JSON)
 * @author: Nicky
 */
const Debug = require('./debug');
const http = require('http');
class RestClient {
  // return an object if parsed successfully
  // otherwise, it will print raw reponse and return status code
  _makeRequest(method, host, port, path, dataStr, callback) {
    console.log(token);
    const option = {
      host: host,
      port: port,
      path: path,
      headers: {
        'Content-Type': RestClient.contentType,
        'Content-Length': dataStr.length
      },
      method: method
    }
    let req = http.request(option, (res) => {
      let result = '';
      res.on('data', (data) => {
        result += data;
      });
      res.on('end', () => {
        try {
          const obj = JSON.parse(result);
          callback(obj);
        }
        catch (err) {
          Debug.warning(['RestClient', 'Parse JSON failed', 'raw response is printed']);
          Debug.warning(['Raw response', result]);
          callback(res.statusCode);
        }
      });
    });
    if (dataStr.length > 0) req.write(dataStr);
    req.end();
  }
  get(host, port, path, callback) {
    this._makeRequest('GET', host, port, path, '', callback);
  }
  put(host, port, path, data, callback) {
    let dataStr = JSON.stringify(data);
    this._makeRequest('PUT', host, port, path, dataStr, callback);
  }
  post(host, port, path, data, callback) {
    let dataStr = JSON.stringify(data);
    this._makeRequest('POST', host, port, path, dataStr, callback);
  }
  constructor() {
  }
}
RestClient.contentType = 'application/json';
module.exports = RestClient;
