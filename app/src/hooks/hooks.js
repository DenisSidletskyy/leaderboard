import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getUsers} from "../api";
import {formatUserAC, setPositionAC, setUsersAC, sortUsersAC} from "../redux/actionCreators";

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