import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { cell, row, header, headerCell } from './styles';
import { TablePaddingContext } from './context';
import { padding } from 'styled-system';
import { createPropTypes } from '@styled-system/prop-types';

const StyledCell = styled('td')`
  ${cell}
  ${padding}
`;

const StyledHeaderCell = styled('th')`
  ${headerCell}
  ${padding}
`;

const StyledRow = styled('tr')`
  ${row}
  ${padding}
`;

const StyledHeader = styled('thead')`
  ${header}
  ${padding}
`;

const Cell = ({ value, children, className, ...rest }) => {
  const paddingContext = React.useContext(TablePaddingContext);

  return (
    <StyledCell {...paddingContext} className={className} {...rest}>
      {value || children}
    </StyledCell>
  );
};

Cell.propTypes = {
  value: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
  ...createPropTypes(padding.propNames),
};
Cell.displayName = 'Table.Cell';

const HeaderCell = ({ value, children, className, ...rest }) => {
  const paddingContext = React.useContext(TablePaddingContext);

  return (
    <StyledHeaderCell {...paddingContext} className={className} {...rest}>
      {value || children}
    </StyledHeaderCell>
  );
};

HeaderCell.propTypes = {
  value: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
  ...createPropTypes(padding.propNames),
};
HeaderCell.displayName = 'Table.HeaderCell';

const Row = ({ rowData, children, className, ...rest }) => {
  return (
    <StyledRow className={className} {...rest}>
      {rowData ? rowData.map((value, i) => <Cell value={value} key={`Cell-${i}`} />) : children}
    </StyledRow>
  );
};

Row.propTypes = {
  rowData: PropTypes.array,
  className: PropTypes.string,
  children: PropTypes.node,
};
Row.displayName = 'Table.Row';

const Header = ({ children, className, ...rest }) => {
  return (
    <StyledHeader className={className} {...rest}>
      {children}
    </StyledHeader>
  );
};

Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};
Header.displayName = 'Table.Header';

export { Cell, Header, HeaderCell, Row };
