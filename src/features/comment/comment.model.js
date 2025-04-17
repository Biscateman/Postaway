
export class CommentModel {

    constructor(userID, postID, content){
        this.id = Math.floor(1000  + Math.random() * 9000)
        this.userID =  userID
        this.postID =  postID
        this.content = content
    }

    static get(postID){
        const comment = comments.filter(c => c.postID == postID)
        return comment
    }

    static add(userID, postID, content){
        const comment = new CommentModel(userID, postID, content)
        comments.push(comment)
        return comment
    }

    static delete(id){
        const index = comments.findIndex( c => c.id == id)

        if(index < 0){
            return false
        }else{
            comments.splice(index, 1)
            return true
        }
    }

    static update(id, content){
        const comment = comments.find(c => c.id == id)

        if(!comment){
            return false
        }

        comment.content =  content
        return comment
    }

}

const comments = []