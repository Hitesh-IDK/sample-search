import "./SearchBar.css";
import React, {useState} from 'react';

const SearchBar = () => {

    const [searchInput, setSearchInput] = useState('');
    const [submitStatus, setSubmitStatus] = useState(false);

    const inputHandler = (event) => {
        setSearchInput(event.target.value);
    }

    const searchHandler = (event) => {
        if(event.key === 'Enter') {
            setSubmitStatus(true);
        }
    }
 
    return (
        <input className="search" type="text" onKeyUp={searchHandler} onChange={inputHandler} value={searchInput} />
    );
}

export default SearchBar;