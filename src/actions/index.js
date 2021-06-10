export const getNews = (orderBy) => ({
    type: 'GET_NEWS',
    orderBy
});

export const updateBookmark = (bookmark)=>({
    type:'UPDATE_BOOKMARK',
    bookmark
})
export const removeBookmark=(id)=>({
    type:'REMOVE_BOOKMARK',
    id
});
export const setFlag=(flag)=>({
    type:'SET_FLAG',
    flag
});
export const getBookmarks =(bookmarks,orderBy)=>({
    type:'GET_BOOKMARKS',
    bookmarks,
    orderBy
});
export const getResultsByOrder =(results,orderBy)=>({
    type:'GET_RESULTS_BYORDER',
    results,
    orderBy
});
export const getSearchResults = (query,pageNumber)=>({
    type:'GET_RESULTS',
    query,
    pageNumber
});
export const getUpdatedSearchResults = (query,pageNumber)=>({
    type:'UPDATE_SEARCHRESULTS',
    query,
    pageNumber
});
