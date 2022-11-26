const addAsset = require("./add");
const findAll = require('./find-all')

module.exports = {
  "/assets": {
    ...addAsset,
    ...findAll
  }
};
