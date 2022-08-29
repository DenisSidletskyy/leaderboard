import s from './Modal.module.sass'
import {cloud, table, close} from "images";
import {Form} from "./Form";
import {Button} from "components/button";
import {toggleModalTC} from "redux/thunkCreators";
import ReactDOM from "react-dom";
import {useDispatch} from "react-redux";

export const Modal = ({modal}) => {

    const dispatch = useDispatch()

    const toggleModal = (isOpen) => {
        dispatch(toggleModalTC(isOpen))
    }

    if (!modal.isOpen) return null

    return ReactDOM.createPortal(
        <div className={s.wrapper}>
            <div className={s.modal}>

                <img className={s.cloud} src={cloud} alt="cloud"/>
                <img className={s.table} src={table} alt="table"/>

                <Button
                    className={'close'}
                    onClick={() => toggleModal(false)}
                >
                    <img src={close} alt="close"/>
                </Button>

                <Form user={modal.user}/>
            </div>
        </div>
        , document.getElementById('root')
    )
}