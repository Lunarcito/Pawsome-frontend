import './Filter.css'
import "./Search.css"

const Search = (props) => {
    const searchChangeHandler = (event) => {
        props.onSearch(event.target.value)
    }
    const mapClickHandler = () => {
        props.onMapClick()
    }
    return (
        <div className='filterBox'>
            <input className="filterSearch" type="text" onChange={searchChangeHandler}></input>
            <button className="buttonMap" onClick={mapClickHandler}><img src='https://res.cloudinary.com/dfajfbnkr/image/upload/v1669896702/Pawsome/veterinary_elubfi.png' alt="icon" className="imgMap"/></button>
        </div>
    )
}
export default Search