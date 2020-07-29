import React from "react";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";

const ComponentWrapper = ({ children, title, style, fluid, ...restProps }) => {
  return (
    <Container fluid={fluid} style={style} {...restProps}>
      <h3>{title}</h3>
      {children}
    </Container>
  );
};

ComponentWrapper.propTypes = {
  style: PropTypes.shape({}),
  fluid: PropTypes.bool,
};

ComponentWrapper.defaultProps = {
  style: {},
  fluid: false,
};

export default ComponentWrapper;
