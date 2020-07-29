import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import FormatList from "./FormatList";
import ComponentWrapper from "../../../ComponentWrapper";
import { API_URL } from "../../../../constants";

class CreateFormat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementFormat: "",
      new_item: {},
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const { elementFormat } = this.state;

    const newItem = { elementFormat };

    axios
      .post(`${API_URL}/formats/add`, newItem)
      .then(res => {
        alert("New Format Added!");
        this.setState({
          elementFormat: "",
          new_item: newItem,
        });
      })
      .catch(error => console.log(error.response));
  };

  render() {
    const { elementFormat } = this.state;

    return (
      <ComponentWrapper title="Create New Format">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="elementFormat">
            <Form.Label>Format:</Form.Label>
            <Form.Control
              name="elementFormat"
              onChange={e => {
                const { name, value } = e.target;
                this.setState({
                  [name]: value,
                });
              }}
              required
              type="text"
              value={elementFormat}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Create New Format
          </Button>
        </Form>
        <FormatList newItem={this.state.new_item} />
      </ComponentWrapper>
    );
  }
}

export default CreateFormat;
