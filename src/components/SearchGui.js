import SearchBar from "./SearchBar";
import React, { useState } from 'react';
import "./SearchGui.css";
import ApiConfig from "./ApiConfig";
import SearchPage from "./SearchPage";

const SearchGui = () => {

    const [submitStatus, setSubmitStatus] = useState(false);
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

    const getSubmitStatus = (submitStatus) => {
        setSubmitStatus(submitStatus);
    }

    const transferItems = () => {
        return currentData.items;
    }

    const apiRequest = (query) => {
        //Api config is a dictonary with API KEY and CX ID
        const requestUrl = `https://www.googleapis.com/customsearch/v1?key=${ApiConfig.Api_Key}&cx=${ApiConfig.CX}&start=${currentData.startNum}&q=${query}`;
        console.log(requestUrl);

        fetch(requestUrl).then(response => {
            return response.json();
        }).then(data => {
            console.log(data);
            setCurrentData((prevData) => {
                const nextExists = (typeof data.queries !== 'undefined') ? true : false;
                return (
                    {
                        ...prevData,
                        items: data.items,
                        searchInformation: {
                            searchTime: data.searchInformation.searchTime,
                            totalResults: data.searchInformation.totalResults
                        },
                        nextPage : nextExists
                    }
                );
            });
        })
    }

    console.log(currentData);

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

    const nextApiRequest = () => {
        if (typeof currentData !== "undefined") {
            if (currentData.nextPage) {
                currentData.startNum += 10;
                console.log(currentData.startNum);

                const requestUrl = `https://www.googleapis.com/customsearch/v1?key=${ApiConfig.Api_Key}&cx=${ApiConfig.CX}&start=${currentData.startNum}&q=${currentData.query}`;
                console.log(requestUrl);

                fetch(requestUrl).then(response => {
                    return response.json();
                }).then(data => {
                    const nextExists = (typeof data.queries !== 'undefined') ? true : false;
                    setCurrentData ((prevData) => {
                        return (
                            {
                                ...prevData,
                                items: data.items,
                                searchInformation: {
                                    searchTime: data.searchInformation.searchTime,
                                    totalResults: data.searchInformation.totalResults
                                },
                                nextPage : nextExists
                            }
                        );
                    });
                })
            }
        }
    }

    const prevApiRequest = () => {
        if (typeof currentData !== "undefined") {
            if (currentData.startNum > 10) {
                currentData.startNum -= 10;
                console.log(currentData.startNum);

                const requestUrl = `https://www.googleapis.com/customsearch/v1?key=${ApiConfig.Api_Key}&cx=${ApiConfig.CX}&start=${currentData.startNum}&q=${currentData.query}`;
                console.log(requestUrl);

                fetch(requestUrl).then(response => {
                    return response.json();
                }).then(data => {
                    setCurrentData ((prevData) => {
                        return (
                            {
                                ...prevData,
                                items: data.items,
                                searchInformation: {
                                    searchTime: data.searchInformation.searchTime,
                                    totalResults: data.searchInformation.totalResults
                                }
                            }
                        );
                    });
                })
            }
        }
    }

    return (
        <div className={containerClass} >
            <div className={titleClass}>
                <label className={designClass}>Search</label>
                <SearchBar className="searchBar" getStatus={getSubmitStatus} isSubmitted={submitStatus} setQuery={getQueryHandler} />
            </div>
            {submitStatus && <SearchPage getItems={transferItems} />}
            {submitStatus && <div className="search_button__container">
                <button onClick={prevApiRequest} className="search_button__prev"> Prev </button>
                <button onClick={nextApiRequest} className="search_button__next"> Next </button>
            </div>}
        </div>
    );
}

export default SearchGui;