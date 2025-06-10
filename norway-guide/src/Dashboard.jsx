import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { UPDATE_USER_DB } from './graphql/mutations';
import { GET_ME, GET_USER_DBS} from './graphql/queries';
import { useAuth } from './AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';

function Dashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const token = localStorage.getItem('jwt_token');

  if (!token) return <Navigate to="/login" />;

  const { data: meData, loading: meLoading, error: meError } = useQuery(GET_ME, {
    context: { headers: { Authorization: `Bearer ${token}` } },
  });

  const { data: usersData, loading: usersLoading, error: usersError } = useQuery(GET_USER_DBS, {
    context: { headers: { Authorization: `Bearer ${token}` } },
  });

  const [updateUserDb] = useMutation(UPDATE_USER_DB, {
    context: { headers: { Authorization: `Bearer ${token}` } },
  });

  const [editingRowId, setEditingRowId] = useState(null);
  const [editedUsers, setEditedUsers] = useState({});

  const handleLogout = () => {
    logout();
    localStorage.removeItem('jwt_token');
    navigate('/login');
  };

  const handleEditClick = (id, user) => {
    setEditingRowId(id);
    setEditedUsers({ ...user });
  };

  const handleInputChange = (field, value) => {
    setEditedUsers((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async (id) => {
    try {
      await updateUserDb({
        variables: {
          documentId: id,
          data: {
            Name: editedUsers.Name,
            email: editedUsers.email,
            DOB: editedUsers.DOB,
            phone: parseInt(editedUsers.phone),
            is_active: editedUsers.is_active === 'true' || editedUsers.is_active === true,
          },
        },
      });
      setEditingRowId(null);
      window.location.reload(); // Optional: refresh the data after update
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  if (meLoading) return <p>Loading your profile...</p>;
  if (meError) return <p>Error loading profile.</p>;

  const user = meData?.me;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Welcome, {user?.username}!</h2>

      <div className="card p-3 mb-4">
        <h5>Your Profile</h5>
        <p><strong>Username:</strong> {user?.username}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role?.name}</p>
      </div>

      <button className="btn btn-danger mb-4" onClick={handleLogout}>Logout</button>
      <hr />

      <h4>All Users from user-db</h4>

      {usersLoading ? (
        <p>Loading users...</p>
      ) : usersError ? (
        <p>Error loading users: {usersError.message}</p>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {usersData?.userDbs?.map((user) => (
              <tr key={user.documentId}>
                <td>
                  {editingRowId === user.documentId ? (
                    <input
                      value={editedUsers.Name}
                      onChange={(e) => handleInputChange('Name', e.target.value)}
                    />
                  ) : (
                    user.Name
                  )}
                </td>
                <td>
                  {editingRowId === user.documentId ? (
                    <input
                      value={editedUsers.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editingRowId === user.documentId ? (
                    <input
                      type="date"
                      value={editedUsers.DOB}
                      onChange={(e) => handleInputChange('DOB', e.target.value)}
                    />
                  ) : (
                    new Date(user.DOB).toLocaleDateString()
                  )}
                </td>
                <td>
                  {editingRowId === user.documentId ? (
                    <input
                      value={editedUsers.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  ) : (
                    user.phone
                  )}
                </td>
                <td>
                  {editingRowId === user.documentId ? (
                    <select
                      value={editedUsers.is_active ? 'true' : 'false'}
                      onChange={(e) => handleInputChange('is_active', e.target.value)}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  ) : user.is_active ? 'Active' : 'Inactive'}
                </td>
                <td>{new Date(user.createdAt).toLocaleString()}</td>
                <td>
                  {editingRowId === user.documentId ? (
                    <button className="btn btn-success btn-sm" onClick={() => handleSave(user.documentId)}>
                      Save
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => handleEditClick(user.documentId, user)}
                    >
                      Edit
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Dashboard;
