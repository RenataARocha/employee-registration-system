type InputFieldProps = {
    label: string
    type: string
    name: string
    id: string
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    placeholder?: string
}

function InputField(props: InputFieldProps) {
    return (
        <div>
            <label htmlFor={props.id}>{props.label}</label>
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