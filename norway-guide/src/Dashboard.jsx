import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME, GET_USER_DBS } from './graphql/queries';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt_token');
   if (!token) {
    return <Navigate to="/login" />;
  }


  // Get current logged-in user
  const {
    data: meData,
    loading: meLoading,
    error: meError,
  } = useQuery(GET_ME, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  //  Get users from user-db collection
  const {
    data: usersData,
    loading: usersLoading,
    error: usersError,
  } = useQuery(GET_USER_DBS, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const handleLogout = () => {
    logout();
    localStorage.removeItem('jwt_token');
    navigate('/login');
  };

  if (meLoading) return <p>Loading your profile...</p>;
  if (meError) return <p>Error loading your profile. Please log in again.</p>;
//xtracts the logged-in user info from the API response
  const user = meData?.me;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Welcome, {user?.username}!</h2>

      <div className="card p-3 mb-4">
        <h5>Your Profile</h5>
        <p><strong>Username:</strong> {user?.username}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role?.name || 'N/A'}</p>
      </div>

      <button className="btn btn-danger mb-4" onClick={handleLogout}>
        Logout
      </button>

      <hr />

      <h4>All Users from user-db</h4>
{usersLoading ? (
  <p>Loading users...</p>
) : usersError ? (
  <>
    <p>Error loading users.</p>
    <pre style={{ color: 'red' }}>{JSON.stringify(usersError, null, 2)}</pre>
  </>
) : (
  <table className="table table-bordered mt-3">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>DOB</th>
        <th>Phone</th>
        <th>Status</th>
        <th>Created At</th>
      </tr>
    </thead>
    <tbody>
      {usersData?.userDbs?.map((user, index) => (
        <tr key={index}>
          <td>{user.Name}</td>
          <td>{user.email}</td>
          <td>{user.DOB}</td>
          <td>{user.phone}</td>
          <td>{user.is_active ? 'Active' : 'Inactive'}</td>
          <td>{new Date(user.createdAt).toLocaleString()}</td>
        </tr>
      ))}
    </tbody>
  </table>
)}

    </div>
  );
}

export default Dashboard;
