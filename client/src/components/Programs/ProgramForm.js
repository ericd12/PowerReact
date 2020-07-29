import React from "react";
import { Form, Col, Button } from "react-bootstrap";

const ProgramForm = ({
  onSubmit,
  onChange,
  programNumber,
  programName,
  buttonText,
}) => {
  return (
    <Form id="submit-program" onSubmit={onSubmit}>
      <Form.Row
        style={{
          alignItems: "center",
        }}
      >
        <Form.Group as={Col} controlId="programNumber">
          <Form.Label>Number</Form.Label>
          <Form.Control
            name="programNumber"
            onChange={onChange}
            placeholder="add number"
            type="text"
            value={programNumber}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="programName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="programName"
            onChange={onChange}
            placeholder="add name"
            type="text"
            value={programName}
          />
        </Form.Group>
        <Col>
          <Button style={{ marginTop: "15px" }} type="submit" variant="primary">
            {buttonText}
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
};

export default ProgramForm;
