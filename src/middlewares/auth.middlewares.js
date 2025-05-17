import { User } from "../models/user.models";
import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/async-handler";
import jwt from "jsonwebtoken"

import { ProjectMember } from "../models/projectmember.models"

import mongoose from "mongoose";


export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.headers("Authorization")?.replace("Bearer ", "")

    if (!token) {
        throw new ApiError(401, "Unauthorized req")
    }
    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken -emailVerificationToken -emailVerificationExpiry -refreshTokenExpiry")

        if (!user) {
            throw new ApiError(401, "Invalid access token")
        }

        req.user = user

        next()


    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid access token in auth middle")
    }

})

export const validateProjectPermission = (roles = []) =>

    asyncHandler(async (req, res, next) => {
        const { projectId } = req.params;
        if (!projectId) {
            throw new ApiError(401, "Invalid project id in ")
        }
        const project = await ProjectMember.findOne({
            project: mongoose.Types.ObjectId(projectId),
            user: mongoose.Types.ObjectId(req.user._id)
        })

        if(!project){
            throw new ApiError(401, "Project not found");
        }


        const givenRole = project?.role
        req.user.role = givenRole

        if(!roles.includes(givenRole)){
            throw new ApiError(403, "You do not have permission to perform this action")
        }
        next();
        


    })

