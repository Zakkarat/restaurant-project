import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div className="d-flex justify-content-center align-items-center flex-column">
        <h1>Welcome!</h1>
        <img style={{width:"auto", height:"70vh"}} alt="Restaurant" 
             src="https://images.pexels.com/photos/3201921/pexels-photo-3201921.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940" />
      </div>
    );
  }
}
