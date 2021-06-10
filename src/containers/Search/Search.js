import { connect } from 'react-redux';
import Search from '../../components/search/search';
import { getUpdatedSearchResults,getSearchResults, getResultsByOrder} from '../../actions';


const mapStateToProps = (state) => {
    return {
        searchResults: state.searchResults,
        loading:state.loading,
        page:state.page
    }
};
const mapDispatchToProps = (dispatch)=>({
    getSearchResults:(query, pageNumber)=>{dispatch(getSearchResults(query, pageNumber))},
    getUpdatedSearchResults:(query, pageNumber)=>{dispatch(getUpdatedSearchResults(query, pageNumber))},
    getResultsByOrder: (results, orderBy)=>{dispatch(getResultsByOrder(results, orderBy))}
});

export default connect(mapStateToProps, mapDispatchToProps)(Search);