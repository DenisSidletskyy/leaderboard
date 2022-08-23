import {Leaders} from "./leaders/Leaders";
import {useModal, useUsers} from "../../hooks/hooks";
import {Table} from "./table/Table";
import {useSelector} from "react-redux";

export const Board = () => {

    const users = useUsers()

    const modal = useSelector(state => state.modal)

    if (!users) {
        return (
            <>
                <span>LOADER</span>
            </>
        )
    }

    return (
        <>
            {/*{modal.isOpen && <Modal prevUserData={modal.prevUserData}/>}*/}
            <Leaders users={users}/>
            <Table users={users}/>
        </>
    )

}