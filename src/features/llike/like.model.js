

export class LikeModel {
    constructor(userID, postID){
        this.id = Math.floor(1000 + Math.random() * 9000)
        this.userID = userID
        this.postID = postID
    }

    static get(postID){
        const result = likes.filter( l => l.postID == postID )
        return result
    }

    static toggle(userID, postID){
        const index = likes.findIndex(l => l.userID == userID && l.postID == postID)
        if(index < 0){
            const newLike = new LikeModel(userID, postID)
            likes.push(newLike)
            return 'Post Liked'
        }

        likes.splice(index, 1)
        return 'Post not liked anymore'

    }
}

const likes = []