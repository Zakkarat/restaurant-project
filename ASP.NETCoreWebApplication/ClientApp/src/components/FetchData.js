import React, { Component } from 'react';
import {withRouter, Link, Redirect} from "react-router-dom";
import {Button, Col, FormControl, InputGroup, Row} from "react-bootstrap";

class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = { dishes: [], newDish: {}, search: "", loading: true, isAdd: false, isError: false };
  }

  componentDidMount() {
    this.Menu();
  }
  
  handleClick() {
    this.setState(state => ({...state, isAdd:!state.isAdd}))
  }

  handleChange({target}){
    this.setState(state => ({...state, search: target.value}));
  }
  
  async handleSubmit() {
    console.log('heh')
    if (this.state.dishes.some((elem) => elem.name === this.state.newDish.name) ||
        !this.state.newDish.name || this.state.newDish.price < 0 || this.state.newDish.cookingTime < 0) {
      this.setState(state => ({...state, isError: true}))
      return
    }
    this.setState(state => ({...state, isError: false}))
    await fetch(`Dish/addDish?name=${this.state.newDish.name.split(' ').join('%20')}&cookingTime=${this.state.newDish.cookingTime}&price=${this.state.newDish.price}`,
        {
          method: "POST"
        });
    await this.reload()
  }

  handleEditChange({target}) {
    const newDish = this.state.newDish;
    newDish[target.ariaLabel] = target.value
    this.setState(state => ({...state, newDish: newDish}));
  }

  async reload() {
    const response = await fetch('dish');
    const data = await response.json();
    this.setState(state => ({...state, dishes: data, newDish: {}, isAdd:false, loading: false }));
  }


  renderMenu(dishes) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>№</th>
            <th>Name</th>
            <th>Cooking Time</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {dishes.sort((a, b) => 
          {
            if(a.name < b.name) { return -1; }
            if(a.name > b.name) { return 1; }
            return 0;
          }
          ).filter(dishes => {
            const regex = new RegExp(`\\b${this.state.search}`,"gi");
            return dishes.name.match(regex)
          })
              .map((dish,i) =>
            <tr key={dish.id}>
              <td>{i + 1}</td>
              <td><Link to={`fetch-dish/${dish.id}`}>{dish.name}</Link></td>
              <td>{dish.cookingTime}</td>
              <td>{dish.price}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderMenu(this.state.dishes);

    return (
      <div>
        <h1 style={{textAlign:"center"}} id="tabelLabel" >Restaurant Menu</h1>
        <Row className="justify-content-center align-items-center mx-auto mt-3 w-50 mb-3">
          <Col  className="pl-0 pr-md-3">
            <InputGroup>
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

          <Col className="pl-0 pr-md-3" xs={4}>
            <Button variant="outline-info" block onClick = {()=>this.handleClick()}>
              Add dish
            </Button>
          </Col>
        </Row>  


        {this.state.isAdd &&
            <>
              <InputGroup className="mb-3 w-50 mx-auto">
                <InputGroup.Prepend>
                  <InputGroup.Text style={{width: "70px", textAlign: "center", display: "block"}}
                                   id="inputGroup-sizing-sm">Name</InputGroup.Text>
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
                      <InputGroup.Text style={{width: "70px", textAlign: "center", display: "block"}}
                                       id="inputGroup-sizing-sm">Time</InputGroup.Text>
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
                      <InputGroup.Text style={{width: "70px", textAlign: "center", display: "block"}}
                                       id="inputGroup-sizing-sm">Price</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl value={this.state.newDish.price}
                                 onChange={(e) => this.handleEditChange(e)}
                                 placeholder="Enter price.."
                                 aria-label="price"
                    />
                  </InputGroup>
                </Col>
              </Row>
              
              {this.state.isError &&
              <p style={{textAlign: "center", color: "red"}}
                 className="font-weight-bold">Something went wrong: try to enter another value.</p>}
              <Button variant="info" block className="w-25 mb-3 mx-auto" onClick={() => this.handleSubmit()}>
                Submit
              </Button>
              
            </>
        }
        {contents}
      </div>
    );
  }

  async Menu() {
    const response = await fetch('dish');
    const data = await response.json();
    this.setState({ dishes: data, loading: false });
  }
}
export default withRouter(FetchData);