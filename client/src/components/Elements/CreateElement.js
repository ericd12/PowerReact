import React, { Component } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import ElementForm from "./ElementForm";
import ComponentWrapper from "../ComponentWrapper";
import { API_URL, BLANK_ELEMENT } from "../../constants";

class CreateElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...BLANK_ELEMENT,
    };
  }

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onChangeDropdown = (e, list) => {
    const { name, value } = e.target;
    this.setState({
      [name]: list[value],
    });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const {
      elementCategory,
      elementCogRating,
      elementDescription,
      elementDuration,
      elementFormat,
      elementLabel,
      elementLink,
      elementMarket,
      elementNumber,
      elementPhysRating,
      elementSubCategory,
    } = this.state;

    axios
      .post(`${API_URL}/elements/add`, {
        elementCategory,
        elementCogRating,
        elementDescription,
        elementDuration,
        elementFormat,
        elementLabel,
        elementLink,
        elementMarket,
        elementNumber,
        elementPhysRating,
        elementSubCategory,
      })
      .then((res) => {
        alert("Element Created!");
        // window.location = '/';
        this.setState({
          ...BLANK_ELEMENT,
        });
      })
      .catch((err) => console.log({ err }));
  };

  render() {
    return (
      <ComponentWrapper title="Create a New Element">
        <Card bg="light">
          <Card.Body>
            <ElementForm
              {...this.state}
              buttonText="Create Element"
              onChange={this.onChange}
              onChangeDropdown={this.onChangeDropdown}
              onSubmit={this.onSubmit}
            />
          </Card.Body>
        </Card>
      </ComponentWrapper>
    );
  }
}

export default CreateElement;
