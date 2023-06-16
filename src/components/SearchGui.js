import SearchBar from "./SearchBar";
import "./SearchGui.css";

const SearchGui = () => {
    const submitStatus = false;
    const designClass = submitStatus ? "search__mini" : "search";
    const getSubmitStatus = (submitStatus) => {
        this.submitStatus = submitStatus;
    }
    return (
        <div className={designClass} >
            <label className={designClass}>Search</label>
            <SearchBar className="searchBar" getStatus={getSubmitStatus} />
        </div>
    );
}

export default SearchGui;