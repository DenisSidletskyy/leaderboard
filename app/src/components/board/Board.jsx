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
    setPositionAC,
    setUsersAC,
    sortUsersAC
} from "../../redux/actionCreators";

export const Board = () => {

    const dispatch = useDispatch()

    const state = useSelector(state => state)

    useEffect(() => {
        getUsers().then(data => {
            dispatch(setUsersAC(data))
            dispatch(setCurrentUsersAC())
            dispatch(sortUsersAC())
            dispatch(formatUserAC())
            dispatch(setPositionAC())
            dispatch(setGlobalLeadersAC())
        })
    }, [])

    if (!state.users) {
        return <span>LOADER</span>
    }

    return (
        <>
            {state.modal.isOpen ? <Modal prevUserData={state.modal.prevUserData}/> : null}

            <Leaders globalLeaders={state.globalLeaders}/>

            <Table
                users={state.users[state.currentUsersIndex]}
                usersLength={state.users.length}
                currentUsersIndex={state.currentUsersIndex}
            />
        </>
    )

}