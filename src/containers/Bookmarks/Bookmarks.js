import { connect } from 'react-redux';
import Bookmarks from '../../components/bookmarks/bookmarks';
import { getBookmarks } from '../../actions';


const mapStateToProps = (state) => {
    return {
        bookmarks: state.bookmarks
    }
};
const mapDispatchToProps = (dispatch)=>({
    getBookmarks: (bookmarks, orderBy)=>{dispatch(getBookmarks(bookmarks, orderBy))}
});

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks);