module.exports = {
  get: {
    tags: ["Users"],
    summary: "Find user by id",
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
      200: {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "object",
              $ref: "#/components/schemas/UsersResponse",
            },
          },
        },
      },
      404: {
        description: "Not found",
      },
    },
  },
};
