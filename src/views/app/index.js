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
const Orders = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Orders/orders')
);
const AddOrder = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Orders/AddOrder')
);
  

const Test = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Test/viewTest')
);
const ViewRegion = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './TreeView/RegionTreeView')
);
const Category = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Test/viewCategory')
);
const CreateCategory = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Test/CreateCategory')
);
const ViewMedicines = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Medicines/viewMedicines')
);
const ViewCurrentCategory = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Test/viewCurrentCategory')
);
const ViewCurrentReport = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Reports/viewCurrentReport')
);
const CreateTest = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Test/createTest')
);
const CreateMedicines = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Medicines/CreateMedicines')
);
const ViewCurrentTest = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Test/viewCurrentTest')
);
const ViewReport = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Reports/viewReports')
);
const ViewPayment = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Payment/viewPayment')
);
const ViewCurrentPayment = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Payment/viewCurrentPayment')
);
const UploadReport = React.lazy(() =>
  import(/* webpackChunkName: "dashboards" */ './Reports/uploadReport')
);
const ViewCurrentMedicines = React.lazy(() =>
  import(
    /* webpackChunkName: "dashboards" */ './Medicines/viewCurrentMedicines'
  )
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
              path={`${match.url}/orders/viewCurrentOrder`}
              render={(props) => <ViewCurrentOrder {...props} />}
            />
            <Route
              path={`${match.url}/Reports/viewReports`}
              render={(props) => <ViewReport {...props} />}
            />
            <Route
              path={`${match.url}/TreeView/RegionTreeView`}
              render={(props) => <ViewRegion {...props} />}
            />
            <Route
              path={`${match.url}/Payment/viewPayment`}
              render={(props) => <ViewPayment {...props} />}
            />
            <Route
              path={`${match.url}/Payment/viewCurrentPayment`}
              render={(props) => <ViewCurrentPayment {...props} />}
            />
            <Route
              path={`${match.url}/Reports/uploadReport`}
              render={(props) => <UploadReport {...props} />}
            />
            <Route
              path={`${match.url}/Reports/viewCurrentReport`}
              render={(props) => <ViewCurrentReport {...props} />}
            />
            <Route
              path={`${match.url}/Medicines/viewCurrentMedicines`}
              render={(props) => <ViewCurrentMedicines {...props} />}
            />
            <Route
              path={`${match.url}/Orders/orders`}
              render={(props) => <Orders {...props} />}
            />
            <Route
              path={`${match.url}/Orders/AddOrder`}
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
              path={`${match.url}/Test/viewTest`}
              render={(props) => <Test {...props} />}
            />
            <Route
              path={`${match.url}/Medicines/viewMedicines`}
              render={(props) => <ViewMedicines {...props} />}
            />

            <Route
              path={`${match.url}/Test/viewCategory`}
              render={(props) => <Category {...props} />}
            />
            <Route
              path={`${match.url}/Medicines/CreateMedicines`}
              render={(props) => <CreateMedicines {...props} />}
            />

            <Route
              path={`${match.url}/Test/CreateCategory`}
              render={(props) => <CreateCategory {...props} />}
            />
            <Route
              path={`${match.url}/Test/viewCurrentCategory`}
              render={(props) => <ViewCurrentCategory {...props} />}
            />
            <Route
              path={`${match.url}/Test/createTest`}
              render={(props) => <CreateTest {...props} />}
            />
            <Route
              path={`${match.url}/Test/viewCurrentTest`}
              render={(props) => <ViewCurrentTest {...props} />}
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
