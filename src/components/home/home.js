import React, {useEffect, useState} from 'react';
import './home.scss';
import NavHeader from "../nav-header/nav-header";
import NewsCard from "../newsCard/newsCard";
import { useHistory } from 'react-router-dom';

const Home = ({news, articles,loading, error, getNews, cancelApi})=>{
    const history = useHistory();
    const [value,setValue] =  useState('newest');

    useEffect(() => {
        getNews(value);
    },[value]);

    useEffect(() => {
        return () => {
          cancelApi();
        };
    }, []);

    const changeHandler = (e)=>{
        setValue(e.target.value);
    }
    const clickHandler = (list)=>{
        history.push({
            pathname: `/story/${list.id}`,
            state: list
        });
    }
    const renderedDiv = ()=>{
        if(loading){
            return <div className="loader-container"><div className="loader"></div></div>;
        }
        return <React.Fragment><div className="home-container--content home-container--content__news">
                {news && news.map(list=><NewsCard list={list} clickHandler = {clickHandler} key = {list.id}/>)}
            </div>
            {Object.keys(articles).map(list=><div key ={list} className="home-container--content">
                    <h1 className="home-container--content__header">{list}</h1>
                    {articles[list].map(data=><NewsCard list={data} clickHandler={clickHandler} key={data.id}/>)}
            </div>)}
        </React.Fragment>;      
    }

    return (
        <div className="home-container">
            <NavHeader title='Top Stories' isBookmark={true} isFilter={true} changeHandler = {changeHandler}/>
            { error ?<div className="home-container__error">Something Went Wrong. please try again</div> : renderedDiv()}
        </div>
    );
}
export default Home;