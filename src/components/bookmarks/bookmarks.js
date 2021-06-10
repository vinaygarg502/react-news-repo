import React, { useEffect } from 'react';
import './bookmarks.scss';
import NavHeader from "../nav-header/nav-header";
import NewsCard from "../newsCard/newsCard";
import { useHistory } from 'react-router-dom';

const Bookmarks = ({bookmarks, getBookmarks})=>{
    const history = useHistory();
    const changeHandler = (e)=>{
       getBookmarks(bookmarks, e.target.value)
    };
    useEffect(()=>{
        getBookmarks(bookmarks,'newest')
    },[])

    const clickHandler = (list)=>{
        history.push({
            pathname: `/story/${list.id}`,
            state: list
        });
    };

    return (
        <div className="bookmark-container">
            <NavHeader title='All Bookmark' isFilter={true} changeHandler = {changeHandler}/>
            <div className="bookmark-container--content">
                {bookmarks && bookmarks.map(bookmark=><NewsCard list={bookmark} clickHandler = {clickHandler} key = {bookmark.id}/>)}
            </div>
            
        </div>
    );
}

export default Bookmarks;