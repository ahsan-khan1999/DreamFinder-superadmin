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
export const AppoinmentTable = (props) => {
  // console.log(props?.doctor);
  const { changeRoute } = props;
  const cols = React.useMemo(
    () => [
      {
        Header: props?.header[0],
        accessor: 'condition.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ 'fontSize': '0.9rem' }}>{props?.value}</span>
        ),
      },
      {
        Header: props?.header[1],
        accessor: 'consultation_type.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ 'fontSize': '0.9rem' }}>{props?.value}</span>
        ),
      },
      {
        Header: props?.header[2],
        accessor: 'doctor_details.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ 'fontSize': '0.9rem' }}>{props?.value}</span>
        ),
      },
      {
        Header: props?.header[3],
        accessor: 'patient_details.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ 'fontSize': '0.9rem' }}>{props?.value}</span>
        ),
      },

      {
        Header: props?.header[4],
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        // Cell: (props) => {console.log(props?.cell?.row?.original)}
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'booked' || 'cancelled' ? 'red' : 'green',
              'fontSize': '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[5]}</span>
        ),
        accessor: 'title3',
        cellClass: 'text-muted w-10',
        // Cell: (props) => {console.log(props?.cell?.row?.original)}
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066b3' }}
            onClick={() => changeRoute(props?.cell?.row?.original)}
          >
            View
          </Button>
        ),
      },
    ],
    []
  );

  return <Table columns={cols} data={props?.data} />;
};
export const RemovalRequestTable = (props) => {
  // console.log(props?.doctor);
  const { changeRoute } = props;
  const cols = React.useMemo(
    () => [
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[0]}</span>
        ),
        accessor: 'action',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ 'fontSize': '0.9rem' }}>{props.value}</span>
        ),
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[1]}</span>
        ),
        accessor: 'requested_by.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ 'fontSize': '0.9rem' }}>{props?.value}</span>
        ),
      },
      // {
      //   Header: props?.header[2],
      //   accessor: 'requested_for.name',
      //   cellClass: 'list-item-heading w-10',
      //   Cell: (props) => <>{props?.value}</>,
      // },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[2]}</span>
        ),
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'approved' ? 'green' : 'red',
              'fontSize': '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[3]}</span>
        ),
        accessor: 'type',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ 'fontSize': '0.9rem' }}>{props?.value}</span>
        ),
      },

      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[4]}</span>
        ),
        accessor: 'title3',
        cellClass: 'text-muted w-10',
        // Cell: (props) => {console.log(props?.cell?.row?.original)}
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066b3' }}
            onClick={() => changeRoute(props?.cell?.row?.original)}
          >
            View
          </Button>
        ),
      },
    ],
    []
  );

  return <Table columns={cols} data={props?.data} />;
};
// export const ReactTableWithPaginationCard = () => {
//   const cols = React.useMemo(
//     () => [
//       {
//         Header: 'Name',
//         accessor: 'title',
//         cellClass: 'list-item-heading w-40',
//         Cell: (props) => <>{props.value}</>,
//       },
//       {
//         Header: 'Sales',
//         accessor: 'sales',
//         cellClass: 'text-muted w-10',
//         Cell: (props) => <>{props.value}</>,
//       },
//       {
//         Header: 'Stock',
//         accessor: 'stock',
//         cellClass: 'text-muted w-10',
//         Cell: (props) => <>{props.value}</>,
//       },
//       {
//         Header: 'Category',
//         accessor: 'category',
//         cellClass: 'text-muted w-40',
//         Cell: (props) => <>{props.value}</>,
//       },
//     ],
//     []
//   );

//   return (
//     <Card className="mb-4">
//       <CardBody>
//         <CardTitle>
//           <IntlMessages id="table.react-pagination" />
//         </CardTitle>
//         <Table columns={cols} data={products} />
//       </CardBody>
//     </Card>
//   );
// };

