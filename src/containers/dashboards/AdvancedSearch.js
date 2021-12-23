/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable */

import React, { useState } from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Button,
  Label,
  Input,
  CustomInput,
} from 'reactstrap';
import Select from 'react-select';

import AvCheckbox from 'availity-reactstrap-validation/lib/AvCheckbox';

import IntlMessages from 'helpers/IntlMessages';
import CustomSelectInput from 'components/common/CustomSelectInput';
import BestSellers from './BestSellers';
import produtcs from 'data/products';
import { object } from 'prop-types';
import { Formik, useFormik } from 'formik';
import { NotificationManager } from 'components/common/react-notifications';

const selectDay = [
  { label: 'Monday', value: 'monday', key: 1 },
  { label: 'Tuesday', value: 'tuesday', key: 2 },
  { label: 'Wednesday', value: 'wednesday', key: 3 },
  { label: 'Thursday', value: 'thursday', key: 4 },
  { label: 'Friday', value: 'friday', key: 5 },
  { label: 'Saturday', value: 'saturday', key: 6 },
  { label: 'Sunday', value: 'sunday', key: 7 },
];

const selectWorkingSlot = [
  { label: '10:00', value: '10:00', key: 1 },
  { label: '15:00', value: '15:00', key: 1 },

  { label: '20:00', value: '20:00', key: 2 },
  { label: '25:00', value: '25:00', key: 1 },

  { label: '30:00', value: '30:00', key: 3 },
  { label: '35:00', value: '35:00', key: 3 },

  { label: '40:00', value: '40:00', key: 4 },
  { label: '45:00', value: '45:00', key: 3 },

  { label: '50:00', value: '50:00', key: 5 },
];
const selectBreakSlot = [
  { label: '05:00', value: '05:00', key: 1 },
  { label: '10:00', value: '10:00', key: 2 },
  { label: '15:00', value: '15:00', key: 3 },
];

