import { REGISTER_ERROR, PREREGISTER, REGISTER } from "../Types";
export const PreRegisterAction = (res) => async dispatch => {
    try {
        dispatch({
            type: PREREGISTER,
            payload: res
        })
    } catch (e) {
        dispatch({
            type: REGISTER_ERROR
        })
    }
}
export const RegisterAction = (res) => async dispatch => {
    try {
        dispatch({
            type: REGISTER,
            payload: res
        })
    } catch (e) {
        dispatch({
            type: REGISTER_ERROR
        })
    }
}