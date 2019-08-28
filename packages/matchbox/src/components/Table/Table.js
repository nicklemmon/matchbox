import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ScreenReaderOnly } from '../ScreenReaderOnly';
import { Cell, HeaderCell, Row } from './TableElements';
import styles from './Table.module.scss';


class Table extends Component {
  static displayName = 'Table';

  static Cell = Cell;
  static HeaderCell = HeaderCell;
  static Row = Row;

  static propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array,
    /**
     * React node(s)
     */
    children: PropTypes.node
  };

  render() {
    const {
      title,
      data,
      children
    } = this.props;

    const dataMarkup = data
      ? <tbody>{data.map((rowData, i) => <Row rowData={rowData} key={`Row-${i}`} />)}</tbody>
      : children;

    return (
      <table className={styles.Table}>
        <caption>
          <ScreenReaderOnly>{title}</ScreenReaderOnly>
        </caption>

        {dataMarkup}
      </table>
    );
  }
}

export default Table;
