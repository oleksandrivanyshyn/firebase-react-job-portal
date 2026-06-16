import { message, Modal, Table } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { changeApplicationStatus } from '../../../apis/jobs';
import { HideLoading, ShowLoading } from '../../../redux/alertSlice';

function AppliedCandidates({
  showAppliedCandidates,
  setShowAppliedCandidates,
  appiledCandidates,
  reloadData,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeStatus = async (applicationData, status) => {
    try {
      dispatch(ShowLoading());
      const response = await changeApplicationStatus({
        ...applicationData,
        id: applicationData.id || applicationData._id,
        status,
      });
      if (response.success) {
        message.success(response.message);
        reloadData(applicationData.jobId);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error('Something went wrong');
    } finally {
      dispatch(HideLoading());
    }
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      render: (text, record) => record.id || record._id,
    },
    {
      title: 'Name',
      dataIndex: 'userName',
      key: 'userName',
      render: (text, record) => {
        return (
          <span
            className="underline"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate(`/profile/${record.userId}`)}
          >
            {text}
          </span>
        );
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
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
        return (
          <div>
            {record.status === 'pending' && (
              <>
                <span
                  className="underline text-success"
                  style={{ cursor: 'pointer' }}
                  onClick={() => changeStatus(record, 'approved')}
                >
                  Approve
                </span>
                <span
                  className="underline text-danger mx-2"
                  style={{ cursor: 'pointer' }}
                  onClick={() => changeStatus(record, 'rejected')}
                >
                  Reject
                </span>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Modal
        title="Applied Candidates"
        open={showAppliedCandidates}
        onCancel={() => setShowAppliedCandidates(false)}
        footer={null}
        width={1000}
      >
        <Table
          columns={columns}
          dataSource={appiledCandidates}
          rowKey={(record) => record.id || record._id}
        />
      </Modal>
    </div>
  );
}

export default AppliedCandidates;
