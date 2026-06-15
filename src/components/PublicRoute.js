const PublicRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  if (user) {
    window.location.href = '/';
  }
  return children;
};

export default PublicRoute;
