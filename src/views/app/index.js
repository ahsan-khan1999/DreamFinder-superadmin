import React, { Suspense } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AppLayout from 'layout/AppLayout';

// import { ProtectedRoute, UserRole } from 'helpers/authHelper';

const Dashboards = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './dashboards')
);
const Pages = React.lazy(() =>
  import(/* webpackChunkName: "pages" */ './pages')
);

  

const CreateGift = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Gift/CreateGift')
);
const ViewRegion = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './TreeView/RegionTreeView')
);
const ViewTarget = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Target/ViewTarget')
);
const CreateTarget = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Target/CreateTarget')
);
const EditTarget = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Target/EditTarget')
);
const Gift = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Gift/gift')
);
const ViewGift = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Gift/ViewGift')
);
const ViewStocks = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './distributioncenter-management/ViewStocks')
);




const ViewDcp = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './FieldWorkManagment/ViewDcp')
);
const ViewDcr = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './FieldWorkManagment/ViewDcr')
);
const ViewAttendance = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Attendance/ViewAttendance')
);
const CreateAttendance = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Attendance/CreateAttendance')
);
const EditAttendance = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Attendance/EditAttendance')
);
// const ViewSchedule = React.lazy(() =>
//   import(
//     /* webpackChunkName: "dashboards" */ './FieldWorkManagment/ViewSchedule'
//   )
// );
// const EditSchedule = React.lazy(() =>
//   import(
//     /* webpackChunkName: "dashboards" */ './FieldWorkManagment/EditSchedule'
//   )
// );

const EditDcp = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './FieldWorkManagment/EditDcp')
);

const ViewPeriority = React.lazy(() =>
  import(
    /* webpackChunkName: "dashboards" */ './PeriorityList/ViewPeriorityList'
  )
);
const ViewPeriorityListDoctor = React.lazy(() =>
  import(
    /* webpackChunkName: "dashboards" */ './PeriorityList/ViewPeriorityListDoctor'
  )
);
const CreatePeriority = React.lazy(() =>
  import(
    /* webpackChunkName: "dashboards" */ './PeriorityList/CreatePeriorityList'
  )
);
const CreateDoctorPeriority = React.lazy(() =>
  import(
    /* webpackChunkName: "dashboards" */ './PeriorityList/CreateDoctorPeriority'
  )
);
const EditPeriority = React.lazy(() =>
  import(
    /* webpackChunkName: "dashboards" */ './PeriorityList/EditPeriorityList'
  )
);
const EditDoctorPeriority = React.lazy(() =>
  import(
    /* webpackChunkName: "dashboards" */ './PeriorityList/EditDoctorPeriorityList'
  )
);
const EditDcr = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './FieldWorkManagment/EditDcr')
);


const ViewSample = React.lazy(() =>
  import(/* webpackChunkName: "components-badges" */ './Sample/ViewSample')
);
const CreateSample = React.lazy(() =>
  import(/* webpackChunkName: "components-badges" */ './Sample/CreateSample')
);
const EditSample = React.lazy(() =>
  import(/* webpackChunkName: "components-badges" */ './Sample/UpdateSample')
);
const ViewSampleTranscation = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Sample/ViewSampleTransaction'
  )
);
const CreateSampleTranscation = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Sample/CreateSampleTransaction'
  )
);
const EditSampleTranscation = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Sample/EditSampleTransaction'
  )
);

const Orders = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Orders/orders')
);
const AddOrder = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Orders/CreateOrder')
);
const ViewCurrentOrder = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Orders/viewCurrentOrder'
  )
);

// Distribution Concord --------------------------------------
const ViewCurrentDepartmenthead = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './distributioncenter-management/viewCurrentDepartmenthead'
  )
);
const ViewCurrentDistributioncenter = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './distributioncenter-management/viewCurrentDistributioncenter'
  )
);

const ViewDepartmenthead = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './distributioncenter-management/viewDepartmenthead'
  )
);
const ViewDistributioncenter = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './distributioncenter-management/viewDistributioncenter'
  )
);

const CreateDepartmenthead = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './distributioncenter-management/CreateDepartmenthead'
  )
);
const CreateDistributioncenter = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './distributioncenter-management/CreateDistributioncenter'
  )
);
//--------------------------------------------




// Stocks Concord --------------------------------------
const ViewCurrentProductCategory = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Stock-management/ProductCategory/ViewCurrentProductsCategory'
  )
);
const ViewCurrentProduct = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Stock-management/Product/ViewCurrentProducts'
  )
);

