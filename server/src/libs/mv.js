const fs = require("fs");
const path = require("path");

const moveFile = (pathDestino, file) => {
    return new Promise((resolve, reject) => {
      file.mv(path.join(pathDestino, file.name), (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  module.exports = moveFile;