import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Table } from "react-bootstrap";
import styled from "styled-components";

const TrackTable = styled(Table)`
  font-size: 95%;
  table-layout: fixed;
  white-space: nowrap;
  background-color: none;
  th,
  td {
    width: 30%;
    padding: 2px;
    border-style: hidden !important;
  }
`;

const ElementCard = styled.div`
  margin: 2px;
  padding: 10px;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "white")};
  border-radius: 5px;
  border: 1px solid lightgrey;
`;

const Task = ({
  _id,
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
  index,
}) => {
  return (
    <Draggable draggableId={_id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }, { isDragging }) => (
        <ElementCard
          {...{ ...draggableProps, ...dragHandleProps, isDragging }}
          ref={innerRef}
        >
          <TrackTable>
            <thead>
              <tr>
                <th>Element #: {elementNumber}</th>
                <th>{elementLabel}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Description: {elementDescription}</td>
              </tr>
              <tr>
                <td>Format: {elementFormat.elementFormat}</td>
                <td>Time: {elementDuration}</td>
                <td>Category: {elementCategory.elementCategory}</td>
              </tr>
              <tr>
                <td>SubCat: {elementSubCategory}</td>
                <td>Market: {elementMarket.elementMarket}</td>
                <td>Cog Rating: {elementCogRating}</td>
                <td>Phys Rating: {elementPhysRating}</td>
              </tr>

              <tr>
                <td>{elementLink}</td>
              </tr>
            </tbody>
          </TrackTable>
        </ElementCard>
      )}
    </Draggable>
  );
};

export default Task;
