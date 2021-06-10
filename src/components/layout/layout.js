import React from 'react';
import { Route, Switch } from "react-router-dom";
import Home from './../../containers/Home/Home';
import Search from './../../containers/Search/Search';
import Bookmarks from './../../containers/Bookmarks/Bookmarks';
import Story from './../../containers/Story/Story';
import Footer from './../footer/footer';
import Header from './../header/header';

const Layout = function(){
    const routes = (<Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={Search} />
        <Route path="/bookmarks" component={Bookmarks} />
        <Route path="/story/:id" component={Story} />
      </Switch>);
    return (
        <React.Fragment>
            <Header />
                {routes}
            <Footer />
        </React.Fragment>
    )
}

export default Layout;