export const ReactTableWithPaginationCardPatient = (props) => {
  // console.log(props?.doctor);
  const { changeRoute } = props;
  const cols = React.useMemo(
    () => [
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[0]}</span>
        ),
        accessor: 'patient_id',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ 'fontSize': '0.9rem' }}>{props?.value}</span>
        ),
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[1]}</span>
        ),
        accessor: 'name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ 'fontSize': '0.9rem' }}>{props?.value}</span>
        ),
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[2]}</span>
        ),
        accessor: 'date_of_birth',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ 'fontSize': '0.9rem' }}>{props?.value}</span>
        ),
      },
      // {
      //   Header: (
      //     <span style={{ 'fontSize': '1.0rem' }}>{props?.header[3]}</span>
      //   ),
      //   accessor: 'designation',
      //   cellClass: 'list-item-heading w-10',
      //   Cell: (props) => (
      //     <span style={{ 'fontSize': '0.9rem' }}>{props?.value}</span>
      //   ),
      // },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[3]}</span>
        ),
        accessor: 'gender.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ 'fontSize': '0.9rem' }}>{props?.value}</span>
        ),
      },
      // {
      //   Header: (
      //     <span style={{ 'fontSize': '1.0rem' }}>{props?.header[5]}</span>
      //   ),
      //   accessor: 'speciality.name',
      //   cellClass: 'list-item-heading w-10',
      //   Cell: (props) => (
      //     <span style={{ 'fontSize': '0.9rem' }}>{props?.value}</span>
      //   ),
      // },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[4]}</span>
        ),
        accessor: 'state.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <div
            style={{
              color: props?.value === 'active' ? 'green' : 'red',
              'fontSize': '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </div>
        ),
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[5]}</span>
        ),
        accessor: 'title3',
        cellClass: 'text-muted w-10',
        // Cell: (props) => {console.log(props?.cell?.row?.original)}
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066b3' }}
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
    <Table columns={cols} data={props?.doctor} className="responsive-table" />
  );
};
export const OrderRequestTable = (props) => {
  // console.log(props?.doctor);
  const { changeRoute } = props;
  const cols = React.useMemo(
    () => [
      {
        Header: props?.header[0],
        accessor: 'order_id',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ fontSize: '0.9rem' }}>{props?.value}</span>
        ),
      },
      
      {
        Header: props?.header[1],
        accessor: 'customer.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value}
          </span>
        ),
      },
      {
        Header: props?.header[2],
        accessor: 'customer.market__street_address',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              
              fontSize: '0.9rem',
            }}
          >
            {props?.value}
          </span>
        ),
      },
      {
        Header: props?.header[3],
        accessor: 'order_datetime',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              
              fontSize: '0.9rem',
            }}
          >
            {moment.unix(props?.value).format("MMM DD, YYYY")}
          </span>
        ),
      },
      {
        Header: props?.header[4],
        accessor: 'payment_type',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              
              fontSize: '0.9rem',
            }}
          >
           {props?.value?.toUpperCase()}
          </span>
        ),
      },
      {
        Header: props?.header[5],
        accessor: 'delivery_status',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            
          style={{
              color: props?.value === 'delivered' 
              ||props?.value==='submitted_to_depot'
              ? 'green'
               : props?.value === 'pending' ? '#C0B627' 
              : props?.value === 'returned' 
              ||props?.value==='cancelled' ? 'red' 
              : props?.value === 'dispatched' ? 'blue' : '',
              fontSize: '0.9rem',
              fontWeight:'600'
              
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
      {
        Header: props?.header[6],
        accessor: 'payment_status',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'delivered' 
              ||props?.value==='received'
              ? 'green'
               : props?.value === 'pending' ? '#C0B627' 
              : props?.value === 'declined' 
              ||props?.value==='cancelled' ? 'red' 
              :props?.value === 'unpaid' || props?.value === 'deposited' ? 'blue' : '',
              fontSize: '0.9rem',
              fontWeight:'600'
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },

      {
        Header: props?.header[7],
        accessor: 'ordered_by.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              
              fontSize: '0.9rem',
            }}
          >
            {props?.value}
          </span>
        ),
      },
      {
        Header: props?.header[8],
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'active' 
              ? 'green':'red',
              fontSize: '0.9rem',
              fontWeight:'600'
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[9]}</span>
        ),
        accessor: 'title6',
        cellClass: 'text-muted w-10',
        // Cell: (props) => {console.log(props?.cell?.row?.original)}
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066b3' }}
            onClick={() => changeRoute(props?.cell?.row?.original)}
          >
            View
          </Button>
        ),
      },
    ],
    []
  );

  return <Table columns={cols} data={props?.data} />;
};










