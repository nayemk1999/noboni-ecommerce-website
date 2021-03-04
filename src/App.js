
import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop'
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Invantory from './components/Invantory/Invantory';
import NotFound from './components/NotFound/NotFound';
import ProductDetails from './components/ProductDetails/ProductDetails';


function App() {

  return (
    <div className='container'>
      <Header></Header>
      <Router>
        <Switch>
          <Route path="/shop">
            <Shop></Shop>
          </Route>
          <Route path="/order-reviews">
            <Review></Review>
          </Route>
          <Route path="/manage-inventory">
            <Invantory></Invantory>
          </Route>
          <Route exact path="/">
            <Shop></Shop>
          </Route>
          <Route path="/product/:productKey">
            <ProductDetails></ProductDetails>
          </Route>
          <Route path="*">
            <NotFound></NotFound>
          </Route>
        </Switch>
      </Router>



    </div>

  )
}

export default App;
