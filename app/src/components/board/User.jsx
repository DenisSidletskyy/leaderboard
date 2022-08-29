import s from "./Board.module.sass";
import {edit, avatar} from "images"
import {Button} from "components/button";
import {toggleModalTC} from "redux/thunkCreators";
import {useDispatch} from "react-redux";

export const User = ({user, currentDayIndex, daysCount}) => {

    const dispatch = useDispatch()

    return (
        <div className={s.user}>
            <div className={s.left}>
                <span className={s.position}>
                    {[1, 2, 3].includes(user.position.diff)
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
                        user.position.diff === 0
                            ? 'No change'
                            : Math.abs(user.position.diff) === 1
                                ? Math.abs(user.position.diff) + ' place'
                                : Math.abs(user.position.diff) + ' places'
                    }
                </span>
                <Button
                    className={'edit'}
                    disabled={currentDayIndex !== daysCount - 1}
                    onClick={() => dispatch(toggleModalTC(true, user.id))}
                >
                    <img src={edit} alt="edit"/>
                </Button>
            </div>
        </div>
    )

}