//Department Head Start
export const DepartmentHeadTable = (props) => {
  // console.log(props?.doctor);
  const { changeRoute } = props;
  const cols = React.useMemo(
    () => [
     
      
      {
        Header: props?.header[0],
        accessor: 'name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
      {
        Header: props?.header[1],
        accessor: 'designation',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
      {
        Header: props?.header[2],
        accessor: 'email',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
      {
        Header: props?.header[3],
        accessor: 'address',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
      {
        Header: props?.header[4],
        accessor: 'phone',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              
              fontSize: '0.9rem',
            }}
          >
           {props?.value?.toUpperCase()}
          </span>
        ),
      },


      {
        Header: props?.header[5],
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'active' 
              ? 'green':'red',
              fontSize: '0.9rem',
              fontWeight:'600'
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
     
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[6]}</span>
        ),
        accessor: 'title6',
        cellClass: 'text-muted w-10',
        // Cell: (props) => {console.log(props?.cell?.row?.original)}
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066b3' }}
            onClick={() => changeRoute(props?.cell?.row?.original)}
          >
            View
          </Button>
        ),
      },
    ],
    []
  );

  return <Table columns={cols} data={props?.data} />;
};

//Department Head






//Distribution Center Start
export const DistributionCenter = (props) => {
  // console.log(props?.doctor);
  const { changeRoute } = props;
  const cols = React.useMemo(
    () => [
     
      
      {
        Header: props?.header[0],
        accessor: 'name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
      {
        Header: props?.header[1],
        accessor: 'designation',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
      {
        Header: props?.header[2],
        accessor: 'email',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
      {
        Header: props?.header[3],
        accessor: 'address',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              
              fontSize: '0.9rem',
            }}
          >
            {props?.value === "N/A N/A N/A N/A" ? "N/A" :props?.value}
          </span>
        ),
      },
      {
        Header: props?.header[4],
        accessor: 'phone',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              
              fontSize: '0.9rem',
            }}
          >
           {props?.value?.toUpperCase()}
          </span>
        ),
      },

      {
        Header: props?.header[5],
        accessor: 'status',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'active' 
              ? 'green':'red',
              fontSize: '0.9rem',
              fontWeight:'600'
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
     
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[6]}</span>
        ),
        accessor: 'title6',
        cellClass: 'text-muted w-10',
        // Cell: (props) => {console.log(props?.cell?.row?.original)}
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066b3' }}
            onClick={() => changeRoute(props?.cell?.row?.original)}
          >
            View
          </Button>
        ),
      },
    ],
    []
  );

  return <Table columns={cols} data={props?.data} />;
};

//Distribution Center





//Product Table
export const ProductTable = (props) => {
  const { changeRoute } = props;
  const cols = React.useMemo(
    () => [
     
      
      {
        Header: props?.header[0],
        accessor: 'name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
      {
        Header: props?.header[1],
        accessor: 'category.category',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
  
      {
        Header: props?.header[2],
        accessor: 'price',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              
              fontSize: '0.9rem',
            }}
          >
            {props?.value}
          </span>
        ),
      },
      {
        Header: props?.header[3],
        accessor: 'vat_rate',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              
              fontSize: '0.9rem',
            }}
          >
           {props?.value}
          </span>
        ),
      },
      {
        Header: props?.header[4],
        accessor: 'total_price',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              
              fontSize: '0.9rem',
            }}
          >
           {props?.value}
          </span>
        ),
      },
      {
        Header: props?.header[5],
        accessor: 'created_by.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              
              fontSize: '0.9rem',
            }}
          >
           {props?.value?.toUpperCase()}
          </span>
        ),
      },


      {
        Header: props?.header[6],
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'active' 
              ? 'green':'red',
              fontSize: '0.9rem',
              fontWeight:'600'
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
     
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[7]}</span>
        ),
        accessor: 'title6',
        cellClass: 'text-muted w-10',
        // Cell: (props) => {console.log(props?.cell?.row?.original)}
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066b3' }}
            onClick={() => changeRoute(props?.cell?.row?.original)}
          >
            View
          </Button>
        ),
      },
    ],
    []
  );

  return <Table columns={cols} data={props?.data} />;
};








