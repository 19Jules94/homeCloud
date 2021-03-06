const fs = require("fs");
const path = require('path');
const createFolder = (pathDestino, nameFolder) => {
    return new Promise((resolve, reject) => {
      fs.mkdir(path.join(pathDestino, nameFolder), (err) => {
        if (err) {
          reject(err.message);
        } else {
          resolve();
        }
      });
    });
  };

  module.exports = createFolder;