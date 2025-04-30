import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

// AllTasks component: har employee ke tasks ka summary table dikhane ke liye
const AllTasks = ({ statistics }) => {
  // Totals calculate karne ke liye useMemo hook, sirf statistics change hone par hi dobara calculate hoga
  const totals = useMemo(() => {
    return statistics.reduce(
      (acc, stat) => {
        acc.new += stat.new;       // naye tasks add karo
        acc.active += stat.active; // active tasks ka total
        acc.completed += stat.completed; // completed tasks ka total
        acc.failed += stat.failed; // failed tasks ka total
        return acc;
      },
      { new: 0, active: 0, completed: 0, failed: 0 }
    );
  }, [statistics]);

  // Agar statistics array empty ho, friendly message show karo
  if (statistics.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        {/* No data available ka message */}
        <p className="text-gray-500">No employee data available.</p>
      </div>
    );
  }

  return (
    // Table container start
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          {/* Table header */}
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Employee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                New Tasks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Active Tasks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Completed Tasks
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Failed Tasks
              </th>
            </tr>
          </thead>
          {/* Table body start */}
          <tbody className="bg-white divide-y divide-gray-200">
            {statistics.map((stat) => (
              // Har row ke liye map use karke render karo
              <tr key={stat.employeeId} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{stat.employeeName}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {stat.new} {/* naye tasks count */}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                    {stat.active} {/* active tasks count */}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {stat.completed} {/* completed tasks count */}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                    {stat.failed} {/* failed tasks count */}
                  </span>
                </td>
              </tr>
            ))}
            
            {/* Totals row: saare tasks ka sum */}
            <tr className="bg-gray-50 font-semibold">
              <td className="px-6 py-4 whitespace-nowrap">
                Total
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {totals.new} {/* total new tasks */}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {totals.active} {/* total active tasks */}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {totals.completed} {/* total completed tasks */}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {totals.failed} {/* total failed tasks */}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// PropTypes validation: statistics array ki shape define karo
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

// React.memo se unnecessary re-renders avoid karenge
export default React.memo(AllTasks);
