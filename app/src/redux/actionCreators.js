import {
    ADD_USER,
    CHANGE_CURRENT_DAY, CHANGE_DAY,
    SET_DAY,
    SET_DIFFERENCE,
    SET_HISTORY,
    SET_IS_LOADED,
    SET_LEADERS,
    SET_POSITION,
    SORT_DAY, TOGGLE_MODAL, UPDATE_USER
} from "./actions";

export const setDayAC = (day) => ({type: SET_DAY, day})
export const setLeadersAC = () => ({type: SET_LEADERS})
export const sortDayAC = () => ({type: SORT_DAY})

export const setHistoryAC = () => ({type: SET_HISTORY})
export const setPositionAC = () => ({type: SET_POSITION})
export const setDifferenceAC = () => ({type: SET_DIFFERENCE})
export const changeCurrentDayAC = (direction) => ({type: CHANGE_CURRENT_DAY, direction})

export const addUserAC = (name, score) => ({type: ADD_USER, name, score})
export const updateUserAC = (id, name, score) => ({type: UPDATE_USER, id, name, score})

export const changeDayAC = (direction) => ({type: CHANGE_DAY, direction})
export const setIsLoadedAC = (isLoaded) => ({type: SET_IS_LOADED, isLoaded})
export const toggleModalAC = (isOpen, id) => ({type: TOGGLE_MODAL, isOpen, id})