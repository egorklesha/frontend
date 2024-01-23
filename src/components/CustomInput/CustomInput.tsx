import "./CustomInput.sass"

const CustomInput = ({id, placeholder, value, setValue, disabled}) => {
    return (
        <div className="input-container">
            <label htmlFor={id}>{placeholder}</label>
            <input id={id} name={id} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} disabled={disabled} required/>
        </div>
    )
}

export default CustomInput