const messages = require('../assets/messages.json')

/**
 * messageFormat
 * @return {String} mainString
 */

function messageFormat(){
    const n = arguments.length
    let mainString = String(arguments[0])
    for (let i=1; i<n; i++){
        const regex = `{${i-1}}`
        let replaceString = null
        if(arguments[i] instanceof Error){
            replaceString = String(arguments[i])
        } else if(typeof (arguments[i] == 'object')) {
            replaceString = JSON.stringify(arguments[i])
        } else{
            replaceString = String(arguments[i])
        }
        mainString = mainString.replace(regex, replaceString)
    }
    return mainString
}

module.exports.messages = messages
module.exports.messageFormat = messageFormat