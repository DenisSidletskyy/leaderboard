import s from './Board.module.sass'
import {Button} from "components/button";
import {User} from "./User";
import {changeDayTC, setNewDayTC, toggleModalTC} from "redux/thunkCreators";
import {useDispatch} from "react-redux";
import {CSSTransition} from "react-transition-group";

export const Board = ({day, currentDayIndex, daysCount, isLoaded}) => {

    const dispatch = useDispatch()

    return (
        <div className={s.wrapper}>

            <div className={s.top}>
                <div className={s.description}>Leaders table for this period</div>

                <div className={s.navigation}>

                    <Button
                        className={'navigate'}
                        onClick={() => dispatch(changeDayTC(-1))}
                        disabled={currentDayIndex === 0}
                    >
                        {'<<'}
                    </Button>

                    <Button
                        className={'navigate'}
                        onClick={() => dispatch(changeDayTC(1))}
                        disabled={currentDayIndex === daysCount - 1}
                    >
                        {'>>'}
                    </Button>

                    <Button
                        className={'orangeWhite'}
                        disabled={!isLoaded}
                        onClick={() => dispatch(setNewDayTC())}
                    >
                        New day
                    </Button>

                    <Button
                        className={'blueWhite'}
                        disabled={currentDayIndex !== daysCount - 1}
                        onClick={() => dispatch(toggleModalTC(true))}
                    >
                        Add new user
                    </Button>

                </div>
            </div>

            <CSSTransition
                in={isLoaded}
                timeout={500}
                classNames={{
                    enter: s["tableEnter"],
                    enterActive: s["tableEnterActive"],
                }}
            >
                <div className={s.table}>
                    {day.map(user => <User key={`${user.id}`}
                                           user={user}
                                           currentDayIndex={currentDayIndex}
                                           daysCount={daysCount}/>)}
                </div>
            </CSSTransition>

        </div>
    )
}