const ViewCurrentStock = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Stock-management/Stock/ViewCurrentStock'
  )
);

const ViewCurrentStockTransaction = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Stock-management/StockTransaction/ViewCurrentStockTransaction'
  )
);


const ViewProductCategory = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Stock-management/ProductCategory/ViewProductCategory'
  )
);
const ViewProduct = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Stock-management/Product/ViewProduct'
  )
);

const ViewStock = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Stock-management/Stock/ViewStock'
  )
);
const ViewStockTransaction = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Stock-management/StockTransaction/ViewStockTransaction'
  )
);

const CreateProductCategory = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Stock-management/ProductCategory/CreateProductsCategory'
  )
);
const CreateProduct = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Stock-management/Product/CreateProducts'
  )
);

const CreateStock = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Stock-management/Stock/CreateStock'
  )
);
const CreateStockTransaction = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Stock-management/StockTransaction/CreateStockTransaction'
  )
);
//--------------------------------------------




// // Customer Concord --------------------------------------
const ViewCurrentCustomers = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Customer-management/ViewCurrentCustomers'
  )
);

const ViewCustomers = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Customer-management/ViewCustomers'
  )
);

const CreateCustomers = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Customer-management/CreateCustomers'
  )
);
// //--------------------------------------------



// Doctor Concord --------------------------------------
const ViewCurrentDoctors = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Doctor-management/Doctors/ViewCurrentDoctors'
  )
);

const ViewDoctors = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Doctor-management/Doctors/ViewDoctors'
  )
);

const CreateDoctors = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Doctor-management/Doctors/CreateDoctors'
  )
);
//--------------------------------------------



// Doctor Category Concord --------------------------------------
const ViewCurrentDoctorsCategory = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Doctor-management/DoctorsCategory/ViewCurrentDoctorsCategory'
  )
);

const ViewDoctorsCategory = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Doctor-management/DoctorsCategory/ViewDoctorsCategory'
  )
);

const CreateDoctorsCategory = React.lazy(() =>
  import(
    /* webpackChunkName: "components-badges" */ './Doctor-management/DoctorsCategory/CreateDoctorsCategory'
  )
);
//--------------------------------------------





const Applications = React.lazy(() =>
  import(/* webpackChunkName: "applications" */ './applications')
);
const Ui = React.lazy(() => import(/* webpackChunkName: "ui" */ './ui'));
const Menu = React.lazy(() => import(/* webpackChunkName: "menu" */ './menu'));
const BlankPage = React.lazy(() =>
  import(/* webpackChunkName: "blank-page" */ './blank-page')
);

