import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  background-color: ${props => (props.isDragging ? "lightgreen" : "white")};
  border-radius: 5px;
  border: 1px solid lightgrey;
  margin-bottom: 8px;
  margin-right: 2px;
  padding: 8px 10px;
  min-width: 200px;
  white-space: nowrap;

  ul {
    padding-left: 20px;
    font-weight: 700;
  }
`;

const Task = ({ _id, trackNumber, trackName, index }) => {
  return (
    <Draggable draggableId={_id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }, { isDragging }) => (
        <Container
          {...{ ...draggableProps, ...dragHandleProps, isDragging }}
          ref={innerRef}
        >
          <ul>
            <li>{trackNumber}</li>
            <li>{trackName}</li>
          </ul>
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
