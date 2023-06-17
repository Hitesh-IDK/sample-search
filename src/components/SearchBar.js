import "./SearchBar.css";
import React, {useState} from 'react';

const SearchBar = (props) => {

    const [searchInput, setSearchInput] = useState('');
    // const [submitStatus, setSubmitStatus] = useState(false);
    const designClass = !props.isSubmitted ? "search" : "search__mini";

    const inputHandler = (event) => {
        setSearchInput(event.target.value);
    }

    const searchHandler = (event) => {
        if(event.key === 'Enter') {
            props.getStatus(true);
            props.setQuery(searchInput);
        }
    }
 
    return (
        <input className={designClass} type="text" onKeyUp={searchHandler} onChange={inputHandler} value={searchInput} />
    );
}

export default SearchBar;