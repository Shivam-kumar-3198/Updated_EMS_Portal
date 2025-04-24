import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTask } from '../context/TaskContext';

const TaskForm = ({ employees }) => {
  const { createTask } = useTask();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [employeeId, setEmployeeId] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!title.trim()) {
      setError('Task title is required');
      return;
    }
    
    if (!employeeId) {
      setError('Please select an employee');
      return;
    }

    createTask({
      title,
      description,
      status: 'new',
      employeeId,
    });

    setTitle('');
    setDescription('');
    setEmployeeId('');
    setSuccess('Task created successfully!');

    setTimeout(() => {
      setSuccess('');
    }, 3000);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-bold mb-4">Create New Task</h2>
      
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
          <p>{error}</p>
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4" role="alert">
          <p>{success}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="taskTitle" className="block text-gray-700 font-medium mb-2">
            Task Title *
          </label>
          <input
            type="text"
            id="taskTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Enter task title"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="taskDescription" className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            id="taskDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Enter task description"
            rows={3}
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="employeeSelect" className="block text-gray-700 font-medium mb-2">
            Assign to Employee *
          </label>
          <select
            id="employeeSelect"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            <option value="">Select an employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.name}
              </option>
            ))}
          </select>
        </div>
        
        <button
          type="submit"
          className="bg-red-400 text-white px-6 py-2 rounded-md hover:bg-red-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
        >
          Create Task
        </button>
      </form>
    </div>
  );
};

TaskForm.propTypes = {
  employees: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.oneOf(['admin', 'employee']).isRequired,
    })
  ).isRequired
};

export default TaskForm;