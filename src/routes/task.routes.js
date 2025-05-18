import { Router } from "express";
import { validateProjectPermission, verifyJWT } from "../middlewares/auth.middlewares.js";
import {
    createTask,
    getAllTask,
    getTaskById,
    updateTask,
    deleteTask
} from "../controllers/task.controllers.js"
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants";
import { validate } from "../middlewares/validator.middlewares.js";

const router = Router()

// All routes below require authentication
router.use(verifyJWT)

// get task
router.route("/allTask").get(validateProjectPermission([AvailableUserRoles]),getAllTask)

// create task

router.route("/:projectId/tasks").post(validate,validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]),createTask)

// get task by id
router.route("/:taskId").get(validateProjectPermission([AvailableUserRoles]),getTaskById)

// update task
router.route("/update/:taskId").patch(validate,validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]), updateTask)

// delete task
router.route("/delete/:taskId").delete(validate,validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.PROJECT_ADMIN]), deleteTask)

export default router