//Stock Table
export const StockTable = (props) => {
  const { changeRoute } = props;
  const cols = React.useMemo(
    () => [
     
      
      {
        Header: props?.header[0],
        accessor: 'product.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
      {
        Header: props?.header[1],
        accessor: 'product.category.category',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
  
      {
        Header: props?.header[2],
        accessor: 'quantity',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              
              fontSize: '0.9rem',
            }}
          >
            {props?.value}
          </span>
        ),
      },
      {
        Header: props?.header[3],
        accessor: 'product.formula',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              
              fontSize: '0.9rem',
            }}
          >
           {props?.value ? props?.value?.toUpperCase() : 'N/A' }  
          </span>
        ),
      },
      {
        Header: props?.header[4],
        accessor: 'product.price',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              
              fontSize: '0.9rem',
            }}
          >
           {props?.value}
          </span>
        ),
      },
     

      {
        Header: props?.header[5],
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'active' 
              ? 'green':'red',
              fontSize: '0.9rem',
              fontWeight:'600'
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },


      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[6]}</span>
        ),
        accessor: 'title6',
        cellClass: 'text-muted w-10',
        // Cell: (props) => {console.log(props?.cell?.row?.original)}
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066b3' }}
            onClick={() => changeRoute(props?.cell?.row?.original)}
          >
            View
          </Button>
        ),
      },
    ],
    []
  );

  return <Table columns={cols} data={props?.data} />;
};









//Product Category Table
export const ProductCategoryTable = (props) => {
  const { changeRoute } = props;
  const cols = React.useMemo(
    () => [
     
      
      {
        Header: props?.header[0],
        accessor: 'name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
      {
        Header: props?.header[1],
        accessor: 'category',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
  
   

      {
        Header: props?.header[2],
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'active' 
              ? 'green':'red',
              fontSize: '0.9rem',
              fontWeight:'600'
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },


      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[3]}</span>
        ),
        accessor: 'title6',
        cellClass: 'text-muted w-10',
        // Cell: (props) => {console.log(props?.cell?.row?.original)}
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066b3' }}
            onClick={() => changeRoute(props?.cell?.row?.original)}
          >
            View
          </Button>
        ),
      },
    ],
    []
  );

  return <Table columns={cols} data={props?.data} />;
};








//Stock Transaction Table
export const StockTransaction = (props) => {
  const { changeRoute } = props;
  const cols = React.useMemo(
    () => [
     
      
      {
        Header: props?.header[0],
        accessor: 'name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value ? props?.value?.toUpperCase() : 'N/A'}
          </span>
        ),
      },
      {
        Header: props?.header[1],
        accessor: 'stock.product.category.category',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value ? props?.value?.toUpperCase() :'N/A'}
          </span>
        ),
      },
  
      {
        Header: props?.header[2],
        accessor: 'stock.product.category.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
  

      {
        Header: props?.header[3],
        accessor: 'date',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              
              fontSize: '0.9rem',
            }}
          >
            {moment.unix(props?.value).format("MMM DD, YYYY")}
          </span>
        ),
      },


      {
        Header: props?.header[4],
        accessor: 'price',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value}
          </span>
        ),
      },
      

      {
        Header: props?.header[5],
        accessor: 'quantity',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value}
          </span>
        ),
      },


      {
        Header: props?.header[6],
        accessor: 'transaction_type',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },


      

      {
        Header: props?.header[7],
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'active' 
              ? 'green':'red',
              fontSize: '0.9rem',
              fontWeight:'600'
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },


      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[8]}</span>
        ),
        accessor: 'title6',
        cellClass: 'text-muted w-10',
        // Cell: (props) => {console.log(props?.cell?.row?.original)}
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066b3' }}
            onClick={() => changeRoute(props?.cell?.row?.original)}
          >
            View
          </Button>
        ),
      },
    ],
    []
  );

  return <Table columns={cols} data={props?.data} />;
};







