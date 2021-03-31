class SystemException extends Error {
    /**
     * @param {errorMessage} errorMessage
     */
    constructor(errorMessage) {
        super(errorMessage);
        this.statusCode = 500;
        this.errorMessage = errorMessage;
    }
}
module.exports.SystemException = SystemException;