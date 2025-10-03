export const isSavedByReqUser = (reqUserId, post) => {
    for(let user of post.saved) {
        if(user.id === reqUserId) return true
    }
    return false
}