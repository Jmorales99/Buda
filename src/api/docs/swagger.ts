export default {
  openapi: "3.0.0",
  info: {
    title: "Buda Portfolio API",
    version: "1.0.0",
    description:
      "API para calcular el valor de un portafolio de criptomonedas en una moneda fiat, usando precios en tiempo real desde Buda.com.",
  },
  servers: [
    {
      url: "https://tusubdominio.vercel.app/api",
      description: "Servidor de producción",
    },
    {
      url: "http://localhost:3000/api",
      description: "Servidor local",
    },
  ],
  paths: {
    "/": {
      get: {
        summary: "Verifica que la API esté funcionando",
        responses: {
          200: {
            description: "La API responde correctamente",
          },
        },
      },
    },
    "/portfolio": {
      post: {
        summary: "Calcula el valor total de un portafolio cripto",
        description:
          "Recibe un portafolio de criptomonedas y una moneda fiat (CLP, PEN o COP) y devuelve su valor total usando precios de Buda.com.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  portfolio: {
                    type: "object",
                    example: {
                      BTC: 0.5,
                      ETH: 2.0,
                      USDT: 1000,
                    },
                  },
                  fiat_currency: {
                    type: "string",
                    example: "CLP",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Respuesta exitosa con el valor del portafolio",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    success: { type: "boolean" },
                    fiat_currency: { type: "string" },
                    total_value: { type: "number" },
                    breakdown: {
                      type: "object",
                      example: {
                        BTC: 12000000,
                        ETH: 2400000,
                        USDT: 950000,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};
