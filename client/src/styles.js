import styled from "styled-components";
import { Table } from "react-bootstrap";
import ComponentWrapper from "./components/ComponentWrapper";

export const CoolTableHead = styled.th`
  text-align: left;
  width: 700px;
`;

export const StyledTableRow = styled.tr`
  td {
    text-align: left;
    width: 700px;
  }
`;

export const StyledContainer = styled(ComponentWrapper)`
  margin-left: auto;
  margin-right: auto;
  width: 95%;
`;

export const StyledTable = styled(Table)`
  table-layout: fixed;
`;

export const StyledTbody = styled.tbody`
  display: block;
  width: 100%;
  overflow: auto;
  height: 40vh;
  border: none;
`;

export const StyledThead = styled.thead`
  tr {
    display: block;
  }
  border: none;
`;
