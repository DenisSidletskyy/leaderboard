import s from './Modal.module.sass'
import {ReactComponent as Close} from "images/close.svg";
import {ReactComponent as Cloud} from "images/cloud.svg";
import {ReactComponent as Table} from "images/table.svg";
import {Button} from "components/button";
import Form from "./Form";

export const Modal = ({setUser, setIsOpen}) => {

    return (
        <div className={s.modal}>

            <div className={s.cloud}>
                <Cloud/>
            </div>

            <div className={s.table}>
                <Table/>
            </div>

            <Button className={'close'} onClick={() => setIsOpen(false)}>
                <Close/>
            </Button>

            <Form setUser={setUser}/>
        </div>
    )
}