class AppError extends Error {
    constructor (message, statusCode) {
        super(message) //calling the constructor of Error
        this.statusCode = statusCode
    }
}
module.exports=AppError