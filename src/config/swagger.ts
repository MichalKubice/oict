import swaggerJSDoc from "swagger-jsdoc";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Card API",
      version: "1.0.0",
      description: "API documentation for Card service",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "localhost",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
