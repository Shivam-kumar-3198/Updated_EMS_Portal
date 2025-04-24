import React, { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const TaskContext = createContext();

// Mock initial tasks
const INITIAL_TASKS = [
  {
    id: '1',
    title: 'Complete project documentation',
    description: 'Finalize all documentation for the Q3 project',
    status: 'active',
    employeeId: '2',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title: 'Review code changes',
    description: 'Review pull requests for the new feature',
    status: 'new',
    employeeId: '3',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title: 'Fix login bug',
    description: 'Address the authentication issue reported last week',
    status: 'completed',
    employeeId: '2',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    title: 'Deploy to production',
    description: 'Deploy the latest changes to the production environment',
    status: 'failed',
    employeeId: '4',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    title: 'Create user documentation',
    description: 'Write documentation for end-users',
    status: 'active',
    employeeId: '3',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

// Map of employee IDs to names
const EMPLOYEE_NAMES = {
  '2': 'John Employee',
  '3': 'Sarah Employee',
  '4': 'Mike Employee',
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks) {
        setTasks(JSON.parse(savedTasks));
      } else {
        setTasks(INITIAL_TASKS);
        localStorage.setItem('tasks', JSON.stringify(INITIAL_TASKS));
      }
    } catch (err) {
      setError('Failed to load tasks');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const createTask = (taskData) => {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
  };

  const updateTaskStatus = (taskId, status) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, status, updatedAt: new Date().toISOString() } 
          : task
      )
    );
  };

  const getTasksByEmployeeId = (employeeId) => {
    return tasks.filter(task => task.employeeId === employeeId);
  };

  const getTaskStatistics = () => {
    const employeeStats = {};
    
    tasks.forEach(task => {
      if (!employeeStats[task.employeeId]) {
        employeeStats[task.employeeId] = {
          employeeId: task.employeeId,
          employeeName: EMPLOYEE_NAMES[task.employeeId] || 'Unknown Employee',
          new: 0,
          active: 0,
          completed: 0,
          failed: 0,
        };
      }
      
      employeeStats[task.employeeId][task.status]++;
    });
    
    return Object.values(employeeStats);
  };

  const value = {
    tasks,
    loading,
    error,
    createTask,
    updateTaskStatus,
    getTasksByEmployeeId,
    getTaskStatistics,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};