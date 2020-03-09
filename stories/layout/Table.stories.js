import React from 'react';
import { addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { ThemeProvider } from '@sparkpost/matchbox/components/ThemeProvider';

import { Table, Panel } from '@sparkpost/matchbox';

addDecorator(storyFn => <ThemeProvider>{storyFn()}</ThemeProvider>);

export default {
  title: 'Layout|Table',
};

const Node = () => <div>A react component</div>;
const data = [
  ['A', 'B', 'C'],
  [<Node />, <Node />, <Node />],
  [1, 2, 3],
];

export const TableComponents = withInfo({ propTablesExclude: [Panel] })(() => (
  <Panel>
    <Table mb={800}>
      <tbody>
        <Table.Row>
          <Table.HeaderCell>Heading 1</Table.HeaderCell>
          <Table.HeaderCell>Heading 2</Table.HeaderCell>
          <Table.HeaderCell>Heading 3</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>1</Table.Cell>
          <Table.Cell>2</Table.Cell>
          <Table.Cell>3</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>1</Table.Cell>
          <Table.Cell>2</Table.Cell>
          <Table.Cell>3</Table.Cell>
        </Table.Row>
      </tbody>
    </Table>
  </Panel>
));

export const WithSuppliedData = withInfo()(() => (
  <Panel>
    <Table data={data} />
  </Panel>
));

export const SystemProps = withInfo()(() => (
  <Panel>
    <Table>
      <tbody>
        <Table.Row>
          <Table.HeaderCell p="300">Padding 300</Table.HeaderCell>
          <Table.HeaderCell>Padding 300</Table.HeaderCell>
          <Table.HeaderCell>Padding 300</Table.HeaderCell>
        </Table.Row>
        <Table.Row p="800">
          <Table.Cell p="800">Padding 800</Table.Cell>
          <Table.Cell>Padding 800</Table.Cell>
          <Table.Cell>Padding 800</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell p="400">Padding 400</Table.Cell>
          <Table.Cell>Padding 400</Table.Cell>
          <Table.Cell>Padding 400</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Default Padding</Table.Cell>
          <Table.Cell>Default Padding</Table.Cell>
          <Table.Cell>Default Padding</Table.Cell>
        </Table.Row>
      </tbody>
    </Table>
  </Panel>
));
