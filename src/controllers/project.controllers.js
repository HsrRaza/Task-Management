import { asyncHandler } from "../utils/async-handler.js";
import { Project } from "../models/project.models.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/api-response.js"
import { ProjectMember } from "../models/projectmember.models.js";

const getProject = asyncHandler(async (req, res) => {
  const { userId } = req.user._id;

  try {
    if (!userId) {
      throw new ApiError(404, "user not found !")
    }
    const getAllProject = await Project.find({
      createdBy: userId
    })
    if (!getAllProject) {
      throw new ApiError(404, "No projects found!")

    }

    return res.status(200).
      json(new ApiResponse(20, getAllProject, "All Project fetched Successfully"))



  } catch (error) {

  }
})
const getProjectById = asyncHandler(async (req, res) => {
  const { projectId } = req.params;

  try {
    const projectById = await Project.findById(projectId).populate("createdBy", "username  fullName")
    if (!projectById) {
      throw new ApiError(404, "Project not found")
    }

    return res.status(200).json(
      new ApiResponse(200, projectById, "Project by id fetched successfully")
    )
  } catch (error) {
    throw new ApiError(500, error?.message, "Error while fecthing project by ID")
  }
})
const createProject = asyncHandler(async (req, res) => {
  const { name, description } = req.body;


  try {

    if (!name || !description) {
      throw new ApiError(400, "Req all the fields")
    }

    const existingProject = Project.findOne(name)
    if (!existingProject) {
      throw new ApiError(400, "Project already exist")
    }

    const newProject = Project.create({
      name,
      description,
      createdBy: req.user._id
    })

    return res.status(200).
      json(new ApiResponse(201, newProject, "Project created Successfully"))



  } catch (error) {
    throw new ApiError(500, error?.message, "Error while creating Project")
  }


})
const updateProject = asyncHandler(async (req, res) => {

  const { projectId } = req.params
  const { name, description } = req.body;

  try {
    if (!name || !description) {
      throw new ApiError(404, "All fields are required")
    }

    const checkedProject = await Project.findById(projectId)

    if (!checkedProject) {
      throw new ApiError(404, "Project is not found in database")
    }

    const newUpdatedProject = await Project.findByIdAndUpdate(
      projectId,
      { name, description },
      { new: true }
    )
    if (!newUpdatedProject) {
      throw new ApiError(404, "Project could not able to update")

    }
    return res.status(200).
      json(new ApiResponse(201, newUpdatedProject, "Project Updated  Successfully"))




  } catch (error) {
    throw new ApiError(500, "Error while updating Project")
  }


});
const deleteProject = asyncHandler(async (req, res) => {

  const { projectId } = req.params;
  try {
    const checkingProject = await Project.findById(projectId);

    if (!checkingProject) {
      throw new ApiError(404, "Unable to find Project")
    }

    const deletingProject = await Project.findByIdAndDelete(projectId).populate("createdBy", "username fullName")
    if (!deletingProject) {
      throw new ApiError(404, "Unable to delete the project")
    }

    return res.status(200).json(
      new ApiResponse(200, deletingProject, "Project deleted sucessfuly")
    )
  } catch (error) {
    throw new ApiError(500, "Error while deleting the projects")

  }

});
const addMemberToProject = asyncHandler(async (req, res) => {
    const {projectId} = req.params;
    const userid = req.user._id;

    if(!projectId){
      throw new ApiError(400, "please provide projectId")
    }
    if(!userid){
          throw new ApiError(401 ,"Unathorized req ! login first")
    }
      


    try {
      const checkingProject = Project.findById(projectId);
      if(!checkingProject){
        throw new ApiError(404, "unable to fetched project")
      }

      
      
    } catch (error) {
      
    }
});
const getProjectMembers = asyncHandler(async (req, res) => {

});
const updateProjectMembers = asyncHandler(async (req, res) => {

});
const updateMemberRole = asyncHandler(async (req, res) => {

});
const deleteMember = asyncHandler(async (req, res) => {

});


export {
  createProject,
  getProject,
  getProjectById,
  updateProject,
  deleteProject
}




