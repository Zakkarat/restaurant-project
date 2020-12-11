import React, { Component } from 'react';
import {InputGroup, FormControl, Button, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export class FetchIngredient extends Component {
    static displayName = FetchIngredient.name;

    constructor(props) {
        super(props);
        this.state = { ingredients: [], loading: true, search: "", isAdd: false, newIngredient: "", isError: false };
    }

    componentDidMount() {
        this.Ingredient();
    }
    
    handleChange({target}){
        this.setState(state => ({...state, search: target.value}));
    }
    
    handleClick() {
        this.setState(state => ({...state, isAdd: !state.isAdd}));
    }
 
    async handleAdd() {
        if (this.state.ingredients.some((elem) => elem.name === this.state.newIngredient) || 
        this.state.newIngredient === '') {
            this.setState(state => ({...state, isError: true}))
            return
        }
        this.setState(state => ({...state, isError: false}))
        await fetch(`Ingredient?ingredient=${this.state.newIngredient}`,
            {
                method: "POST"
        });
        this.setState(state => ({...state, loading: true}))
        const response = await fetch('ingredient');
        const data = await response.json();
        this.setState(state => ({...state,ingredients:data, loading:false,  newIngredient: "", isAdd:false}));
    }

    handleAddChange({target}) {
        this.setState(state => ({...state, newIngredient: target.value}));
    }

    renderIngredients(ingredients) {
        return (
            <>
            <Row className="justify-content-center align-items-center mx-auto mt-3 w-50">
                <Col>
                    <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                        <InputGroup.Text id="inputGroup-sizing-default">Search</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl value={this.state.search} 
                                 onChange={(e) => this.handleChange(e)}
                                 placeholder="Start entering.."
                                 aria-label="Default"
                                 aria-describedby="inputGroup-sizing-default"
                    />
                    </InputGroup>
                </Col>
                <Col className="mb-3" xs={5}>
                    <Button variant="success" block
                            onClick = {this.handleClick.bind(this)}>
                        Add ingredient
                    </Button>
                </Col>
            </Row>
                {this.state.isAdd &&
                    <>
                    <InputGroup className="mb-3 w-25 mx-auto">
                        <FormControl value={this.state.newIngredient}
                                     onChange={(e) => this.handleAddChange(e)}
                                     placeholder="Start entering.."
                                     aria-label="Recipient's username"
                                     aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <Button variant="outline-success" onClick={() => this.handleAdd()}>Add</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    {this.state.isError && 
                    <p style={{textAlign:"center", color:"red"}} 
                          className="font-weight-bold">Something went wrong: try to enter another value.</p>}
                </>
                }
            <table className='table table-striped w-25 mx-auto' aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {
                    ingredients.sort((a, b) =>
                    {
                        if(a.name < b.name) { return -1; }
                        if(a.name > b.name) { return 1; }
                        return 0;
                    }
                ).filter(ingredients => {
                    const regex = new RegExp(`\\b${this.state.search}`,"gi");
                    return ingredients.name.match(regex)
                })
                    .map((ingredients, i) =>
                    <tr key={ingredients.id}>
                        <td>{i + 1}</td>
                        <td><Link to={`fetch-ingredient-id/${ingredients.id}`}>{ingredients.name}</Link></td>
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
