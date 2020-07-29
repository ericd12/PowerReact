import React from "react";
import { Form, Col, Button } from "react-bootstrap";

const TrackForm = ({
  onSubmit,
  onChange,
  trackNumber,
  trackName,
  buttonText,
}) => {
  return (
    <Form id="submit-track" onSubmit={onSubmit}>
      <Form.Row
        style={{
          alignItems: "center",
        }}
      >
        <Form.Group as={Col} controlId="trackNumber">
          <Form.Label>Track Number</Form.Label>
          <Form.Control
            name="trackNumber"
            onChange={onChange}
            placeholder="add number"
            type="text"
            value={trackNumber}
          />
        </Form.Group>
        <Form.Group as={Col} controlId="trackName">
          <Form.Label>Track Name</Form.Label>
          <Form.Control
            name="trackName"
            onChange={onChange}
            placeholder="add name"
            type="text"
            value={trackName}
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

export default TrackForm;
