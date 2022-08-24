import {Leaders} from "./leaders/Leaders";
import {Table} from "./table/Table";
import {useDispatch, useSelector} from "react-redux";
import {Modal} from "../modal";
import {useEffect} from "react";
import {getUsers} from "../../api";
import {
    formatUserAC,
    setCurrentUsersAC,
    setGlobalLeadersAC,
    setIsLoaded,
    setPositionAC,
    setUsersAC,
    sortUsersAC
} from "../../redux/actionCreators";

export const Board = () => {

    const dispatch = useDispatch()

    const state = useSelector(state => state)

    useEffect(() => {
        dispatch(setIsLoaded(false))
        getUsers().then(data => {
            dispatch(setUsersAC(data))
            dispatch(setCurrentUsersAC())
            dispatch(sortUsersAC())
            dispatch(formatUserAC())
            dispatch(setPositionAC())
            dispatch(setGlobalLeadersAC())
            dispatch(setIsLoaded(true))
        })
    }, [])

    if (!state.users) {
        return null
    }

    return (
        <>
            <Modal/>

            <Leaders globalLeaders={state.globalLeaders}/>

            <Table users={state.users[state.currentUsersIndex]}
                   usersLength={state.users.length}
                   currentUsersIndex={state.currentUsersIndex}/>
        </>
    )
}