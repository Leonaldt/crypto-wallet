module.exports = {
  get: {
    tags: ["Wallets"],
    summary: "Find wallet by id",
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
              $ref: "#/components/schemas/WalletsByIdResponse",
            },
          },
        },
      },
      404: {
        description: "Wallet not found",
      },
    },
  },
};
