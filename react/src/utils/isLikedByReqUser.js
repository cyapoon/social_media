export const isLikedByReqUser = (reqUserId, post) => {
    for(let user of post.liked) {
        if(user.id === reqUserId) return true
    }
    return false
}