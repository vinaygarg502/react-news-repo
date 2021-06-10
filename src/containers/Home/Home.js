import Home from '../../components/home/home';
import { connect } from 'react-redux';
import { getNews } from '../../actions';

const mapStateToProps = (state) => {
    let sectionData = {};
    
    state.articles && (state.articles).forEach(element => {
        if(!sectionData[element.sectionName]) sectionData[element.sectionName] = [];

        sectionData[element.sectionName].push(element);
    });
    return {
        news: state.stories,
        articles: sectionData,
        loading:state.loading,
        error:state.error
    }
};
const mapDispatchToProps = (dispatch)=>({
    getNews: (orderBy)=>{dispatch(getNews(orderBy))}
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);