import React from 'react';
import PageTitle from '../../../components/PageTitle';
import { Form, Tabs } from 'antd';
import PersonalInfo from './PersonalInfo';
import Education from './Education';
import Experience from './Experience';

const Profile = ({ userData, onFinish }) => {
  const tabItems = [
    {
      key: '1',
      label: 'Personal Info',
      children: <PersonalInfo />,
    },
    {
      key: '2',
      label: 'Education',
      children: <Education />,
    },
    {
      key: '3',
      label: 'Experience',
      children: <Experience />,
    },
  ];

  return (
    <div>
      <PageTitle title="Profile" />
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          ...userData,
          education: userData?.education?.length ? userData.education : [{}],
          skills: userData?.skills?.length ? userData.skills : [{}],
          experinces: userData?.experinces?.length ? userData.experinces : [{}],
          projects: userData?.projects?.length ? userData.projects : [{}],
        }}
      >
        <Tabs defaultActiveKey="1" items={tabItems} />
      </Form>
    </div>
  );
};

export default Profile;
