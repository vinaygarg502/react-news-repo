import './nav-header.scss';
import bookmarkIcon from './../../assets/bookmarkon-icon@2x.svg';
import { useHistory } from 'react-router-dom';

const NavHeader = ({title,isBookmark, isFilter, changeHandler})=>{
    const history = useHistory()

    const goToBookmark = ()=>{
        history.push({
            pathname: `/bookmarks`
        });
    }
    return (
        <div className="nav-heading">
            <h1>{title}</h1>
            <div className="nav-heading--bookmark">
                {isBookmark && <button onClick={goToBookmark}>
                    <img src = {bookmarkIcon} alt="bookmark"/>
                    <span>VIEW BOOKMARK</span>
                </button>}
            </div>
            <div className="nav-heading--filter">
                {isFilter && <select name="filter" id="filter" onChange={(e)=>changeHandler(e)}>
                    <option value="newest">Newest</option>
                    <option value="oldest">Oldest</option>
                    <option value="relevance">By Relevance</option>
                </select>}
            </div>
        </div>
    )
}
export default NavHeader;