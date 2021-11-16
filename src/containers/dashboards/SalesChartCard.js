/* eslint-disable */

import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';

import IntlMessages from 'helpers/IntlMessages';
import { LineChart } from 'components/charts';

import { lineChartData } from 'data/charts';
import Switch from 'rc-switch';

export const SalesChartCard = () => {
  const [display, setDisplay] = useState(true);

  const toggle = () => setDisplay(!display);
  return (
    <Card>
      <div className="position-absolute card-top-buttons">
        
        <Switch
          // name={name}
          className="custom-switch custom-switch-primary"
          // checked={value}
          onChange={toggle}
        />

        {/* <UncontrolledDropdown>
          <DropdownToggle color="" className="btn btn-header-light icon-button">
            <i className="simple-icon-refresh" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <IntlMessages id="dashboards.sales" />
            </DropdownItem>
            <DropdownItem>
              <IntlMessages id="dashboards.orders" />
            </DropdownItem>
            <DropdownItem>
              <IntlMessages id="dashboards.refunds" />
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown> */}
      </div>

      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.sales" />
        </CardTitle>
        {display ? (
          <div className="dashboard-line-chart">
            <LineChart shadow data={lineChartData} />
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
};

export const PrescriptionChartCard = () => {
  const [display, setDisplay] = useState(true);

  const toggle = () => setDisplay(!display);
  return (
    <Card>
      <div className="position-absolute card-top-buttons">
        <Switch
          className="custom-switch custom-switch-primary"
          onChange={toggle}
        />
      </div>

      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.prescription" />
        </CardTitle>
        {display ? (
          <div className="dashboard-line-chart">
            <LineChart shadow data={lineChartData} />
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
};

export const OrderChartCard = () => {
  const [display, setDisplay] = useState(true);

  const toggle = () => setDisplay(!display);
  return (
    <Card>
      <div className="position-absolute card-top-buttons">
        <Switch
          className="custom-switch custom-switch-primary"
          onChange={toggle}
        />
      </div>

      <CardBody>
        <CardTitle>
          <IntlMessages id="dashboards.order" />
        </CardTitle>
        {display ? (
          <div className="dashboard-line-chart">
            <LineChart shadow data={lineChartData} />
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
};

// export default SalesChartCard;
