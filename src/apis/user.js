const Responses = require('../constants/api_responses')
const {
        getUserService,getAllUsersService,
        createUserService,editUserService,deleteUserService
    } = require('../services/user.service')
    
module.exports.getUser = async (event) => {
    console.log("event", event.pathParameters)
    try{
        if(!event.pathParameters || !event.pathParameters.ID){
            return Responses._400({message: 'Missing the parameter ID'})
        }

        let ID = event.pathParameters.ID
        const user = await getUserService(ID).catch(err =>{
            throw Error("Error in getUserAPi",err)
        })

        return Responses._200({user})
    }catch (err) {
        console.log('Error in user API',err)
    }
}

module.exports.getAllUsers = async (event) => {
    try{
        const user = await getAllUsersService().catch(err =>{
            throw Error("Error in getAllUsersApi",err)
        })

        return Responses._200({user})
    }catch (err) {
        console.log('Error in user API',err)
    }
}

module.exports.createUser = async (event) =>{
    try{
        if(event.body.length == 0){
            return Responses._400({message: 'No body'})
        }
        const userData = JSON.parse(event.body)

        const newUser = await createUserService(userData).catch(err =>{
            throw Error("Error in createUser", err)
        })

        return Responses._200({newUser})

    }catch (err) {
        console.log("Error in createUserApi",err)
    }
}

module.exports.editUser = async (event) =>{
    try{
        const userData = JSON.parse(event.body)

        const user = await editUserService(userData).catch(err =>{
            throw Error("Error in editUser", err)
        })

        return Responses._200({user})

    }catch (err){
        console.log("Error in editUserApi",err)
    }
}

module.exports.deleteUser = async (event) =>{
    try{
        if(!event.pathParameters || !event.pathParameters.ID){
            return Responses._400({message: 'Missing the parameter ID'})
        }

        let ID  = event.pathParameters.ID

        const user = await deleteUserService(ID).catch(err =>{
            throw Error("Error in deleteUser", err)
        })

        return Responses._200({user})

    }catch (err){
        console.log('Error in deleteUser API',err)
    }
}