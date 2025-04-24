import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Check, Clock, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { useTask } from '../context/TaskContext';

const TaskStatusBadge = ({ status }) => {
  const statusConfig = {
    new: {
      bg: 'bg-blue-100',
      text: 'text-blue-800',
      icon: <Clock size={14} className="mr-1" />,
      label: 'New'
    },
    active: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      icon: <AlertCircle size={14} className="mr-1" />,
      label: 'Active'
    },
    completed: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      icon: <CheckCircle2 size={14} className="mr-1" />,
      label: 'Completed'
    },
    failed: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      icon: <XCircle size={14} className="mr-1" />,
      label: 'Failed'
    }
  };

  const config = statusConfig[status];

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
      {config.icon}
      {config.label}
    </span>
  );
};

TaskStatusBadge.propTypes = {
  status: PropTypes.oneOf(['new', 'active', 'completed', 'failed']).isRequired
};

const TaskList = ({ tasks, isEmployeeView = false }) => {
  const { updateTaskStatus } = useTask();
  const [expandedTaskId, setExpandedTaskId] = useState(null);

  const toggleTaskExpand = (taskId) => {
    setExpandedTaskId(expandedTaskId === taskId ? null : taskId);
  };

  const handleStatusChange = (taskId, newStatus) => {
    updateTaskStatus(taskId, newStatus);
  };

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">No tasks available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <li key={task.id} className="p-0">
            <div className="p-4 cursor-pointer hover:bg-gray-50" onClick={() => toggleTaskExpand(task.id)}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Created: {new Date(task.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <TaskStatusBadge status={task.status} />
              </div>
            </div>

            {expandedTaskId === task.id && (
              <div className="px-4 pb-4 bg-gray-50 rounded-b-lg">
                <p className="mb-4 text-gray-700">{task.description || 'No description provided.'}</p>
                
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Last updated: {new Date(task.updatedAt).toLocaleString()}
                  </p>
                </div>

                {isEmployeeView && task.status !== 'completed' && task.status !== 'failed' && (
                  <div className="mt-4 space-x-2">
                    {task.status === 'new' && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStatusChange(task.id, 'active');
                        }}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        <Clock size={14} className="mr-1" />
                        Start Task
                      </button>
                    )}
                    
                    {task.status === 'active' && (
                      <>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(task.id, 'completed');
                          }}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          <Check size={14} className="mr-1" />
                          Complete
                        </button>
                        
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(task.id, 'failed');
                          }}
                          className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                          <XCircle size={14} className="mr-1" />
                          Mark as Failed
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      status: PropTypes.oneOf(['new', 'active', 'completed', 'failed']).isRequired,
      employeeId: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      updatedAt: PropTypes.string.isRequired,
    })
  ).isRequired,
  isEmployeeView: PropTypes.bool
};

TaskList.defaultProps = {
  isEmployeeView: false
};

export default React.memo(TaskList);