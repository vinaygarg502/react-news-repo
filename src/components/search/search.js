import React, { useEffect, useRef} from "react";
import NavHeader from "../nav-header/nav-header";
import NewsCard from "../newsCard/newsCard";
import { useHistory } from 'react-router-dom';
import './search.scss';
let page=1;
const Search = ({location, searchResults, loading, getSearchResults, getUpdatedSearchResults, getResultsByOrder, cancelApi})=>{
    const options = {
        root: null,
        rootMargin: "20px",
        threshold: 1.0
     };
    let query = (location.pathname.split('/')[2]).substr(3);
    const loader = useRef(null);
    const history = useHistory();
    useEffect(() => {
        const observer = new IntersectionObserver(handleObserver, options);
        const loaderRef = loader.current;
        if (loaderRef) {
           observer.observe(loaderRef)
        }
        return ()=>{
            if(loaderRef) observer.unobserve(loaderRef)
        }
    }, [loader, options]);

    useEffect(()=>{
        getSearchResults(query,1);
    },[query]);

    useEffect(() => {
        return () => {
          cancelApi();
        };
    }, []);

    const changeHandler = (e)=>{
        getResultsByOrder(searchResults, e.target.value)
     };

    const clickHandler = (list)=>{
        history.push({
            pathname: `/story/${list.id}`,
            state: list
        });
    };
    const handleObserver = (entities) => {
        const target = entities[0];
        if (target.isIntersecting && Math.floor(target.intersectionRatio) === 1){ 
            page=page+1;
            getUpdatedSearchResults(query,page);
        }
    }

    return (
        <div className="result-container">
            <NavHeader title='Search Results' isFilter={true}  isBookmark={true} changeHandler = {changeHandler}/>
            { loading ? <div className="loader-container"><div className="loader"></div></div>:
                <div className="result-container--content">
                    {searchResults.length>0 ? 
                        searchResults.map(result=><NewsCard list={result} clickHandler = {clickHandler} key = {`${result.id}`}/>):
                        <div className="no-results--box"> No Results Found by {query}. Please search with different keyword</div>
                    }
                    {searchResults.length>0 && 
                        <div className="loader-container"><div className="loader" ref={loader}></div></div>
                    }
                </div>
            }  
        </div>
    );
}

export default Search;