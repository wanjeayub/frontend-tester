// src/UserList.jsx
import { useState, useEffect } from "react";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editForm, setEditForm] = useState({ fullName: "", amount: "" });

  // Fetch users from the backend
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://backend-tester-1.onrender.com/api/users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Handle delete user
  const deleteUser = async (id) => {
    try {
      await fetch(`https://backend-tester-1.onrender.com/api/users/${id}`, {
        method: "DELETE",
      });
      setUsers(users.filter((user) => user._id !== id));
      alert("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    }
  };

  // Handle edit form submission
  const submitEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://backend-tester-1.onrender.com/${isEditing}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editForm),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(
          users.map((user) => (user._id === isEditing ? updatedUser : user))
        );
        setIsEditing(null);
        setEditForm({ fullName: "", amount: "" });
        alert("User updated successfully");
      } else {
        alert("Error updating user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("Error updating user");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-4">Users List</h1>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-t">
                {isEditing === user._id ? (
                  <td colSpan="3">
                    <form onSubmit={submitEdit}>
                      <input
                        type="text"
                        value={editForm.fullName}
                        onChange={(e) =>
                          setEditForm({ ...editForm, fullName: e.target.value })
                        }
                        className="w-full px-2 py-1 border rounded"
                        required
                      />
                      <input
                        type="number"
                        value={editForm.amount}
                        onChange={(e) =>
                          setEditForm({ ...editForm, amount: e.target.value })
                        }
                        className="w-full px-2 py-1 border rounded mt-2"
                        required
                      />
                      <div className="flex justify-end mt-2">
                        <button
                          type="submit"
                          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditing(null)}
                          className="ml-2 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </td>
                ) : (
                  <>
                    <td className="px-4 py-2">{user.fullName}</td>
                    <td className="px-4 py-2">{user.amount}</td>
                    <td className="px-4 py-2 flex space-x-2">
                      <button
                        onClick={() => {
                          setIsEditing(user._id);
                          setEditForm({
                            fullName: user.fullName,
                            amount: user.amount,
                          });
                        }}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
