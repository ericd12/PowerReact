import React, { Component } from "react";
import axios from "axios";
import FormatsTableRow from "./FormatsTableRow";
import {
  CoolTableHead,
  StyledTable,
  StyledTbody,
  StyledThead,
} from "../../../../styles";
import { API_URL } from "../../../../constants";

class FormatList extends Component {
  constructor(props) {
    super(props);
    this.state = { formats: [] };
  }

  componentDidMount() {
    this.fetchFormats();
  }

  componentDidUpdate(prevProps) {
    const { newItem } = this.props;
    if (prevProps.newItem !== newItem) {
      this.fetchFormats();
    }
  }

  fetchFormats = () =>
    axios
      .get(`${API_URL}/formats/`)
      .then(({ data: formats }) => {
        this.setState({ formats });
      })
      .catch(error => {
        console.log(error);
      });

  deleteFormat = id => {
    axios.delete(`${API_URL}/formats/${id}`).then(response => {
      alert("deleted!");
      this.setState(({ formats }) => {
        return {
          formats: formats.filter(el => el._id !== id),
        };
      });
    });
  };

  render() {
    const { formats } = this.state;
    return (
      <div style={{ marginTop: "6vh" }}>
        <h3>Manage Formats</h3>
        <StyledTable hover>
          <StyledThead>
            <tr>
              <CoolTableHead>Name</CoolTableHead>
              <CoolTableHead>Actions</CoolTableHead>
            </tr>
          </StyledThead>
          <StyledTbody>
            {formats.map(currentFormat => {
              return (
                <FormatsTableRow
                  key={currentFormat._id}
                  deleteFormat={this.deleteFormat}
                  {...currentFormat}
                />
              );
            })}
          </StyledTbody>
        </StyledTable>
      </div>
    );
  }
}

export default FormatList;
