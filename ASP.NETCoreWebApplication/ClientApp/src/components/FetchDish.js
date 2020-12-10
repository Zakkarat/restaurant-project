import React, { Component } from 'react';
import {withRouter} from "react-router-dom";

export class FetchDish extends Component {
    static displayName = FetchDish.name;

    constructor(props) {
        super(props);
        this.state = { dish: {}, id: -1, loading: true };
    }

    async initId(){
        await this.setState({...this.state, 
            id: this.props.location.pathname.split('/')[2]});
    }
    
    componentDidMount() {
        this.initId();
        this.Dish();
    }

    static renderDish(dish) {
        return (
            <table className='table table-striped w-25 mx-auto' aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {dish.ingredients.sort((a, b) =>
                    {
                        if(a.name < b.name) { return -1; }
                        if(a.name > b.name) { return 1; }
                        return 0;
                    }
                ).map((ingredient, i) =>
                    <tr key={i + 1}>
                        <td>{i + 1}</td>
                        <td>{ingredient}</td>
                    </tr>
                )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchDish.renderDish(this.state.dish);

        return (
            <div>
                <h1 style={{textAlign:"center"}} className="mb-3" id="tabelLabel">{this.state.dish.name}</h1>
                <p style={{textAlign:"center"}} >
                    <span style={{fontWeight:"bold"}}>Cooking Time: </span> 
                    {this.state.dish.cookingTime}</p>
                <p style={{textAlign:"center"}} >
                    <span style={{fontWeight:"bold"}}>Price: </span> 
                    {this.state.dish.price}</p>
                {contents}
            </div>
        );
    }

    async Dish() {
        await this.setState({...this.state,
            id: this.props.location.pathname.split('/')[2]});

        const response = await fetch(`dish/${this.state.id}`);
        const data = await response.json();
        await this.setState({ dish: data, loading: false });

        console.log(this.state);
    }
}

export default withRouter(FetchDish);
