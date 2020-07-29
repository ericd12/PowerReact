import React, { Component } from "react";
import axios from "axios";
import MarketsTableRow from "./MarketsTableRow";
import {
  CoolTableHead,
  StyledTable,
  StyledTbody,
  StyledThead,
} from "../../../../styles";
import { API_URL } from "../../../../constants";

class MarketList extends Component {
  constructor(props) {
    super(props);
    this.state = { markets: [] };
  }

  componentDidMount() {
    this.fetchMarkets();
  }

  componentDidUpdate(prevProps) {
    const { newItem } = this.props;
    if (prevProps.newItem !== newItem) {
      this.fetchMarkets();
    }
  }

  fetchMarkets = () =>
    axios
      .get(`${API_URL}/markets/`)
      .then(({ data: markets }) => {
        this.setState({ markets });
      })
      .catch(error => {
        console.log(error);
      });

  deleteMarket = id => {
    axios.delete(`${API_URL}/markets/${id}`).then(response => {
      alert("deleted!");
      this.setState(prev => {
        return {
          markets: prev.markets.filter(el => el._id !== id),
        };
      });
    });
  };

  render() {
    const { markets } = this.state;
    return (
      <div style={{ marginTop: "6vh" }}>
        <h3>Manage Markets</h3>
        <StyledTable hover>
          <StyledThead>
            <tr>
              <CoolTableHead>Name</CoolTableHead>
              <CoolTableHead>Actions</CoolTableHead>
            </tr>
          </StyledThead>
          <StyledTbody>
            {markets.map(currentMarket => {
              return (
                <MarketsTableRow
                  key={currentMarket._id}
                  deleteMarket={this.deleteMarket}
                  {...currentMarket}
                />
              );
            })}
          </StyledTbody>
        </StyledTable>
      </div>
    );
  }
}

export default MarketList;
