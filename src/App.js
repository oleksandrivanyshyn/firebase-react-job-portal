import { BrowserRouter, Route, Routes } from 'react-router';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import { useSelector } from 'react-redux';
import Loader from './components/Loader';
import './stylesheets/custom-components.css';
import './stylesheets/layout.css';
import AppliedJobs from './pages/user/AppliedJobs';
import Profile from './pages/user/profile';
import PostedJobs from './pages/user/postedjobs';
import NewEditJob from './pages/user/postedjobs/NewEditJob';
import AllJobs from './pages/admin/AllJobs';
import Allusers from './pages/admin/AllUsers';
import JobDescription from './pages/JobDescription';

function App() {
  const { loading } = useSelector((state) => state.alert);
  return (
    <div>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          ></Route>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/job-description/:id"
            element={
              <ProtectedRoute>
                <JobDescription />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={'/applied-jobs'}
            element={
              <ProtectedRoute>
                <AppliedJobs />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={'/posted-jobs'}
            element={
              <ProtectedRoute>
                <PostedJobs />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={'/posted-jobs/new'}
            element={
              <ProtectedRoute>
                <NewEditJob />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path={'/posted-jobs/edit/:id'}
            element={
              <ProtectedRoute>
                <NewEditJob />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/admin/jobs"
            element={
              <ProtectedRoute>
                <AllJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <ProtectedRoute>
                <Allusers />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
