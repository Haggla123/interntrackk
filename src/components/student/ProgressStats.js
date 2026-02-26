import React from 'react';

const ProgressStats = ({ completedWeeks, totalWeeks }) => {
  const percentage = (completedWeeks / totalWeeks) * 100;

  return (
    <div className="stats-row">
      <div className="stat-card">
        <label>Overall Progress</label>
        <div className="progress-container">
          <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
        </div>
        <p>{completedWeeks} of {totalWeeks} Weeks Completed</p>
      </div>
      
      <div className="stat-card">
        <label>Current Status</label>
        <p className="status-text">Active Placement</p>
      </div>
    </div>
  );
};

export default ProgressStats;