//Doctor Table
export const DoctorTable = (props) => {
  const { changeRoute } = props;
  const cols = React.useMemo(
    () => [
     
      
      {
        Header: props?.header[0],
        accessor: 'name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value ? props?.value?.toUpperCase() : 'N/A'}
          </span>
        ),
      },
      {
        Header: props?.header[1],
        accessor: 'designation',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value ? props?.value?.toUpperCase() :'N/A'}
          </span>
        ),
      },
  
      {
        Header: props?.header[2],
        accessor: 'degree',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },

      {
        Header: props?.header[3],
        accessor: 'doctor_category',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
  

 


      {
        Header: props?.header[4],
        accessor: 'organization',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
      

      {
        Header: props?.header[5],
        accessor: 'speciality.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },


      {
        Header: props?.header[6],
        accessor: 'station_type',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },

      {
        Header: props?.header[7],
        accessor: 'phone_number',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },

     

      {
        Header: props?.header[8],
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'active' 
              ? 'green':'red',
              fontSize: '0.9rem',
              fontWeight:'600'
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },


      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[9]}</span>
        ),
        accessor: 'title6',
        cellClass: 'text-muted w-10',
        // Cell: (props) => {console.log(props?.cell?.row?.original)}
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066b3' }}
            onClick={() => changeRoute(props?.cell?.row?.original)}
          >
            View
          </Button>
        ),
      },
    ],
    []
  );

  return <Table columns={cols} data={props?.data} />;
};






//Doctor Category Table
export const DoctorCategoryTable = (props) => {
  const { changeRoute } = props;
  const cols = React.useMemo(
    () => [
     
      
      {
        Header: props?.header[0],
        accessor: 'name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value ? props?.value?.toUpperCase() : 'N/A'}
          </span>
        ),
      },
     

      {
        Header: props?.header[1],
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'active' 
              ? 'green':'red',
              fontSize: '0.9rem',
              fontWeight:'600'
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },


      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[2]}</span>
        ),
        accessor: 'title6',
        cellClass: 'text-muted w-10',
        // Cell: (props) => {console.log(props?.cell?.row?.original)}
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066b3' }}
            onClick={() => changeRoute(props?.cell?.row?.original)}
          >
            View
          </Button>
        ),
      },
    ],
    []
  );

  return <Table columns={cols} data={props?.data} />;
};





//Customer Table
export const CustomersTable = (props) => {
  const { changeRoute } = props;
  const cols = React.useMemo(
    () => [
     
      
      {
        Header: props?.header[0],
        accessor: 'name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value ? props?.value?.toUpperCase() : 'N/A'}
          </span>
        ),
      },
      {
        Header: props?.header[1],
        accessor: 'client_type',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value ? props?.value?.toUpperCase() :'N/A'}
          </span>
        ),
      },
  
      {
        Header: props?.header[2],
        accessor: 'email_address',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },

      {
        Header: props?.header[3],
        accessor: 'market__street_address',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
  

     {
        Header: props?.header[4],
        accessor: 'phone_number',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
             
              fontSize: '0.9rem',
            }}
          >
            {props?.value}
          </span>
        ),
      },



      

      {
        Header: props?.header[6],
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'active' 
              ? 'green':'red',
              fontSize: '0.9rem',
              fontWeight:'600'
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },


      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[7]}</span>
        ),
        accessor: 'title6',
        cellClass: 'text-muted w-10',
        // Cell: (props) => {console.log(props?.cell?.row?.original)}
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066b3' }}
            onClick={() => changeRoute(props?.cell?.row?.original)}
          >
            View
          </Button>
        ),
      },
    ],
    []
  );

  return <Table columns={cols} data={props?.data} />;
};





