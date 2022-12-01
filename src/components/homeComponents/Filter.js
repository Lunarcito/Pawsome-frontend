import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUmbrellaBeach } from '@fortawesome/free-solid-svg-icons'
import { faUtensils } from '@fortawesome/free-solid-svg-icons'
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons'
import { faBuildingColumns } from '@fortawesome/free-solid-svg-icons'
import { faBagShopping } from '@fortawesome/free-solid-svg-icons'
import { faFilter } from '@fortawesome/free-solid-svg-icons'

import './Filter.css'

<i class="fa-solid fa-utensils"></i>
function Filter({ setActiveType }) {

    return (
        <div className="filter-container">
            <button onClick={() => setActiveType('')}><FontAwesomeIcon className="filterIcon" icon={faFilter} /></button>
            <button onClick={() => setActiveType('Beach')}><FontAwesomeIcon className="filterIcon" icon={faUmbrellaBeach} /></button>
            <button onClick={() => setActiveType('Restaurant')}><FontAwesomeIcon className="filterIcon" icon={faUtensils} /></button>
            <button onClick={() => setActiveType('Cafeteria')}><FontAwesomeIcon className="filterIcon" icon={faMugSaucer} /></button>
            <button onClick={() => setActiveType('Museum')}><FontAwesomeIcon className="filterIcon" icon={faBuildingColumns} /></button>
            <button onClick={() => setActiveType('Other')}><FontAwesomeIcon className="filterIcon" icon={faBagShopping} /></button>
        </div>
    )
}

export default Filter;
