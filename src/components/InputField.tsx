/**
 * Componente reutilizável de campo de formulário.
 *
 * Encapsula label, input, ícone opcional, indicador de sucesso (✓)
 * e mensagem de erro em um único bloco coeso.
 *
 * As classes de erro e sucesso são aplicadas dinamicamente via props,
 * permitindo que o componente pai controle o estado de validação.
 */

type InputFieldProps = {
    label: string
    type: string
    name: string
    id: string
    value: string
    onChange: React.ChangeEventHandler<HTMLInputElement>
    onBlur?: React.FocusEventHandler<HTMLInputElement>
    placeholder?: string
    icon?: React.ReactNode        // Ícone opcional exibido ao lado do label
    required?: boolean            // Exibe o asterisco vermelho no label
    error?: string                // Mensagem de erro abaixo do input
    success?: boolean             // Exibe borda verde e o ícone ✓ dentro do input
}

function InputField(props: InputFieldProps) {

    // ID da mensagem de erro — vinculado ao input via aria-describedby
    // para que leitores de tela anunciem o erro ao focar no campo
    const errorId = `${props.id}-error`

    // Monta a className do input combinando os estados de erro e sucesso.
    // Apenas um dos dois é aplicado por vez — erro tem prioridade visual.
    const inputClass = `
        ${props.error ? "input-error" : ""}
        ${props.success ? "input-success" : ""}
    `

    return (
        <div className="input-group">

            <label htmlFor={props.id}>
                {/* Ícone opcional renderizado antes do texto do label */}
                {props.icon && props.icon}

                {props.label}

                {/* Asterisco vermelho para campos obrigatórios —
                    aria-hidden oculta o símbolo visual do leitor de tela,
                    pois a prop required no input já comunica a obrigatoriedade */}
                {props.required && (
                    <span className="required" aria-hidden="true">*</span>
                )}
            </label>

            {/* Wrapper relativo para posicionar o ícone ✓ dentro do input */}
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
                    required={props.required}
                    // aria-invalid sinaliza ao leitor de tela que o campo está com erro
                    aria-invalid={props.error ? "true" : undefined}
                    // aria-describedby conecta o input à mensagem de erro abaixo
                    aria-describedby={props.error ? errorId : undefined}
                />

                {/* Ícone de sucesso — aria-hidden pois é puramente decorativo */}
                {props.success && (
                    <span className="input-check" aria-hidden="true">✓</span>
                )}
            </div>

            {/* Mensagem de erro com role="alert" para ser anunciada imediatamente
                pelo leitor de tela assim que aparecer na tela */}
            {props.error && (
                <span id={errorId} className="input-error-message" role="alert">
                    {props.error}
                </span>
            )}

        </div>
    )
}

export default InputField