module.exports = {
  get: {
    tags: ["Assets"],
    summary: "Find all assets",
    description: "",
    responses: {
      200: {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/AssetsResponse",
              },
            },
          },
        },
      },
    },
  },
};
