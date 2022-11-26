const createUser = require("./create");
const updateUser = require('./update')
const findById = require('./find-by-id')
const findByUserId = require('./find-all-by-user-id')
const deleteUser = require('./delete')
const findAll = require('./find-all')

module.exports = {
  "/wallets": {
    ...findAll,
    ...createUser,
  },
  '/wallets/{id}': {
    ...findById,
    ...updateUser,
    ...deleteUser
  },
  '/wallets/users/{id}': {
    ...findByUserId
  },
};
