function FirstStepForm(props) {
    return (
        <div>
            <label>Name of the place:</label>
            <input
                type="text"
                name="name"
                value={props.name}
                onChange={(event) => props.onName(event.target.value)}
            />
            <hr></hr>
            <label>Address:</label>
            <input
                type="text"
                name="address"
                value={props.address}
                onChange={(event) => props.onAddress(event.target.value)}
            />
            <hr></hr>
            <label>Choose a type of place:</label>
            <select value={props.type} onChange={(event) => props.onType(event.target.value)}>
                {props.options.map((option) => (
                    
                    <option key={option.value} value={option.value}>{option.label}</option>
                
                ))}
            </select>
            {props.type === 'Other' && <input type="text" name="type" value={props.typeOther} onChange={(event) => props.onTypeOther(event.target.value)}></input>}
            <hr></hr>

        </div>  
    )

}

export default FirstStepForm;