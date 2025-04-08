import React from "react";
import { Form, InputGroup, FormControl } from "react-bootstrap";

/**
 * @author
 * @function Input
 **/

export const Input = (props) => {
  return (
    <Form.Group className={props.class} controlId={props.id}>
      <Form.Label style={{ fontWeight: "500", color: "#474646" }}>
        {props.label}
      </Form.Label>
      <Form.Control
        style={{ fontSize: "12px" }}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        as={props.as}
        rows={props.rows}
        required={props.required}
      />
      <Form.Text className="text-muted">{props.errorMessage}</Form.Text>
    </Form.Group>
  );
};

export const Select = (props) => {
  return (
    <Form.Group className={props.class} controlId={props.id}>
      <Form.Label style={{ fontWeight: "500", color: "#474646" }}>
        {props.label}
      </Form.Label>
      <Form.Text className="text-muted">{props.errorMessage}</Form.Text>
    </Form.Group>
  );
};

export const HomeInput = (props) => {
  return (
    <InputGroup className="mb-2 input-group-sm" style={{ lineHeight: "10px" }}>
      <InputGroup.Text>{props.label}</InputGroup.Text>
      <FormControl
        aria-label="First name"
        value={props.value}
        required={props.required}
        type={props.type}
        onChange={props.onChange}
        as={props.as}
        rows={props.rows}
      />
    </InputGroup>
  );
};

export const TrackerElement = (props) => {
  return (
    <div className="mb-2 input-div row">
      <label className="text-muted form-label details-label col-4">
        {props.label}
      </label>
      <p
        className=" border rounded input-field col-7 bg-light"
        id={props.id}
        style={{ margingTop: "0.1em", marginBottom: "0.2em" }}
        onChange={props.onChange}
      >
        {props.entry}
      </p>
    </div>
  );
};
