import SearchBar from "./SearchBar";
import React, { useState } from 'react';
import "./SearchGui.css";
// import ApiConfig from "./ApiConfig";
import SearchPage from "./SearchPage";
import NoSearch from "./NoSearch";

const SearchGui = () => {

    const [submitStatus, setSubmitStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentData, setCurrentData] = useState({
        nextPage: false,
        items: [],
        searchInformation: {
            searchTime: 0,
            totalResults: ''
        },
        startNum: 1,
        query: ''
    });

    const designClass = submitStatus ? "search__mini" : "search";
    const containerClass = submitStatus ? "search_container__mini" : "search_container";
    const titleClass = submitStatus ? 'search_container__title_mini' : 'search_container__title';
    const searchBarContainer = submitStatus ? 'search_bar__container__mini' : 'search_bar__container';

    const getSubmitStatus = (submitStatus) => {
        setSubmitStatus(submitStatus);
    }

    const transferItems = () => {
        console.log(currentData.items);
        return currentData.items;
    }

    console.log(process.env.Api_Key);

    const apiRequest = async (query) => {
        //Api config is a dictonary with API KEY and CX ID
        const requestUrl = `https://www.googleapis.com/customsearch/v1?key=${process.env.REACT_APP_API_KEY}&cx=${process.env.REACT_APP_CX}&start=${currentData.startNum}&q=${query}`;
        setIsLoading(true);
        console.log("Setting loading to true");

        const response = await fetch(requestUrl);
        const data = await response.json();

        setCurrentData((prevData) => {
            const nextExists = (typeof data.queries !== 'undefined') ? true : false;
            const newItemsExist = (data.searchInformation.totalResults > 0) ? true : false;
            let newItems;
            if (newItemsExist) {
                newItems = data.items.map((item) => {
                    return {
                        ...item,
                        key: Math.random(10000)
                    }
                })
            }

            setIsLoading(false);

            return (
                {
                    ...prevData,
                    items: newItems,
                    searchInformation: {
                        searchTime: data.searchInformation.searchTime,
                        totalResults: data.searchInformation.totalResults
                    },
                    nextPage: nextExists
                }
            );
        });
    }


    const getQueryHandler = (query) => {
        apiRequest(query);
        setCurrentData((prevData) => {
            return (
                {
                    ...prevData,
                    query: query
                }
            );
        });
    }

    const handleScroll = async (event) => {
        const target = event.target;

        if (target.scrollHeight - target.scrollTop === target.clientHeight) {
            if (typeof currentData !== "undefined") {
                if (currentData.nextPage && currentData.startNum < 91) {
                    currentData.startNum += 10;

                    const requestUrl = `https://www.googleapis.com/customsearch/v1?key=${process.env.REACT_APP_API_KEY}&cx=${process.env.REACT_APP_CX}&start=${currentData.startNum}&q=${currentData.query}`;

                    const response = await fetch(requestUrl);
                    const data = await response.json();

                    const nextExists = (typeof data.queries !== 'undefined') ? true : false;
                    const newItems = data.items.map((item) => {
                        return {
                            ...item,
                            key: Math.random(100000)
                        }
                    })

                    setCurrentData((prevData) => {
                        return (
                            {
                                ...prevData,
                                items: [
                                    ...prevData.items,
                                    ...newItems],
                                searchInformation: {
                                    searchTime: data.searchInformation.searchTime,
                                    totalResults: data.searchInformation.totalResults
                                },
                                nextPage: nextExists
                            }
                        );
                    });
                }
            }
        }
    }

    return (
        <div className={containerClass} onScroll={handleScroll}>
            <div className={titleClass}>
                <label className={designClass}>Search</label>
                <div className={searchBarContainer} >
                    <img src={require('./searchImg.png')} alt='a search gif' className="search_img" />
                    <SearchBar className="searchBar" getStatus={getSubmitStatus} isSubmitted={submitStatus} setQuery={getQueryHandler} />
                </div>
            </div>
            {submitStatus && typeof transferItems() != 'undefined' && !isLoading && <SearchPage getItems={transferItems} />}
            {submitStatus && isLoading && <p className="loading">Loading.....</p>}
            {submitStatus && !isLoading && <NoSearch />}
        </div>
    );
}

export default SearchGui;