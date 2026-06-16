import React from 'react';
import { useNavigate, useParams } from 'react-router';
import PageTitle from '../../../components/PageTitle';
import { Col, Form, message, Row } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../redux/alertSlice';
import { addNewJobPost } from '../../../apis/jobs';

const NewEditJob = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      let response = null;
      if (params.id) {
        response = { success: true, message: 'Job updated successfully' };
      } else {
        response = await addNewJobPost(values);
      }
      if (response.success) {
        message.success(response.message);
        navigate('/posted-jobs');
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };
  return (
    <div>
      <PageTitle title={params.id ? 'Edit Job' : 'Add New Job Post'} />
      <Form layout="vertical" onFinish={onFinish}>
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: 'required' }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Industry"
              name="industry"
              rules={[{ required: true, message: 'required' }]}
            >
              <select name="" id="">
                <option value="">Select</option>
                <option value="it">IT</option>
                <option value="finance">Finance</option>
                <option value="marketing">Marketing</option>
                <option value="realestate">Real Estate</option>
              </select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Location"
              name="location"
              rules={[{ required: true, message: 'required' }]}
            >
              <select name="" id="">
                <option value="">Select</option>
                <option value="india">India</option>
                <option value="usa">USA</option>
                <option value="uk">UK</option>
              </select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Company Name"
              name="company"
              rules={[{ required: true, message: 'required' }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Salary"
              name="salary"
              rules={[{ required: true, message: 'required' }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Job Type"
              name="jobType"
              rules={[{ required: true, message: 'required' }]}
            >
              <select name="" id="">
                <option value="">Select</option>
                <option value="fulltime">Full Time</option>
                <option value="parttime">Part Time</option>
                <option value="contract">Contract</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Last Date To Apply"
              name="lastDateToApply"
              rules={[{ required: true, message: 'required' }]}
            >
              <input type="date" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Experience"
              name="experience"
              rules={[{ required: true, message: 'required' }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Notice Period"
              name="noticePeriod"
              rules={[{ required: true, message: 'required' }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Job Description"
              name="jobDescription"
              rules={[{ required: true, message: 'required' }]}
            >
              <textarea type="text" />
            </Form.Item>
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2">
          <button
            className="primary-outlined-btn"
            onClick={() => navigate('/posted-jobs')}
          >
            Cancel
          </button>
          <button className="primary-contained-btn" type="submit">
            Save
          </button>
        </div>
      </Form>
    </div>
  );
};

export default NewEditJob;
