

export class PostModel{
    constructor(userID, caption, imageUrl){
        this.id = Math.floor(1000 + Math.random() * 9000)
        this.userID = userID,
        this.caption = caption,
        this.imageUrl = imageUrl
    }

    static add(userID, caption, imageUrl){
        const post = new PostModel(userID, caption, imageUrl)
        posts.push(post)
        return post
    }

    static get(userID){
        const result = posts.filter(p => p.userID == userID)
        return result
    }

    static getByID(postID){
        const result = posts.find(p => p.id == postID)
        return result
    }

    static delete(postID){
        const index = posts.findIndex(p => p.id == postID)
        if(index < 0){
            return false
        }else{
            posts.splice(index, 1)
            return true
        }
    }

    static update(postID, caption, imageUrl){
        const post = posts.find(p => p.id == postID)

        if(!post){
            return false
        }

        if(imageUrl != ''){
            post.imageUrl = imageUrl
        }
        if(caption){
            post.caption = caption
        }
        return post
    }

    static checkPost(postID){
        const post = posts.find( p => p.id == postID)
        if(!post){
            return false
        }

        return true
    }

}

const posts = []