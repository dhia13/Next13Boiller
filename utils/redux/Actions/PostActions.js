import instanse from "../../Axios/Config";
import {
    GetPostData,
    AddComment,
    LikeUnlikePost,
    LikeUnlikeComment,
    SaveUnsavePost,
    NotAuthorized,
    reset
} from "../Types";

export const FetchPostData = (ID, CommentsNumber) => async dispatch => {
    try {
        const ProfileData = await instanse.get(`/posts/${ID}?comments=${CommentsNumber}`)
        if (ProfileData.data.success) {
            dispatch({
                type: GetPostData,
                payload: ProfileData.data.PostData
            })
        }
    } catch (error) {
        dispatch({
            type: NotAuthorized
        })
    }
}
export const NewComment = (ID, text, CommentsNumber) => async dispatch => {
    try {
        await instanse.post(`/comments/${ID}`, { text })
        const ProfileData = await instanse.get(`/posts/${ID}?comments=${CommentsNumber}`)
        dispatch({
            type: AddComment,
            payload: ProfileData.data.PostData.Comments
        })
    } catch (error) {
        dispatch({
            type: NotAuthorized
        })
    }
}
export const LikePost = (ID) => async dispatch => {
    try {
        await instanse.put(`/posts/like/${ID}`)
        const ProfileData = await instanse.get(`/posts/${ID}`)
        dispatch({
            type: LikeUnlikePost,
            payload: ProfileData.data.PostData.Like
        })
    } catch (error) {
        dispatch({
            type: NotAuthorized
        })
    }
}
export const SavePost = (ID) => async dispatch => {
    try {
        await instanse.put(`/posts/save/${ID}`)
        const ProfileData = await instanse.get(`/posts/${ID}`)
        dispatch({
            type: SaveUnsavePost,
            payload: ProfileData.data.PostData.Like
        })
    } catch (error) {
        dispatch({
            type: NotAuthorized
        })
    }
}
export const LikeComment = (PostID, CommentID) => async dispatch => {
    try {
        await instanse.put(`/comments/like/${CommentID}`)
        const ProfileData = await instanse.get(`/posts/${PostID}`)
        dispatch({
            type: LikeUnlikeComment,
            payload: ProfileData.data.PostData.Comments
        })
    } catch (error) {
        dispatch({
            type: NotAuthorized
        })
    }
}

export const ReloadPostRelationShip = (ID) => async dispatch => {
    try {
        const ProfileData = await instanse.get(`/posts/${ID}`)
        if (ProfileData.data.success) {
            dispatch({
                type: GetPostData,
                payload: ProfileData.data.PostData
            })
        }
    } catch (error) {
        dispatch({
            type: NotAuthorized
        })
    }
}
export const ResetPostSlice = () => async dispatch => {
    dispatch({
        type: reset
    })
}