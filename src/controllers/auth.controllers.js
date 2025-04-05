import {asyncHandler} from "../utils/async-handler"

const registerUser = asyncHandler( async(req, res)=> {
    const {emai, username, passsword, role} = req.body;

 
    // Validation
    registerValidation(body)

})

export {registerUser}