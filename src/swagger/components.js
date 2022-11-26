module.exports = {
  components: {
    schemas: {
      UsersRequest: {
        type: "object",
        required: ["nickname"],
        properties: {
          nickname: {
            type: "string",
          },
        },
      },
      UsersResponse: {
        type: "object",
        properties: {
          id: {
            type: "number",
          },
          nickname: {
            type: "string",
          },
          created_at: {
            type: "string",
            format: "date-time",
          },
          updated_at: {
            type: "string",
            format: "date-time",
          },
        },
      },
      WalletsRequest: {
        type: "object",
        required: ["name", "userId"],
        properties: {
          name: {
            type: "string",
          },
          userId: {
            type: "number",
          },
        },
      },
      WalletsUpdateRequest: {
        type: "object",
        required: ["name", "userId"],
        properties: {
          name: {
            type: "string",
          },
        },
      },
      WalletsResponse: {
        type: "object",
        properties: {
          id: {
            type: "number",
          },
          name: {
            type: "string",
          },
          user_id: {
            type: "number",
          },
        },
      },
      WalletsByIdResponse: {
        type: "object",
        required: ["id", "name", "assets"],
        properties: {
          id: {
            type: "number",
          },
          name: {
            type: "string",
          },
          assets: {
            type: "array",
            items: {
              type: "object",
              required: ["name", "price", "amount", "symbol", "total"],
              properties: {
                name: {
                  type: "string",
                },
                price: {
                  type: "number",
                },
                amount: {
                  type: "number",
                },
                symbol: {
                  type: "string",
                },
                total: {
                  type: "number",
                },
              },
            },
            uniqueItems: true,
          },
          total: {
            type: "number",
          },
        },
      },
      WalletsByUserResponse: {
        type: "object",
        required: ["wallets", "total"],
        properties: {
          wallets: {
            type: "array",
            items: {
              type: "object",
              required: ["id", "name", "assets"],
              properties: {
                id: {
                  type: "number",
                },
                name: {
                  type: "string",
                },
                assets: {
                  type: "array",
                  items: {
                    type: "object",
                    required: ["name", "price", "amount", "symbol", "total"],
                    properties: {
                      name: {
                        type: "string",
                      },
                      price: {
                        type: "number",
                      },
                      amount: {
                        type: "number",
                      },
                      symbol: {
                        type: "string",
                      },
                      total: {
                        type: "number",
                      },
                    },
                  },
                  uniqueItems: true,
                },
                total: {
                  type: "number",
                },
              },
            },
          },
          total: {
            type: "number",
          },
        },
      },
      AssetsRequest: {
        type: "object",
        required: ["assetId", "walletId", "price", "amount"],
        properties: {
          assetId: {
            type: "number",
          },
          walletId: {
            type: "number",
          },
          price: {
            type: "number",
          },
          amount: {
            type: "number",
          },
        },
      },
      AssetsResponse: {
        type: "object",
        properties: {
          id: {
            type: "number",
          },
          name: {
            type: "string",
          },
          symbol: {
            type: "string",
          },
        },
      },
    },
  },
};
