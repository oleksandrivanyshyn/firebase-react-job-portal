const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (user) {
    return children;
  } else {
    window.location.href = '/login';
  }
};

export default ProtectedRoute;
