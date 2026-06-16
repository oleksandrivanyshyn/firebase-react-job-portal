import React from 'react';
import PageTitle from '../../../components/PageTitle';
import { Form, Tabs, message } from 'antd';
import Experince from './Experience';
import Education from './Education';
import PersonalInfo from './PersonalInfo';
import { useDispatch } from 'react-redux';
import { ShowLoading, HideLoading } from '../../../redux/alertSlice';
import { getUserProfile, updateUserProfile } from '../../../apis/users';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const loggedInUser = JSON.parse(localStorage.getItem('user'));
  const [userData, setUserData] = React.useState(null);

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await updateUserProfile(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(ShowLoading());
        const response = await getUserProfile(params.id);
        if (response.success) {
          setUserData(response.data);
        } else {
          message.error(response.message);
        }
      } catch (error) {
        message.error(error.message);
      } finally {
        dispatch(HideLoading());
      }
    };

    if (params.id) {
      getData();
    }
  }, [params.id, dispatch]);

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
      children: <Experince />,
    },
  ];

  return (
    <div>
      <PageTitle title="Profile" />
      {userData && (
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            ...userData,
            education: userData?.education?.length ? userData.education : [{}],
            skills: userData?.skills?.length ? userData.skills : [{}],
            experinces: userData?.experinces?.length
              ? userData.experinces
              : [{}],
            projects: userData?.projects?.length ? userData.projects : [{}],
          }}
        >
          <Tabs defaultActiveKey="1" items={tabItems} />

          <div className="d-flex justify-content-end gap-2">
            <button
              className="primary-outlined-btn"
              type="button"
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
            {params.id === loggedInUser?.id && (
              <button className="primary-contained-btn" type="submit">
                Save
              </button>
            )}
          </div>
        </Form>
      )}
    </div>
  );
}

export default Profile;
