// src/AddUser.jsx
import { useState } from "react";

const AddUser = () => {
  const [fullName, setFullName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async () => {
    // e.preventDefault();
    try {
      const response = await fetch(
        "https://backend-tester-8bh5.onrender.com/api/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fullName, amount }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        setFullName("");
        setAmount("");
      } else {
        throw new Error("Failed to add user");
      }
    } catch (error) {
      console.error("There was an error adding the user:", error);
      alert("Error adding user");
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Add User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              className="w-full px-3 py-2 border rounded"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
