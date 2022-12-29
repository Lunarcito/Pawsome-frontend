function CommentList (props) {
    let data = props.comment

    return(
        <div className="card-reviews">
            <h3>Reviews</h3>
            {data.map((review) => {
                return(
                    <div key={review._id}>
                        <p>{review.comment}</p>
                        <p>{review.createdAt}</p>
                    </div>
                )
            })}
        </div>
    )
}
export default CommentList