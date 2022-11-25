function SecondStepForm(props) {

    return (
        <div>
            <label>Description:</label>
            <textarea cols="30" rows="10"
                type="text"
                name="description"
                value={props.description}
                onChange={(event) => props.onDescription(event.target.value)}
            />
        </div>
    )
}

export default SecondStepForm;