import s from './Button.module.sass'

const Button = ({children, className, disabled, type, onClick}) => {
    return (
        <button
            className={s[className]}
            disabled={disabled && disabled}
            onClick={onClick && onClick}
            type={type && type}
        >
            {children}
        </button>
    )
}

export default Button