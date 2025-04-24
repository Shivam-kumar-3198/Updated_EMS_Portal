import React, { useMemo } from 'react';
import Header from '../components/Header';
import TaskList from '../components/TaskList';
import TaskStatistics from '../components/TaskStatistics';
import { useAuth } from '../context/AuthContext';
import { useTask } from '../context/TaskContext';

const EmployeeDashboard = () => {
  const { user } = useAuth();
  const { getTasksByEmployeeId, loading, error } = useTask();
  
  const employeeTasks = useMemo(() => {
    if (!user) return [];
    return getTasksByEmployeeId(user.id);
  }, [getTasksByEmployeeId, user]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#1C1C1C]">
      <Header title="Employee Dashboard" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-white mb-6">
          <h2 className="text-2xl font-bold">Welcome, {user.name}</h2>
          <p className="text-gray-400">Here's an overview of your tasks</p>
        </div>
        
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-500">Loading your tasks...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <TaskStatistics tasks={employeeTasks} />
            
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4 text-white">Your Tasks</h2>
              <TaskList tasks={employeeTasks} isEmployeeView={true} />
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default EmployeeDashboard;