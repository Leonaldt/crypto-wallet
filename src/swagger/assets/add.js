module.exports = {
  post: {
    tags: ["Assets"],
    summary: "Add asset",
    description: "",
    requestBody: {
      content: {
        "application/json": {
          schema: {
            $ref: "#/components/schemas/AssetsRequest",
          },
        },
      },
    },
    responses: {
      201: {
        description: "Created",
      },
      400: {
        description: "Price is requered | Amount is requered | Asset ID is requered | Wallet ID is requered",
      },
      404: {
        description: "Wallet not found | Asset not found",
      },
      500: {
        description: "Server error",
      },
    },
  },
};
