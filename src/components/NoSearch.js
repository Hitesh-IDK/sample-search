import './NoSearch.css';

const NoSearch = () => {
    return (
        <div className='no_search__container'>
            <div className='no_search'>
                <div className='page_title'>Search Not Found!</div>
                <div className='page_result'>Total Search Results : 0</div>
            </div>
        </div>
    );
}

export default NoSearch;