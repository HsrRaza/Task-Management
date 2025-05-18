import express from "express";

const app = express();


// middlewares 

app.use(express.json());
app.use(express.urlencoded({extended: true}));

// router  imports
import healhCheckRouter from "./routes/healthcheck.routes.js"
import authRouter from "./routes/auth.routes.js"
import noteRouter from "../src/routes/notes.routes.js"
import projectRouter from "../src/routes/project.routes.js"
import taskRouter from "../src/routes/task.routes.js"

app.use("api/v1/healthcheck",healhCheckRouter)
app.use("/api/v1/user",authRouter )
app.use("/api/v1/note",noteRouter )
app.use("/api/v1/project", projectRouter)
app.use("/api/v1/task", taskRouter)

export default app;