import instanse from "../../Axios/Config";
import {
  GetProfileData,
  profileSettingsMenu,
  followingList,
  followersList,
  threeDotsMenu,
  UserProfile,
  changePhoto,
  reset,
  changeProfilePhotoMenu,
  FollowSendRequest,
  reloadRelationShip,
  ProfileLoading,
} from "../Types";

export const GetProfileDataAction = (ID) => async (dispatch) => {
  console.log("get profile data", ID);
  try {
    const ProfileData = await instanse.get(`/User/${ID}`);
    if (ProfileData.data.success) {
      dispatch({
        type: GetProfileData,
        payload: ProfileData.data.userData,
      });
      dispatch({ type: ProfileLoading, payload: false });
    }
  } catch (error) {}
};
export const changeProfilePhoto = (photoLink, ID) => async (dispatch) => {
  try {
    const updatePhoto = await instanse.put(`/User/UpdatePhoto`, {
      photo: photoLink,
    });
    const ProfileData = await instanse.get(`/User/${ID}`);
    if (updatePhoto.data.success && ProfileData.data.success) {
      dispatch({
        type: changePhoto,
        payload: ProfileData.data.userData.Info,
      });
    }
  } catch (error) {}
};
export const MyProfile = (Bool) => async (dispatch) => {
  dispatch({
    type: UserProfile,
    payload: Bool,
  });
};
export const ThreeDotsMenuAction = () => async (dispatch) => {
  dispatch({
    type: threeDotsMenu,
  });
};
export const ProfilePhotoMenuAction = () => async (dispatch) => {
  dispatch({
    type: changeProfilePhotoMenu,
  });
};
export const SettingsMenuAction = () => async (dispatch) => {
  dispatch({
    type: profileSettingsMenu,
  });
};
export const FollowingListAction = () => async (dispatch) => {
  dispatch({
    type: followingList,
  });
};
export const FollowersListAction = () => async (dispatch) => {
  dispatch({
    type: followersList,
  });
};
export const FollowSendRequestAction = (ID) => async (dispatch) => {
  try {
    const requestResponse = await instanse.post(
      `/actions/FollowUnfollow/${ID}`
    );
    if (requestResponse.data.success) {
      dispatch({
        type: FollowSendRequest,
        payload: requestResponse.data.RelationShip,
      });
    }
  } catch (error) {}
};
export const ReloadRelationShip = (ID) => async (dispatch) => {
  try {
    const ProfileData = await instanse.get(`/User/${ID}`);
    dispatch({
      type: reloadRelationShip,
      payload: ProfileData.data.userData.RelationShip,
    });
  } catch (error) {}
};
/// loading actions
export const ProfileDataBufferOn = () => async (dispatch) => {
  dispatch({
    type: ProfileLoading,
    payload: true,
  });
};
export const ProfileDataBufferOff = () => async (dispatch) => {
  dispatch({
    type: ProfileLoading,
    payload: false,
  });
};
export const ResetProfileSlice = () => async (dispatch) => {
  dispatch({
    type: reset,
  });
};
