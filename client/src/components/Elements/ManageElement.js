import React, { Component } from "react";
import axios from "axios";
import ElementForm from "./ElementForm";
import ComponentWrapper from "../ComponentWrapper";
import { API_URL, BLANK_ELEMENT } from "../../constants";

class ManageElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...BLANK_ELEMENT,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`${API_URL}/elements/${id}`)
      .then((response) => {
        this.setState({
          ...response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
    const { id } = this.props.match.params;
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
      .put(`${API_URL}/elements/update/${id}`, {
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
        alert("updated!");
        const { history } = this.props;
        history.push("/elements");
      })
      .catch((err) => console.log({ err }));
  };

  render() {
    return (
      <ComponentWrapper title="Update Element">
        <ElementForm
          {...this.state}
          buttonText="Update Element"
          onChange={this.onChange}
          onChangeDropdown={this.onChangeDropdown}
          onSubmit={this.onSubmit}
        />
      </ComponentWrapper>
    );
  }
}

export default ManageElement;
