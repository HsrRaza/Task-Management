import { asyncHandler } from "../utils/async-handler.js"
import {User} from "../models/user.models.js"
import { sendMail, emailVerificationMailGenContent, forgotPasswordMailGenContent } from "../utils/mail.js"

import { ApiResponse } from "../utils/api-response.js"
import { ApiError } from "../utils/ApiError.js"
import crypto from "crypto"
import jwt from "jsonwebtoken"

import dotenv from "dotenv"
dotenv.config();


const registerUser = asyncHandler(async (req, res) => {
    const { email, username, passsword, role } = req.body;

    // Validation


    try {

        // finding an existing user

        const existingUser = await User.findOne(email);


        if (existingUser) {
            throw new ApiError(404, "User Already Existed")
        };


        // all fields must be filled

        if (!email || !username || !passsword || !role) {
            throw new ApiError(400, "All fields required");

        }


        // creating a new User
        const newUser = User.create({
            username,
            email,
            passsword,
            role,

        });

        // check user created or not
        if (!newUser) {
            throw new ApiError(500, "User Creation Error")
        }
        

        // generate email verification token

        const {hashedToken, unHashedToken, tokenExpiry } = await newUser.generateTemporaryToken()

         newUser.emailVerificationToken = hashedToken;
         newUser.emailVerificationExpiry = tokenExpiry;


         await newUser.save({
            validateBeforeSave: false
         });

         // verify Email URl
         const verificationUrl = `${process.env.BASE_URL}/verify-email?token=${unHashedToken}`

         // generating mail 
         const  mailGenContent = emailVerificationMailGenContent(newUser.fullname,  verificationUrl);

         try {
            await sendMail({
                email:newUser.email,
                subject: "Verify Your Email",
                mailGenContent

            });
            new ApiResponse(200, {
                user: {
                    _id:newUser._id,
                    name:newUser.username,
                    email:newUser.email,
                    role:newUser.role
                }
            }, "user registered successfully . Please Check your email to verify your acccount ");

                
         } catch (error) {
            throw new ApiError(500, "Error while sending email ", error)
         }




    } catch (error) {
throw new ApiError(500, "User cannot registered something went wrong ")
    }




    // Validation
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, passsword, role } = req.body;

   try {
    const findUser = await User.findOne({email})

    if(!findUser){
        throw new ApiError(404, "User doesn't existed ")
    }
    
    
   } catch (error) {
    
   }


    // Validation
})
const logoutUser = asyncHandler(async (req, res) => {
    const { emai, username, passsword, role } = req.body;


    // Validation
})
const verifyEmail = asyncHandler(async (req, res) => {
    const { emai, username, passsword, role } = req.body;


    // Validation
})
const resendVerificationEmail = asyncHandler(async (req, res) => {
    const { emai, username, passsword, role } = req.body;


    // Validation
})
const refreshAcessToken = asyncHandler(async (req, res) => {
    const { emai, username, passsword, role } = req.body;


    // Validation
})
const forgetPasswordRequest = asyncHandler(async (req, res) => {
    const { emai, username, passsword, role } = req.body;


    // Validation
})
const changeCureentPassword = asyncHandler(async (req, res) => {
    const { emai, username, passsword, role } = req.body;


    // Validation
})
const getCurrentUser = asyncHandler(async (req, res) => {
    const { emai, username, passsword, role } = req.body;


    // Validation
})



export { registerUser }