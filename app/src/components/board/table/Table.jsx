import s from './Table.module.sass'
import {ReactComponent as Edit} from "images/edit.svg";
import avatar from 'images/avatars/avatar1.svg'
import Button from "../../button/Button";
import {useDispatch} from "react-redux";
import {
    changeCurrentUsersAC,
    formatUserAC,
    setCurrentUsersAC, setGlobalLeadersAC,
    setPositionAC,
    setUsersAC,
    sortUsersAC,
    toggleModalAC
} from "../../../redux/actionCreators";
import {getUsers} from "../../../api";

const User = ({user}) => {

    const dispatch = useDispatch()

    const openModal = (isOpen, id) => {
        dispatch(toggleModalAC(isOpen, id))
    }

    return (
        <div className={s.user}>
            <div className={s.left}>
                <span className={s.position}>
                    {[1, 2, 3].includes(user.position.curr)
                        ? `${user.position.curr}rd`
                        : `${user.position.curr}th`
                    }
                </span>
                <img className={s.avatar} src={avatar} alt={'avatar'}/>
                <span className={s.score}>{user.score}</span>
                <span className={s.name}>{user.name}</span>
            </div>

            <div className={s.right}>
                <span className={`${s.difference} ${user.position.diff > 0 && s.plus} ${user.position.diff < 0 && s.minus}`}>
                    {
                        user.position.diff === null
                            ? 'No change'
                            : Math.abs(user.position.diff) === 1
                                ? Math.abs(user.position.diff) + ' place'
                                : Math.abs(user.position.diff) + ' places'
                    }
                </span>
                <Button
                    className={'edit'}
                    onClick={() => openModal(true, user.id)}
                >
                    <Edit/>
                </Button>
            </div>
        </div>
    )

}

export const Table = ({users, usersLength, currentUsersIndex}) => {

    const dispatch = useDispatch()

    const openModal = (isOpen) => {
        dispatch(toggleModalAC(isOpen))
    }

    const getNewUsers = () => {
        getUsers().then(data => {
            dispatch(setUsersAC(data))
            dispatch(setCurrentUsersAC())
            dispatch(sortUsersAC())
            dispatch(formatUserAC())
            dispatch(setPositionAC())
            dispatch(setGlobalLeadersAC())
        })
    }

    const changeUsers = (direction) => {
        dispatch(changeCurrentUsersAC(direction))
    }

    return (
        <div className={s.wrapper}>

            <div className={s.top}>
                <div className={s.description}>Leaders table for this period</div>

                <div className={s.navigation}>

                    <Button
                        className={'navigate'}
                        onClick={() => changeUsers(-1)}
                        disabled={currentUsersIndex === 0}
                    >
                        {'<<'}
                    </Button>

                    <Button
                        className={'navigate'}
                        onClick={() => changeUsers(1)}
                        disabled={currentUsersIndex === usersLength - 1}
                    >
                        {'>>'}
                    </Button>

                    <Button
                        className={'orangeWhite'}
                        onClick={() => getNewUsers()}
                    >
                        New day
                    </Button>

                    <Button
                        className={'blueWhite'}
                        onClick={() => openModal(true)}
                    >
                        Add new user
                    </Button>

                </div>
            </div>

            <div className={s.table}>
                {users.map(user => <User key={`${user.id}-${currentUsersIndex}`} user={user}/>)}
            </div>

        </div>
    )
}