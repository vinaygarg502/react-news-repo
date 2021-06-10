import { put, takeLatest, all, call } from 'redux-saga/effects';
import {api, newsSection,otherSection,apiKey, showFields, element} from './../constants/index';

function getResult(api){
    return fetch(api).then(response=>{
        return response.json();
      }).then(data=>data.response).catch((error) => {
            return error;
      });;
}
function getResultsbyOrder(results, orderBy){
    if((orderBy.toLowerCase())==='newest'){
        return results.sort((resultA, resultB)=>(new Date(resultB.webPublicationDate))-(new Date(resultA.webPublicationDate)))
    } else {
        return results.sort((resultA, resultB)=>(new Date(resultA.webPublicationDate))-(new Date(resultB.webPublicationDate)))
    }
}

function* fetchLatestNews({orderBy}) {
    try {
        const [stories, articles] = yield all([
            call(getResult, `${api}search?section=${newsSection}&order-by=${orderBy}&show-elements=${element}&show-fields=${showFields}&api-key=${apiKey}`),
            call(getResult, `${api}search?section=${otherSection}&order-by=${orderBy}&show-elements=${element}&show-fields=${showFields}&page-size=15&api-key=${apiKey}`)
        ]);
        yield put({ type: "NEWS_RECEIVED", json: {stories:[...stories.results],articles:[...articles.results]} });
    } catch(error) {
        yield put({type:"ERROR",msg:error});
    }
    
}

function* fetchBookmarks({bookmarks, orderBy}) {
    const orderedBookmarks = yield call(getResultsbyOrder,bookmarks,orderBy)

    yield put({ type: "BOOKMARKS_RECEIVED", bookmarks: orderedBookmarks  });
}

function* fetchResultsByOrder({results, orderBy}) {
    const orderedResults = yield call(getResultsbyOrder,results,orderBy)

    yield put({ type: "SEARCH_RESULTS", search: [...orderedResults]});
}

function* fetchSearchResults({query,pageNumber}){
    try {
        const searchObj = yield call(getResult,`${api}search?section=${newsSection}&order-by=newest&show-elements=${element}&show-fields=${showFields}&page=${pageNumber}&page-size=15&q=${query}&api-key=${apiKey}`);
        
        if(pageNumber===1){
            yield put({type:"SEARCH_RESULTS", search:[...searchObj.results]});
        } else {
            yield put({type:"UPDATE_RESULTS", search:[...searchObj.results]});
        }
    } catch(error) {
        yield put({type:"ERROR",msg:error});
    }
    
}

function* actionWatcher() {
    yield takeLatest('GET_NEWS', fetchLatestNews);
}

function* actionBookmarkWatcher() {
    yield takeLatest('GET_BOOKMARKS', fetchBookmarks);
}

function* actionOrderByResultsWatcher() {
    yield takeLatest('GET_RESULTS_BYORDER', fetchResultsByOrder);
}

function* actionSearchResultWatcher(){
    yield takeLatest('GET_RESULTS',fetchSearchResults)
}
function* actionUpdateSearchResultWatcher(){
    yield takeLatest('UPDATE_SEARCHRESULTS',fetchSearchResults)
}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
        actionBookmarkWatcher(),
        actionSearchResultWatcher(),
        actionUpdateSearchResultWatcher(),
        actionOrderByResultsWatcher()
    ]);
}