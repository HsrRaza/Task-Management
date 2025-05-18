import { Router } from "express";
import { validateProjectPermission ,verifyJWT } from "../middlewares/auth.middlewares";
import { UserRolesEnum } from "../utils/constants";
import {
  createProject,
  getProject,
  getProjectById,
  updateProject,
  deleteProject,
  addMemberToProject,
  getProjectMembers,
  deleteMember,
  updateProjectMembers

} from "../controllers/project.controllers.js"
import { validate } from "../middlewares/validator.middlewares.js";

const router = Router()

// create a new project
router.route("/create-project").post(verifyJWT,validate, validateProjectPermission([UserRolesEnum.ADMIN]), createProject)

// get all project
router.route("/",).get(verifyJWT, validateProjectPermission([UserRolesEnum.ADMIN]), getProject)

// get project by Id
router.route("/:projectId").get(verifyJWT, validateProjectPermission([UserRolesEnum.ADMIN]), getProjectById)

// update the project
router.route("/update/:projectId").put( verifyJWT, validate, validateProjectPermission([UserRolesEnum.ADMIN]), updateProject)

// delete the project
router.route("/delete/:projectId").delete(verifyJWT, validateProjectPermission([UserRolesEnum.ADMIN]), deleteProject)

// add members to project
router.route("add-member/:projectId").post(verifyJWT,validate,  validateProjectPermission([UserRolesEnum.ADMIN]), addMemberToProject)

// get project members
router.route("/get-member/:projectId").get(verifyJWT, validateProjectPermission([UserRolesEnum.ADMIN]),getProjectMembers)

// delete member
router.route("/delete-member/:projectId").delete(verifyJWT, validateProjectPermission([UserRolesEnum.ADMIN]),deleteMember)

//update member
router.route("/update-member/:projectId").patch(verifyJWT, validateProjectPermission([UserRolesEnum.ADMIN]),updateProjectMembers)


export default router 