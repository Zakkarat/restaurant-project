import React, { Component } from 'react';
import {Redirect, withRouter} from "react-router-dom";
import {Button, Col, FormControl, InputGroup, Row} from "react-bootstrap";

export class FetchOrderId extends Component {
    static displayName = FetchOrderId.name;

    constructor(props) {
        super(props);
        this.state = { oldOrder: {}, order: {}, newOrder: {}, id: -1, loading: true, isAdd: false,
            newDish: "", action: "", isEdit:false, isEditError: false, isRedirect: false };
    }

    async initId(){
        await this.setState({...this.state,
            id: this.props.location.pathname.split('/')[2]});
    }

    componentDidMount() {
        this.initId();
        this.Order();
    }

    // handleChange({target}){
    //     this.setState(state => ({...state, search: target.value}));
    // }
    //
    // handleClick() {
    //     this.setState(state => ({...state, action: state.action === "Add" ? "" : "Add"}));
    // }
    //
    handleClickEdit() {
        this.setState(state => ({...state, isEdit: !state.isEdit}));
    }

    handleAddDish() {
        this.setState(state => ({...state, action: this.state.action === 'Add' ? '' : "Add"}));
    }

    handleDeleteDish() {
        this.setState(state => ({...state, action: this.state.action === 'Delete' ? '' : "Delete"}));
    }

    handleAddChange({target}) {
        this.setState(state => ({...state, newDish: target.value}));
    }


    //
    // handleClickDelete() {
    //     this.setState(state => ({...state, action: state.action === "Delete" ? "" : "Delete"}));
    // }
    //
    // handleAddChange({target}) {
    //     this.setState(state => ({...state, newIngredient: target.value}));
    // }
    //
    handleEditChange({target}) {
        const newOrder = this.state.newOrder;
        newOrder[target.ariaLabel] = target.value
        this.setState(state => ({...state, newOrder: newOrder}));
    }
    //
    async handleAdd() {
        if (this.state.newDish === '') {
            this.setState(state => ({...state, isError: true}))
            return
        }
        this.setState(state => ({...state, isError: false}));
        await fetch(`Order/addDish?orderId=${this.state.id}&dish=${this.state.newDish}`,
            {
                method: "POST"
            });
        await this.reload()
    }
    //
    async handleDelete() {
        if (this.state.order.dishes.some((elem) => elem === this.state.newDish) ||
            this.state.newDish === '') {
            this.setState(state => ({...state, isError: true}))
            return
        }
        this.setState(state => ({...state, isError: false}));
        await fetch(`Order/deleteDish?orderId=${this.state.id}&dish=${this.state.newDish}`,
            {
                method: "POST"
            });
        await this.reload()
    }
    //
    async handleSubmit() {
        if (this.state.newOrder.table < 1 || this.state.newOrder.table > 25 || !+this.state.newOrder.discount) {
            this.setState(state => ({...state, isEditError: true}))
            return;
        }
        this.setState(state => ({...state, isEditError: false}))
        await fetch(`Order/editOrder?orderId=${this.state.id}&tableId=${this.state.newOrder.table}&discount=${this.state.newOrder.discount}`,
            {
                method: "POST"
            });
        await this.reload()
        if (JSON.stringify(this.state.order) === JSON.stringify(this.state.oldOrder)) {
            this.setState(state => ({...state, isEditError: true}))
        }
    }
    
    //
    async handleDeleteOrder() {
        await fetch(`Order/deleteOrder?orderId=${this.state.id}`,
            {
                method: "POST"
            });
        this.setState(state => ({...state, isRedirect: true}))
    }

    async reload() {
        this.setState(state => ({...state, oldOrder:this.state.order, loading: true}))
        const response = await fetch(`order/${this.state.id}`);
        const data = await response.json();
        this.setState(state => ({...state, newOrder: {...data}, newDish: "", isEdit:false, order:data, loading:false,  action:""}));
    }


