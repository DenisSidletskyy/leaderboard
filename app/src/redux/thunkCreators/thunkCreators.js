import {getUsers, postUser} from "../../api";
import {
    addUserAC,
    changeCurrentDayAC, changeDayAC,
    setDayAC,
    setDifferenceAC,
    setHistoryAC,
    setIsLoadedAC,
    setLeadersAC,
    setPositionAC,
    sortDayAC, toggleModalAC, updateUserAC
} from "../actionCreators";

export const setDayTC = () => dispatch => {
    getUsers().then(day => {
        dispatch(setDayAC(day))
        dispatch(sortDayAC())
        dispatch(setPositionAC())
        dispatch(setLeadersAC())
    })
}

export const setNewDayTC = () => dispatch => {
    dispatch(setIsLoadedAC(false))
    getUsers().then(day => {
        dispatch(changeCurrentDayAC())
        dispatch(setDayAC(day))
        dispatch(sortDayAC())
        dispatch(setHistoryAC())
        dispatch(setPositionAC())
        dispatch(setDifferenceAC())
        dispatch(setLeadersAC())
        dispatch(setIsLoadedAC(true))
    })
}

export const addUserTC = (name, score) => dispatch => {
    dispatch(setIsLoadedAC(false))
    postUser(name).then(name => {
        dispatch(addUserAC(name, score))
        dispatch(sortDayAC())
        dispatch(setPositionAC())
        dispatch(setDifferenceAC())
        dispatch(setLeadersAC())
        dispatch(toggleModalAC(false))
        dispatch(setIsLoadedAC(true))
    })
}

export const updateUserTC = (id, name, score) => dispatch => {
    dispatch(setIsLoadedAC(false))
    postUser(name).then(name => {
        dispatch(updateUserAC(id, name, score))
        dispatch(sortDayAC())
        dispatch(setPositionAC())
        dispatch(setDifferenceAC())
        dispatch(setLeadersAC())
        dispatch(toggleModalAC(false))
        dispatch(setIsLoadedAC(true))
    })
}

export const changeDayTC = (direction) => dispatch => {
    dispatch(setIsLoadedAC(false))
    setTimeout(() => {
        dispatch(changeDayAC(direction))
        dispatch(setIsLoadedAC(true))
    }, 100)
}

export const toggleModalTC = (isOpen, id) => dispatch => {
    dispatch(toggleModalAC(isOpen, id))
}