type InputFieldProps = {
    label: string
    type: string
    name: string
    id: string
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    placeholder?: string
    icon?: React.ReactNode
    required?: boolean
    error?: string
    success?: boolean
}

function InputField(props: InputFieldProps) {

    const inputClass = `
        ${props.error ? "input-error" : ""}
        ${props.success ? "input-success" : ""}
    `

    return (
        <div className="input-group">

            <label htmlFor={props.id}>
                {props.icon && props.icon}
                {props.label}

                {props.required && (
                    <span className="required">*</span>
                )}
            </label>

            <div className="input-wrapper">
                <input
                    className={inputClass}
                    type={props.type}
                    name={props.name}
                    id={props.id}
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                    placeholder={props.placeholder}
                />

                {props.success && (
                    <span className="input-check">✓</span>
                )}
            </div>

            {props.error && (
                <p className="input-error-message">
                    {props.error}
                </p>
            )}

        </div>
    )
}

export default InputField