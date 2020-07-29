import React, { Component } from "react";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
// import { Button, Col } from "react-bootstrap";
import Column from "./ProgramBoard/Column";
import { API_URL } from "../../constants";
import ProgramForm from "./ProgramForm";
import { StyledContainer } from "../../styles";

export default class CreateProgram extends Component {
  constructor(props) {
    super(props);

    this.state = {
      programNumber: "",
      programName: "",
      tracks: [],
      columns: {
        "column-1": {
          name: "Track List",
          items: [],
        },
        "column-2": {
          name: "Program List",
          items: [],
        },
      },
    };
  }

  componentDidMount() {
    axios.get(`${API_URL}/tracks/`).then(response => {
      this.setState(prev => {
        const copy = { ...prev };
        const { columns } = copy;
        copy.tracks = response.data;

        columns["column-1"].items = [
          ...copy.columns["column-1"].items,
          ...response.data,
        ];

        return copy;
      });
    });
  }

  onChange = e => {
    const { id, value } = e.target;
    this.setState({
      [id]: value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { programNumber, programName, columns } = this.state;
    axios
      .post(`${API_URL}/programs/add`, {
        programNumber,
        programName,
        programInfo: columns["column-2"].items,
      })
      .then(res => {
        this.setState(prev => {
          return {
            ...prev,
            programNumber: "",
            programName: "",
            columns: {
              "column-1": {
                name: "Track List",
                items: prev.tracks,
              },
              "column-2": {
                name: "Program List",
                items: [],
              },
            },
          };
        });
      });
  };

  render() {
    const { columns } = this.state;
    return (
      <StyledContainer fluid title="Create Program">
        <ProgramForm
          {...this.state}
          buttonText="Create"
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
        <DragDropContext
          onDragEnd={({ source, destination }) => {
            if (!destination) {
              return;
            }

            if (source.droppableId !== destination.droppableId) {
              this.setState(prev => {
                const sourceColumn = prev.columns[source.droppableId];
                const destColumn = prev.columns[destination.droppableId];
                const sourceItems = [...sourceColumn.items];
                const destItems = [...destColumn.items];
                const [removed] = sourceItems.splice(source.index, 1);
                destItems.splice(destination.index, 0, removed);
                return {
                  ...prev,
                  columns: {
                    ...prev.columns,
                    [source.droppableId]: {
                      ...sourceColumn,
                      items: sourceItems,
                    },
                    [destination.droppableId]: {
                      ...destColumn,
                      items: destItems,
                    },
                  },
                };
              });
            } else {
              this.setState(prev => {
                const column = prev.columns[source.droppableId];
                const copiedItems = [...column.items];
                const [removed] = copiedItems.splice(source.index, 1);
                copiedItems.splice(destination.index, 0, removed);
                return {
                  ...prev,
                  columns: {
                    ...prev.columns,
                    [source.droppableId]: {
                      ...column,
                      items: copiedItems,
                    },
                  },
                };
              });
            }
          }}
        >
          {Object.entries(columns).map(([id, column]) => {
            return <Column {...{ ...column, id, key: id }} />;
          })}
        </DragDropContext>
      </StyledContainer>
    );
  }
}
