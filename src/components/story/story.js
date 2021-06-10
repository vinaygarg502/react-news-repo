import bookmarkIcon from './../../assets/bookmarkon-icon@2x.svg';
import bookmarkOffIcon from './../../assets/bookmarkoff-icon@2x.svg';
import './story.scss';
let timerId =0;
const Story = ({location,bookmarks, flag, removeBookmark,updateBookmark, setFlag})=>{

    let isBookMark = bookmarks.find(bookmark=>location.state.id===bookmark.id);
    

    const toggleBookmark = ()=>{
        if(timerId){
            clearTimeout(timerId);
        }

        if(isBookMark){
            removeBookmark(location.state.id);
        } else{
            updateBookmark(location.state);
        };

        setFlag(true);

        timerId = setTimeout(() => {
            setFlag(false);
            timerId = null;
        }, 1000);   
    }

    return (
        <div className="story-container" >
            <div>
                <button onClick={()=>toggleBookmark(location.state.id)}>
                    <img src ={bookmarkIcon} alt="bookmark"/>
                    <span>{isBookMark?'REMOVE':'ADD'} BOOKMARK</span>
                </button>
                <p className="date-box">{(new Date(location.state.webPublicationDate).toString())}</p>
                <p className="heading-box">{location.state.webTitle}</p>
                <p className="subheading-box">{location.state.fields.headline}</p>
                <div className="body-box">
                    <div>
                        {((location.state.fields.bodyText).split('.')).map((list, index)=><p key = {`${list}-${index}`}>{list}</p>)}
                    </div>
                    <div>
                        {location.state.fields.thumbnail && <img src ={location.state.fields.thumbnail} alt={location.state.id} />}
                    </div>
                </div>
            </div>
            {flag && <div className={ `bookmark-text ${isBookMark ? ' bookmark-succes': ' bookmark-removed'}`}>{isBookMark ? 
                <p>
                    <img src={bookmarkIcon} alt="bookmark added" />
                    <span>SAVED TO BOOKMARKS</span>
                </p>:
                <p>
                    <img src={bookmarkOffIcon} alt="bookmark removed" />
                    <span>REMOVED FROM BOOKMARKS</span>
                </p>}
            </div>}
        </div>
    );
}

export default Story;