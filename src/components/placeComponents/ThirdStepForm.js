function ThirdStepForm(props) {
    return (
        <div>
            <label>Upload one or more pictures</label>
            <input type="file" accept="image/png, image/jpeg, image/jpg" multiple="multiple" name="pictures" placeholder="Upload one or more pictures" onChange={event => props.onFiles(Array.from(event.target.files))} />

            <label>Social media:</label>
            <input
                type="text"
                name="socialMedia"
                onChange={(event) =>
                    props.onSocialmedia(event.target.value)
                }
                value={props.socialMedia}
            />
            <input
                type="text"
                name="socialMedia"
                onChange={(event) =>
                    props.onSocialmedia1(event.target.value)
                }
                value={props.socialMedia1}
            />
            <input
                type="text"
                name="socialMedia"
                onChange={(event) =>
                    props.onSocialmedia2(event.target.value)
                }
                value={props.socialMedia2}
            />
        </div>
    )
}

export default ThirdStepForm;