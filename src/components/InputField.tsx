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
}

function InputField(props: InputFieldProps) {
    return (
        <div>

            {/* Label com ícone opcional */}
            <label htmlFor={props.id}>
                {props.icon && props.icon}
                {props.label}
            </label>

            <input
                type={props.type}
                name={props.name}
                id={props.id}
                value={props.value}
                onChange={props.onChange}
                onBlur={props.onBlur}
                placeholder={props.placeholder}
            />

        </div>
    )
}

export default InputField;