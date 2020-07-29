import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import ComponentWrapper from "../../../ComponentWrapper";
import { API_URL } from "../../../../constants";

class ManageCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementCategory: "",
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`${API_URL}/categories/${id}`)
      .then(response => {
        const { elementCategory } = response.data;
        this.setState({
          elementCategory,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onSubmit = e => {
    e.preventDefault();
    const { elementCategory } = this.state;
    const { id } = this.props.match.params;
    axios
      .post(`${API_URL}/categories/update/${id}`, {
        elementCategory,
      })
      .then(res => {
        alert("updated!");
        const { history } = this.props;
        history.push("/categories");
      });
  };

  render() {
    const { elementCategory } = this.state;

    return (
      <ComponentWrapper title="Update Category">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="elementCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              name="elementCategory"
              onChange={e => {
                const { name, value } = e.target;
                this.setState({
                  [name]: value,
                });
              }}
              placeholder="add category"
              required
              type="text"
              value={elementCategory}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Update Category
          </Button>
        </Form>
      </ComponentWrapper>
    );
  }
}

export default ManageCategory;