    renderOrder(order) {
        const accumulatedOrder = order.dishes
            .reduce((acc, curr) =>
            {
                acc.cookingTime += curr.item2;
                acc.price += curr.item3 * curr.item4;
                acc.amount += curr.item4;
                return acc;
            }, {cookingTime:0, price:this.state.order.discount, amount:0})
        return (
            <>
                <table className='table table-striped w-75 mx-auto' aria-labelledby="tabelLabel">
                    <thead>
                    <tr>
                        <th style={{textAlign:"center"}}>№</th>
                        <th style={{textAlign:"center"}}>Dish name</th>
                        <th style={{textAlign:"center"}}>Cooking time</th>
                        <th style={{textAlign:"center"}}>Price</th>
                        <th style={{textAlign:"center"}}>Amount</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        order.dishes.sort((a, b) => {
                            if (a.name < b.name) { return -1; }
                            if (a.name > b.name) { return 1; }
                            return 0;
                        }).map((dish, i) =>
                            <tr key={i + 1}>
                                <td>{i + 1}</td>
                                <td>{dish.item1}</td>
                                <td style={{textAlign:"center"}}>{dish.item2}</td>
                                <td style={{textAlign:"center"}}>{dish.item3}</td>
                                <td style={{textAlign:"center"}}>{dish.item4}</td>
                            </tr>
                        )}
                        <tr className="font-weight-bold">
                            <td style={{textAlign:"center"}} colSpan={2}>Overall:</td>
                            <td style={{textAlign:"center"}}>{accumulatedOrder.cookingTime}</td>
                            <td style={{textAlign:"center"}}>{accumulatedOrder.price}</td>
                            <td style={{textAlign:"center"}}>{accumulatedOrder.amount}</td>
                        </tr>
                    </tbody>
                </table>
            </>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderOrder(this.state.order);
            const {order} = this.state;
        return (
             <div>
                <h1 style={{textAlign:"center"}} className="mb-3" id="tabelLabel">Order №: {order.id}</h1>
                 <h3 style={{textAlign:"center"}} className="mb-3" id="tabelLabel">Table №: {order.table}</h3>
                 <h4 style={{textAlign:"center"}} className="mb-3" id="tabelLabel">Discount: {order.discount}</h4>
                <Row className="w-50 mb-3 mx-auto">
                    <Col className="pl-0 pr-md-2">
                        <Button variant="outline-info" block  onClick={() => this.handleClickEdit()}>
                            Edit order
                        </Button>
                    </Col>
                    {this.state.isRedirect && <Redirect to="/fetch-data"/>}
                    <Col className="pr-0 pl-md-2">
                        <Button variant="outline-danger" block onClick={()=>this.handleDeleteOrder()}>
                            Delete order
                        </Button>
                    </Col>
                </Row>
                 {this.state.isEdit && <><Row className="w-50 mx-auto">
                     <Col className="pl-0 pr-md-2">
                         <InputGroup className="mb-3">
                             <InputGroup.Prepend>
                                 <InputGroup.Text style={{width: "90px", textAlign: "center", display: "block"}}
                                                  id="inputGroup-sizing-sm">Discount</InputGroup.Text>
                             </InputGroup.Prepend>
                             <FormControl value={this.state.newOrder.discount}
                                          onChange={(e) => this.handleEditChange(e)}
                                          placeholder="Enter discount.."
                                          aria-label="discount"
                             />
                         </InputGroup>
                     </Col>
                     <Col className="pr-0 pl-md-2">
                         <InputGroup>
                             <InputGroup.Prepend>
                                 <InputGroup.Text style={{width: "90px", textAlign: "center", display: "block"}}
                                                  id="inputGroup-sizing-sm">Table №</InputGroup.Text>
                             </InputGroup.Prepend>
                             <FormControl value={this.state.newOrder.table}
                                          onChange={(e) => this.handleEditChange(e)}
                                          placeholder="Enter table number.."
                                          aria-label="table"
                             />
                         </InputGroup>
                     </Col>
                 </Row>
                 <Button variant="info" block className="w-25 mb-3 mx-auto" onClick={() => this.handleSubmit()}>
                     Submit
                 </Button>
                     {this.state.isEditError &&
                     <p style={{textAlign: "center", color: "red"}}
                        className="font-weight-bold">Something went wrong: try to enter another value.</p>}
                 </>
                 }
            <>
                {this.state.isRedirect && <Redirect to="/fetch-order"/>}
                {contents}
                
                 <Row className="w-50 mb-3 mx-auto">
                     <Col className="pl-0 pr-md-2">
                         <Button variant="success" block onClick={() => this.handleAddDish()}>
                             Add dish
                         </Button>
                     </Col>
                     <Col className="pr-0 pl-md-2">
                         <Button variant="danger" block onClick={()=>this.handleDeleteDish()}>
                             Remove dish
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
                </>}</>
            </div>
        );
    }

    async Order() {
        await this.setState({...this.state,
            id: this.props.location.pathname.split('/')[2]});

        const response = await fetch(`order/${this.state.id}`);
        const data = await response.json();
        await this.setState({ order: data, newOrder: {...data}, loading: false });

        console.log(this.state);
    }
}

export default withRouter(FetchOrderId);
