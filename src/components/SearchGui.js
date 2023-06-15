import Card from "../UI/Card";
import SearchBar from "./SearchBar";
import "./SearchGui.css"

const SearchGui = () => {
    return (
        <Card>
            <div className="title">Search Bar</div>
            <SearchBar />
        </Card>
    );
}

export default SearchGui;