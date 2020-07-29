import React, { Component } from "react";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./ProgramBoard/Column";
import ProgramForm from "./ProgramForm";
import { API_URL } from "../../constants";
import { StyledContainer } from "../../styles";

class ManageProgram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programName: "",
      programNumber: "",
      programInfo: [],
      tracks: [],
      tracksEnums: {},
      columns: {
        "column-1": {
          name: "Tracks",
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
    const { id } = this.props.match.params;

    Promise.all([
      axios.get(`${API_URL}/programs/${id}`).then((response) => {
        return response.data;
      }),
      axios.get(`${API_URL}/tracks/`).then((response) => {
        return response.data;
      }),
    ]).then(([programs, tracks]) => {
      const tracksEnums = tracks.reduce((all, one) => {
        return {
          ...all,
          [one._id]: one,
        };
      }, {});

      this.setState((oldState) => {
        const state = { ...oldState };

        state.columns["column-1"].items = tracks.filter((track) => {
          return !programs.programInfo.some(
            (progTrac) => progTrac._id === track._id
          );
        });

        state.columns["column-2"].items = programs.programInfo;
        return {
          ...state,
          ...programs,
          tracksEnums,
          tracks,
        };
      });
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { programNumber, programName, columns } = this.state;
    const program = {
      programNumber,
      programName,

      programInfo: columns["column-2"].items,
    };

    axios.put(`${API_URL}/programs/update/${id}`, program).then((res) => {
      const { history } = this.props;
      alert("updated!");
      history.push("/programs");
    });
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { columns, tracksEnums, tracks, programInfo, ...rest } = this.state;
    const col1 = columns["column-1"];
    const col2 = columns["column-2"];
    return (
      <StyledContainer fluid title="Update Program">
        <ProgramForm
          {...this.state}
          buttonText="Update Program"
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
        <DragDropContext
          onDragEnd={({ source, destination }) => {
            if (!destination) {
              return;
            }
            const { droppableId: sourceId, index: sourceIndex } = source;
            const {
              droppableId: destinationId,
              index: destinationIndex,
            } = destination;

            if (sourceId !== destinationId) {
              this.setState((prev) => {
                const sourceColumn = prev.columns[sourceId];
                const destColumn = prev.columns[destinationId];
                const sourceItems = [...sourceColumn.items];
                const destItems = [...destColumn.items];
                const [removed] = sourceItems.splice(source.index, 1);
                destItems.splice(destination.index, 0, removed);
                return {
                  ...prev,
                  columns: {
                    ...prev.columns,
                    [sourceId]: {
                      ...sourceColumn,
                      items: sourceItems,
                    },
                    [destinationId]: {
                      ...destColumn,
                      items: destItems,
                    },
                  },
                };
              });
            } else {
              this.setState((prev) => {
                const column = prev.columns[sourceId];
                const copiedItems = [...column.items];
                const [removed] = copiedItems.splice(source.index, 1);
                copiedItems.splice(destination.index, 0, removed);
                return {
                  ...prev,
                  columns: {
                    ...prev.columns,
                    [sourceId]: {
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

export default ManageProgram;
