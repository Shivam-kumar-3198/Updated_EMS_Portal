import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

const AllTasks = ({ statistics }) => {
  const totals = useMemo(() => {
    return statistics.reduce(
      (acc, stat) => {
        acc.new += stat.new;
        acc.active += stat.active;
        acc.completed += stat.completed;
        acc.failed +=stat.failed;
        return acc;
      },
      { new: 0, active: 0, completed: 0, failed: 0 }
    );
  }, [statistics]);

  if (statistics.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500">No employee data available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                New Tasks
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Active Tasks
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Completed Tasks
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Failed Tasks
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {statistics.map((stat) => (
              <tr key={stat.employeeId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{stat.employeeName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {stat.new}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    {stat.active}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {stat.completed}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    {stat.failed}
                  </span>
                </td>
              </tr>
            ))}
            
            {/* Totals row */}
            <tr className="bg-gray-50 font-semibold">
              <td className="px-6 py-4 whitespace-nowrap">
                Total
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {totals.new}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {totals.active}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {totals.completed}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {totals.failed}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

AllTasks.propTypes = {
  statistics: PropTypes.arrayOf(
    PropTypes.shape({
      employeeId: PropTypes.string.isRequired,
      employeeName: PropTypes.string.isRequired,
      new: PropTypes.number.isRequired,
      active: PropTypes.number.isRequired,
      completed: PropTypes.number.isRequired,
      failed: PropTypes.number.isRequired
    })
  ).isRequired
};

export default React.memo(AllTasks);