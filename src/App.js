import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Review from './components/Review/Review';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import Manage from './components/Manage/Manage';
import { AuthContextProvider } from './components/Login/useAuth';

function App(props) {
  return (
    <div>
      <AuthContextProvider>
        <Header></Header>
        <Router>
          <Switch>
            <Route exact path="/shop">
              <Shop></Shop>
            </Route>
            <Route path="/">
              <Shop></Shop>
            </Route>
            <Route path="/review">
              <Review></Review>
            </Route>
            <Route path="/manage">
              <Manage></Manage>
            </Route>
            <Route path="/product/:productKey">
              <ProductDetail></ProductDetail>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="*">
              <NotFound></NotFound>
            </Route>
          </Switch>
        </Router>
      </AuthContextProvider>
    </div>

  );
}

export default App;
