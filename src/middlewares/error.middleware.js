export class ApplicationError extends Error{
    constructor(code, message){
        super(message)
        this.code = code
    }
}

export const serverError = (err, req, res, next) => {

    if(err instanceof ApplicationError){
         res.status(err.code).send(err.message)
    }
    else{
        console.log(err)
        res.status(500).send('Oops!, Something went wrong, please try later!')
    }

}