import {
    ADD_USER,
    CHANGE_POSITION,
    CHANGE_USER,
    FORMAT_USERS,
    OPEN_MODAL,
    SET_POSITION,
    SET_USERS,
    SORT_USERS
} from "./actions";

export const setUsersAC = (users) => ({type: SET_USERS, users})
export const sortUsersAC = () => ({type: SORT_USERS})
export const formatUserAC = () => ({type: FORMAT_USERS})
export const addUserAC = (user) => ({type: ADD_USER, user})
export const setPositionAC = () => ({type: SET_POSITION})
export const changePositionAC = () => ({type: CHANGE_POSITION})
export const changeUserAC = (id, name, score) => ({type: CHANGE_USER, id, name, score})
export const toggleModalAC = (isOpen, id) => ({type: OPEN_MODAL, isOpen, id})