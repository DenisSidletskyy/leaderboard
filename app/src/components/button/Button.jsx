import s from './Button.module.sass'

const Button = ({children, className, disabled = false, onClick}) => {
    return (
        <button
            className={s[className]}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button