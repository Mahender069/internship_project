import swaggerJsdoc from "swagger-jsdoc";

export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "College Discovery Platform API",
      version: "1.0.0",
      description: "Backend API Documentation",
    },

    servers: [
      {
        url: "https://internshipproject-production-975f.up.railway.app",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: ["./src/routes/*.ts"],
});
