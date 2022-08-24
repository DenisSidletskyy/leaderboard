import s from './Modal.module.sass'
import {ReactComponent as Close} from "images/close.svg";
import {ReactComponent as Cloud} from "images/cloud.svg";
import {ReactComponent as Table} from "images/table.svg";
import ReactDOM from "react-dom";
import {useDispatch, useSelector} from "react-redux";
import {Form} from "./Form";
import {Button} from "components/button";
import {toggleModalAC} from "../../redux/actionCreators";

export const Modal = () => {

    const dispatch = useDispatch()

    const modal = useSelector(state => state.modal)

    const closeModal = () => {
        dispatch(toggleModalAC(false))
    }

    if (!modal.isOpen) {
        return null
    }

    return ReactDOM.createPortal(
        <div className={s.wrapper}>
            <div className={s.modal}>

                <div className={s.cloud}>
                    <Cloud/>
                </div>

                <div className={s.table}>
                    <Table/>
                </div>

                <Button className={'close'} onClick={closeModal}>
                    <Close/>
                </Button>

                <Form prevUserData={modal.prevUserData}/>
            </div>
        </div>
        , document.getElementById('root')
    )
}