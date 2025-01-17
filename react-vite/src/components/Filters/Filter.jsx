import './Filter.css';

const Filter = ({ levelFilter, languageFilter, localFilter, friendFilter, handleClick }) => {
    return (
        <>
        <div className="filters-container">
        <button className={!levelFilter? 'active-filter' : ''} onClick={() => {handleClick('level')}}>Level</button>
        <button className={!languageFilter? 'active-filter' : ''} onClick={() => {handleClick('language')}}>Language</button>
        <button className={!localFilter? 'active-filter' : ''} onClick={() => {handleClick('local')}}>Local</button>
        <button className={!friendFilter? 'active-filter' : ''} onClick={() => {handleClick('friends')}}>Friends</button>
        <button>More...</button>
        </div>
        </>
    )
}

export default Filter;