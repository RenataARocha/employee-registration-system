type InputFieldProps = {
    label: string
    type: string
    name: string
    id: string
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
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
                placeholder={props.placeholder}
            />
        </div>
    )
}

export default InputField;