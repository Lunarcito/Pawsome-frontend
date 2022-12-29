import axios from "axios"
import { useEffect, useState } from "react"
import Places from "../../components/homeComponents/Places";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

import './Favorites.css'

const apiEndpoint = `${process.env.REACT_APP_API_URL}favorites`

function Favorites() {
    const [favorites, setFavorites] = useState([])

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
            await axios.delete(apiEndpoint + "/" + favoriteID, { headers: { Authorization: `Bearer ${storedToken}` } })
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
        <div className="favorite">
            <h1> My favorites </h1>
            <div>

                {favorites && favorites.map((fav) => {
                return (
                    
                    <div id="place" key={fav._id}>
                        <button className="deleteButton" onClick={event => deleteFavorite(fav._id)}><FontAwesomeIcon icon={faTrashCan} /></button>
                        <Places key={fav._id} place={fav.place} />
                    </div>
                   
                )
            })}
            </div>
          
            
        </div>
    )
}

export default Favorites
