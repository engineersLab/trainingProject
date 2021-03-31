class BusinessException extends Error {
    /**
     * @param {errorMessage} errorMessage
     */
    constructor(errorMessage) {
        super(errorMessage);
        this.statusCode = 400;
        this.errorMessage = errorMessage;
    }
}
module.exports.BusinessException = BusinessException;