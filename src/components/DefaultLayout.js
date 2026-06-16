import { Badge } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { getUserProfile } from '../apis/users';
import { HideLoading, ShowLoading } from '../redux/alertSlice';

function DefaultLayout({ children }) {
  const user = JSON.parse(localStorage.getItem('user'));
  const [collapsed, setCollapsed] = React.useState(false);
  const [menuToRender, setMenuToRender] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userMenu = [
    {
      title: 'Home',
      onClick: () => navigate('/'),
      icon: <i className="ri-home-7-line"></i>,
      path: '/',
    },
    {
      title: 'Applied Jobs',
      onClick: () => navigate('/applied-jobs'),
      icon: <i className="ri-file-list-3-line"></i>,
      path: '/applied-jobs',
    },
    {
      title: 'Posted Jobs',
      onClick: () => navigate('/posted-jobs'),
      icon: <i className="ri-file-list-2-line"></i>,
      path: '/posted-jobs',
    },
    {
      title: 'Profile',
      onClick: () => navigate(`/profile/${user?.id || user?._id}`),
      icon: <i className="ri-user-2-line"></i>,
      path: '/profile',
    },
    {
      title: 'Logout',
      onClick: () => {
        localStorage.removeItem('user');
        navigate('/login');
      },
      icon: <i className="ri-logout-box-r-line"></i>,
      path: '/login',
    },
  ];

  const adminMenu = [
    {
      title: 'Home',
      onClick: () => navigate('/'),
      icon: <i className="ri-home-7-line"></i>,
      path: '/',
    },
    {
      title: 'Jobs',
      onClick: () => navigate('/admin/jobs'),
      icon: <i className="ri-file-list-2-line"></i>,
      path: '/admin/jobs',
    },
    {
      title: 'Users',
      onClick: () => navigate('/admin/users'),
      icon: <i className="ri-user-2-line"></i>,
      path: '/admin/users',
    },
    {
      title: 'Logout',
      onClick: () => {
        localStorage.removeItem('user');
        navigate('/login');
      },
      icon: <i className="ri-logout-box-r-line"></i>,
      path: '/login',
    },
  ];

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(ShowLoading());
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const userId = storedUser?.id || storedUser?._id;

        if (userId) {
          const response = await getUserProfile(userId);
          if (response?.data?.isAdmin === true) {
            setMenuToRender(adminMenu);
          } else {
            setMenuToRender(userMenu);
          }
        }
      } catch (error) {
        console.error(error);
      }
      dispatch(HideLoading());
    };

    getData();
  }, [dispatch]);

  return (
    <div className="layout">
      <div className="sidebar justify-content-between flex">
        <div
          className="menu"
          style={{
            width: collapsed ? '40px' : '150px',
          }}
        >
          {menuToRender.map((item, index) => {
            const isActive =
              item.path === '/'
                ? window.location.pathname === '/'
                : window.location.pathname.startsWith(item.path);

            return (
              <div
                className={`menu-item ${isActive ? 'active-menu-item' : ''}`}
                onClick={item.onClick}
                key={index}
              >
                {item.icon}
                {!collapsed && <span>{item.title}</span>}
              </div>
            );
          })}
        </div>
      </div>
      <div className="content">
        <div className="header justify-content-between d-flex">
          <div className="d-flex items-center gap-2">
            {collapsed && (
              <i
                className="ri-menu-2-fill"
                onClick={() => setCollapsed(!collapsed)}
              ></i>
            )}
            {!collapsed && (
              <i
                className="ri-close-line"
                onClick={() => setCollapsed(!collapsed)}
              ></i>
            )}
            <span className="logo">SHEYJOBS-LITE</span>
          </div>
          <div className="d-flex gap-1 align-items-center">
            <Badge
              count={1}
              className="mx-5"
              onClick={() => navigate('/notifications')}
            >
              <i className="ri-notification-line"></i>
            </Badge>

            <span>{user?.name}</span>
            <i className="ri-shield-user-line"></i>
          </div>
        </div>
        <div className="body">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
