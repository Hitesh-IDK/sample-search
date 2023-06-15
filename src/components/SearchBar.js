import "./SearchBar.css";
import React, {useState} from 'react';

const SearchBar = () => {

    const [searchInput, setSearchInput] = useState('');
    const inputHandler = () => {
        
    }
 
    return (
        <input className="search" type="text" onChange={inputHandler} />
    );
}

export default SearchBar;