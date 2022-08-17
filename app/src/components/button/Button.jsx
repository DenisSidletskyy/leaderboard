import s from './Button.module.sass'

const Button = ({children, className, disabled = false}) => {
    return (
        <button
            className={s[className]}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default Button