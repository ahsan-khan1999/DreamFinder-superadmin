/* eslint-disable */

import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

// import {
//   statusChange,
// } from "../../../../Store/Actions/deportmanagerActions";

import { useDispatch, useSelector } from "react-redux";
import { StaticDataGet } from 'Store/Actions/ConcordOrder/OrderAction';



const StatuschangedModal = (props) => {

    const staticdata = useSelector((state) => state?.orderReducer?.staticdata);
    let option_static_DeliveryStatus = [];
    staticdata?.list_order__delivery_statuses?.filter((item) =>
    option_static_DeliveryStatus.push({ 
      label: item?.name,
      value: item?.value,
      key: item?.id
    })
    );
    let option_static_PaymentStatus = [];
    staticdata?.list_order__payment_statuses?.filter((item) =>
    option_static_PaymentStatus.push({ 
      label: item?.name,
      value: item?.value,
      key: item?.id
    })
    );
  

    console.log("option_static_DeliveryStatus",option_static_DeliveryStatus)
    console.log("option_static_PaymentStatus",option_static_PaymentStatus)

    useEffect(() => {
        dispatch(StaticDataGet());
    
      },[]);
    



    const dispatch = useDispatch();

    const [dropdown1, setDropdown1] = useState();
    const [dropdown2, setDropdown2] = useState();

    console.log("dropdown1",dropdown1);
    console.log("dropdown2",dropdown2);
    console.log("props?.data?.uid",props?.data?.uid);

    const onSubmit = () => {
        const apiData = {
            delivery_status: dropdown1,
            payment_status: dropdown2,
            uid: props?.data?.uid,
        }
        dispatch(statusChange(apiData));
        props.onHide();
    };


    return (


        <>


    <Modal isOpen={props.show} isClose={props.onHide} centered size="sm" style={{ boxShadow: 'none' }}>

        <ModalHeader toggle={props.onHide} style={{ padding: '15px 20px' }}>

            <span className="" style={{ fontWeight: "600", fontSize: '22px', color: '#0066b3' }}> Status </span>

        </ModalHeader>
        <ModalBody className="p-0">



    <div className="row ">
        <div className="col mb-5">
            <div className="row "></div>
            <div className="d-flex justify-content-center  me-3 ">
        <div
            className="card cardlogmodel"
            style={{ minWidth: "50%", width: "400px", height: "200px" }}
        >

            <div className="">



                <div className="form  px-3 pt-4" style={{ padding: '10px', height: '180px' }}>


                    <div className="form-group">
                        <label>Delivery Status</label>
                        <select className="form-control form-select" id="exampleFormControlSelect1" onChange={(e) => {
                            setDropdown1(e.target.value)
                        }}>
                        <option selected disabled hidden>Select Delivery Status</option>
            {option_static_DeliveryStatus?.map((item,index) => {
                    return(
                        <option key={index+1}  value={item.value}>{item.label}</option>
                    );
            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Payment Status</label>
                        <select className="form-control form-select" id="exampleFormControlSelect1" onChange={(e) => { setDropdown2(e.target.value) }}>
                       
                        <option selected disabled hidden >Select Payment Status</option>
                        {option_static_PaymentStatus?.map((item,index) => {
                    return(
                        <option  key={index+1}  value={item.value}>{item.label}</option>
                    );
            })}
                        </select>
                    </div>

                    <button
                        className="btn btn-primary rounded-pill btn-block mb-2"
                        style={{
                            color: "#fff",
                            backgroundColor: "#0066b3",
                            fontSize: "13px",
                            fontWeight: "500",
                        }}
                        onClick={onSubmit}
                    >
                        Change
                    </button>
                    <div className="">
                        <label
                            className="form-check-label "
                            htmlFor="gridCheck1"
                            style={{ fontSize: "12px" }}
                        >
                            {/* <Link onClick={()=>{
        props.setShowdiv(true);
        }} to="#" style={{textDecoration:'none' ,color:'#0066b3'}}>Back To Login </Link> */}
                        </label>
                    </div>
                </div>
            </div>






                </div>


            </div>
        </div>
    </div>
        </ModalBody>
    </Modal>
        </>
    )
}

export default StatuschangedModal
