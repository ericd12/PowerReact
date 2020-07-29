import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { Card, ListGroup, Col } from "react-bootstrap";
import Task from "./Task";

const StyledColumnWrap = styled(Card)`
  height: 73vh;
  margin: 1px;
  transition: background-color 0.1s ease 0s;
`;

const StyledTaskList = styled(ListGroup)`
  align-items: stretch;
  background-color: ${props => (props.isDraggingOver ? "lightblue" : "white")};
  flex-grow: 1;
  font-size: 90%;
  overflow-y: scroll;
  padding: 8px;
`;

const Column = ({ id, name, items }) => {
  return (
    <Col>
      <StyledColumnWrap>
        <Card.Header>{name}</Card.Header>
        <Droppable key={id} droppableId={id}>
          {({ droppableProps, innerRef, placeholder }, { isDraggingOver }) => {
            return (
              <StyledTaskList
                {...{ ...droppableProps }}
                ref={innerRef}
                style={{
                  backgroundColor: `${isDraggingOver ? "lightblue" : "white"}`,
                }}
              >
                {items.map((task, index) => {
                  return <Task {...{ ...task, index, key: task._id }} />;
                })}
                {placeholder}
              </StyledTaskList>
            );
          }}
        </Droppable>
      </StyledColumnWrap>
    </Col>
  );
};

export default Column;
