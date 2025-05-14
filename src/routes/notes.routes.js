import { Router } from "express";
import { UserRolesEnum } from "../utils/constants";
import { validateProjectPermission } from "../middlewares/auth.middlewares";

const router = Router()

router.route("/:projectId")
    .get(
        validateProjectPermission([UserRolesEnum.ADMIN, UserRolesEnum.MEMBER]),
        getNote
    )
    .post(
        validateProjectPermission([UserRolesEnum.ADMIN], UserRolesEnum.MEMBER),
        createNote
    )

export default router