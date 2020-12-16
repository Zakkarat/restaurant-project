import React, { Component } from 'react';
import {Button, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import {withRouter, Redirect} from "react-router-dom";

class FetchIngredientId extends Component {
    static displayName = FetchIngredientId.name;

    constructor(props) {
        super(props);
        this.state = { ingredient: {}, id: -1, loading: true, isRedirect: false, isEdit: false, newIngredient: "", ingredients: [] };
    }

    async initId(){
        await this.setState({...this.state,
            id: this.props.location.pathname.split('/')[2]});
    }

    componentDidMount() {
        this.initId();
        this.Ingredient();
        console.log(this.props);
    }

    async handleDelete() {
        await fetch(`Ingredient/delete?ingredient=${this.state.ingredient.name}`,
            {
                method: "DELETE"
            });
        this.setState(state => ({...state, isRedirect: true}))
    }

    handleEdit(){
        this.setState(state => ({...state, isEdit: !state.isEdit}));
    }

    handleEditChange({target}){
        this.setState(state => ({...state, newIngredient: target.value}));
    }
    
    async handleApiEdit(){
        if (this.state.ingredients.some((elem) => elem.name === this.state.newIngredient) ||
            this.state.newIngredient === '' || !Number.isNaN(+this.state.newIngredient)) {
            this.setState(state => ({...state, isError: true}))
            return
        }
        this.setState(state => ({...state, isError: false}))
        await fetch(`Ingredient/edit?oldIngredient=${this.state.id}&newIngredient=${this.state.newIngredient}`,
            {
                method: "POST"
            });
        this.setState(state => ({...state, loading: true}))
        const response = await fetch('ingredient');
        const data = await response.json();
        const data2 = data.filter(elem => elem.id === +this.state.id)[0];
        this.setState(state => ({...state, ingredient:data2, ingredients:data, loading:false,  newIngredient: "", isEdit:false}));
    }
    
    render() {
        return (
            <div style={{height:"80vh"}} className="d-flex justify-content-center align-content-center">
                <div className="align-self-center">
                    <h1 style={{textAlign:"center"}} className="mb-3" id="tabelLabel">
                        <span className="font-weight-normal">Ingredient name:</span> {this.state.ingredient.name}.</h1>
                    <Row className="justify-content-center align-items-center mx-auto mt-3">
                        <Col xs={6}>
                            <Button variant="success" block onClick={() => this.handleEdit()}>
                                Edit ingredient
                            </Button>
                        </Col>
                        {this.state.isRedirect&&<Redirect to="/fetch-ingredient"/>}
                        <Col xs={6}>
                            <Button variant="danger" block onClick={()=>this.handleDelete()}>
                                Remove ingredient
                            </Button>
                        </Col>
                    </Row>
                    {this.state.isEdit &&
                    <>
                        <InputGroup className="mt-3 w-75 mx-auto">
                            <FormControl value={this.state.newIngredient}
                                         onChange={(e) => this.handleEditChange(e)}
                                         placeholder="Start entering.."
                                         aria-label="Recipient's username"
                                         aria-describedby="basic-addon2"
                            />
                            <InputGroup.Append>
                                <Button variant="outline-info" onClick={() => this.handleApiEdit()}>Edit</Button>
                            </InputGroup.Append>
                        </InputGroup>
                        {this.state.isError &&
                        <p style={{textAlign: "center", color: "red"}}
                           className="font-weight-bold">Something went wrong: try to enter another value.</p>}
                    </>
                    }
                </div>
            </div>
        );
    }

    async Ingredient() {
        await this.setState({...this.state,
            id: this.props.location.pathname.split('/')[2]});

        const response = await fetch(`ingredient`);
        const data = await response.json();
        const data2 = data.filter(elem => elem.id === +this.state.id)[0];
        await this.setState(state => ({...state, ingredient: data2, loading: false }));

        console.log(this.state);
    }
}

export default withRouter(FetchIngredientId);