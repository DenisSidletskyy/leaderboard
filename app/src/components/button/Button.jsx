import s from './Button.module.sass'

export const Button = ({children, className, disabled, type, onClick}) => {
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