import instanse from "../../Axios/Config";
import {
  toggleUnfollowMenu,
  getUnfollowInfo,
  reloadOff,
  ReloadRelationship,
  reset,
} from "../Types";

export const ToggleUnfollowMenu = (ID) => async (dispatch) => {
  dispatch({
    type: toggleUnfollowMenu,
    payload: "",
  });
};
export const GetUnfollowInfo = (ID) => async (dispatch) => {
  const ProfileData = await instanse.get(`/User/${ID}`);
  const Info = ProfileData.data.userData.Info;
  const Data = {
    photo: Info.photo,
    accountType: Info.accountType,
    userName: Info.userName,
    userId: Info.userId,
  };
  dispatch({
    type: getUnfollowInfo,
    payload: Data,
  });
};
export const UnfollowAction = (ID) => async (dispatch) => {
  try {
    const requestResponse = await instanse.post(
      `/actions/FollowUnfollow/${ID}`
    );
    if (requestResponse.data.success) {
      dispatch({
        type: ReloadRelationship,
      });
    }
  } catch (error) {}
};
export const ReloadRelationShip = () => async (dispatch) => {
  dispatch({
    type: ReloadRelationship,
  });
};
export const ReloadOff = () => async (dispatch) => {
  dispatch({
    type: reloadOff,
  });
};
export const ResetAppSlice = () => async (dispatch) => {
  dispatch({
    type: reset,
  });
};
