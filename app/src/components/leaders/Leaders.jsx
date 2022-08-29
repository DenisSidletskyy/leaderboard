import s from './Leaders.module.sass'
import {podium} from "images";
import {Leader} from "./Leader";

export const Leaders = ({leaders}) => {
    return (
        <div className={s.wrapper}>
            <div className={s.header}>
                <span className={s.red}>Five</span>
                &nbsp;&nbsp;
                <span className={s.black}>Leaderboard</span>
            </div>

            <div className={s.scorers}>
                <div className={s.leaders}>
                    <div className={s.title}>All-time highest scorers</div>
                    <div className={s.description}>You can be among the leaders already today</div>
                    <img className={s.podium} src={podium} alt="podium"/>
                    <div className={s.users}>
                        {leaders.map((user, index) => <Leader key={index} user={user}/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
