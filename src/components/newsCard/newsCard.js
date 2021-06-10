import './newsCard.scss';
import logo from './../../assets/Logo_White.png';

const NewsCard = (props)=>{
    const {list,clickHandler} =props;
    const {fields,id, webTitle} = list;
    return (
        <div className={`article ${fields.thumbnail?'':' fallback-article'}`} onClick={()=>clickHandler(list)}>
            {fields.thumbnail ?
                    <img src = {fields.thumbnail} alt={id}/>:
                    <div className="fallback-container"><img src={logo} alt="logo"/></div>
            }
            <div className="info-container">
                <div className="info-container--headline">{webTitle}</div>
                <div className="info-container--body">{(fields.bodyText).split('.')[0]}</div>
            </div>
        </div>
    )
}

export default NewsCard;