const AdvancedSearch = (props) => {
  const validate = (values) => {
    const errors = {};
    if (!values.timeFrom) {
      errors.timeFrom = 'Required';
    }
    if (!values.name) {
      errors.name = 'Required';
    }
    if (!values.password) {
      errors.password = 'Required';
    }

    return errors;
  };

  // console.log(history);
  const [selectedOptionsDay, setSelectedOptionsDay] = useState([]);
  const [selectedOptionsWorkingHour, setSelectedOptionsWorkingHour] = useState(
    []
  );

  const [selectedOptionsBreak, setSelectedOptionsBreak] = useState([]);

  // const [selectedOptionsType, setSelectedOptionsType] = useState([]);
  const [timeFrom, setTimeFrom] = useState();
  const [timeTo, setTimeTo] = useState();

  // console.log(
  //   selectedOptionsBreak,
  //   selectedOptionsWorkingHour.value,
  //   selectedOptionsDay.value
  // );

  function createSlots(slotConfig) {
    const {
      configSlotHours,
      configSlotMinutes,
      configSlotPreparation,
      timeArr,
    } = slotConfig;

    let defaultDate = new Date().toISOString().substring(0, 10);
    let slotsArray = [];
    let _timeArrStartTime;
    let _timeArrEndTime;
    let _tempSlotStartTime;
    let _endSlot;
    let _startSlot;

    for (var i = 0; i < timeArr?.length; i++) {
      if (
        new Date(defaultDate + ' ' + timeArr[i]?.endTime)?.getTime() <
        new Date(defaultDate + ' ' + timeArr[i]?.startTime)?.getTime()
      ) {
        NotificationManager.warning(
          'Please enter Valid Details',
          'Error',
          5000,
          null,
          ''
        );

        return;
      } else if (
        new Date(defaultDate + ' ' + timeArr[i]?.endTime)?.getTime() ===
        new Date(defaultDate + ' ' + timeArr[i]?.startTime)?.getTime()
      ) {
        NotificationManager.warning(
          'Please enter Valid Details 24 Hours Not Acceptable',
          'Error',
          5000,
          null,
          ''
        );
      } else {
        _timeArrStartTime = new Date(
          defaultDate + ' ' + timeArr[i]?.startTime
        )?.getTime();
        _timeArrEndTime = new Date(
          defaultDate + ' ' + timeArr[i]?.endTime
        )?.getTime();
        _tempSlotStartTime = _timeArrStartTime;

        while (
          new Date(_tempSlotStartTime)?.getTime() <
          new Date(_timeArrEndTime)?.getTime()
        ) {
          _endSlot = new Date(_tempSlotStartTime);
          _startSlot = new Date(_tempSlotStartTime);

          _tempSlotStartTime = _endSlot?.setHours(
            parseInt(_endSlot?.getHours()) + parseInt(configSlotHours)
          );
          _tempSlotStartTime = _endSlot?.setMinutes(
            parseInt(_endSlot?.getMinutes()) + parseInt(configSlotMinutes)
          );
          if (
            new Date(_tempSlotStartTime)?.getTime() <=
            new Date(_timeArrEndTime)?.getTime()
          ) {
            slotsArray.push({
              from: new Date(_startSlot).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
              }),
              to: _endSlot.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
              }),
            });
          }

          _tempSlotStartTime = _endSlot?.setMinutes(
            _endSlot?.getMinutes() + parseInt(configSlotPreparation)
          );
        }
        if (slotsArray.length === 0) {
          NotificationManager.warning(
            'Please enter Valid Details',
            'Error',
            5000,
            null,
            ''
          );
          return;
          setModal(false);
        }
        let lastSlotValueTo = Object.values(slotsArray?.at(-1))[1];
        // console.log(lastSlotValueTo, 'last slot value');
        let endtimeOfDoctor = timeArr?.at(-1)?.endTime;
        // console.log(endtimeOfDoctor, 'end time ');

        let test1 = endtimeOfDoctor?.split(':');
        let test2 = lastSlotValueTo?.split(':');
        // console.log(test2, test1);
        if (Number(test1[1]) < Number(test2[1])) {
          let test3 = configSlotPreparation?.split(':');
          let test4 = lastSlotValueTo?.split(':');
          let breakPlusSlotValue = Number(test4[1]) + Number(test3[0]);
          if (breakPlusSlotValue === 60) {
            let one = '01';
            let a = Number(test4[0]) + Number(one);
            // console.log(a, 'plus value');
            // return;
          } else {
            // console.log(breakPlusSlotValue);
            let test5 = test4[0] + ':' + breakPlusSlotValue;
            // console.log(test5);
            slotsArray.push({ from: test5, to: endtimeOfDoctor });
          }
        } else {
          let diff = test1[1] - test2[1];
          // console.log(diff, 'difference');
          let test3 = configSlotPreparation?.split(':');
          let test4 = lastSlotValueTo?.split(':');
          let breakPlusSlotValue = Number(test4[1]) + Number(test3[0]);
          // console.log(breakPlusSlotValue, 'break and slot value');
          let test5 = test4[0] + ':' + breakPlusSlotValue;
          // console.log(test5, 'final time');

          if (diff > test3[0]) {
            slotsArray.push({ from: test5, to: endtimeOfDoctor });
          }
        }

        return slotsArray;
      }
    }
  }
  const formikData = useFormik({
    initialValues: {
      timeFrom: timeFrom,
      timeTo: timeTo,
    },
    validate: validate,

    onSubmit: (values) => {
      // console.log(values);
    },
  });
  let slotsA = [];

  const totalNumberOfSlots = () => {
    let t = 0;
    const slots = [];

    if (selectedOptionsDay?.value === undefined) {
      props.setModal(false);

      NotificationManager.warning(
        'Please Fill Details Correctly',
        'Error',
        3000,
        null,
        ''
      );
      return;
    }
    if (timeTo === undefined && timeFrom === undefined) {
      props.setModal(false);

      NotificationManager.warning(
        'Please Fill Details',
        'Error',
        3000,
        null,
        ''
      );
      return;
    }

    let timeToSplit = timeTo?.split(':');
    let timeFromSplit = timeFrom?.split(':');
    let workingValue = selectedOptionsWorkingHour?.value?.split(':');
    let breakValue = selectedOptionsBreak?.value?.split(':');
    if (workingValue === undefined && breakValue === undefined) {
      props.setModal(false);

      NotificationManager.warning(
        'Please Fill Details',
        'Error',
        3000,
        null,
        ''
      );

      return;
    }
    let totalWorkingAndBreakTime =
      Number(workingValue[0]) + Number(breakValue[0]);
    let totalDurationInHours = Number(timeToSplit[0] - timeFromSplit[0]);
    let totalDurationInMinutess = Number(timeToSplit[1] - timeFromSplit[1]);

    let totalDurationInMinutes = totalDurationInHours * 60;
    let noOfSlots = totalDurationInMinutes / totalWorkingAndBreakTime;
    let w = Number(workingValue[0]);
    var slotConfig = {
      configSlotHours: '00',
      configSlotMinutes: `${w}`,
      configSlotPreparation: `${selectedOptionsBreak?.value}`,
      timeArr: [{ startTime: `${timeFrom}`, endTime: `${timeTo}` }],
    };
    slotsA = createSlots(slotConfig);
    props.clickHandler(slotsA, selectedOptionsDay?.value, timeFrom, timeTo);
    props.setModal(false);
  };
  return (
    <div>
      <Form className="form-container" onSubmit={formikData.handleSubmit}>
        <FormGroup>
          <label>
            <IntlMessages id="Select Day" />
          </label>
          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name"
            value={selectedOptionsDay}
            onChange={(val) => setSelectedOptionsDay(val)}
            options={selectDay}
          />
        </FormGroup>
        <FormGroup>
          <label>
            <IntlMessages id="Select Timmings From" />
          </label>
          <Input
            required={true}
            value={timeFrom}
            className="form-control"
            name="time"
            type="time"
            validate={validate}
            onChange={(e) => setTimeFrom(e.target.value)}
          />
          {formikData.errors.timeFrom && formikData.touched.timeFrom ? (
            <div>{formikData.errors.timeFrom}</div>
          ) : null}
        </FormGroup>
        <FormGroup>
          <label>
            <IntlMessages id="Select Timmings To" />
          </label>
          <Input
            required={true}
            value={timeTo}
            min={timeFrom}
            className="form-control"
            name="time"
            type="time"
            onChange={(e) => setTimeTo(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label>
            <IntlMessages id="Select Working Slot" />
          </label>
          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name-slot-duration"
            value={selectedOptionsWorkingHour}
            onChange={(val) => setSelectedOptionsWorkingHour(val)}
            options={selectWorkingSlot}
          />
        </FormGroup>
        <FormGroup>
          <label>
            <IntlMessages id="Select Break Slot" />
          </label>
          <Select
            components={{ Input: CustomSelectInput }}
            className="react-select"
            classNamePrefix="react-select"
            name="form-field-name-slot-duration"
            value={selectedOptionsBreak}
            onChange={(val) => setSelectedOptionsBreak(val)}
            options={selectBreakSlot}
          />
        </FormGroup>
        <FormGroup className="text-center">
          <Button
            style={{ 'background-color': '#003766' }}
            color="primary"
            className="btn-lg mt-3"
            onClick={totalNumberOfSlots}
          >
            <IntlMessages id="Submit" />
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};
export default AdvancedSearch;
