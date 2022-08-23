import s from './Modal.module.sass'
import * as Yup from 'yup'
import {useFormik} from "formik";
import {Button} from "components/button";
import {ReactComponent as UpArrow} from "images/upArrow.svg";
import {ReactComponent as DownArrow} from "images/downArrow.svg";

export const Form = ({setUser}) => {

    const initialValues = {
        name: '',
        points: '',
    }

    const validationSchema = Yup.object({
        name: Yup.string().required().test((val) => val && val.length >= 3),
        points: Yup.number().required().min(0).max(100),
    })

    const onSubmit = (values, {resetForm}) => {
        setUser(values)
        resetForm({})
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
                disabled={(form.errors.name && form.touched.name) || (form.errors.points && form.touched.points)}
            >
                Save
            </Button>
        </form>
    )
}

export default Form