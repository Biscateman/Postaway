import jwt from 'jsonwebtoken'

const jwtAuth = (req, res, next) => {

    const token = req.cookies.jwtToken

    if(!token){
        return res.status(401).send('Unauthorized')
    }

    try{
        
        const payload = jwt.verify(token,'OKp0YltB8nrJnD5J6B3ks5n5t89vdJcA')
        req.userID = payload.userID

    }catch(err){
        console.log(err)
        return res.status(401).send('Unauthorized')
    }
    
    next()
}

export default jwtAuth