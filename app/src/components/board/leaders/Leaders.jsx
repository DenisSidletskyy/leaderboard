import s from './Leaders.module.sass'
import podium from "images/podium.svg";
import avatar from "images/avatars/avatar1.svg";

const User = ({user}) => (
    <div className={s.user}>
        <img className={s.avatar} src={avatar} alt="avatar"/>
        <div className={s.score}>
            {`${user.name} - ${user.score}`}
        </div>
    </div>
)

export const Leaders = ({globalLeaders}) => {
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
                        {globalLeaders.map((user, index) => <User key={index} user={user}/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}
