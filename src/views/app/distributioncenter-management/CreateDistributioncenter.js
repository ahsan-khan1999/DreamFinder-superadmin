/* eslint-disable */
import { NotificationManager } from 'components/common/react-notifications';
import React, { useEffect } from 'react';
import { CardBody, Col, Row, Table } from 'reactstrap';
import IntlMessages from 'helpers/IntlMessages';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';

import { useState } from 'react';
import { Formik, Form, Field, useFormik } from 'formik';
import { Card, CardTitle, Label, FormGroup, Button, Input } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from 'Utils/auth.util';
import BestSellers from 'containers/dashboards/BestSellers';
import AdvancedSearch from 'containers/dashboards/AdvancedSearch';
import { Link, NavLink } from 'react-router-dom';
import products from 'data/products';
import AddNewSurveyModal from 'containers/applications/AddNewSurveyModal';
import AddNewModal from 'containers/pages/AddNewModal';
import AddNewTodoModal from 'containers/applications/AddNewTodoModal';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { CreateDepartmentHead } from 'Store/Actions/ConcordDepartmentHead/DepartmentHeadAction';
import { CreateDistributionCenter, getAreas, GetDepoManagers, GetDistributionCenterRegions } from 'Store/Actions/ConcordDistributionCenter/DistributionCenterAction';

export default function CreateDistributioncenter({ history }) {

  const dispatch = useDispatch();
  const [array, setArray] = useState([]);
  const [depoarray, setDepoarray] = useState([]);
  

  const distributioncenterregions = useSelector(
    (state) => state?.distributionCenterReducer?.distributioncenterregions
  );
  const depoManager = useSelector(
    (state) => state?.distributionCenterReducer?.depoManager
  );
  const distributionRegionAreas = useSelector(
    (state) => state?.distributionCenterReducer?.distributionRegionAreas
  );

  // const regionareavalue = [];
   //==============Areas
   let distributionRegionsArea = [];
   distributionRegionAreas?.map((item) =>
   distributionRegionsArea?.push({
       label: item?.name,
       value: item?.uid,
       key: item?.uid,
     })
   );
   console.log(distributionRegionsArea,"distributionRegionsArea")



  // distributionRegionsArea?.map((item, index) => {
  //       regionareavalue.push(item?.value);
  //     }); 
     

  useEffect(() => {
    dispatch(GetDistributionCenterRegions());
    dispatch(GetDepoManagers());
  }, []);




  let distributionRegions = [];
  distributioncenterregions?.map((item) =>
  distributionRegions?.push({
      label: item?.name,
      value: item?.uid,
      key: item?.region_id,
    })
  );



  const [assigned,setAssigned] = useState()


  let AllDepoManagers = [];
  depoManager?.map((item) =>
  AllDepoManagers?.push({
      label: item?.name,
      value: item?.uid,
      key: item?.is_primary,
    })
  );
  
  

  let distributioncenter_obj = {
    depot_managers_uid: depoarray,

    areas_uid:  array,
  
  };

  
  const loading = useSelector(
    (state) => state?.distributionCenterReducer?.loader
    );
    
    const onDepartHeadCreate = async () => {
      if (
        distributioncenter_obj?.depot_managers_uid.length === 0 ||
        distributioncenter_obj?.areas_uid.length === 0
        ) {
          NotificationManager.error(
            'Please Enter Required Field',
            'Error',
            3000,
            null,
            ''
            );
            return;
          } else {
            console.log({...distributioncenter_obj},"sdsd")
            let res = await dispatch(CreateDistributionCenter({ ...distributioncenter_obj }));
            
            if (res) {
        NotificationManager.success(
          'Distribution Center Added Sucessfully',
          'Success',
          3000,
          null,
          ''
        );
        history.push('/app/distributioncenter-management/viewDistributioncenter');
      }
    }
  };
  
  const handleChangeToView = () => {
    history.push('/app/distributioncenter-management/viewDistributioncenter');
  };
  

  


  const regionareavalue = [];
  const handleChangeRegion = async (e, index) => {
  
    let options = e;
    options?.map((item, index) => {
      regionareavalue.push(item?.value);
    }); 
    await setArray(regionareavalue);
  };

  
 


  const depovalue = [];
  const handleChangeDepoManagers = async (e, index) => {
    let options = e;
    options?.map((item, index) => {
      if(item?.key === true)
    {
      setAssigned("True")
    }
    else{
      setAssigned("False")
    }
      depovalue.push(item?.value);
    }); 
    await setDepoarray(depovalue);
  };

  const customStyles = {
    
    option: (provided, state) => 
    ({
      ...provided,
      color: state.data.key ? 'green !important' :  'red !important' ,
      padding: 10,
    })

  }
  return (
    <Card>
      <CardBody>
      <Button
            className="btn btn-primary mb-4 "
            onClick={handleChangeToView}
            style={{ marginRight: '20px'}}
            >
            Back
          </Button>
        <CardTitle>
          <IntlMessages id="Create Distribution Center" />
        </CardTitle>
     
        <div style={{ marginBottom: '30px' }}></div>
        <Formik>
          <Form>
            <Row className="h-100">


         
            <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Select Regions" />
                  </Label>

                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      onChange={(e, index) => {
                        dispatch(getAreas(e.value));
                        
                      }}
                      options={distributionRegions}

                    />
                  </>
                </FormGroup>
              </Col>


                      {console.log(distributionRegionsArea,"text")}
        {distributionRegionsArea?.length !== 0  ?
         (  
          <Col lg={6}>
          <FormGroup>
            <Label>
              <IntlMessages id="Select Areas" />
            </Label>

            <>
              <Select
                required
                components={{ Input: CustomSelectInput }}
                className="react-select"
                classNamePrefix="react-select"
                isMulti
                required
               
                onChange={(e, index) => {
                  handleChangeRegion(e, index);
                }}
                options={distributionRegionsArea}
              />
            </>
          </FormGroup>
        </Col>
         ):(
           
          <Col lg={12}>
          <FormGroup>
            <Label>
              <span style={{color:'red',fontWeight:'600'}}>No Available Area For This Region All Area's Have Already Been Assigned</span>
            </Label>
          </FormGroup>
        </Col>
         )
        } 

              

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Select Depot Managers" />
                    <div>Status : <span style={{color: assigned=== "True" ? 'green' : 'red'}}>{assigned}</span></div>
                  </Label>

                  <>
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      isMulti
                      required
                      styles={customStyles}
                      onChange={(e, index) => {
                        handleChangeDepoManagers(e, index);
                      }}
                      options={AllDepoManagers}
                    />
                  </>

                </FormGroup>
              </Col>

             
            </Row>

            <Button
                style={{backgroundColor:'#0066b3'}}
              size="sm"
              onClick={onDepartHeadCreate}
            >
              {loading ? (
                <div className="d-flex justify-content-center">
                  <Loader height={18} width={18} type="Oval" color="#fff" />
                  &nbsp;Creating
                </div> 
              ) : (
                'Add DistributionCenter'
              )}
            </Button>
          </Form>
        </Formik>
        <div style={{ marginTop: '30px' }} />
      </CardBody>
    </Card>
  );
}
