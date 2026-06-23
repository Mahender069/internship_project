import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";
import { env } from "./config/env.js";
import { logger } from "./config/logger.js";

import { errorMiddleware } from "./middlewares/error.middleware.js";
import { apiLimiter } from "./middlewares/rateLimit.middleware.js";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";

import authRoutes from "./routes/auth.routes.js";
import collegeRoutes from "./routes/college.routes.js";
import savedRoutes from "./routes/saved.routes.js";
import compareRoutes from "./routes/compare.routes.js";
import { ApiError } from "./utils/apiError.js";

const app = express();

/*
|--------------------------------------------------------------------------
| Global Middlewares
|--------------------------------------------------------------------------
*/

app.use(cors());

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);

/*
|--------------------------------------------------------------------------
| Request Logging
|--------------------------------------------------------------------------
*/

app.use((req, _res, next) => {
  logger.info({
    method: req.method,
    path: req.originalUrl,
    ip: req.ip,
  });

  next();
});

/*
|--------------------------------------------------------------------------
| Rate Limiting
|--------------------------------------------------------------------------
*/

app.use("/api", apiLimiter);

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/health", (_req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);
/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
*/

app.use("/api/auth", authRoutes);

app.use("/api/colleges", collegeRoutes);

app.use("/api/saved-colleges", savedRoutes);

app.use("/api/compare-colleges", compareRoutes);

/*
|--------------------------------------------------------------------------
| 404 Handler
|--------------------------------------------------------------------------
*/

app.use((_req, _res, next) => {
  next(new ApiError(404, "Route not found"));
});

/*
|--------------------------------------------------------------------------
| Error Handler
|--------------------------------------------------------------------------
*/

app.use(errorMiddleware);

/*
|--------------------------------------------------------------------------
| Server Bootstrap
|--------------------------------------------------------------------------
*/

async function startServer() {
  try {
    await connectDB();

    app.listen(env.PORT, () => {
      logger.info(
        `Server running on port ${env.PORT}`
      );
    });
  } catch (error) {
    logger.error("Failed to start server", error);

    process.exit(1);
  }
}

startServer();