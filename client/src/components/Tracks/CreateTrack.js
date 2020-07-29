import React, { Component } from "react";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
import { Row } from "react-bootstrap";
import Column from "./TracksBoard/Column";
import TrackForm from "./TrackForm";
import { StyledContainer } from "../../styles";
import { API_URL } from "../../constants";

class CreateTrack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trackName: "",
      trackNumber: "",
      elements: [],
      columns: {
        "column-1": {
          name: "Elements",
          items: [],
        },
        "column-2": {
          name: "Track List",
          items: [],
        },
      },
    };
  }

  componentDidMount() {
    axios.get(`${API_URL}/elements/`).then(response => {
      this.setState(prev => {
        const copy = { ...prev };
        const { columns } = copy;
        copy.elements = response.data;

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
    const { trackNumber, trackName, columns } = this.state;
    axios
      .post(`${API_URL}/tracks/add`, {
        trackNumber,
        trackName,
        trackInfo: columns["column-2"].items,
      })
      .then(res => {
        this.setState(prev => {
          return {
            ...prev,
            trackName: "",
            trackNumber: "",
            columns: {
              "column-1": {
                name: "Elements",
                items: prev.elements,
              },
              "column-2": {
                name: "Track List",
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
      <StyledContainer fluid title="Create Track">
        <TrackForm
          {...this.state}
          buttonText="Submit"
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
          <Row>
            {Object.entries(columns).map(([id, column]) => {
              return <Column {...{ ...column, id, key: id }} />;
            })}
          </Row>
        </DragDropContext>
      </StyledContainer>
    );
  }
}

export default CreateTrack;
