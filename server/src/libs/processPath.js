const path = require("path");
const storage = require('../storage')
const processPath = (storagePath) => {
    const relativePath = storagePath ? storagePath.replace(/-/g, "/") : "/";
    return { relativePath, absolutePath: path.join(storage, relativePath) };
  };

module.exports = processPath;