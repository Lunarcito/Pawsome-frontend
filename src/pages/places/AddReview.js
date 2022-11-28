import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import addComment from "../../components/reviewComponents/addComment";

function AddReview(props) {
    const [check, setCheck] = useState(null)
    const [comment, setComment] = useState('')
 
    const navigate = useNavigate()

    const storedToken = localStorage.getItem('authToken');
    const API_ENDPOINT = "http://localhost:8000/api/addReview/"
    const { placeId } = useParams()

    const submitHandler = async (event) => {
        event.preventDefault()
        const newReview = {}
        if (comment !== '') {
            newReview = {
                check: check,
                comment: comment
            }
        } else {
            newReview = {
                check: check
            }
        }


        try {
            await axios.post(API_ENDPOINT + placeId, newReview, { headers: { Authorization: `Bearer ${storedToken}` } })
            setComment('')
            setCheck(null)
  
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div>
            <form onSubmit={submitHandler} >

                <input type="checkbox" id="verificationPlace" name="verification" checked onChange={(event) => setCheck(event.target.value)} />
                <label for="veritifaction">Place verified?</label>

                <button type="submit" className="submitButton">Save verification</button>

                {check == ! null && <addComment comment={comment} onComment={setComment} />}

                <button type="submit" className="submitButton">Add review</button>

            </form>
        </div>
    )
}


export default AddReview