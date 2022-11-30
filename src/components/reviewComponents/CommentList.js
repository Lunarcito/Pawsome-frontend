function CommentList (props) {
    console.log(props.comment)
    let data = props.comment
    
    // const day = data.createdAt.getUTCDate()
    // const month = data.createdAt.getUTCMonth()
    // const year = data.createdAt.getUTCFullYear()
    // const hour = data.createdAt.getUTCHours()
    // const minute = data.createdAt.getUTCMinutes()
    // console.log(day)


    return(
        <div>
            <h1>Comments</h1>
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