export const ReactTableWithPaginationCard = (props) => {
  // console.log(props?.doctor);
  const { changeRoute } = props;
  const cols = React.useMemo(
    () => [
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[0]}</span>
        ),
        accessor: 'name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ 'fontSize': '0.9rem' }}>{props?.value}</span>
        ),
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[1]}</span>
        ),
        accessor: 'date_of_birth',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ 'fontSize': '0.9rem' }}>{props?.value}</span>
        ),
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[2]}</span>
        ),
        accessor: 'designation',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ 'fontSize': '0.9rem' }}>{props?.value}</span>
        ),
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[3]}</span>
        ),
        accessor: 'gender',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ 'fontSize': '0.9rem' }}>{props?.value}</span>
        ),
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[4]}</span>
        ),
        accessor: 'phone_number',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ 'fontSize': '0.9rem' }}>{props?.value}</span>
        ),
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[5]}</span>
        ),
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <div
            style={{
              color: props?.value === 'active' ? 'green' : 'red',
              'fontSize': '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </div>
        ),
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[6]}</span>
        ),
        accessor: 'title3',
        cellClass: 'text-muted w-10',
        // Cell: (props) => {console.log(props?.cell?.row?.original)}
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066b3' }}
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
export const ReactTableWithPaginationCardAllUser = (props) => {
  // console.log(props?.doctor);
  const { changeRoute } = props;
  const cols = React.useMemo(
    () => [
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[0]}</span>
        ),
        accessor: 'name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ 'fontSize': '0.9rem' }}>{props?.value}</span>
        ),
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[1]}</span>
        ),
        accessor: 'date_of_birth',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ 'fontSize': '0.9rem' }}>{props?.value}</span>
        ),
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[2]}</span>
        ),
        accessor: 'designation',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ 'fontSize': '0.9rem' }}>{props?.value}</span>
        ),
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[3]}</span>
        ),
        accessor: 'gender.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span style={{ 'fontSize': '0.9rem' }}>{props?.value}</span>
        ),
      },
      // {
      //   Header: (
      //     <span style={{ 'fontSize': '1.0rem' }}>{props?.header[4]}</span>
      //   ),
      //   accessor: 'speciality.name',
      //   cellClass: 'list-item-heading w-10',
      //   Cell: (props) => (
      //     <span style={{ 'fontSize': '0.9rem' }}>{props?.value}</span>
      //   ),
      // },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[4]}</span>
        ),
        accessor: 'state.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <div
            style={{
              color: props?.value === 'active' ? 'green' : 'red',
              'fontSize': '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </div>
        ),
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[5]}</span>
        ),
        accessor: 'title3',
        cellClass: 'text-muted w-10',
        // Cell: (props) => {console.log(props?.cell?.row?.original)}
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066b3' }}
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
export const ReadTestTable = (props) => {
  const { changeRoute } = props;
  const cols = React.useMemo(
    () => [
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[0]}</span>
        ),
        accessor: 'name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[1]}</span>
        ),
        accessor: 'currency.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[2]}</span>
        ),
        accessor: 'price',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[3]}</span>
        ),
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'active' ? 'green' : 'red',
              'fontSize': '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[4]}</span>
        ),
        accessor: 'title3',
        cellClass: 'text-muted w-10',
        // Cell: (props) => {console.log(props?.cell?.row?.original)}
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066b3' }}
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
export const ReadCategoryTable = (props) => {
  const { changeRoute } = props;
  const cols = React.useMemo(
    () => [
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[0]}</span>
        ),
        accessor: 'name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[1]}</span>
        ),
        accessor: 'category_id',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[2]}</span>
        ),
        accessor: 'title3',
        cellClass: 'text-muted w-10',
        // Cell: (props) => {console.log(props?.cell?.row?.original)}
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066b3' }}
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

export const ReadMedicinesTable = (props) => {
  const { changeRoute } = props;
  const cols = React.useMemo(
    () => [
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[0]}</span>
        ),
        accessor: 'name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[1]}</span>
        ),
        accessor: 'formula',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[2]}</span>
        ),
        accessor: 'sales_price',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[3]}</span>
        ),
        accessor: 'purchase_price',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[4]}</span>
        ),
        accessor: 'availability.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: (
          <span style={{ 'fontSize': '1.0rem' }}>{props?.header[5]}</span>
        ),
        accessor: 'title3',
        cellClass: 'text-muted w-10',
        // Cell: (props) => {console.log(props?.cell?.row?.original)}
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066b3' }}
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

