import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import PageTitle from '../../../components/PageTitle';
import { HideLoading, ShowLoading } from '../../../redux/alertSlice';
import {
  getPostedJobsByUserId,
  deleteJobById,
  getApplicationsByJobId,
} from '../../../apis/jobs';
import { message, Table } from 'antd';
import AppliedCandidates from './AppliedCandidates';

function PostedJobs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [showAppliedCandidates, setShowAppliedCandidates] =
    React.useState(false);
  const [appiledCandidates, setAppiledCandidates] = React.useState([]);

  const getData = async () => {
    try {
      dispatch(ShowLoading());
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?.id || user?._id;

      if (userId) {
        const response = await getPostedJobsByUserId(userId);
        if (response.success) {
          setData(response.data);
        }
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getData();
  }, [dispatch]);

  const deleteJob = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await deleteJobById(id);
      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(HideLoading());
    }
  };

  const getAppliedCandidates = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await getApplicationsByJobId(id);
      if (response.success) {
        setAppiledCandidates(response.data);
        setShowAppliedCandidates(true);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    } finally {
      dispatch(HideLoading());
    }
  };

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Posted On',
      dataIndex: 'postedOn',
      key: 'postedOn',
    },
    {
      title: 'Last Date to Apply',
      dataIndex: 'lastDateToApply',
      key: 'lastDateToApply',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (text, record) => {
        const jobId = record.id || record._id;
        return (
          <div className="d-flex gap-3 align-items-center">
            <span
              className="underline"
              style={{ cursor: 'pointer' }}
              onClick={() => getAppliedCandidates(jobId)}
            >
              candidates
            </span>
            <i
              className="ri-delete-bin-line"
              style={{ cursor: 'pointer' }}
              onClick={() => deleteJob(jobId)}
            ></i>
            <i
              className="ri-pencil-line"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/posted-jobs/edit/${jobId}`)}
            ></i>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle title="Posted Jobs" />
        <button
          type="button"
          className="primary-outlined-btn"
          onClick={() => navigate('/posted-jobs/new')}
        >
          New Job
        </button>
      </div>

      <Table
        columns={columns}
        dataSource={data}
        rowKey={(record) => record.id || record._id}
      />

      {showAppliedCandidates && (
        <AppliedCandidates
          showAppliedCandidates={showAppliedCandidates}
          setShowAppliedCandidates={setShowAppliedCandidates}
          appiledCandidates={appiledCandidates}
          reloadData={getAppliedCandidates}
        />
      )}
    </div>
  );
}

export default PostedJobs;
