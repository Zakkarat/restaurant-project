import React, { Component } from 'react';
import {withRouter, Link} from "react-router-dom";

class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { dishes: [], loading: true };
  }

  componentDidMount() {
    this.Menu();
  }

  static renderMenu(dishes) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>№</th>
            <th>Name</th>
            <th>Cooking Time</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {dishes.sort((a, b) => 
          {
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
          }
          ).map((dish,i) =>
            <tr key={dish.id}>
              <td>{i + 1}</td>
              <td><Link to={`fetch-dish/${dish.id}`}>{dish.name}</Link></td>
              <td>{dish.cookingTime}</td>
              <td>{dish.price}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderMenu(this.state.dishes);

    return (
      <div>
        <h1 style={{textAlign:"center"}} id="tabelLabel" >Restaurant Menu</h1>
        
        {contents}
      </div>
    );
  }

  async Menu() {
    const response = await fetch('dish');
    const data = await response.json();
    this.setState({ dishes: data, loading: false });
  }
}
export default withRouter(FetchData);