const App = ({ match }) => {
  return (
    <AppLayout>
      <div className="dashboard-wrapper">
        <Suspense fallback={<div className="loading" />}>
          <Switch>
            <Redirect
              exact
              from={`${match.url}/`}
              to={`${match.url}/dashboards`}
            />
            <Route
              path={`${match.url}/dashboards`}
              render={(props) => <Dashboards {...props} />}
            />
            <Route
              path={`${match.url}/applications`}
              render={(props) => <Applications {...props} />}
            />
            <Route
              path={`${match.url}/Sample/ViewSample`}
              render={(props) => <ViewSample {...props} />}
            />
            <Route
              path={`${match.url}/distributioncenter-management/ViewStocks`}
              render={(props) => <ViewStocks {...props} />}
            />
            
            <Route
              path={`${match.url}/Sample/ViewSample`}
              render={(props) => <ViewSample {...props} />}
            />
            <Route
              path={`${match.url}/Sample/CreateSample`}
              render={(props) => <CreateSample {...props} />}
            />
            <Route
              path={`${match.url}/Sample/UpdateSample`}
              render={(props) => <EditSample {...props} />}
            />
            <Route
              path={`${match.url}/Sample/ViewSampleTransaction`}
              render={(props) => <ViewSampleTranscation {...props} />}
            />
            <Route
              path={`${match.url}/Sample/CreateSampleTransaction`}
              render={(props) => <CreateSampleTranscation {...props} />}
            />
            <Route
              path={`${match.url}/Sample/EditSampleTransaction`}
              render={(props) => <EditSampleTranscation {...props} />}
            />
            ViewTarget
            <Route
              path={`${match.url}/Target/ViewTarget`}
              render={(props) => <ViewTarget {...props} />}
            />
            <Route
              path={`${match.url}/Target/CreateTarget`}
              render={(props) => <CreateTarget {...props} />}
            />
            <Route
              path={`${match.url}/Target/EditTarget`}
              render={(props) => <EditTarget {...props} />}
            />
          
            
            <Route
              path={`${match.url}/PeriorityList/ViewPeriorityList`}
              render={(props) => <ViewPeriority {...props} />}
            />
            <Route
              path={`${match.url}/PeriorityList/ViewPeriorityListDoctor`}
              render={(props) => <ViewPeriorityListDoctor {...props} />}
            />
            <Route
              path={`${match.url}/PeriorityList/CreatePeriorityList`}
              render={(props) => <CreatePeriority {...props} />}
            />
            <Route
              path={`${match.url}/PeriorityList/CreateDoctorPeriority`}
              render={(props) => <CreateDoctorPeriority {...props} />}
            />
            <Route
              path={`${match.url}/PeriorityList/EditPeriorityList`}
              render={(props) => <EditPeriority {...props} />}
            />
            <Route
              path={`${match.url}/PeriorityList/EditDoctorPeriorityList`}
              render={(props) => <EditDoctorPeriority {...props} />}
            />
            <Route
              path={`${match.url}/TreeView/RegionTreeView`}
              render={(props) => <ViewRegion {...props} />}
            />
          
          
            
           
            
            <Route
              path={`${match.url}/FieldWorkManagment/ViewDcp`}
              render={(props) => <ViewDcp {...props} />}
            />
            <Route
              path={`${match.url}/FieldWorkManagment/ViewDcr`}
              render={(props) => <ViewDcr {...props} />}
            />
            <Route
              path={`${match.url}/FieldWorkManagment/EditDcp`}
              render={(props) => <EditDcp {...props} />}
            />
            <Route
              path={`${match.url}/FieldWorkManagment/EditDcr`}
              render={(props) => <EditDcr {...props} />}
            />
            {/* <Route
              path={`${match.url}/FieldWorkManagment/ViewSchedule`}
              render={(props) => <ViewSchedule {...props} />}
            />
            <Route
              path={`${match.url}/FieldWorkManagment/EditSchedule`}
              render={(props) => <EditSchedule {...props} />}
            /> */}
            {/* <Route
              path={`${match.url}/orders`}
              render={(props) => <Orders {...props} />}
            /> */}
            <Route
              path={`${match.url}/Orders/orders`}
              render={(props) => <Orders {...props} />}
            />
            <Route
              path={`${match.url}/Orders/viewCurrentOrder`}
              render={(props) => <ViewCurrentOrder {...props} />}
            />
            
            
            <Route
              path={`${match.url}/Orders/CreateOrder`}
              render={(props) => <AddOrder {...props} />}
            />
           
           
           
           
           
           
            {/* Distribution Concord */}
            <Route
              path={`${match.url}/distributioncenter-management/viewCurrentDepartmenthead`}
              render={(props) => <ViewCurrentDepartmenthead {...props} />}
            />
            <Route
              path={`${match.url}/distributioncenter-management/viewCurrentDistributioncenter`}
              render={(props) => <ViewCurrentDistributioncenter {...props} />}
            />

            <Route
              path={`${match.url}/distributioncenter-management/viewDepartmenthead`}
              render={(props) => <ViewDepartmenthead {...props} />}
            />
            <Route
              path={`${match.url}/distributioncenter-management/viewDistributioncenter`}
              render={(props) => <ViewDistributioncenter {...props} />}
            />

            <Route
              path={`${match.url}/distributioncenter-management/CreateDepartmenthead`}
              render={(props) => <CreateDepartmenthead {...props} />}
            />

            <Route
              path={`${match.url}/distributioncenter-management/CreateDistributioncenter`}
              render={(props) => <CreateDistributioncenter {...props} />}
            />


            {/* Stock Product */}
            <Route
              path={`${match.url}/stocks-management/viewCurrentProductsCategory`}
              render={(props) => <ViewCurrentProductCategory {...props} />}
            />
            <Route
              path={`${match.url}/stocks-management/viewCurrentProducts`}
              render={(props) => <ViewCurrentProduct {...props} />}
            />
            <Route
              path={`${match.url}/stocks-management/viewCurrentStock`}
              render={(props) => <ViewCurrentStock {...props} />}
            />
            <Route
              path={`${match.url}/stocks-management/viewCurrentStockTransaction`}
              render={(props) => <ViewCurrentStockTransaction {...props} />}
            />

            <Route
              path={`${match.url}/stocks-management/viewProductCategory`}
              render={(props) => <ViewProductCategory {...props} />}
            />
            <Route
              path={`${match.url}/stocks-management/viewProduct`}
              render={(props) => <ViewProduct {...props} />}
            />
            <Route
              path={`${match.url}/stocks-management/viewStock`}
              render={(props) => <ViewStock {...props} />}
            />
            <Route
              path={`${match.url}/stocks-management/ViewStockTransaction`}
              render={(props) => <ViewStockTransaction {...props} />}
            />

            <Route
              path={`${match.url}/stocks-management/CreateProductsCategory`}
              render={(props) => <CreateProductCategory {...props} />}
            />

            <Route
              path={`${match.url}/stocks-management/CreateProducts`}
              render={(props) => <CreateProduct {...props} />}
            />
            <Route
              path={`${match.url}/stocks-management/CreateStock`}
              render={(props) => <CreateStock {...props} />}
            />
            <Route
              path={`${match.url}/stocks-management/CreateStockTransaction`}
              render={(props) => <CreateStockTransaction {...props} />}
            />
            
            {/* Stock Product End */}
           
           
           
           
          {/* Customer Concord */}
            
            <Route
              path={`${match.url}/customer-management/viewCurrentCustomers`}
              render={(props) => <ViewCurrentCustomers {...props} />}
            />

            <Route
              path={`${match.url}/customer-management/viewCustomers`}
              render={(props) => <ViewCustomers {...props} />}
            />

            <Route
              path={`${match.url}/customer-management/createCustomers`}
              render={(props) => <CreateCustomers {...props} />}
            />


            {/* Doctor && DoctorCategory Concord */}
            
            <Route
              path={`${match.url}/doctor-management/viewCurrentDoctors`}
              render={(props) => <ViewCurrentDoctors {...props} />}
            />

            <Route
              path={`${match.url}/doctor-management/viewDoctors`}
              render={(props) => <ViewDoctors {...props} />}
            />

            <Route
              path={`${match.url}/doctor-management/createDoctors`}
              render={(props) => <CreateDoctors {...props} />}
            />

            <Route
              path={`${match.url}/doctor-management/viewCurrentDoctorsCategory`}
              render={(props) => <ViewCurrentDoctorsCategory {...props} />}
            />

            <Route
              path={`${match.url}/doctor-management/viewDoctorsCategory`}
              render={(props) => <ViewDoctorsCategory {...props} />}
            />

            <Route
              path={`${match.url}/doctor-management/createDoctorsCategory`}
              render={(props) => <CreateDoctorsCategory {...props} />}
            />



           
           
           
            
            <Route
              path={`${match.url}/Attendance/ViewAttendance`}
              render={(props) => <ViewAttendance {...props} />}
            />
            <Route
              path={`${match.url}/Attendance/CreateAttendance`}
              render={(props) => <CreateAttendance {...props} />}
            />
            <Route
              path={`${match.url}/Attendance/EditAttendance`}
              render={(props) => <EditAttendance {...props} />}
            />
           
           
            
           <Route
              path={`${match.url}/Gift/gift`}
              render={(props) => <Gift {...props} />}
            />
            <Route
              path={`${match.url}/Gift/ViewGift`}
              render={(props) => <ViewGift {...props} />}
            />
            <Route
              path={`${match.url}/Gift/CreateGift`}
              render={(props) => <CreateGift {...props} />}
            />
            
            {/* <ProtectedRoute
                    path={`${match.url}/applications`}
                    component={Applications}
                    roles={[UserRole.Admin]}
            /> */}
            <Route
              path={`${match.url}/pages`}
              render={(props) => <Pages {...props} />}
            />
            <Route
              path={`${match.url}/ui`}
              render={(props) => <Ui {...props} />}
            />
            <Route
              path={`${match.url}/menu`}
              render={(props) => <Menu {...props} />}
            />
            <Route
              path={`${match.url}/blank-page`}
              render={(props) => <BlankPage {...props} />}
            />
            <Redirect to="/error" />
          </Switch>
        </Suspense>
      </div>
    </AppLayout>
  );
};

const mapStateToProps = ({ menu }) => {
  const { containerClassnames } = menu;
  return { containerClassnames };
};

export default withRouter(connect(mapStateToProps, {})(App));
