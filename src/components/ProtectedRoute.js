import DefaultLayout from './DefaultLayout';

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (user) {
    return <DefaultLayout>{children}</DefaultLayout>;
  } else {
    window.location.href = '/login';
  }
};

export default ProtectedRoute;
