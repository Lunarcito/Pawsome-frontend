import { Link } from "react-router-dom"; // updated pictures
function Places ({place}) {
    return (
        <div className="search-container">
            <li>
            <h2>{place.name}</h2>
            <img src={place.pictures} alt="" />
            <p>{place.address}</p>
            <p>{place.Review}</p>
            <Link to={`/places/${place._id}`}>More Details</Link>
            </li>
        </div>
    )
}
export default Places;