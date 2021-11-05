/* eslint-disable */
import { arrowFunctionExpression } from '@babel/types';
import { NotificationManager } from 'components/common/react-notifications';
import { Formik, useFormik } from 'formik';

import IntlMessages from 'helpers/IntlMessages';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Table,
} from 'reactstrap';
import apiServices from 'services/requestHandler';
import { UpdateDepartmentHead } from 'Store/Actions/ConcordDepartmentHead/DepartmentHeadAction';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Select from 'react-select';
import CustomSelectInput from 'components/common/CustomSelectInput';
import { getAreas, GetDepoManagers, GetDistributionCenterRegions, UpdateDistributionCenter } from 'Store/Actions/ConcordDistributionCenter/DistributionCenterAction';



export default function viewCurrentDistributioncenter(props) {
    let [buttonName, setButtonName] = useState();
    const [thisView, setThisView] = useState(true);
    const dispatch = useDispatch();
    
    useEffect(() => {
    
      if (currentDistribution?.status === 'suspended') {
        setButtonName('Active');
      } else if (currentDistribution?.status === 'active') {
        setButtonName('Suspend');
      }
    }, []);
    
    const distributionRegionAreasloader = useSelector(
      (state) => state?.distributionCenterReducer?.distributionRegionAreasloader
    );
    const distributioncenterregionsloader = useSelector(
      (state) => state?.distributionCenterReducer?.distributioncenterregionsloader
    );
    const depoManagerloader = useSelector(
      (state) => state?.distributionCenterReducer?.depoManagerloader
    );
    const handleChangeToView = () => {
      props.history.push('/app/distributioncenter-management/viewDistributioncenter');
    };
    
    
    let options = [];
    
    
    
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
    
    
  const currentDistribution = props?.location?.state;
    

    const distributioncenter_obj = {
      depot_managers_uid: depoarray,
  
      areas_uid:  array,

      uid : currentDistribution.uid,
      
    };
    
    const loading = useSelector(
      (state) => state?.departmentHeadReducer?.loader
      );
    
      console.log(currentDistribution,"log")
    
      const editProfile = (e) => {
        e.preventDefault();
        setThisView(!thisView);
      };
      
      
      const editData = async () => {
        console.log(distributioncenter_obj)
        let res = await dispatch(UpdateDistributionCenter(distributioncenter_obj));
        if (res) {
          NotificationManager.success(
            'Successful response',
            'Success',
            5000,
            null,
            ''
          );
          props.history.push('/app/distributioncenter-management/viewDistributioncenter');
        }
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

  let [suspendloader, setsuspendloader] = useState(false);
  

    const suspandDepartmenthead = async () => {
        if (currentDistribution?.status?.name === 'suspended') {
          let apiData = {
            uid: currentDistribution?.uid,
          };
          setsuspendloader(true);
          let res = await apiServices.suspanddistributionCentres(apiData);
          if (res?.data?.response_code === 200) {
            setsuspendloader(false);
            NotificationManager.success(
              'Sucessfully Activated',
              'Sucess',
              5000,
              null,
              ''
            );
            props.history.push('/app/distributioncenter-management/viewDistributioncenter');
          } else {
            setsuspendloader(false);
            NotificationManager.error(
              'Error active This Admin',
              'Error',
              5000,
              null,
              ''
            );
          }
        } else {
          let apiData = {
            uid: currentDistribution?.uid,
          };
          setsuspendloader(true);
          let res = await apiServices.suspanddistributionCentres(apiData);
          console.log(res);
          if (res?.response_code === 200) 
          {
            setsuspendloader(false);
            NotificationManager.success(
              'Sucessfully Suspaned',
              'Sucess',
              5000,
              null,
              ''
            );
            props.history.push('/app/distributioncenter-management/viewDistributioncenter');
          } else {
            setsuspendloader(false);
            NotificationManager.error(
              res?.response_message,
              'Error',
              5000,
              null,
              ''
            );
          }
        }
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
        <CardTitle>
          {thisView ? (
            <>
            <Button
              onClick={handleChangeToView}
              style={{ marginRight: '20px',backgroundColor:'#0066b3'}}
            >
              Back
            </Button>
            <IntlMessages id="View Distribution Center" />
            </>
            ) : (
              
              <>
              <Button
                onClick={editProfile}
                style={{ marginRight: '20px' , backgroundColor:'#0066b3'}}
              >
                Close Edit
              </Button>
              <IntlMessages id="Edit Distribution Center" />
              </>
              )}
        </CardTitle>

        <div
          style={{
            marginBottom: '10px',
            display:
            currentDistribution?.delivery_status?.name === 'delivered' ? 'none' : '',
          }}
        ></div>

        <Formik>
          <Form>
            <Row className="h-100">
             

          {thisView ? (
              <>
                <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6
                      style={{
                        fontWeight: '700',
                        fontSize: '0.9rem',
                      }}
                    >Name</h6>
                  </Label>

                  <span>
                    <p>{currentDistribution?.name.toUpperCase()}</p>
                  </span>
         

                </FormGroup>
              </Col>
             
              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6
                      style={{
                        fontWeight: '700',
                        fontSize: '0.9rem',
                      }}
                    >Designation</h6>
                  </Label>

                  <span>
                    <p>{currentDistribution?.designation.toUpperCase()}</p>
                  </span>
                </FormGroup>
              </Col>


              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6
                      style={{
                        fontWeight: '700',
                        fontSize: '0.9rem',
                      }}
                    >Email</h6>
                  </Label>
                  <span>
                    <p>{currentDistribution?.email.toUpperCase()}</p>
                  </span>
                </FormGroup>
              </Col>


              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6
                      style={{
                        fontWeight: '700',
                        fontSize: '0.9rem',
                      }}
                    >Address</h6>
                  </Label>


                  <span>
                    <p>{currentDistribution?.address.toUpperCase()}</p>
                  </span>
                </FormGroup>
              </Col>

           
             <Col lg={6}>
                <FormGroup>
                  <Label>
                    <h6
                      style={{
                        fontWeight: '700',
                        fontSize: '0.9rem',
                      }}
                    >Phone</h6>
                  </Label>
                  <span>
                    <p>{currentDistribution?.phone}</p>
                  </span>
                </FormGroup>
              </Col>
              </>
          ) : (
            <>
                <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Select Regions" />
                  </Label>

                  <>
                  {distributioncenterregionsloader ? 
                  <div className="">
                  <Loader height={18} width={18} type="Oval" color="#0066b3" />
                   &nbsp;
                 </div> :
                    <Select
                      required
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      required
                      defaultValue={{
                        label:currentDistribution.name,
                        value:currentDistribution.area_uid
                      }}
                      onChange={(e, index) => {
                        dispatch(getAreas(e.value));
                        
                      }}
                      options={distributionRegions}
                    />
                    }
                  </>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Select Areas" />
                  </Label>

                  <>
                  {distributionRegionAreasloader ? 
                  <div className="">
                  <Loader height={18} width={18} type="Oval" color="#0066b3" />
                   &nbsp;
                 </div> :
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
                  }
                  </>
                </FormGroup>
              </Col>

              <Col lg={6}>
                <FormGroup>
                  <Label>
                    <IntlMessages id="Select Depot Managers" />
                    <div>Status : <span style={{color: assigned=== "True" ? 'green' : 'red'}}>{assigned}</span></div>
                  </Label>

                  <>
                  {depoManagerloader ? 
                  <div className="">
                  <Loader height={18} width={18} type="Oval" color="#0066b3" />
                   &nbsp;
                 </div> :
                    <Select
                      components={{ Input: CustomSelectInput }}
                      className="react-select"
                      classNamePrefix="react-select"
                      isMulti
                      styles={customStyles}
                      defaultValue={currentDistribution.depomanagersSelect.map(
                        (item) => {
                          return {
                            label: item?.name,
                            value: item?.name,
                            key: item?.uid,
                          };
                        }
                      )}
                      required
                      onChange={(e, index) => {
                        handleChangeDepoManagers(e, index);
                        
                      }}
                      options={AllDepoManagers}
                    />
                  }
                  </>

                </FormGroup>
              </Col>

            </>
          )}

              
          
            </Row>





            {thisView ? (
              <Button
                style={{backgroundColor:'#0066b3'}}
                className="mr-3"
                onClick={editProfile}
              >
              
                Edit Profile
              </Button>
            ) : (
              <Button
                style={{backgroundColor:'#0066b3'}}

              
                onClick={editData}
              >
              
                Save
              </Button>
            )}



            {thisView ? (
              <Button
              style={{backgroundColor:'#0066b3'}}

              onClick={suspandDepartmenthead}
            >
              {suspendloader ? (
              <div className="d-flex justify-content-center">
                <Loader height={18} width={18} type="Oval" color="#fff" />
                &nbsp; Suspending
              </div>
            ) : (
              buttonName
              )}
              
            </Button>

            ) : (
                ""
            )}
         
        
            {/* <StatuschangedModal show={show} onHide={handleClose} data={currentDistribution} {...props} /> */}

          </Form>
        </Formik>
      </CardBody>
    </Card>
  );
}