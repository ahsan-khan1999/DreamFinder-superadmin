/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-key */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/display-name */
/* eslint-disable */

import React from 'react';
import { Button, Card, CardBody, CardTitle } from 'reactstrap';
import { useTable, usePagination, useSortBy } from 'react-table';
import classnames from 'classnames';

import IntlMessages from 'helpers/IntlMessages';
import DatatablePagination from 'components/DatatablePagination';

import products from 'data/products';
import moment from 'moment';

function Table({ columns, data, divided = false, defaultPageSize = 50 }) {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0, pageSize: defaultPageSize },
    },
    useSortBy,
    usePagination
  );

  return (
    <>
      <table
        {...getTableProps()}
        className={`r-table table table-responsive ${classnames({
          'table-divided': divided,
        })}`}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  key={`th_${columnIndex}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? 'sorted-desc'
                        : 'sorted-asc'
                      : ''
                  }
                >
                  {column.render('Header')}
                  <span />
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    key={`td_${cellIndex}`}
                    {...cell.getCellProps({
                      className: cell.column.cellClass,
                    })}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
        <DatatablePagination
          page={pageIndex}
          pages={pageCount}
          canPrevious={canPreviousPage}
          canNext={canNextPage}
          pageSizeOptions={[50, 100, 150, 200, 250]}
          showPageSizeOptions={true}
          showPageJump={false}
          defaultPageSize={pageSize}
          onPageChange={(p) => gotoPage(p)}
          onPageSizeChange={(s) => setPageSize(s)}
          paginationMaxSize={pageCount}
        />
      </table>
    </>
  );
}

export const AdminTable = (props) => {
  const { changeRoute, header } = props;
  const cols = React.useMemo(
    () => [
      {
        Header: header[0],
        accessor: 'username',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: header[1],
        accessor: 'email',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[2],
        accessor: 'role',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: <span style={{ fontSize: '1.0rem' }}>{header[6]}</span>,
        accessor: 'title3',
        cellClass: 'text-muted w-10',
        // Cell: (props) => {console.log(props?.cell?.row?.original)}
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#fed000' }}
            onClick={() => changeRoute(props?.cell?.row?.original)}
          >
            View
          </Button>
        ),
      },
    ],
    []
  );
  return (
    <div className="mb-4">
      <Table columns={cols} data={props?.data} />
    </div>
  );
};
export const TeamTable = (props) => {
  const { changeRoute, header } = props;
  const cols = React.useMemo(
    () => [
      {
        Header: header[0],
        accessor: 'name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: header[1],
        accessor: 'designation',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[2],
        accessor: 'short_description',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: <span style={{ fontSize: '1.0rem' }}>{header[3]}</span>,
        accessor: 'title3',
        cellClass: 'text-muted w-10',
        // Cell: (props) => {console.log(props?.cell?.row?.original)}
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#fed000' }}
            onClick={() => changeRoute(props?.cell?.row?.original)}
          >
            View
          </Button>
        ),
      },
    ],
    []
  );
  return (
    <div className="mb-4">
      <Table columns={cols} data={props?.data} />
    </div>
  );
};
export const ReactTableWithPaginationCard = (props) => {
  // console.log(props?.doctor);
  const { changeRoute } = props;
  const cols = React.useMemo(
    () => [
      {
        Header: <span style={{ fontSize: '1.0rem' }}>{props?.header[0]}</span>,
        accessor: 'name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ fontSize: '0.9rem' }}>{props?.value}</span>
        ),
      },
      {
        Header: <span style={{ fontSize: '1.0rem' }}>{props?.header[1]}</span>,
        accessor: 'date_of_birth',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ fontSize: '0.9rem' }}>{props?.value}</span>
        ),
      },
      {
        Header: <span style={{ fontSize: '1.0rem' }}>{props?.header[2]}</span>,
        accessor: 'designation',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ fontSize: '0.9rem' }}>{props?.value}</span>
        ),
      },
      {
        Header: <span style={{ fontSize: '1.0rem' }}>{props?.header[3]}</span>,
        accessor: 'gender',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ fontSize: '0.9rem' }}>{props?.value}</span>
        ),
      },
      {
        Header: <span style={{ fontSize: '1.0rem' }}>{props?.header[4]}</span>,
        accessor: 'phone_number',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ fontSize: '0.9rem' }}>{props?.value}</span>
        ),
      },
      {
        Header: <span style={{ fontSize: '1.0rem' }}>{props?.header[5]}</span>,
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <div
            style={{
              color: props?.value === 'active' ? 'green' : 'red',
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </div>
        ),
      },
      {
        Header: <span style={{ fontSize: '1.0rem' }}>{props?.header[6]}</span>,
        accessor: 'title3',
        cellClass: 'text-muted w-10',
        // Cell: (props) => {console.log(props?.cell?.row?.original)}
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#fed000' }}
            onClick={() => changeRoute(props?.cell?.row?.original)}
          >
            View
          </Button>
        ),
      },
    ],
    []
  );

  return <Table columns={cols} data={props?.doctor} />;
};
export const ReactTableDivided = () => {
  const cols = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'title',
        cellClass: 'list-item-heading w-40',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Sales',
        accessor: 'sales',
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Stock',
        accessor: 'stock',
        cellClass: 'text-muted  w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: 'Category',
        accessor: 'category',
        cellClass: 'text-muted  w-40',
        Cell: (props) => <>{props.value}</>,
      },
    ],
    []
  );
  return (
    <div className="mb-4">
      <CardTitle>
        <IntlMessages id="table.divided" />
      </CardTitle>
      <Table columns={cols} data={products} divided />
    </div>
  );
};

export const ProjectTable = (props) => {
  const { changeRoute, header } = props;
  const cols = React.useMemo(
    () => [
      {
        Header: header[0],
        accessor: 'name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: header[1],
        accessor: 'short_description',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: header[2],
        accessor: 'action',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#fed000' }}
            onClick={() => changeRoute(props?.cell?.row?.original)}
          >
            View
          </Button>
        ),
      },
    ],
    []
  );
  return (
    <div className="mb-4">
      <Table columns={cols} data={props?.data} />
    </div>
  );
};

export const BannerTable = (props) => {
  const { changeRoute, header } = props;
  const cols = React.useMemo(
    () => [
      {
        Header: header[0],
        accessor: 'heading',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: header[1],
        accessor: 'paragraph',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
     

      {
        Header: <span style={{ fontSize: '1.0rem' }}>{header[2]}</span>,
        accessor: 'title3',
        cellClass: 'text-muted w-10',
        // Cell: (props) => {console.log(props?.cell?.row?.original)}
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#fed000' }}
            onClick={() => changeRoute(props?.cell?.row?.original)}
          >
            View
          </Button>
        ),
      },
    ],
    []
  );
  return (
    <div className="mb-4">
      <Table columns={cols} data={props?.data} />
    </div>
  );
};
