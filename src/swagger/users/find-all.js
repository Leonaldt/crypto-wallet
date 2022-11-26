module.exports = {
  get: {
    tags: ["Users"],
    summary: "Find all users",
    description: "",
    responses: {
      200: {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/UsersResponse",
              },
            },
          },
        },
      },
    },
  },
};
