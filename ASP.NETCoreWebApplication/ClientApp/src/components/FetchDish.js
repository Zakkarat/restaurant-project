import React, { Component } from 'react';
import {Redirect, withRouter} from "react-router-dom";
import {Button, Col, FormControl, InputGroup, Row} from "react-bootstrap";

export class FetchDish extends Component {
    static displayName = FetchDish.name;

    constructor(props) {
        super(props);
        this.state = { dish: {}, id: -1, loading: true, isAdd: false, newIngredient: "", isError: false };
    }

    async initId(){
        await this.setState({...this.state, 
            id: this.props.location.pathname.split('/')[2]});
    }
    
    componentDidMount() {
        this.initId();
        this.Dish();
    }

    handleChange({target}){
        this.setState(state => ({...state, search: target.value}));
    }

    handleClick() {
        this.setState(state => ({...state, isAdd: !state.isAdd}));
    }


    handleAddChange({target}) {
        this.setState(state => ({...state, newIngredient: target.value}));
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
                <Row className="justify-content-center align-items-center mx-auto mt-3 mb-3 w-50">
                    <Col xs={6}>
                        <Button variant="success" block onClick = {()=>this.handleClick()}>
                            Add ingredient
                        </Button>
                    </Col>
                    {this.state.isRedirect&&<Redirect to="/fetch-ingredient"/>}
                    <Col xs={6}>
                        <Button variant="danger" block onClick={()=>this.handleDelete()}>
                            Remove ingredient
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
                        <Button variant="info" onClick={() => this.handleAdd()}>Add</Button>
                    </InputGroup.Append>
                </InputGroup>
                {this.state.isError &&
                <p style={{textAlign:"center", color:"red"}}
                   className="font-weight-bold">Something went wrong: try to enter another value.</p>}
            </>
            }
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
