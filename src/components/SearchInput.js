import Card from "../UI/Card";
import SearchBar from "./SearchBar";
import "./SearchInput.css"

const SearchInput = () => {
    return (
        <Card>
            <div className="title">Search Bar</div>
            <SearchBar />
        </Card>
    );
}

export default SearchInput;