const {getUserDao, getAllUsersDao, createUserDao, editUserDao, deleteUserDao} = require('../dao/user.dao')
const {BusinessException} = require('../exceptions/business.exception')
const { messageFormat, messages} = require('../utils/message.util')
const {ErrorConstants} = require('../constants/error.constants')


module.exports.getUserService = async (getUserEvent) =>{
    try{
        if(!getUserEvent.pathParameters || !getUserEvent.pathParameters.ID){
            return Responses._400({message: ErrorConstants.ID_MISSING})
        }
        let userId = getUserEvent.pathParameters.ID
        const user = await getUserDao(userId)

        return user
    }catch (err){
        console.log(new BusinessException(messageFormat(messages['WC5005E'],err)))
    }
}

module.exports.getAllUsersService = async () =>{
    try{
        const user = await getAllUsersDao()

        return user
    }catch (err){
        console.log(new BusinessException(messageFormat(messages['WC5006E'],err)))
    }
}

module.exports.createUserService = async (createUserEvent) =>{
    try{
        if(!createUserEvent.body){
            return Responses._400({message: 'No body'})
        }
        const userData = JSON.parse(createUserEvent.body)
        const newUser = await createUserDao(userData)

        return newUser
    }catch (err){
        console.log(new BusinessException(messageFormat(messages['WC5007E'],err)))
    }
}

module.exports.editUserService = async (editUserEvent) =>{
    try{
        if(!editUserEvent.body){
            return Responses._400({message: 'No body'})
        }

        const userData = JSON.parse(editUserEvent.body)

        const user = await editUserDao(userData)

        return user
    }catch (err){
        console.log(new BusinessException(messageFormat(messages['WC5008E'],err)))
    }
}

module.exports.deleteUserService = async (deleteUserEvent) =>{
    try{
        if(!deleteUserEvent.pathParameters || !deleteUserEvent.pathParameters.ID){
            return Responses._400({message: ErrorConstants.ID_MISSING})
        }

        let userId  = deleteUserEvent.pathParameters.ID
        const user  = await deleteUserDao(userId)

        return user
    }catch (err){
        console.log(new BusinessException(messageFormat(messages['WC5009E'],err)))
    }
}