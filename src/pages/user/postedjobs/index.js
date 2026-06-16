import React from 'react';
import PageTitle from '../../../components/PageTitle';
import { useNavigate } from 'react-router';

const PostedJobs = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="d-flex justify-content-between"></div>
      <PageTitle title="Posted Jobs" />
      <button
        className="primary-outlined-btn"
        onClick={() => navigate('/posted-jobs/new')}
      >
        New Job
      </button>
    </div>
  );
};

export default PostedJobs;
