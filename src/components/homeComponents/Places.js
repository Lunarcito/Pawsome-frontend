import { Link } from "react-router-dom"; // updated pictures
import { useEffect, useState } from "react"
import "./Places.css"

function Places({ place }) {
    console.log("Place", place)
    const [main, setMain] = useState(true)
    const [main1, setMain1] = useState(true)
    const [main2, setMain2] = useState(true)
    const [main3, setMain3] = useState(true)
    const [main4, setMain4] = useState(true)
    const [main5, setMain5] = useState(true)

    useEffect(() => {

        if (place.pictures) {

            if (place.pictures.length === 0 && place.type === "Restaurant") {
                setMain(false)
            }

            if (place.pictures.length === 0 && place.type === "Cafeteria") {
                setMain2(false)
            }

            if (place.pictures.length === 0 && place.type === "Museum") {
                setMain3(false)
            }
            if (place.pictures.length === 0 && place.type === "Beach") {
                setMain4(false)
            }
            if (place.pictures.length === 0 && place.type === "Other") {
                setMain5(false)
            }
            if (!main || !main2 || !main3 || !main4 || !main5) {
                setMain1(false)
            }
        }
    }, [place.pictures, main, main1, main2, main3, main4, main5, place.type])
    return (

        <div className="search-container">
            {place.pictures &&
                <Link to={`/places/${place._id}`}><div className="pplaces">
                    <h2 className="Placename">{place.name}</h2>
                    {main1 && <img className="Placeimage" src={place.pictures[0]} alt="" />}
                    {!main && <img className="Placeimage" src='https://res.cloudinary.com/dfajfbnkr/image/upload/v1669836239/Pawsome/white-interior-blur-blurred-chair_s7b2zj.jpg' alt="place" />}
                    {!main2 && <img className="Placeimage" src='https://res.cloudinary.com/dfajfbnkr/image/upload/v1669836161/Pawsome/cup-fresh-made-coffee-served-cup_1_rnb735.jpg' alt="place" />}
                    {!main3 && <img className="Placeimage" src='https://res.cloudinary.com/dfajfbnkr/image/upload/v1669835759/Pawsome/long-narrow-painting-art-exhibition_xsdyvx.jpg' alt="place" />}
                    {!main4 && <img className="Placeimage" src='https://res.cloudinary.com/dfajfbnkr/image/upload/v1669836393/Pawsome/adorable-pomeranian-spitz-dog-having-fun-running-beach_1_a2m3j3.jpg' alt="place" />}
                    {!main5 && <img className="Placeimage" src='https://res.cloudinary.com/dfajfbnkr/image/upload/v1669835759/Pawsome/adorable-french-bulldog-with-colorful-shopping-bags-isolated-white-background_fnkp7p.jpg' alt="place" />}
                </div></Link>
            }
        </div>

    )
}
export default Places;





