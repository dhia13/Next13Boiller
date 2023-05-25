import instanse from "../../Axios/Config";

import { GetFeedPosts, LikePostInFeed, SavedPostInFeed, reset } from '../Types'

export const GetFeed = () => async dispatch => {
    try {
        console.log('feed action');
        const Feed = await instanse.get('/posts')
        console.log(Feed)
        dispatch({
            type: GetFeedPosts,
            payload: Feed.data
        })
    } catch (error) {

    }
}
export const LikePost = (PostID) => async dispatch => {
    await instanse.put(`/posts/like/${PostID}`)
    const ProfileData = await instanse.get(`/posts/${PostID}`)
    dispatch({
        type: LikePostInFeed,
        payload: ProfileData.data.PostData.Like,
        PostID: PostID
    })
}
export const SavePost = (PostID) => async dispatch => {
    await instanse.put(`/posts/save/${PostID}`)
    dispatch({
        type: SavedPostInFeed,
        payload: PostID
    })
}
export const ResetHomeSlice = () => async dispatch => {
    dispatch({
        type: reset
    })
}