import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { Card } from "react-bootstrap";
import Task from "./Task";

const StyledColumnWrap = styled.div`
  border-radius: 4px;
  border: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  font-size: 90%;
  height: 35vh;
  margin: 1vh 5vh 8px 1px;
  transition: background-color 0.1s ease 0s;
`;

const StyledTaskList = styled.div`
  background-color: ${props => (props.isDraggingOver ? "lightblue" : "white")};
  display: flex;
  flex-grow: 1;
  height: 35vh;
  overflow-x: scroll;
  padding: 8px;
`;

const Column = ({ id, name, items }) => {
  return (
    <StyledColumnWrap>
      <Card.Header>{name}</Card.Header>
      <Droppable key={id} direction="horizontal" droppableId={id}>
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
  );
};

export default Column;
