/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { Card, Row } from 'reactstrap';
import { Colxx, Separator } from 'components/common/CustomBootstrap';
import Breadcrumb from 'containers/navs/Breadcrumb';
import IconCardsCarousel from 'containers/dashboards/IconCardsCarousel';
import RecentOrders from 'containers/dashboards/RecentOrders';
import Logs from 'containers/dashboards/Logs';
import Tickets from 'containers/dashboards/Tickets';
import Calendar from 'containers/dashboards/Calendar';
import BestSellers from 'containers/dashboards/BestSellers';
import ProfileStatuses from 'containers/dashboards/ProfileStatuses';
import GradientCardContainer from 'containers/dashboards/GradientCardContainer';
import Cakes from 'containers/dashboards/Cakes';
import GradientWithRadialProgressCard from 'components/cards/GradientWithRadialProgressCard';
import SortableStaticticsRow from 'containers/dashboards/SortableStaticticsRow';
import AdvancedSearch from 'containers/dashboards/AdvancedSearch';
import SmallLineCharts from 'containers/dashboards/SmallLineCharts';
import {
  PrescriptionChartCard,
  SalesChartCard,
  OrderChartCard,
} from 'containers/dashboards/SalesChartCard';
import ProductCategoriesPolarArea from 'containers/dashboards/ProductCategoriesPolarArea';
import WebsiteVisitsChartCard from 'containers/dashboards/WebsiteVisitsChartCard';
import ConversionRatesChartCard from 'containers/dashboards/ConversionRatesChartCard';
import TopRatedItems from 'containers/dashboards/TopRatedItems';
import apiServices from 'services/requestHandler';
import axios from 'axios';
import { getToken } from 'Utils/auth.util';
import { Input } from 'reactstrap';
import moment from 'moment';
const DefaultDashboard = ({ intl, match }) => {
  const { messages } = intl;
  let date1 = new Date()
  const sevenDaysBeforeDate = new Date(new Date().setDate(new Date().getDate() - 7));
  console.log(moment(date1).unix() ,"current date");
  console.log(moment(sevenDaysBeforeDate).unix() ,"before 7 days");

  const [from, setFrom] = useState(sevenDaysBeforeDate);
  const [to, setTo] = useState(date1);
  const [chart, setChart] = useState([]);
  let convertFrom = moment(from).unix();
  let convertTo = moment(to).unix();

  const getDashboardData = async () => {
    let res = await apiServices.getDashboardChart(convertFrom, convertTo);
    setChart(res?.data?.response_data);
  };
  useEffect(() => {
    if (from !== undefined && to !== undefined) {
      getDashboardData();
    }
  }, [convertFrom, convertTo]);
  return (
    <>
      <Row>
        <Colxx xxs="12">
          <h4>Dashboard</h4>
          <Separator className="mb-5" />
        </Colxx>
        <Colxx lg={6} md={12}>
          <Card className="p-4 mb-3">
            <Row className="">
              <Colxx sm={6}>
                <Input
                  type="datetime-local"
                  className="dashboard-date-filter"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                ></Input>
              </Colxx>
              <Colxx sm={6}>
                <Input
                  type="datetime-local"
                  className="dashboard-date-filter"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                ></Input>
              </Colxx>
            </Row>
          </Card>
        </Colxx>
      </Row>
      <Row>
        <Colxx lg="12" xl="6" className="mb-4">
          {/* <WebsiteVisitsChartCard /> */}
          <Row>
            <Colxx>
              <PrescriptionChartCard data={chart} />

              {/* <BestSellers /> */}
            </Colxx>
          </Row>
        </Colxx>
        <Colxx lg="12" xl="6" className="mb-4">
          {/* <WebsiteVisitsChartCard /> */}
          <Row>
            <Colxx>
              <OrderChartCard data={chart} />

              {/* <BestSellers /> */}
            </Colxx>
          </Row>
        </Colxx>
      </Row>
      {/* <Row>
        <Colxx lg="4" md="12" className="mb-4">
          <ProductCategoriesPolarArea chartclassName="dashboard-donut-chart" />
        </Colxx>
        <Colxx lg="4" md="6" className="mb-4">
          <Logs />
        </Colxx>
        <Colxx lg="4" md="6" className="mb-4">
          <Tickets />
        </Colxx>
      </Row> */}
      {/* <Row>
        <Colxx xl="6" lg="12" className="mb-4">
          <Calendar />
        </Colxx>
        <Colxx xl="6" lg="12" className="mb-4">
          <BestSellers />
        </Colxx>
      </Row> */}
      {/* <Row>
        <Colxx sm="12" lg="4" className="mb-4">
          <ProfileStatuses />
        </Colxx>
        <Colxx md="6" lg="4" className="mb-4">
          <GradientCardContainer />
        </Colxx>
        <Colxx md="6" lg="4" className="mb-4">
          <Cakes />
        </Colxx>
      </Row> */}
      {/* <SortableStaticticsRow messages={messages} /> */}
      {/* <Row>
        <Colxx sm="12" md="6" className="mb-4">
          <WebsiteVisitsChartCard />
        </Colxx>
        <Colxx sm="12" md="6" className="mb-4">
          <ConversionRatesChartCard />
        </Colxx>
      </Row> */}
      {/* <Row>
        <Colxx lg="12" md="6" xl="4">
          <Row>
            <Colxx lg="4" xl="12" className="mb-4">
              <GradientWithRadialProgressCard
                icon="iconsminds-clock"
                title={`5 ${messages['dashboards.files']}`}
                detail={messages['dashboards.pending-for-print']}
                percent={(5 * 100) / 12}
                progressText="5/12"
              />
            </Colxx>
            <Colxx lg="4" xl="12" className="mb-4">
              <GradientWithRadialProgressCard
                icon="iconsminds-male"
                title={`4 ${messages['dashboards.orders']}`}
                detail={messages['dashboards.on-approval-process']}
                percent={(4 * 100) / 6}
                progressText="4/6"
              />
            </Colxx>
            <Colxx lg="4" xl="12" className="mb-4">
              <GradientWithRadialProgressCard
                icon="iconsminds-bell"
                title={`8 ${messages['dashboards.alerts']}`}
                detail={messages['dashboards.waiting-for-notice']}
                percent={(8 * 100) / 10}
                progressText="8/10"
              />
            </Colxx>
          </Row>
        </Colxx>
        <Colxx lg="6" md="6" xl="4" sm="12" className="mb-4">
          <AdvancedSearch messages={messages} />
        </Colxx>
        <Colxx lg="6" xl="4" className="mb-4">
          <SmallLineCharts />
          <TopRatedItems />
        </Colxx>
      </Row> */}
    </>
  );
};
export default injectIntl(DefaultDashboard);
