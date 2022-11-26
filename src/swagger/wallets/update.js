module.exports = {
  put: {
    tags: ["Wallets"],
    summary: "Update wallet by id",
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
            $ref: "#/components/schemas/WalletsUpdateRequest",
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
