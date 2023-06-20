import SearchItem from "./SearchItem";
import './SearchPage.css';

const SearchPage = (props) => {
    const items = props.getItems();
    
    return (
        <div className="search_page" >
            {typeof items[0] != 'undefined' && items.map(item => {
                return (
                    <SearchItem item={item} />
                );
            })}
        </div>
    );
}

export default SearchPage;