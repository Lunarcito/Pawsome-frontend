import './Filter.css'

const Search = (props) => {
    const searchChangeHandler = (event) => {
        props.onSearch(event.target.value)
    }
    return (
        <div>
            <input className="filterSearch" type="text" onChange={searchChangeHandler}></input>
        </div>
    )
}
export default Search