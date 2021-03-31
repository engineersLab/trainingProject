const Responses = require('../responses/api_responses')
const {
        getUserService,getAllUsersService,
        createUserService,editUserService,deleteUserService
    } = require('../services/user.service')
const {ErrorConstants} = require('../constants/error.constants')

module.exports.getUser = async (event) => {
    try{
        let getUserEvent = event
        const user = await getUserService(getUserEvent)
        console.log("Event", event)
        if(user){
            return Responses._200({user})
        }else{
            return Responses._400({Error: ErrorConstants.GET_USER_ERROR})
        }
        
    }catch (err) {
        console.log(ErrorConstants.GET_USER_ERROR_API,err)
    }
}

module.exports.getAllUsers = async () => {
    try{
        const user = await getAllUsersService()

        if(user){
            return Responses._200({user})
        }else{
            return Responses._400({Error: ErrorConstants.GET_ALL_USERS_ERROR})
        }
    }catch (err) {
        console.log(ErrorConstants.GET_ALL_USERS_ERROR_API,err)
    }
}

module.exports.createUser = async (event) =>{
    try{
        let createUserEvent = event
        const newUser = await createUserService(createUserEvent)

        if(user){
            return Responses._200({newUser})
        }else{
            return Responses._400({Error: ErrorConstants.CREATE_USER_ERROR})
        }

    }catch (err) {
        console.log(ErrorConstants.CREATE_USER_ERROR_API,err)
    }
}

module.exports.editUser = async (event) =>{
    try{
        let editUserEvent = event

        const user = await editUserService(editUserEvent)

        if(user){
            return Responses._200({user})
        }else{
            return Responses._400({Error: ErrorConstants.UPDATE_USER_ERROR})
        }

    }catch (err){
        console.log(ErrorConstants.UPDATE_USER_ERROR_API,err)
    }
}

module.exports.deleteUser = async (event) =>{
    try{
        
        let deleteuserEvent = event

        const user = await deleteUserService(deleteuserEvent)

        if(user){
            return Responses._200({user})
        }else{
            return Responses._400({Error: ErrorConstants.DELETE_USER_ERROR})
        }

    }catch (err){
        console.log(ErrorConstants.DELETE_USER_ERROR_API,err)
    }
}