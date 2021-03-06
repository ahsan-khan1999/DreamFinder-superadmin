import React, { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import PastAppoinment from './pastAppoinment';

const ViewTodaysAppoinment = React.lazy(() =>
  import(/* webpackChunkName: "components-badges" */ './todaysAppoinment')
);

const RescheduleRequest = React.lazy(() =>
  import(/* webpackChunkName: "components-badges" */ './rescheduleRequest')
);
const CurrentRescheduleRequest = React.lazy(() =>
  import(/* webpackChunkName: "components-badges" */ './viewCurrentAppoitmentReq')
);

const ViewPastAppoinment = React.lazy(() =>
  import(/* webpackChunkName: "components-badges" */ './pastAppoinment')
);
const ViewCurrentPastAppoinment = React.lazy(() =>
  import(/* webpackChunkName: "components-badges" */ './viewCurrentPastAppointment')
);
const ViewCurrentTodayAppoinment = React.lazy(() =>
  import(/* webpackChunkName: "components-badges" */ './viewCurrentTodaysAppointment')
);
const ViewCurrentUpcomingAppoinment = React.lazy(() =>
  import(/* webpackChunkName: "components-badges" */ './viewCurrentUpcomingAppointment')
);
const UpcommingAppoinment = React.lazy(() =>
  import(/* webpackChunkName: "components-badges" */ './upcomingAppoinments')
);
const Buttons = React.lazy(() =>
  import(/* webpackChunkName: "components-buttons" */ './buttons')
);
const Cards = React.lazy(() =>
  import(/* webpackChunkName: "components-cards" */ './cards')
);
const Carousel = React.lazy(() =>
  import(/* webpackChunkName: "components-carousel" */ './carousel')
);
const Charts = React.lazy(() =>
  import(/* webpackChunkName: "components-charts" */ './charts')
);
const Collapse = React.lazy(() =>
  import(/* webpackChunkName: "components-collapse" */ './collapse')
);
const Dropdowns = React.lazy(() =>
  import(/* webpackChunkName: "components-dropdowns" */ './dropdowns')
);
const Editors = React.lazy(() =>
  import(/* webpackChunkName: "components-editors" */ './editors')
);
const Icons = React.lazy(() =>
  import(/* webpackChunkName: "components-icons" */ './icons')
);
const InputGroups = React.lazy(() =>
  import(/* webpackChunkName: "components-input-groups" */ './input-groups')
);
const Jumbotron = React.lazy(() =>
  import(/* webpackChunkName: "components-jumbotron" */ './jumbotron')
);
const Maps = React.lazy(() =>
  import(/* webpackChunkName: "components-maps" */ './maps')
);
const Modal = React.lazy(() =>
  import(/* webpackChunkName: "components-modal" */ './modal')
);
const Navigation = React.lazy(() =>
  import(/* webpackChunkName: "components-navigation" */ './navigation')
);
const PopoverTooltip = React.lazy(() =>
  import(
    /* webpackChunkName: "components-popover-tooltip" */ './popover-tooltip'
  )
);
const Sortable = React.lazy(() =>
  import(/* webpackChunkName: "components-sortable" */ './sortable')
);
const Tables = React.lazy(() =>
  import(/* webpackChunkName: "components-tables" */ './tables')
);

const Components = ({ match }) => (
  <Suspense fallback={<div className="loading" />}>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}`} />

      <Route
        path={`${match.url}/todaysAppoinment`}
        render={(props) => <ViewTodaysAppoinment {...props} />}
      />
      <Route
        path={`${match.url}/rescheduleRequest`}
        render={(props) => <RescheduleRequest {...props} />}
      />
      <Route
        path={`${match.url}/pastAppoinment`}
        render={(props) => <ViewPastAppoinment {...props} />}
      />
      <Route
        path={`${match.url}/viewCurrentPastAppointment`}
        render={(props) => <ViewCurrentPastAppoinment {...props} />}
      />
      <Route
        path={`${match.url}/viewCurrentTodaysAppointment`}
        render={(props) => <ViewCurrentTodayAppoinment {...props} />}
      />
      <Route
        path={`${match.url}/upcomingAppoinments`}
        render={(props) => <UpcommingAppoinment {...props} />}
      />
      <Route
        path={`${match.url}/viewCurrentAppoitmentReq`}
        render={(props) => <CurrentRescheduleRequest {...props} />}
      />
      <Route
        path={`${match.url}/viewCurrentUpcomingAppointment`}
        render={(props) => <ViewCurrentUpcomingAppoinment {...props} />}
      />

      <Route
        path={`${match.url}/buttons`}
        render={(props) => <Buttons {...props} />}
      />
      <Route
        path={`${match.url}/cards`}
        render={(props) => <Cards {...props} />}
      />
      <Route
        path={`${match.url}/carousel`}
        render={(props) => <Carousel {...props} />}
      />
      <Route
        path={`${match.url}/charts`}
        render={(props) => <Charts {...props} />}
      />
      <Route
        path={`${match.url}/collapse`}
        render={(props) => <Collapse {...props} />}
      />
      <Route
        path={`${match.url}/dropdowns`}
        render={(props) => <Dropdowns {...props} />}
      />
      <Route
        path={`${match.url}/editors`}
        render={(props) => <Editors {...props} />}
      />
      <Route
        path={`${match.url}/icons`}
        render={(props) => <Icons {...props} />}
      />
      <Route
        path={`${match.url}/input-groups`}
        render={(props) => <InputGroups {...props} />}
      />
      <Route
        path={`${match.url}/jumbotron`}
        render={(props) => <Jumbotron {...props} />}
      />
      <Route
        path={`${match.url}/maps`}
        render={(props) => <Maps {...props} />}
      />
      <Route
        path={`${match.url}/modal`}
        render={(props) => <Modal {...props} />}
      />
      <Route
        path={`${match.url}/navigation`}
        render={(props) => <Navigation {...props} />}
      />
      <Route
        path={`${match.url}/popover-tooltip`}
        render={(props) => <PopoverTooltip {...props} />}
      />
      <Route
        path={`${match.url}/sortable`}
        render={(props) => <Sortable {...props} />}
      />
      <Route
        path={`${match.url}/tables`}
        render={(props) => <Tables {...props} />}
      />
      <Redirect to="/error" />
    </Switch>
  </Suspense>
);
export default Components;
