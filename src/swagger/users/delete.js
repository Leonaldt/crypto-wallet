module.exports = {
  delete: {
    tags: ["Users"],
    summary: "Delete user by id",
    description: "",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "",
        required: true,
      },
    ],
    responses: {
      204: {
        description: "No content",
      },
      404: {
        description: "Not found",
      },
    },
  },
};
