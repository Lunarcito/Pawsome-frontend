function Filter({ setActiveType }) {

    return (
        <div className="filter-container">
            <button onClick={() => setActiveType('')}>All</button>
            <button onClick={() => setActiveType('Beach')}>Beach</button>
            <button onClick={() => setActiveType('Restaurant')}>Restaurant</button>
            <button onClick={() => setActiveType('Cafeteria')}>Cafeteria</button>
            <button onClick={() => setActiveType('Museum')}>Museum</button>
            <button onClick={() => setActiveType('Other')}>Other</button>
        </div>
    )
}

export default Filter;
