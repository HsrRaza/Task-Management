import { asyncHandler } from "../utils/async-handler.js";
import { Project } from "../models/project.models.js";
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/api-response.js"
import { ProjectMember } from "../models/projectmember.models.js";
import { User } from "../models/user.models.js"
import { AvailableUserRoles, UserRolesEnum } from "../utils/constants.js";

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
  const { projectId } = req.params;
  const { userId, role } = req.body
  const currentUserId = req.user._id;




  if (!projectId) {
    throw new ApiError(400, "please provide projectId")
  }
  if (!userId) {
    throw new ApiError(400, "Unathorized req ! login first")
  }

  if (role && !AvailableUserRoles.includes(role)) {
    throw new ApiError(400, "Invalid role specified ")
  }




  try {

    // check project exist
    const checkingProject = await Project.findById(projectId);
    if (!checkingProject) {
      throw new ApiError(404, "unable to fetched project")
    }


    // checking the user exist or not
    const usercheck = await User.findById(userId)
    if (!usercheck) {
      throw new ApiError(404, "user does not exist please singup")
    }

    //check if user is admin then he/she can add project admin

    const currentMember = await ProjectMember.findOne({
      user: currentUserId,
      projects: projectId,
    });

    if (role === UserRolesEnum.PROJECT_ADMIN || currentMember.role !== UserRolesEnum.ADMIN) {
      throw new ApiError(403, "Only admin can add the project admin")
    }

    //check if the member is already exists
    const existingMember = await ProjectMember.findOne({
      user: userId,
      projects: projectId
    })

    if (existingMember) {
      throw new ApiError(400, "User is already a member of the project")
    }


    const newMember = ProjectMember.create({
      user: userId,
      projects: projectId,
      role: role || UserRolesEnum.MEMBER
    })


    return res.status(200).json(
      new ApiResponse(201, newMember, "Poject member added successfully ")
    )


  } catch (error) {
    throw new ApiError(500, "error while adding member to projects")

  }
});
const getProjectMembers = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user._id;

  if (!projectId) {
    throw new ApiError(400, "Provide a valid project Id")
  }
  try {
    const checkProject = await Project.findById(projectId);

    if (!checkProject) {
      throw new ApiError(400, "invalid project Id")
    }


    const getMembers = await ProjectMember.find({ projects: projectId }).populate("user", "name email")

    if (getMembers.length === 0) {
      throw new ApiError(404, "No members found for this project.");
    }

    return res.status(200).json(
      new ApiResponse(200, getMembers, "Successfully fetched All members")
    )

  } catch (error) {
    throw new ApiError(500, "error while fetching the members")
  }
});
const updateProjectMembers = asyncHandler(async (req, res) => {
  const { projectId } = req.params;
  const userId = req.user._id;
  const { memberId, role } = req.body
  if (!projectId) {
    throw new ApiError(400, "provide a valid project id")
  }
  if (!userId) {
    throw new ApiError(400, "login first")
  }




  try {
    const projectMember = await ProjectMember.findOne({ projects: projectId })

    if (!projectMember) {
      throw new ApiError(403, "You are not a member of this projects")
    }

    const memberToUpdate = await ProjectMember.findOne({
      user: memberId,
      projects: projectId
    })

    if (!memberToUpdate) {
      throw new ApiError(404, "member is not a part of the projects")
    }

    // Prevent changing another admin's role
    if (memberToUpdate.role === UserRolesEnum.ADMIN) {
      throw new ApiError(403, "You cannot change the role of an admin!");
    }

    memberToUpdate.role = role;
    await memberToUpdate.save();

    return res
      .status(200)
      .json(new ApiResponse(200, memberToUpdate, "Project member role updated successfully!"));


  } catch (error) {
    throw new ApiError(500, "Error cannot update the member of an projects!");

  }

});
const deleteMember = asyncHandler(async (req, res) => {
  const { projectId } = req.params
  const { memberId } = req.body;
  try {

    const project = await Project.findById(projectId)

     // prevent removing the project creator
     if (project.createdBy.equals(memberId)) {
      throw new ApiError(400, "Project creator cannot be removed from the project");
    }
    
    const member = await ProjectMember.findOne({
      user:memberId,
      projects:projectId
    })

    if (!member) {
      throw new ApiError(404, "You are not a member of the projects")
    }

    await ProjectMember.findByIdAndDelete(member._id);


    return res.status(200).json(
      new ApiResponse(200, null, "Member removed from project successfully" )
    )

   

  } catch (error) {
    throw new ApiError(500, "Internal server error while removing member from project");
  }

});


export {
  createProject,
  getProject,
  getProjectById,
  updateProject,
  deleteProject,
  addMemberToProject,
  getProjectMembers,
  updateProjectMembers,
  deleteMember
}




