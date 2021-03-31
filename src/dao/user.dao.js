const AWS = require('aws-sdk')
const documentClient = new AWS.DynamoDB.DocumentClient()
const {SystemException} = require('../exceptions/system.exception')
const {DatabaseConstants} = require('../constants/databaseConstants')
const TableName = process.env.tableName
const { messageFormat, messages} = require('../utils/message.util')

module.exports.getUserDao = async (userId) =>{
    try{
        const params = {
            TableName,
            Key: {
                ID: userId,
            },
        }
        const data = await documentClient.get(params).promise()
        .then(res =>{
            console.log(DatabaseConstants.QUERY_RESULT, res)
        })
        .catch(err =>{
            throw err
        })
        return data.Item
    }catch (err){
        console.error(new SystemException(messageFormat(messages['WC5000E'],err)))
    }
}

module.exports.getAllUsersDao = async () =>{
    try{
        const params = {
            TableName
        }
        const data = await documentClient.scan(params).promise()
        .then(res =>{
            console.log(DatabaseConstants.QUERY_RESULT, res)
        })
        .catch(err =>{
            throw err
        })
        return data
    }catch (err){
        console.error(new SystemException(messageFormat(messages['WC5000E'],err)))
    }
}

module.exports.createUserDao = async (userData) =>{
    try{
        const scanParams = {
            TableName
        }
        const totalUsers = await documentClient.scan(scanParams).promise()
        .then(res =>{
            console.log(DatabaseConstants.QUERY_RESULT, res)
        })
        .catch(err =>{
            throw err
        })
    
        const userId = totalUsers.Count + 1
        userData.ID = userId.toString()
    
        const createParams = {
            TableName,
            Item: userData
        }
        await documentClient.put(createParams).promise()
        .then(res =>{
            console.log(DatabaseConstants.QUERY_RESULT, res)
        })
        .catch(err =>{
            throw err
        })
    
        return userData
    }catch (err){
        console.error(new SystemException(messageFormat(messages['WC5001E'],err)))
    }
}

module.exports.editUserDao = async (userData) =>{
    try{
        const params = {
            TableName,
            Key:{
                ID: userData.ID
            },
            UpdateExpression: DatabaseConstants.UPDATE_EXPRESSION,
            ExpressionAttributeValues:{
                ":n": data.userName,
                ":a": data.age,
            },
            ReturnValues: DatabaseConstants.UPDATED_NEW
        }
        await documentClient.update(params).promise()
        .then(res =>{
            console.log(DatabaseConstants.QUERY_RESULT, res)
        })
        .catch(err =>{
            throw err
        })

        return data
    }catch (err){
        console.error(new SystemException(messageFormat(messages['WC5002E'],err)))
    }
}

module.exports.deleteUserDao = async (userId) =>{
    try{
        const params = {
            TableName,
            Key: {
                ID: userId,
            },
        }
    
        const res = await documentClient.delete(params).promise()
        .then(res =>{
            console.log(DatabaseConstants.QUERY_RESULT, res)
        })
        .catch(err =>{
            throw err
        })
    
        return res
    }catch (err){
        console.error(new SystemException(messageFormat(messages['WC5003E'],err)))
    }
}