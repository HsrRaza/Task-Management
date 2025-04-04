import express from "express";

const app = express();

// router  imports
import healhCheckRouter from "./routes/healthcheck.routes.js"

app.use("api/v1/healthcheck",healhCheckRouter)

export default app;