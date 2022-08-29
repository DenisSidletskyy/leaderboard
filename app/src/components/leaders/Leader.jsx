import s from "./Leaders.module.sass";
import avatar from "../../images/svg/avatar.svg";

export const Leader = ({user}) => (
    <div className={s.user}>
        <img className={s.avatar} src={avatar} alt="avatar"/>
        <div className={s.score}>
            {`${user.name} - ${user.score}`}
        </div>
    </div>
)