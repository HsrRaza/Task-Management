import { Router } from "express";
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants";
import { validateProjectPermission } from "../middlewares/auth.middlewares";
import { createNote, deleteNote, deleteNote, getNote, getNoteById, updateNote } from "../controllers/note.controllers";

const router = Router()

router.route("/:projectId")
    .get(
        validateProjectPermission(AvailableUserRoles),
        getNote
    )
    .post(
        validateProjectPermission([UserRolesEnum.ADMIN]),
        createNote
    )

 router.route("/:projectId/n/:noteId")
    .get(validateProjectPermission(AvailableUserRoles), getNoteById)

    .put(validateProjectPermission([UserRolesEnum.ADMIN]), updateNote)
     
    .delete(validateProjectPermission([UserRolesEnum.ADMIN]), deleteNote)

export default router