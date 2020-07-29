import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import CategoryList from "./CategoryList";
import ComponentWrapper from "../../../ComponentWrapper";
import { API_URL } from "../../../../constants";

class CreateCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementCategory: "",
      new_item: {},
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const { elementCategory } = this.state;

    const newItem = { elementCategory };

    axios
      .post(`${API_URL}/categories/add`, newItem)
      .then(res => {
        alert("New Category Added!");
        this.setState({
          elementCategory: "",
          new_item: newItem,
        });
      })
      .catch(error => console.log(error.response));
  };

  render() {
    const { elementCategory } = this.state;
    return (
      <ComponentWrapper title="Create New Category">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="elementCategory">
            <Form.Label>Category: </Form.Label>
            <Form.Control
              name="elementCategory"
              onChange={e => {
                const { name, value } = e.target;
                this.setState({
                  [name]: value,
                });
              }}
              required
              type="text"
              value={elementCategory}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Create New Category
          </Button>
        </Form>
        <CategoryList newItem={this.state.new_item} />
      </ComponentWrapper>
    );
  }
}

export default CreateCategory;