export const ViewReportTable = (props) => {
  const { changeRoute } = props;
  const header = props?.header;
  const cols = React.useMemo(
    () => [
      {
        Header: header[0],
        accessor: 'patient.name',
        cellClass: 'list-item-heading w-20',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[1],
        accessor: 'test.name',
        cellClass: 'list-item-heading w-20',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[2],
        accessor: 'test.category.name',
        cellClass: 'list-item-heading w-20',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[3],
        accessor: 'status.name',
        cellClass: 'list-item-heading w-20',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'report uploaded' ? 'green' : 'red',
              'fontSize': '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },

      {
        Header: header[4],
        accessor: 'action',
        cellClass: 'text-muted  w-10',
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066b3' }}
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
    <div className="mb-4" style={{ width: '100%' }}>
      <Table columns={cols} data={props?.data} style={{ width: '100%' }} />
    </div>
  );
};
export const ViewPaymentTable = (props) => {
  const { changeRoute } = props;
  const header = props?.header;
  const cols = React.useMemo(
    () => [
      {
        Header: header[0],
        accessor: 'type',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[1],
        accessor: 'total_amount',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[2],
        accessor: 'created_at',
        cellClass: 'list-item-heading w-10',
        // Cell: (props) => <>{props.value}</>,
        Cell: (props) => (
          <span>{moment.unix(props?.value).format('MMM DD YYYY')}</span>
        ),
      },
      {
        Header: header[3],
        accessor: 'user.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <span>{props?.value}</span>,
      },

      {
        Header: header[4],
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'unpaid' ? 'red' : 'green',
              'fontSize': '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },

      {
        Header: header[5],
        accessor: 'action',
        cellClass: 'text-muted  w-10',
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066b3' }}
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
    <div className="mb-4" style={{ width: '100%' }}>
      <Table columns={cols} data={props?.data} />
    </div>
  );
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

// Concord

export const AdminTable = (props) => {
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
        accessor: 'date_of_birth',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[2],
        accessor: 'designation',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[3],
        accessor: 'gender',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: header[4],
        accessor: 'phone_number',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[5],
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'active' ? 'green' : 'red',
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
      {
        Header: header[6],
        accessor: 'action',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066B3' }}
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

export const TargetTable = (props) => {
  const { changeRoute, header } = props;
  const cols = React.useMemo(
    () => [
      {
        Header: header[0],
        accessor: 'assigned_to.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[1],
        accessor: 'amount.amount',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[2],
        accessor: 'assigned_to.role.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[3],
        accessor: 'start_date',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{moment.unix(props.value).format('MMM DD, YYYY  / HH:mm:ss')}</>,
      },

      {
        Header: header[4],
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'active' ? 'green' : 'red',
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },

      {
        Header: header[5],
        accessor: 'action',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066B3' }}
            onClick={() => changeRoute(props?.cell?.row?.original)}
          >
            View
          </Button>
        ),
      },
    ],
    []
  );
  return <Table columns={cols} data={props?.data} />;
};
export const DCPTable = (props) => {
  const { changeRoute, header } = props;
  const cols = React.useMemo(
    () => [
      {
        Header: header[0],
        accessor: 'assigned_to.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[1],
        accessor: 'doctor.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[2],
        accessor: 'doctor.designation',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[3],
        accessor: 'purpose',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: header[4],
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'active' ? 'green' : 'red',
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },

      {
        Header: header[5],
        accessor: 'action',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066B3' }}
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

export const DCRTable = (props) => {
  const { changeRoute, header } = props;
  const cols = React.useMemo(
    () => [
      {
        Header: header[0],
        accessor: 'dcp.assigned_to.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[1],
        accessor: 'dcp.doctor.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: header[2],
        accessor: 'visit_by',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[3],
        accessor: 'visited_with.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: header[4],
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'active' ? 'green' : 'red',
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },

      {
        Header: header[5],
        accessor: 'action',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066B3' }}
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

export const ScheduleTabel = (props) => {
  const { changeRoute, header } = props;
  const cols = React.useMemo(
    () => [
      {
        Header: header[0],
        accessor: 'assigned_to.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[1],
        accessor: 'assigned_to.role.category.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      // {
      //   Header: header[2],
      //   accessor:row => row?.attributes?.is_doctor_customer === true ? row?.attributes?.doctor?.name : row?.attributes?.customer?.name,
      //   // accessor: 'is_doctor_customer ? doctor.name :customer.name',

      //   cellClass: 'list-item-heading w-10',
      //   Cell: (props) => <>{props.value}</>,
      // },
      {
        Header: header[2],
        accessor: 'scheduled_by.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: header[3],
        accessor: 'approval_status',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'approved' ? 'green' : 'red',
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },

      {
        Header: header[4],
        accessor: 'action',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066B3' }}
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

export const AttendanceTabel = (props) => {
  const { changeRoute, header } = props;
  const cols = React.useMemo(
    () => [
      {
        Header: header[0],
        accessor: 'user.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[1],
        accessor: 'user.email_address',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      // {
      //   Header: header[2],
      //   accessor:row => row?.attributes?.is_doctor_customer === true ? row?.attributes?.doctor?.name : row?.attributes?.customer?.name,
      //   // accessor: 'is_doctor_customer ? doctor.name :customer.name',

      //   cellClass: 'list-item-heading w-10',
      //   Cell: (props) => <>{props.value}</>,
      // },
      {
        Header: header[2],
        accessor: 'user.field_staff.manager.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[3],
        accessor: 'user.phone_number',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[4],
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'active' ? 'green' : 'red',
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },
      {
        Header: header[5],
        accessor: 'datetime',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span>{moment.unix(props?.value).format('MMM DD YYYY h:mm:ss')}</span>
        ),
      },

      {
        Header: header[6],
        accessor: 'action',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066B3' }}
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

export const ViewCategoryTabel = (props) => {
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
        accessor: 'category.title',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: header[2],
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'active' ? 'green' : 'red',
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },

      {
        Header: header[3],
        accessor: 'action',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066B3' }}
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

export const ViewCustomerPeriorityTabel = (props) => {
  const { changeRoute, header } = props;
  const cols = React.useMemo(
    () => [
      {
        Header: header[0],
        accessor: 'customer.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[1],
        accessor: 'customer.email_address',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[2],
        accessor: 'customer.phone_number',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[3],
        accessor: 'customer.street_address',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: header[4],
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'active' ? 'green' : 'red',
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },

      {
        Header: header[5],
        accessor: 'action',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066B3' }}
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

export const ViewDoctorPeriorityTabel = (props) => {
  const { changeRoute, header } = props;
  const cols = React.useMemo(
    () => [
      {
        Header: header[0],
        accessor: 'doctor.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[1],
        accessor: 'doctor.designation',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[2],
        accessor: 'doctor.phone_number',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[3],
        accessor: 'doctor.speciality.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: header[4],
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'active' ? 'green' : 'red',
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },

      {
        Header: header[5],
        accessor: 'action',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066B3' }}
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

export const SampleTabel = (props) => {
  const { changeRoute, header } = props;
  const cols = React.useMemo(
    () => [
      {
        Header: header[0],
        accessor: 'assigned_to.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[1],
        accessor: 'assigned_to.field_staff.manager.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[2],
        accessor: 'assigned_to.designation',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[3],
        accessor: 'assigned_to.phone_number',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: header[4],
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'active' ? 'green' : 'red',
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },

      {
        Header: header[5],
        accessor: 'action',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066B3' }}
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

export const AssignedGiftTabel = (props) => {
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
        accessor: 'email_address',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[2],
        accessor: 'phone_number',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
     

      
      {
        Header: header[3],
        accessor: 'action',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066B3' }}
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








export const SampleTransactionTabel = (props) => {
  const { changeRoute, header } = props;
  const cols = React.useMemo(
    () => [
      {
        Header: header[0],
        accessor: 'sample.assigned_to.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[1],
        accessor: 'sample.assigned_to.field_staff.manager.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[2],
        accessor: 'sample.assigned_to.designation',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },
      {
        Header: header[3],
        accessor: 'sample.assigned_to.phone_number',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => <>{props.value}</>,
      },

      {
        Header: header[4],
        accessor: 'status.name',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <span
            style={{
              color: props?.value === 'active' ? 'green' : 'red',
              fontSize: '0.9rem',
            }}
          >
            {props?.value?.toUpperCase()}
          </span>
        ),
      },

      {
        Header: header[5],
        accessor: 'action',
        cellClass: 'list-item-heading w-10',
        Cell: (props) => (
          <Button
            style={{ backgroundColor: '#0066B3' }}
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
