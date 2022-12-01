import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import Places from "../../components/homeComponents/Places";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

import './Favorites.css'

function Favorites() {
    const [favorites, setFavorites] = useState([])

    const apiEndpoint = "http://localhost:8000/api/favorites"
    
    const { placeId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const apiCall = async () => {

            try {
                const storedToken = localStorage.getItem("authToken");
                const res = await axios.get(
                    apiEndpoint,
                    { headers: { Authorization: `Bearer ${storedToken}` } }
                )
                setFavorites(res.data)
            } catch (err) {
                console.log(err)
            }
        }
        apiCall()
    }, []);


    const deleteFavorite = async (favoriteID) => {

        try {
            const storedToken = localStorage.getItem("authToken");
            const res = await axios.delete(apiEndpoint + "/" + favoriteID, { headers: { Authorization: `Bearer ${storedToken}` } })
            const response = await axios.get(
                apiEndpoint,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            setFavorites(response.data)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div>
            <h1> My favorites </h1>
            {favorites && favorites.map((fav) => {
                return (
                    <div key={fav._id}>
                        <button className="buittoni"onClick={event => deleteFavorite(fav._id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                        <Places key={fav._id} place={fav.place} />
                    </div>
                )
            })}
        </div>
    )
}

export default Favorites
