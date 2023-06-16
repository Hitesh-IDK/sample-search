import SearchBar from "./SearchBar";
import React, {useState} from 'react';
import "./SearchGui.css";

const SearchGui = () => {
    const [submitStatus, setSubmitStatus] = useState(false);
    const designClass = submitStatus ? "search__mini" : "search";
    const containerClass = submitStatus ? "search_container__mini" : "search_container";
    const getSubmitStatus = (submitStatus) => {
        setSubmitStatus(submitStatus);
    }

    return (
        <div className={containerClass} >
            <label className={designClass}>Search</label>
            <SearchBar className="searchBar" getStatus={getSubmitStatus} isSubmitted={submitStatus} />
        </div>
    );
}

export default SearchGui;