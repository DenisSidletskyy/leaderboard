import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUsers, setUser} from "../api";
import {
    addUserAC,
    changePositionAC,
    changeUserAC,
    formatUserAC, toggleModalAC,
    setPositionAC,
    setUsersAC,
    sortUsersAC
} from "../redux/actionCreators";

export const useUsers = () => {

    const dispatch = useDispatch()

    const users = useSelector(state => state.users)

    useEffect(() => {
        getUsers().then(users => {
            dispatch(setUsersAC(users))
            dispatch(sortUsersAC())
            dispatch(formatUserAC())
            dispatch(setPositionAC())
        })
    }, [])

    return users
}

export const useAddUser = (name, score) => {

    const dispatch = useDispatch()

    setUser(name).then(name => {
        dispatch(addUserAC({name: name, score: score}))
        dispatch(sortUsersAC())
        dispatch(changePositionAC())
    })
}

export const useChangeUser = ({name, score, id}) => {

    const dispatch = useDispatch()

    setUser(name).then(name => {
        dispatch(changeUserAC(id, name, score))
        dispatch(sortUsersAC())
        dispatch(changePositionAC())
    })
}

export const useModal = (isOpen, id) => {

    const dispatch = useDispatch()

    dispatch(toggleModalAC(isOpen, id))
}