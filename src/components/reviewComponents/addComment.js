function AddComment(props) {
    return (
        <div>
            <label>Comments are appreciated!</label>
            <textarea cols="30" rows="10"
                type="text"
                name="comment"
                value={props.comment}
                onChange={(event) => props.onComment(event.target.value)}
            />
        </div>
    )
}

export default AddComment