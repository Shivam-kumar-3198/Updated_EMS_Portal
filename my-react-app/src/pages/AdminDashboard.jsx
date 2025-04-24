import React, { useMemo } from 'react';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import AllTasks from '../components/AllTasks';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';

const AdminDashboard = () => {
  const { user } = useAuth();
  const { getTaskStatistics, loading, error } = useTask();
  
  const employees = useMemo(() => {
    return [
      {
        id: '2',
        name: 'Shivam Employee',
        email: 'Shivam@example.com',
        role: 'employee',
      },
      {
        id: '3',
        name: 'Ayush Employee',
        email: 'Ayush@example.com',
        role: 'employee',
      },
      {
        id: '4',
        name: 'Aryan Employee',
        email: 'Aryan@example.com',
        role: 'employee',
      },
    ];
  }, []);
  
  const taskStats = useMemo(() => getTaskStatistics(), [getTaskStatistics]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#1C1C1C]">
      <Header title="Admin Dashboard" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4 text-white">Create Task</h2>
            <TaskForm employees={employees} />
          </div>
          
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-white">Employee Tasks</h2>
            
            {loading ? (
              <div className="bg-white rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-500">Loading task data...</p>
              </div>
            ) : error ? (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                <p>{error}</p>
              </div>
            ) : (
              <AllTasks statistics={taskStats} />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;