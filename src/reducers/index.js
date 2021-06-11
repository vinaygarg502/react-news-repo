const reducer = (state = {bookmarks:[],searchResults:[], page:1 }, action) => { 
    switch (action.type) {
        case 'GET_NEWS':
            return { ...state, loading: true };
        case 'GET_RESULTS':
            return { ...state, loading: true };
        case 'SET_FLAG':
            return {...state,flag: action.flag}
        case 'NEWS_RECEIVED':
            return { ...state, stories: [...action.json.stories], articles:[...action.json.articles], loading: false };
        case 'UPDATE_BOOKMARK':
            return {...state,bookmarks: [...state.bookmarks, action.bookmark]};
        case 'REMOVE_BOOKMARK':
            return {...state,bookmarks:(state.bookmarks).filter(bookmark => bookmark.id !== action.id)}
        case 'BOOKMARKS_RECEIVED':
            return {...state,bookmarks:[...action.bookmarks]};
        case 'SEARCH_RESULTS':
            return {...state,searchResults:[...action.search], loading:false};
        case 'UPDATE_RESULTS':
            return {...state,searchResults:state.searchResults.concat(action.search)};
        case 'SET_PAGE':
            return {...state,page:action.page}
        case "ERROR":
            return {...state, loading:false,error:action.msg};
       default:
          return state;
     }
  };
  export default reducer;