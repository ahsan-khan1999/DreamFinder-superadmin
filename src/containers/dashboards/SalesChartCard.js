/* eslint-disable */

import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  UncontrolledDropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
} from 'reactstrap';
import { ThemeColors } from 'helpers/ThemeColors';

const colors = ThemeColors();
import IntlMessages from 'helpers/IntlMessages';
import { LineChart } from 'components/charts';
import Bar from 'components/charts/Bar'
import { lineChartData } from 'data/charts';
import Switch from 'rc-switch';
import apiServices from 'services/requestHandler';
import moment from 'moment';

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

export const PrescriptionChartCard = (props) => {
  let label = props?.data?.time_list?.map((item) =>
    moment.unix(item).format('dddd ')
  );


  let lineChartDataTest = {
    labels: label,
    datasets: [
      {
        label: '',
        data: props?.data?.prescription?.map((item) => {
          return item;
        }),
        borderColor: colors.themeColor1,
        pointBackgroundColor: colors.foregroundColor,
        pointBorderColor: colors.themeColor1,
        pointHoverBackgroundColor: colors.themeColor1,
        pointHoverBorderColor: colors.foregroundColor,
        pointRadius: 6,
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        fill: false,
      },
    ],
  };
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
            <LineChart shadow data={lineChartDataTest} />
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
};

export const OrderChartCard = (props) => {
  let label = props?.data?.time_list?.map((item) =>
    moment.unix(item).format('dddd ')
  );

  let lineChartDataTest = {
    labels: label,
    datasets: [
      {
        label: '',
        data: props?.data?.order?.map((item) => {
          return item;
        }),
        borderColor: colors.themeColor1,
        pointBackgroundColor: colors.foregroundColor,
        pointBorderColor: colors.themeColor1,
        pointHoverBackgroundColor: colors.themeColor1,
        pointHoverBorderColor: colors.foregroundColor,
        pointRadius: 6,
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        fill: false,
      },
    ],
  };
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
            <LineChart shadow data={lineChartDataTest} />
          </div>
        ) : null}
      </CardBody>
    </Card>
  );
};

// export default SalesChartCard;
