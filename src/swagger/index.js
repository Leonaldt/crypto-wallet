const basicInfo = require("./basic-info");
const servers = require("./servers");
const components = require("./components");
const users = require("./users");
const wallets = require("./wallets");
const assets = require("./assets");

const paths = {
  paths: {
    ...users,
    ...wallets,
    ...assets,
  }
};

module.exports = {
  ...basicInfo,
  ...servers,
  ...components,
  ...paths
};
