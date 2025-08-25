import React, { useState, useEffect } from "react";

const StudentDashboard = () => {
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const fakeUser = { username: "Prathamesh" }; 
      setUser(fakeUser);
    };
    fetchUser();
  }, []);

  return (
    <div className="max-w-[1240px] mx-auto mt-20 p-6 text-center">
      <h1 className="text-3xl font-bold text-blue-600">
        Welcome {user ? user.username : "Loading..."} 🎉
      </h1>

      <button
        onClick={() => setShowForm(!showForm)}
        className="mt-6 text-white bg-blue-700 hover:bg-blue-800 
                   focus:ring-4 focus:ring-blue-300 font-medium 
                   rounded-lg text-sm px-6 py-2.5"
      >
        {showForm ? "Close Form" : "Open Form"}
      </button>

      {showForm && (
        <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Student Form</h2>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter your name"
              className="border p-2 rounded"
            />
            <input
              type="email"
              placeholder="Enter your email"
              className="border p-2 rounded"
            />
            <button
              type="submit"
              className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
