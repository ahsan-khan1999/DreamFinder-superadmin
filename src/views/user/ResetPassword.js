/* eslint-disable */

import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';
import { resetPasswordAction } from 'Store/Actions/Auth/Actions';
import { NotificationManager } from 'components/common/react-notifications';
import logo from '../../../src/assets/logos/logo.png';
import { NavLink } from 'react-router-dom';

const ResetPassword = (props) => {
  const params = queryString.parse(props.location.search);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    if (data.password === data.confirmPassword) {
      const apiData = {
        uid: params.uid,
        access_token: params.token,
        new_password: data.password,
      };
      const res = await dispatch(resetPasswordAction(apiData));
      if (res) {
        props.history.push('/user/login');
      }
    } else {
      NotificationManager.error('Please Provide Relevant Details');
    }
  };
  return (
    <div
      className="container-xl d-flex flex-column justify-content-center"
      style={{ height: '600px' }}
    >
      <div className="container-sm d-flex justify-content-center my-5">
        <div className="col-lg-4">
          <div className="card ">
            <div className="card-body">
              <NavLink to="/" className="white">
                {/* <span className="logo-single" /> */}
                <span
                  className=""
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: 'flex',
                    marginBottom: '30px',
                  }}
                >
                  <img
                    class="logo"
                    src={logo}
                    alt=""
                    height="70px"
                    width="240px"
                  />
                </span>
              </NavLink>
              <h5 className="modal-title text-center">Reset Password</h5>
              <div className="row px-3 mb-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row mt-4">
                    <div className="col-lg-12">
                      <span className="label-name-login">Password</span>
                      <input
                        className="input-login-modal"
                        type="password"
                        {...register('password', {
                          required: {
                            value: true,
                            message: 'this field is required field',
                          },
                        })}
                      />
                      {errors?.password?.message ? (
                        <div className="text-error">
                          {errors?.password?.message}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <span className="label-name-login">Confirm Password</span>
                      <input
                        className="input-login-modal"
                        type="password"
                        {...register('confirmPassword', {
                          required: {
                            value: true,
                            message: 'this field is required field',
                          },
                        })}
                      />
                      {errors?.confirmPassword?.message ? (
                        <div className="text-error">
                          {errors?.confirmPassword?.message}
                        </div>
                      ) : (
                        ''
                      )}
                    </div>
                  </div>
                  <input
                    type="submit"
                    value="Reset Password"
                    className="headerBtn-red btn-block mx-auto"
                    style={{ width: '85%', textAlign: 'center' }}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
