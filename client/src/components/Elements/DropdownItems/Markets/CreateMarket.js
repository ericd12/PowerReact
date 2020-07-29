import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import MarketList from "./MarketList";
import ComponentWrapper from "../../../ComponentWrapper";
import { API_URL } from "../../../../constants";

class CreateMarket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementMarket: "",
      newItem: {},
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const { elementMarket } = this.state;

    const newItem = { elementMarket };

    axios
      .post(`${API_URL}/markets/add`, newItem)
      .then(res => {
        alert("New Market Added!");
        this.setState({
          elementMarket: "",
          newItem,
        });
      })
      .catch(error => console.log(error.response));
  };

  render() {
    const { elementMarket } = this.state;

    return (
      <ComponentWrapper title="Create New Market">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="elementMarket">
            <Form.Label>Market:</Form.Label>
            <Form.Control
              name="elementMarket"
              onChange={e => {
                const { name, value } = e.target;
                this.setState({
                  [name]: value,
                });
              }}
              required
              type="text"
              value={elementMarket}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Create New Market
          </Button>
        </Form>
        <MarketList newItem={this.state.newItem} />
      </ComponentWrapper>
    );
  }
}

export default CreateMarket;
