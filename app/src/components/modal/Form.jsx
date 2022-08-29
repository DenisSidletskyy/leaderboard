import s from './Modal.module.sass'
import * as Yup from 'yup'
import {useFormik} from "formik";
import {Button} from "components/button";
import {ReactComponent as UpArrow} from "images/svg/up.svg";
import {ReactComponent as DownArrow} from "images/svg/down.svg";
import {useDispatch} from "react-redux";
import {addUserTC, updateUserTC} from "redux/thunkCreators";

export const Form = ({user}) => {

    const dispatch = useDispatch()

    const initialValues = {
        name: user ? user.name : '',
        points: user ? user.score : '',
    }

    const validationSchema = Yup.object({
        name: Yup.string().required().test((val) => val && val.length >= 3 && val.length <= 8),
        points: Yup.number().required().min(0).max(1000),
    })

    const onSubmit = (values) => {
        if (user) dispatch(updateUserTC(user.id, values.name, values.points))
        if (!user) dispatch(addUserTC(values.name, values.points))
    }

    const form = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    })

    return (
        <form
            className={s.form}
            onSubmit={form.handleSubmit}
        >
            <div className={s.title}>
                Edit user score
            </div>

            <div className={s.inputWrapper}>
                <input
                    className={`${s.input} ${(form.errors.name && form.touched.name) && s.inputError}`}
                    id="name"
                    name="name"
                    type="text"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.name}
                    placeholder={'Name'}
                />
            </div>

            <div className={s.inputWrapper}>
                <input
                    className={`${s.input} ${(form.errors.points && form.touched.points) && s.inputError}`}
                    id="points"
                    name="points"
                    type="number"
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    value={form.values.points}
                    placeholder={'Points'}
                />
                <Button
                    type="button"
                    className={'increment'}
                    disabled={form.values.points >= 100}
                    onClick={() => form.setFieldValue('points', +form.values.points + 1)}
                >
                    <UpArrow/>
                </Button>
                <Button
                    type="button"
                    className={'decrement'}
                    disabled={form.values.points <= 0}
                    onClick={() => form.setFieldValue('points', +form.values.points - 1)}
                >
                    <DownArrow/>
                </Button>
            </div>
            <Button
                className={'orangeBlack'}
                type={'submit'}
            >
                Save
            </Button>
        </form>
    )
}
