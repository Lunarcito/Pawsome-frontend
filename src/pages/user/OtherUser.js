import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

const apiEndpoint = "http://localhost:8000/api/user-profile/"

function OtherUser () {
    const { userId } = useParams()
    const [user, setPlace] = useState({})

    useEffect(() => {
        const apiCall = async () => {
            try{
            const res = await axios.get((apiEndpoint + userId))
            setPlace(res.data)
            }catch(error){
                console.log(error)
            } 
        }
        apiCall()
    }, [userId])

console.log(user)
    return (
        <div>
            <div>
            <p>{user.name}</p>
            </div>
        </div>
    )

}

export default OtherUser