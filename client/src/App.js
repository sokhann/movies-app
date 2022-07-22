import React, {Suspense} from 'react';
import {Route, Switch} from "react-router-dom";
import Auth from "./auth";

import HomePage from "./pages/HomePage/HomePage.js";
import LoginPage from "./pages/LoginPage/LoginPage.js";
import RegisterPage from "./pages/RegisterPage/RegisterPage.js";
import {MoviePage} from "./pages/MoviePage";
import {NavBar} from "./components/NavBar";
import Footer from "./components/Footer/Footer"
import {FavoritesPage} from "./pages/FavoritesPage";

function App() {
    return (
        <Suspense fallback={(<div>Loading...</div>)}>
            <NavBar/>
            <div className={'app'}>
                <Switch>
                    <Route exact path="/" component={Auth(HomePage, null)}/>
                    <Route exact path="/sign-in" component={Auth(LoginPage, false)}/>
                    <Route exact path="/sign-up" component={Auth(RegisterPage, false)}/>
                    <Route exact path="/movie/:movieId" component={Auth(MoviePage, null)}/>
                    <Route exact path="/favorites" component={Auth(FavoritesPage, true)}/>
                </Switch>
            </div>
            <Footer/>
        </Suspense>
    );
}

export default App;
