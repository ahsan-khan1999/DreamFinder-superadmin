
/* eslint-disable */

import React from "react";
const DetailTable = ({ data, tableHead, scheduleHandler }) => {
  return (
    <div className="px-3 py-1 w-100  mb-5 containerWithShadow table-responsive">
      <table className="table table-bordered mt-3">
        <thead>
          <tr>
            {tableHead?.map((item, index) => (
              <th scope="col" key={index + 1} style={{ background: "#f9f9f9" }}>
                <span className=" patient-appointment-table-heading">
                  {item}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data?.map((item, index) => (
            <tr key={index + 1}>
              {item?.map((_item, index) => (
                <td
                  style={{
                    color: "#787878",
                    fontWeight: "400",
                    minWidth: _item == "Cardiology" ? "" : "160px",
                  }}
                  key={index + 1}
                >
                  {_item}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailTable;
