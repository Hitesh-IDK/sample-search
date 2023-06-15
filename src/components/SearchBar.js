import "./SearchBar.css";
import React, {useState} from 'react';

const SearchBar = () => {

    const [searchInput, setSearchInput] = useState('');
    const inputHandler = (event) => {
        setSearchInput(event.target.value);
    }
 
    return (
        <input className="search" type="text" onChange={inputHandler} value={searchInput} />
    );
}

export default SearchBar;