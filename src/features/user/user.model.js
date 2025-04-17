
export class UserModel {
    constructor(name,email,password){
        this.id = Math.floor(1000 + Math.random() * 9000)
        this.name = name
        this.email = email
        this.password = password
    }

    static getAll(){
        return users
    }

    static add(user){
        const newUser = new UserModel(user.name, user.email, user.password)
        users.push(newUser)
        return newUser
    }

    static confirmLogin(email, password){
        const user = users.find(u => u.email == email && u.password == password)
        return user
    }
}


const users = [
    new UserModel('Vamshi', 'vamshi@gmail.com', 'Password'),
    new UserModel('Krishna', 'krishna@gmail.com', 'passworD')
]