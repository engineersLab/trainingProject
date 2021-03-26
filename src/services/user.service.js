const {getUserDao, getAllUsersDao, createUserDao, editUserDao, deleteUserDao} = require('../dao/user.dao')

module.exports.getUserService = async (ID) =>{
    let userId = ID
    const user = await getUserDao(userId).catch(err =>{
        throw Error("Error in getUserService",err)
    })

    return user
}

module.exports.getAllUsersService = async () =>{
    const user = await getAllUsersDao().catch(err =>{
        throw Error("Error in getAllUsersService",err)
    })

    return user
}

module.exports.createUserService = async (data) =>{
    
    let userData = data
    const newUser = await createUserDao(userData).catch(err =>{
        throw Error("Error in createUserService",err)
    })

    return newUser
}

module.exports.editUserService = async (data) =>{

    let userData = data
    const user = await editUserDao(userData).catch(err =>{
        throw Error("Error in editUserService",err)
    })

    return user
}

module.exports.deleteUserService = async (ID) =>{

    let userID = ID
    const user  = await deleteUserDao(userID).catch(err =>{
        throw Error("Error in deleteUserService",err)
    })

    return user
}