import React from 'react';
import { Form, message } from 'antd';
import { Link, useNavigate } from 'react-router';
import { RegisterUser } from '../apis/authentication';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../redux/alertSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await RegisterUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate('/login');
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <div className="h-screen d-flex justify-content-center align-center align-items-center bg-primary">
      <div className="bg-white p-4 w-400">
        <h4>SHEYJOBS - REGISTER</h4>
        <div className="divider"></div>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Name">
            <input type="text" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <input type="email" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <input type="password" />
          </Form.Item>
          <button type="submit" className="primary-contained-btn w-100 mt-2">
            Register
          </button>
          <Link to="/login" className="mt-2 d-block">
            Already a member? Click here to login
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
