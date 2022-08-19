import {Leaders} from "./leaders/Leaders";
import {useUsers} from "../../hooks/hooks";

export const Board = () => {

    const users = useUsers()

    return (
        <>
            {users ? <Leaders users={users}/> : <span>loader</span>}
        </>
    )
}