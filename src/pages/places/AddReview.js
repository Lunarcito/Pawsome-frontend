import axios from "axios";
import {  useState } from "react";
import {  useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import AddComment from "../../components/reviewComponents/AddComment";

import {
    Button
  } from "@chakra-ui/react";

import './AddReview.css';

function AddReview(props) {
    const [check, setCheck] = useState(null)
    const [comment, setComment] = useState('')
    const [counterHappy, setCounterHappy] = useState(false)
    const [counterSad, setCounterSad] = useState(false)
    const [hideHappy, setHideHappy] = useState(false)
    const [hideSad, setHideSad] = useState(false)

    const navigate = useNavigate()

    const storedToken = localStorage.getItem('authToken');
    const API_ENDPOINT = `${process.env.REACT_APP_API_URL}addReview/`;

    const { placeId } = useParams()

    const checkBoxHandler1 = (event) => {
        setCounterHappy(!counterHappy)
        setHideSad(!hideSad)

        if (counterHappy !== true) {
            setCheck(true)
        } else {
            setCheck(null)
        }
    }

    const checkBoxHandler2 = (event) => {
        setCounterSad(!counterSad)
        setHideHappy(!hideHappy)

        if (counterSad !== true) {
            setCheck(false)
        } else {
            setCheck(null)
        }
    }


    const submitHandler = async (event) => {
        event.preventDefault()

        let newReview = {}
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
            setComment('')
            setCheck(null)
            setCounterHappy(false)
            setCounterSad(false)
            setHideHappy(false)
            setHideSad(false)

            navigate(`/places/${placeId}`)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <form onSubmit={submitHandler} >
                <div className="Review">
                <h3> Place verified?</h3>
                <br></br>
                {!hideHappy && <img src='https://res.cloudinary.com/dfajfbnkr/image/upload/v1669885442/Pawsome/happiness_pdzvmw.png'  alt="yes"className="iconVerification" />}
                {!hideHappy && <input type="checkbox" id="verificationPlace" name="verifiedYes" value={true} onChange={checkBoxHandler1} />}
                <br></br>

                {!hideSad && <img src='https://res.cloudinary.com/dfajfbnkr/image/upload/v1669885442/Pawsome/sad_iukrsb.png' alt="no" className="iconVerification" />}
                {!hideSad && <input type="checkbox" id="verificationPlace" name="verifiedNo" value={false} onChange={checkBoxHandler2} />}


                {check !== null && <div> <AddComment comment={comment} onComment={setComment} />

                <div className="forms">
                <Button type="submit" className="submitButton" colorScheme='teal' variant='outline'>
                 Add review
                </Button>
                </div>

                </div>
                }
                </div>
            </form>
        </div>
    )
}

export default AddReview