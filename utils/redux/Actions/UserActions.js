import instanse from '../../Axios/Config'
import { LOGIN, LOGIN_ERROR, LOGOUT, UPDATEDATA } from '../Types'

export const LoginAction = (res) => async dispatch => {
    try {
        dispatch({
            type: LOGIN,
            payload: res,
            Paramaters: { logged: true }
        })
    } catch (e) {
        dispatch({
            type: LOGIN_ERROR
        })
    }
}
export const UpdateNavUserData = (ID) => async dispatch => {
    try {
        console.log('update Nav info');
        const data = await instanse.get('/User/NavInfo')
        dispatch({
            type: UPDATEDATA,
            payload: data.data.data,
            Paramaters: { logged: true }
        })
    } catch (error) {
        dispatch({
            type: LOGIN_ERROR
        })
    }
}
export const LogoutAction = () => dispatch => {
    dispatch({
        type: LOGOUT,
        payload: '',
        Parameters: { logged: false }
    })
}
