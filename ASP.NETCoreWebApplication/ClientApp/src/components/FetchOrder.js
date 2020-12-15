import React, { Component } from 'react';
import {withRouter, Link, Redirect} from "react-router-dom";
import {Button, Col, FormControl, InputGroup, Row} from "react-bootstrap";

export class FetchOrder extends Component {
    static displayName = FetchOrder.name;

    constructor(props) {
        super(props);
        this.state = { orders: [], newOrder: '', loading: true, isAdd: false, isError: false };
    }

    componentDidMount() {
        this.Orders();
    }

    handleClick() {
        this.setState(state => ({...state, isAdd:!state.isAdd}))
    }

    handleChange({target}){
        this.setState(state => ({...state, newOrder: target.value}));
    }
    //
    async handleAdd() {
        this.setState(state => ({...state, isError: false}))
        await fetch(`Order/addOrder?tableId=${this.state.newOrder}`,
            {
                method: "POST"
            });
        await this.reload()
    }
    //
    // handleEditChange({target}) {
    //     const newDish = this.state.newDish;
    //     newDish[target.ariaLabel] = target.value
    //     this.setState(state => ({...state, newDish: newDish}));
    // }
    //
    async reload() {
        const response = await fetch('order');
        const data = await response.json();
        this.setState(state => ({ ...state, isAdd: false, newOrder: '', orders: data, loading: false }));
    }


    renderOrder(orders) {
        return (
            <table className='table table-striped w-25 mx-auto' aria-labelledby="tabelLabel">
                <thead>
                <tr>
                    <th>№</th>
                    <th>Table №</th>
                    <th>Order №</th>
                </tr>
                </thead>
                <tbody>
                {
                    orders.sort((a, b) =>
                    {
                        if(a.table < b.table) { return -1; }
                        if(a.table > b.table) { return 1; }
                        return 0;
                    }
                ).map((order,i) =>
                        <tr key={order.id}>
                            <td>{i + 1}</td>
                            <td style={{textAlign:"center"}}>{order.table}</td>
                            <td style={{textAlign:"center"}}><Link to={`fetch-order-id/${order.id}`}>{order.id}</Link></td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.renderOrder(this.state.orders);

        return (
            <div>
                <h1 style={{textAlign:"center"}} id="tabelLabel" >Orders</h1>
                <Col className="w-25 mb-3 mx-auto pl-0 pr-0">
                    <Button variant="outline-success" block 
                            onClick={() => this.handleClick()}>
                        Add order
                    </Button>
                </Col>
                {this.state.isAdd &&
                    <>
                <InputGroup className="mb-3 w-25 mx-auto">
                    <FormControl value={this.state.newOrder}
                                 onChange={(e) => this.handleChange(e)}
                                 placeholder="Start entering.."
                                 aria-label="Recipient's username"
                                 aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button variant="success" onClick={() => this.handleAdd()}>Add</Button>
                    </InputGroup.Append>
                </InputGroup>
                {this.state.isError &&
                    <p style={{textAlign: "center", color: "red"}}
                    className="font-weight-bold">Something went wrong: try to enter another value.</p>
                }
                </>
                }
                {contents}
            </div>
        
        );
    }

    async Orders() {
        const response = await fetch('order');
        const data = await response.json();
        this.setState({ orders: data, loading: false });
    }
}