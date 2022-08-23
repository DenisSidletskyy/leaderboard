import s from './Table.module.sass'
import {ReactComponent as Edit} from "images/edit.svg";
import avatar from 'images/avatars/avatar1.svg'
import Button from "../../button/Button";
import {useChangeUser, useModal} from "../../../hooks/hooks";

const User = ({user}) => {
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
                            : user.position.diff === 1
                                ? Math.abs(user.position.diff) + 'place'
                                : Math.abs(user.position.diff) + 'places'
                    }
                </span>
                <Button
                    className={'edit'}
                    onClick={() => useModal(true, user.id)}
                >
                    <Edit/>
                </Button>
            </div>
        </div>
    )

}

export const Table = ({users, openModal}) => {
    return (
        <div className={s.wrapper}>

            <div className={s.top}>
                <div className={s.description}>Leaders table for this period</div>

                <div className={s.navigation}>

                    <Button
                        className={'navigate'}
                        /*onClick={}
                        disabled={}*/
                    >
                        {'<<'}
                    </Button>

                    <Button
                        className={'navigate'}
                        /*onClick={}
                        disabled={}*/
                    >
                        {'>>'}
                    </Button>

                    <Button
                        className={'orangeWhite'}
                        /*onClick={}*/
                    >
                        New day
                    </Button>

                    <Button
                        className={'blueWhite'}
                        onClick={() => useModal(true)}
                    >
                        Add new user
                    </Button>

                </div>
            </div>

            <div className={s.table}>
                {users.map(user => <User key={user.id} user={user}/> )}
            </div>

        </div>
    )
}