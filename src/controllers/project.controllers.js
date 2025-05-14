import { asyncHandler } from "../utils/async-handler.js";
import { Project } from "../models/project.models.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/api-response.js"

const getProject = asyncHandler(async (req, res) => {
 const {userId} = req.user._id;
 
 try {
      if(!userId){
        throw new ApiError(404, "user not found !")
      }
      const getAllProject = await Project.find({
        createdBy:userId
      })
      if(!getAllProject){
        throw new ApiError(404, "No projects found!")

      }

      return res.status(200).
            json(new ApiResponse(20, getAllProject, "All Project fetched Successfully"))


     
 } catch (error) {
    
 }
})
const getProjectById = asyncHandler(async (req, res) => {
  const {projectId}  = req.params
  try {
    
  } catch (error) {
    
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

});
const deleteProject = asyncHandler(async (req, res) => {

});
const addMemberToProject = asyncHandler(async (req, res) => {

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
    createProject
}




