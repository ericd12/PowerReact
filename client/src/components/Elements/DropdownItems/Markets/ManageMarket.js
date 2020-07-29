import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import ComponentWrapper from "../../../ComponentWrapper";
import { API_URL } from "../../../../constants";

class ManageMarket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementMarket: "",
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`${API_URL}/markets/${id}`)
      .then(response => {
        const { elementMarket } = response.data;
        this.setState({
          elementMarket,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onSubmit = e => {
    e.preventDefault();
    const { elementMarket } = this.state;
    const { id } = this.props.match.params;
    axios
      .post(`${API_URL}/markets/update/${id}`, {
        elementMarket,
      })
      .then(res => {
        alert("updated");
        const { history } = this.props;
        history.push("/markets");
      });
  };

  render() {
    const { elementMarket } = this.state;

    return (
      <ComponentWrapper title="Update Market">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="elementMarket">
            <Form.Label>Market</Form.Label>
            <Form.Control
              name="elementMarket"
              onChange={e => {
                const { name, value } = e.target;
                this.setState({
                  [name]: value,
                });
              }}
              placeholder="add market"
              required
              type="text"
              value={elementMarket}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Update Market
          </Button>
        </Form>
      </ComponentWrapper>
    );
  }
}

export default ManageMarket;
