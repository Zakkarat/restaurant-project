import React, { Component } from 'react';
import {Button, Col, FormControl, InputGroup, Row} from "react-bootstrap";
import {withRouter, Redirect} from "react-router-dom";

class FetchIngredientId extends Component {
    static displayName = FetchIngredientId.name;

    constructor(props) {
        super(props);
        this.state = { ingredient: {}, id: -1, loading: true, isRedirect: false };
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
                method: "POST"
            });
        this.setState(state => ({...state, isRedirect: true}))
    }
    
    render() {
        return (
            <div style={{height:"80vh"}} className="d-flex justify-content-center align-content-center">
                <div className="align-self-center">
                    <h1 style={{textAlign:"center"}} className="mb-3" id="tabelLabel">
                        <span className="font-weight-normal">Ingredient name:</span> {this.state.ingredient.name}.</h1>
                    <Row className="justify-content-center align-items-center mx-auto mt-3">
                        <Col xs={6}>
                            <Button variant="outline-success" block>
                                Edit ingredient
                            </Button>
                        </Col>
                        {this.state.isRedirect&&<Redirect to="/fetch-ingredient"/>}
                        <Col xs={6}>
                            <Button variant="outline-danger" block onClick={()=>this.handleDelete()}>
                                Remove ingredient
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }

    async Ingredient() {
        await this.setState({...this.state,
            id: this.props.location.pathname.split('/')[2]});

        const response = await fetch(`ingredient`);
        let data = await response.json();
        data = data.filter(elem => elem.id === +this.state.id)[0];
        await this.setState({ ingredient: data, loading: false });

        console.log(this.state);
    }
}

export default withRouter(FetchIngredientId);