import React from 'react';
import PageTitle from '../../../components/PageTitle';
import { Tabs } from 'antd';
const { TabPane } = Tabs;

const Profile = () => {
  return (
    <div>
      <PageTitle title="Profile" />
      <Tabs defaultActiveKey="1">
        <TabPane tab="Personal Info" key="1">
          PersonalInfo
        </TabPane>
        <TabPane tab="Education" key="2">
          Education
        </TabPane>
        <TabPane tab="Experience" key="3">
          Experience
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Profile;
