import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider } from './context/TaskContext';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import EmployeeDashboard from './pages/EmployeeDashboard';

const AppContent = () => {
  const { user, loading, error } = useAuth(); // Ensure you also check for error

  useEffect(() => {
    if (loading) {
      document.title = 'Loading... | Task Manager';
    } else if (!user) {
      document.title = 'Login | Task Manager';
    } else {
      document.title = `${user.role === 'admin' ? 'Admin' : 'Employee'} Dashboard | Task Manager`;
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1C1C1C] flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-lg">Loading application...</p>
          <div className="mt-4 w-12 h-12 border-4 border-red-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1C1C1C] flex items-center justify-center">
        <div className="bg-red-100 text-red-700 p-6 rounded-lg shadow-md">
          <p>Error loading application: {error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  return user.role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />;
};

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
