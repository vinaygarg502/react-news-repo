import Story from '../../components/story/story';
import { connect } from 'react-redux';
import { updateBookmark, removeBookmark, setFlag } from '../../actions';



const mapStateToProps = (state) => {
    
    return {
        bookmarks: state.bookmarks,
        loading:state.loading,
        flag:state.flag
    }
};
const mapDispatchToProps = (dispatch)=>({
    updateBookmark: (bookmark)=>{dispatch(updateBookmark(bookmark))},
    removeBookmark:(id)=>{dispatch(removeBookmark(id))},
    setFlag:(flag)=>{dispatch(setFlag(flag))}
});

export default connect(mapStateToProps, mapDispatchToProps)(Story);