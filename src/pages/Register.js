import React from 'react';
import { Form } from 'antd';
import { Link } from 'react-router';

const Register = () => {
  const onFinish = (values) => {
    console.log('Success:', values);
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
            Login
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
