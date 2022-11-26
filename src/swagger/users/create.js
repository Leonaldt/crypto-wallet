module.exports = {
  post: {
    tags: ["Users"],
    summary: "Create user",
    description: "",
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
      201: {
        description: "Created",
      },
      400: {
        description: "Nickname is requered | Nickname already exists",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
