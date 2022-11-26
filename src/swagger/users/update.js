module.exports = {
  put: {
    tags: ["Users"],
    summary: "Update user by id",
    description: "",
    parameters: [
      {
        name: "id",
        in: "path",
        description: "",
        required: true,
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/UsersRequest",
          },
        },
      },
    },
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
