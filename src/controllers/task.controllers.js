import { Project } from "../models/project.models.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/async-handler.js"

import { Task } from "../models/task.models.js";
import { TaskStatusEnum } from "../utils/constants";
import { ProjectMember } from "../models/projectmember.models.js";
import { User } from "../models/user.models.js";
import { ApiResponse } from "../utils/api-response.js";

const createTask = asyncHandler(async (req, res) => {
    const { projectId } = req.params
    const userId = req.user._id;

    const { title, description, project, assignedTo, assignedBy, status = TaskStatusEnum.TODO } = req.body;

    if (!projectId) {
        throw new ApiError(400, "Project Id is not valid")
    }

    if (!title, !description, !project, !assignedTo, !assignedBy, !status) {
        throw new ApiError(400, "All fields are required ")
    }

    try {

        const project = await Project.findById(projectId)

        if (!project) {
            throw new ApiError(400, "Project doesn't exists")
        }

        const projectMember = await ProjectMember.findOne({ user: userId, projects: projectId })
        if (!projectMember) {
            throw new ApiError(403, "you are not a member of this projects")
        }

        const assignedUser = await User.findById(assignedTo)
        if (!assignedUser) {
            throw new ApiError(404, "user does not exits")
        }
        const checkUserInProject = await ProjectMember.findOne({ user: assignedTo, projects: projectId })

        if (!checkUserInProject) {
            throw new ApiError(403, "user is not  a member of the projects")
        }

        const task = Task.create({
            title,
            description,
            project: projectId,
            assignedTo,
            assignedBy: userId,
            status
        })

        if (!task) {
            throw new ApiError(500, "unable to create task")
        }

        return res.status(200).json(
            new ApiResponse(200, task, "task created successfully")
        )



    } catch (error) {

        throw new ApiError(500, error?.message, "Error while creating task")

    }

})

const getAllTask = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    if (!userId) {
        throw new ApiError(400, "Login first")
    }
    try {
        const task = await Task.find({}).populate("assignedTo").populate("assignedBy").populate("project")
        if (!task) {
            throw new ApiError(404, "there is no task available")
        }

        return res.status(200).json(
            new ApiResponse(200, task, "tasked fetched successfullt")
        )

    } catch (error) {
        throw new ApiError(500, "Error while fetching the ALl task")

    }


})

const getTaskById = asyncHandler(async(req, res) =>{
    const {taskId} = req.params;
    const userId = req.user._id;

    if(!taskId){
        throw new ApiError(400, "provide a valid task Id")
    }

    if(!userId){
        throw new ApiError(400, "login first")
    }

    try {
         const task = Task.findById(Task).populate("assignedTo").populate("assignedBy").populate("project")
         if(!task){
            throw new ApiError(404, "Unable to get task by id")
         }

         return res.status(200).json(
            new ApiResponse(200, task, "Task by id Fetched successfully")
         )
         
    } catch (error) {
        console.error(error);
        
        throw new ApiError(500, "Error while fetching task by Id")
        
    }
})

export {
    createTask,
    getAllTask,
    getAllTask
}


