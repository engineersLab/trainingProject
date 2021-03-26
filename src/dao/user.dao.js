const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient()
const TableName = process.env.tableName

module.exports.getUserDao = async (ID) =>{
 
    const params = {
        TableName,
        Key: {
            ID,
        },
    }
    const data = await documentClient.get(params).promise().catch(err=>{
        return ("No id",err)
    })

    return data.Item
}

module.exports.getAllUsersDao = async () =>{

    const params = {
        TableName
    }
    const data = await documentClient.scan(params).promise().catch(err=>{
        return ("No id",err)
    })
    console.log("Data",data)
    return data
}

module.exports.createUserDao = async (userData) =>{
   
    const scanParams = {
        TableName
    }
    const idData = await documentClient.scan(scanParams).promise().catch(err=>{
        return ("No id",err)
    })

    const ID = idData.Count + 1
    userData.ID = ID.toString()

    const createParams = {
        TableName,
        Item: userData
    }
    await documentClient.put(createParams).promise().catch(err=>{
        return ("Error in creating data in table",err)
    })

    return userData
}

module.exports.editUserDao = async (data) =>{

    const params = {
        TableName,
        Key:{
            ID: data.ID
        },
        UpdateExpression: "set userName=:n, age=:a",
        ExpressionAttributeValues:{
            ":n": data.userName,
            ":a": data.age,
        },
        ReturnValues:"UPDATED_NEW"
    }
    console.log("Params", params)
    await documentClient.update(params).promise().then(res =>{
        console.log("Res", res)
    }).catch(err =>{
        console.log("Error in dao",err)
    })

    return data
}

module.exports.deleteUserDao = async (ID) =>{

    const params = {
        TableName,
        Key: {
            ID,
        },
    }

    const res = await documentClient.delete(params).promise()

    return res
}