import React, { Component } from 'react';
import {Redirect, withRouter} from "react-router-dom";
import {Button, Col, FormControl, InputGroup, Row} from "react-bootstrap";

export class FetchDish extends Component {
    static displayName = FetchDish.name;

    constructor(props) {
        super(props);
        this.state = { oldDish: {}, dish: {}, newDish: {}, id: -1, loading: true, isAdd: false, 
            newIngredient: "", action: "", isEdit:false, isEditError: false, isRedirect: false };
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
        this.setState(state => ({...state, action: state.action === "Add" ? "" : "Add"}));
    }

    handleClickEdit() {
        this.setState(state => ({...state, isEdit: !state.isEdit}));
    }

    handleClickDelete() {
        this.setState(state => ({...state, action: state.action === "Delete" ? "" : "Delete"}));
    }
    
    handleAddChange({target}) {
        this.setState(state => ({...state, newIngredient: target.value}));
    }

    handleEditChange({target}) {
        const newDish = this.state.newDish;
        newDish[target.ariaLabel] = target.value
        this.setState(state => ({...state, newDish: newDish}));
    }
    
    async handleAdd() {
        if (this.state.dish.ingredients.some((elem) => elem === this.state.newIngredient) ||
            this.state.newIngredient === '') {
            this.setState(state => ({...state, isError: true}))
            return
        }
        this.setState(state => ({...state, isError: false}))
        await fetch(`Dish/addIngredient?dishId=${this.state.id}&ingredient=${this.state.newIngredient}`,
            {
                method: "PUT"
            });
        await this.reload()
    }

    async handleDelete() {
        if (!this.state.dish.ingredients.some((elem) => elem === this.state.newIngredient) ||
            this.state.newIngredient === '') {
            this.setState(state => ({...state, isError: true}))
            return
        }
        this.setState(state => ({...state, isError: false}))
        await fetch(`Dish/deleteIngredient?dishId=${this.state.id}&ingredient=${this.state.newIngredient}`,
            {
                method: "DELETE"
            });
        await this.reload()
    }
    
    async handleSubmit() {
        this.setState(state => ({...state, isEditError: false}))
        await fetch(`Dish/editDish?dishId=${this.state.id}&name=${this.state.newDish.name.split(' ').join('%20')}&cookingTime=${this.state.newDish.cookingTime}&price=${this.state.newDish.price}`,
            {
                method: "POST"
            });
        await this.reload()
        if (JSON.stringify(this.state.dish) === JSON.stringify(this.state.oldDish)) {
            this.setState(state => ({...state, isEditError: true}))
        }
    }
    
    async handleDeleteDish() {
        await fetch(`Dish/deleteDish?dishId=${this.state.id}`,
            {
                method: "DELETE"
            });
        this.setState(state => ({...state, isRedirect: true}))
    }
    
    async reload() {
        this.setState(state => ({...state, oldDish:this.state.dish, loading: true}))
        const response = await fetch(`dish/${this.state.id}`);
        const data = await response.json();
        this.setState(state => ({...state, dish:data, loading:false,  newIngredient: "", action:""}));
    }
    
    
    renderDish(dish) {
        return (
            <>
            {
                dish.ingredients.length !== 0 &&
                    <table className='table table-striped w-25 mx-auto' aria-labelledby="tabelLabel">
                        <thead>
                        <tr>
                            <th>№</th>
                            <th>Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            dish.ingredients.sort((a, b) => {
                                    if (a < b) {
                                        return -1;
                                    }
                                    if (a > b) {
                                        return 1;
                                    }
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
            }
            </>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderDish(this.state.dish);

        return (
            <div>
                <h1 style={{textAlign:"center"}} className="mb-3" id="tabelLabel">{this.state.dish.name}</h1>
                <p style={{textAlign:"center"}} >
                    <span style={{fontWeight:"bold"}}>Cooking Time: </span> 
                    {this.state.dish.cookingTime}</p>
                <p style={{textAlign:"center"}} >
                    <span style={{fontWeight:"bold"}}>Price: </span> 
                    {this.state.dish.price}</p>
                <Row className="w-50 mb-3 mx-auto">
                    <Col className="pl-0 pr-md-2">
                        <Button variant="outline-info" block  onClick={() => this.handleClickEdit()}>
                            Edit dish
                        </Button>
                    </Col>
                        {this.state.isRedirect && <Redirect to="/fetch-data"/>}
                    <Col className="pr-0 pl-md-2">
                        <Button variant="outline-danger" block onClick={()=>this.handleDeleteDish()}>
                            Delete dish
                        </Button>
                    </Col>
                </Row>
                {this.state.isEdit ?
                <>
                    <InputGroup className="mb-3 w-50 mx-auto">
                        <InputGroup.Prepend>
                            <InputGroup.Text style={{width:"70px", textAlign:"center", display:"block"}} id="inputGroup-sizing-sm">Name</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl value={this.state.newDish.name}
                                     onChange={(e) => this.handleEditChange(e)}
                                     placeholder="Enter name.."
                                     aria-label="name"
                        />
                    </InputGroup>
                    <Row className="w-50 mx-auto">
                        <Col className="pl-0 pr-md-2">
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={{width:"70px", textAlign:"center", display:"block"}} id="inputGroup-sizing-sm">Time</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl value={this.state.newDish.cookingTime}
                                         onChange={(e) => this.handleEditChange(e)}
                                         placeholder="Enter cooking time.."
                                         aria-label="cookingTime"
                            />
                        </InputGroup>
                        </Col>
                        <Col className="pr-0 pl-md-2">
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text style={{width:"70px", textAlign:"center", display:"block"}} id="inputGroup-sizing-sm">Price</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl value={this.state.newDish.price}
                                         onChange={(e) => this.handleEditChange(e)}
                                         placeholder="Enter price.."
                                         aria-label="price"
                            />
                        </InputGroup>
                        </Col>
                    </Row>
                    {this.state.isEditError &&
                    <p style={{textAlign: "center", color: "red"}}
                       className="font-weight-bold">Something went wrong: try to enter another value.</p>}
                    <Button variant="info" block className="w-25 mb-3 mx-auto" onClick={() => this.handleSubmit()}>
                        Submit
                    </Button>
                </> :
                    <>
                {contents}
                <Row className="justify-content-center align-items-center mx-auto mt-3 mb-3 w-50">
                    <Col className="pl-0 pr-md-2">
                        <Button variant="success" block onClick = {()=>this.handleClick()}>
                            Add ingredient
                        </Button>
                    </Col>
                    <Col  className="pr-0 pl-md-2">
                        <Button variant="danger" block onClick={()=>this.handleClickDelete()}>
                            Remove ingredient
                        </Button>
                    </Col>
                </Row>
                        {this.state.action &&
                        <>
                            <InputGroup className="mb-3 w-25 mx-auto">
                                <FormControl value={this.state.newIngredient}
                                             onChange={(e) => this.handleAddChange(e)}
                                             placeholder="Start entering.."
                                             aria-label="Recipient's username"
                                             aria-describedby="basic-addon2"
                                />
                                <InputGroup.Append>
                                    <Button variant="info"
                                            onClick={() => this.state.action === "Add" ? this.handleAdd() : this.handleDelete()}>{this.state.action}</Button>
                                </InputGroup.Append>
                            </InputGroup>
                            {this.state.isError &&
                            <p style={{textAlign: "center", color: "red"}}
                               className="font-weight-bold">Something went wrong: try to enter another value.</p>}
                        </>
                        }
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
        await this.setState({ dish: data, newDish: {...data}, loading: false });

        console.log(this.state);
    }
}

export default withRouter(FetchDish);
