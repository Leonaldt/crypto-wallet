module.exports = {
  get: {
    tags: ["Wallets"],
    summary: "Find all wallets by user id",
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
              $ref: "#/components/schemas/WalletsByUserResponse",
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
