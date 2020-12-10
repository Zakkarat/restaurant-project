import React, { Component } from 'react';
import {InputGroup, FormControl} from "react-bootstrap";

export class FetchIngredient extends Component {
    static displayName = FetchIngredient.name;

    constructor(props) {
        super(props);
        this.state = { ingredients: [], loading: true, search: "" };
        // this.handleChange.bind(this);
    }

    componentDidMount() {
        this.Ingredient();
    }
    
    handleChange({target}){
        // console.log(e.target);
        this.setState(state => ({...state, search: target.value}));
    }

    renderIngredients(ingredients) {
        return (
            <>
            <InputGroup className="mb-3 w-25 mx-auto">
            <InputGroup.Prepend>
                <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl value={this.state.search} onChange={(e) => this.handleChange(e)}
                placeholder="Start entering.."
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
            />
            </InputGroup>
            
            <table className='table table-striped w-25 mx-auto' aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {ingredients.sort((a, b) =>
                    {
                        if(a.name < b.name) { return -1; }
                        if(a.name > b.name) { return 1; }
                        return 0;
                    }
                ).filter(ingredients => {
                    const regex = new RegExp(`\\b${this.state.search}`,"gi");
                    return ingredients.name.match(regex)
                })
                    .map((ingredients,i) =>
                    <tr key={ingredients.id}>
                        <td>{i + 1}</td>
                        <td>{ingredients.name}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderIngredients(this.state.ingredients);

        return (
            <div>
                <h1 style={{textAlign:"center"}} id="tabelLabel" >Ingredients</h1>

                {contents}
            </div>
        );
    }

    async Ingredient() {
        const response = await fetch('ingredient');
        const data = await response.json();
        this.setState({ ingredients: data, loading: false });
    }
}
