import instanse from "../../Axios/Config";
import {
    GetProfileDataForEdit,
    changePhoto, changeProfilePhotoMenu, reset
} from "../Types";
export const GetProfileDataAction = (ID) => async dispatch => {
    try {
        const ProfileData = await instanse.get(`/User/${ID}`)
        if (ProfileData.data.success) {
            dispatch({
                type: GetProfileDataForEdit,
                payload: ProfileData.data.userData.Info
            })
        }
    } catch (error) {

    }
}
export const changeProfilePhoto = (photoLink, ID) => async dispatch => {
    try {
        const updatePhoto = await instanse.put(`/User/UpdatePhoto`, { photo: photoLink })
        const ProfileData = await instanse.get(`/User/${ID}`)
        if (updatePhoto.data.success && ProfileData.data.success) {
            dispatch({
                type: changePhoto,
                payload: ProfileData.data.userData.Info
            })
        }
    } catch (error) {

    }
}
export const ProfilePhotoMenuAction = () => async dispatch => {
    dispatch({
        type: changeProfilePhotoMenu,
    })
}
export const UpdateData = (form) => async dispatch => {
    try {
        await instanse.put('/User/updateData', form)
    } catch (error) {
    }
}
export const ResetEditAppSlice = () => async dispatch => {
    dispatch({
        type: reset
    })
}