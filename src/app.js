import express from "express";

const app = express();

// router  imports
import healhCheckRouter from "./routes/healthcheck.routes.js"
import authRouter from "./routes/auth.routes.js"

app.use("api/v1/healthcheck",healhCheckRouter)
app.use("api/v1/user",authRouter )

export default app;