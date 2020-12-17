import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import FetchData from './components/FetchData';

import './custom.css'
import {FetchDish} from "./components/FetchDish";
import {FetchIngredient} from "./components/FetchIngredient";
import FetchIngredientId from "./components/FetchIngredientId";
import {FetchOrder} from './components/FetchOrder';
import FetchOrderId from "./components/FetchOrderId";

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/fetch-data' component={FetchData} />
        <Route path='/fetch-dish/:id' component={FetchDish} />
        <Route path='/fetch-ingredient' component={FetchIngredient} />
        <Route path='/fetch-ingredient-id/:id' component={FetchIngredientId} />
        <Route path='/fetch-order' component={FetchOrder} />
        {<Route path='/fetch-order-id/:id' component={FetchOrderId} />}
      </Layout>
    );
  }
}
