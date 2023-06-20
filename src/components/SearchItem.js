import './SearchItem.css';

const SearchItem = (props) => {
    const url = props.item.formattedUrl;
    const snippet = props.item.snippet;
    const title = props.item.title;
    const displayUrl = props.item.displayLink.split('.');
    let name = '';

    for(let text of displayUrl) {
        if(!(text === 'www' || text === 'com' || text === 'co')) {
            name = name.concat(name, '-', text[0].toUpperCase(), text.slice(1));
        }
    }

    name = name.slice(1);
    if (name.length > 35) {
        name = name.slice(0, 35).concat('...');
    }

    return (
        <div className='item_container'>
            <div className='search_name'><a href={url} className='search_name__link'>{name}</a></div>
            <div className='search_url'><a href={url} className='search_url__link'>{url}</a></div>
            <a href={url}><div className='search_title'>{title}</div></a>
            <div className='search_snippet'>{snippet}</div>
        </div>
    );
}

export default SearchItem;