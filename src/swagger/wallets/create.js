module.exports = {
  post: {
    tags: ["Wallets"],
    summary: "Create wallet",
    description: "",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/WalletsRequest",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Created",
      },
      400: {
        description: "Name is requered | Name already exists | User ID is requered",
      },
      404: {
        description: "Not found",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
