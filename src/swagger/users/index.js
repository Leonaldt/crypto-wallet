const createUser = require("./create");
const updateUser = require('./update')
const findUserById = require('./find-by-id')
const deleteUser = require('./delete')
const findAll = require('./find-all')

module.exports = {
  "/users": {
    ...findAll,
    ...createUser,
  },
  '/users/{id}': {
    ...findUserById,
    ...updateUser,
    ...deleteUser
  },
};
