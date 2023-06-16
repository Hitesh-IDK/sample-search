import "./SearchBar.css";
import React, {useState} from 'react';

const SearchBar = (props) => {

    const [searchInput, setSearchInput] = useState('');
    const [submitStatus, setSubmitStatus] = useState(false);
    const designClass = !submitStatus ? "search" : "search__mini";

    const inputHandler = (event) => {
        setSearchInput(event.target.value);
    }

    const searchHandler = (event) => {
        if(event.key === 'Enter') {
            setSubmitStatus(true);
            props.getStatus(true);
        }
    }
 
    return (
        <input className={designClass} type="text" onKeyUp={searchHandler} onChange={inputHandler} value={searchInput} />
    );
}

export default SearchBar;