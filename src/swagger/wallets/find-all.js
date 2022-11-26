module.exports = {
  get: {
    tags: ["Wallets"],
    summary: "Find all wallets",
    description: "",
    responses: {
      200: {
        description: "OK",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/WalletsResponse",
              },
            },
          },
        },
      },
    },
  },
};
